import _ from 'lodash';

const IGNORED_PARAMS = ['page', 'per'];

function notSearchParam(val) {
  return _.include(IGNORED_PARAMS, val) || _.startsWith(val, 'sort_by');
}

export default /* @ngInject */ function(restmod, $http) {
  return restmod.mixin({
    $hooks: {
      'after-collection-init': function() {
        this.initSearch();
      },
      'after-fetch-many': function(_response) {
        this.setSearchParamsFromMetadata();
      },
      'before-fetch-many': function(_request) {
        _.merge(_request.params || {}, this.search_params);
        _.merge(this.$params, _request.params);
      },
    },
    $extend: {
      Scope: {
        initSearch() {
          var self = this;

          if(!self.hasOwnProperty('search_params')) {
            self.search_params = {};
          }
        },
        cleanSearchParams() {
          this.search_params = _.compactObject(this.search_params);
          return this;
        },
        setSearchParamsFromMetadata() {
          var self = this;

          _.each(self.$metadata.search_scopes, function(v, k){
            self.search_params[k] = v;
          });
        },
        hasSearchFilters() {
          return _.any(_.omit(_.keys(this.search_params), notSearchParam));
        }
      }
    }
  })
}
