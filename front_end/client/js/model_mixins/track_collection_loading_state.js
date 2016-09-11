export default /* @ngInject */ function(restmod, $timeout, ProgressBar) {
  return restmod.mixin({
    $hooks: {
      'after-set-pagination': function() {
        if(this.collection_loading_state.total < 1) {
          this.collection_loading_state.total = this.pagination.total_entries;
        }

        this.collection_loading_state.current_step = this.length;
      },
      'before-fetch-paginated-collection': function() {
        if(!this.hasOwnProperty('collection_loading_state')) {
          this.initCollectionLoadingState();
        }
      }
    },
    $extend: {
      Scope: {
        initCollectionLoadingState: function() {
          this.collection_loading_state = new ProgressBar();
        }
      }
    }
  });
}
