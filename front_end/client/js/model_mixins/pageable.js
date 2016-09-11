import _ from 'lodash';

function defaultPaginationParams() {
  return { page: 1, per_page: 25 };
}

export default /* @ngInject */ function(restmod, $http, RMPackerCache) {
  return restmod.mixin({
    $hooks: {
      'before-fetch-many': function(_request) {
        if(!this.$params) { this.$params = {} };

        var self = this,
            default_pagination_params =  _.merge(defaultPaginationParams(), self.pagination_params),
            pagination_params = _.merge(default_pagination_params, _request.params);

        _.merge(self.$params, self.pagination_params);

        this.$dispatch('before-fetch-paginated-collection', _request.params);
      },
      'after-fetch-many': function(_response) {
        this.setPagination();
      },
      'after-collection-init': function() {
        var self = this;

        this.initPagination();
      }
    },
    $extend: {
      Collection: {
        initPagination: function() {
          var self = this;

          if(!self.hasOwnProperty('pagination_params')) {
            self.resetPagination();
          }

          self.$dispatch('after-init-pagination');
        },
        resetPagination: function() {
          this.pagination_params = {};
          this.pagination = {};
        },
        'pagination_mapping': {
          current_page: 'current_page',
          total_pages: 'total_pages',
          total_entries: 'total_entries'
        },
        setPagination: function() {
          var self = this;

          _.each(self.pagination_mapping, function(v, k){
            self.pagination[k] = self.$metadata.pagination[v];
          });

          //need to offset as second param is stop, but stop works as between,
          //but start does not. wth underscore?
          self.pagination.pages = _.range(1, self.pagination.total_pages + 1);
          self.pagination.last_page = _.last(self.pagination.pages);
          self.$dispatch('after-set-pagination');
        },
        setPage(page) {
          this.pagination_params.page = page;
          return this;
        },
        setPerPage(per_page) {
          this.pagination_params.per_page = per_page;
          return this;
        },
        selectPage(page, search_params={}) {
          var self = this, page_was_changed;

          page_was_changed = (page != self.pagination_params['page']) || (self.pagination_params['per_page'] != self.pagination.per_page);
          this.setPage(page).setPerPage(self.pagination.per_page);

          if(page_was_changed){
            self.$refresh({});
          }
        },
        hasNextPage() {
          let _page = this.pagination.current_page + 1;
          return _.contains(this.pagination.pages, _page);
        },
        hasPreviousPage() {
          let _page = this.pagination.current_page - 1;
          return _.contains(this.pagination.pages, _page);
        },
        nextPage() {
          this.selectPage(this.nextPageNumber());
          return this;
        },
        nextPageNumber() {
          let _page = this.pagination.current_page + 1;
          return _.contains(this.pagination.pages, _page) ? _page : 1;
        },
        previousPage() {
          this.selectPage(this.previousPageNumber());
          return this;
        },
        previousPageNumber() {
          let _page = this.pagination.current_page - 1;
          return _.contains(this.pagination.pages, _page) ? _page : this.pagination.last_page;
        },
        fetchRemainingPages(){
          var self = this,
              remaining_pages = _.without(self.pagination.pages, self.pagination.current_page);

          _.map(remaining_pages, function(page){
            return $http({
              method: 'GET',
              url: `${self.$url()}`,
              params: _.extend({page: page}, self.$params),
              allow_cancellation: true
            }).then(function(response){
              RMPackerCache.prepare();
              var raw = self.$type.unpack(self, response.data), pk, records;
              self.$decode(raw);
              self.setPagination();
              RMPackerCache.clear();
            });
          });
        }
      }
    }
  })
}
