import _ from 'lodash';

export default /* @ngInject */ function($q) {
  //apparently cancelling promises in angular is hard than it seems.
  //https://github.com/angular/angular.js/issues/1159
  //but this solution works well. modeled this after:
  //http://blog.xebia.com/cancelling-http-requests-for-fun-and-profit/
  //when making $http request, pass no_cancel: true if you want it to be
  //uncancellable, or inject pendingRequests and
  //pendingRequests.cancelAll() to cancell all queued requests

  class PendingRequestsService {
    constructor() {
      this.resetCancelablePromises();
    }

    any() {
      return this.cancelable_promises.length > 0;
    }

    cancelAll() {
      _.map(this.cancelable_promises, function (cancelable_promise) {
        cancelable_promise.promise.isGloballyCancelled = true;
        cancelable_promise.resolve();
      });

      this.resetCancelablePromises();
    }

    resetCancelablePromises(){
      this.cancelable_promises = [];
    }

    newTimeout() {
      let cancelable_promise = $q.defer();
      this.cancelable_promises.push(cancelable_promise);
      return cancelable_promise.promise;
    }
  }

  return new PendingRequestsService();
}
