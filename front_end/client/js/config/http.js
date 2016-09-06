import _ from 'lodash';
import angular from 'angular';

const REPORTABLE_ERROR_STATUSES = [422, 403, 405];

// @ngInject
function growlInterceptor($q, $location, growl) {
  return {
    request: function (config) {
      return config;
    },

    response: function (result) {
      return result;
    },

    responseError: function (rejection) {
      if(_.contains(REPORTABLE_ERROR_STATUSES, rejection.status) && rejection.data.meta && rejection.data.meta.errors) {
        _.each(_.values(rejection.data.meta.errors), function(error){
          growl.error(error);
        });
      }

      if (rejection.status == 401) {
        $location.url('/login');
      }

      return $q.reject(rejection);
    }
  };
}

// @ngInject
function httpRequestTimeoutInterceptor($q, pendingRequests) {
  return {
    request(config) {
      config = config || {};
      if (config.timeout === undefined && config.allow_cancellation) {
        config.timeout = pendingRequests.newTimeout();
      }

      return config;
    },
    response(result) {
      return result;
    },
    responseError(response) {
      if (response.config && response.config.timeout && response.config.timeout.isGloballyCancelled) {
        return $q.defer().promise;
      }

      return $q.reject(response);
    }
  }
}

export default /* @ngInject */ function($httpProvider, $provide) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content');
  $httpProvider.interceptors.push(httpRequestTimeoutInterceptor);
  $httpProvider.interceptors.push(growlInterceptor);

  $provide.decorator("$http", /* @ngInject */ function($delegate, pendingRequests) {
    $delegate.anyPendingRequests = function() {
      return this.pendingRequests.length > 0;
    }

    $delegate.anyCancelablePendingRequests = function(){
      return this.anyPendingRequests() && pendingRequests.any();
    }

    return $delegate;
  });
}
