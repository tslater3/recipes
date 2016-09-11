import _ from 'lodash';
import searchjs from 'searchjs';

export default /* @ngInject */ function(restmod) {
  return restmod.mixin({
    $hooks: {
      'after-collection-init': function() {
        this.initFilterListBy();
      }
    },
    $extend: {
      Scope: {
        initFilterListBy: function() {
          var self = this;

          if(!self.hasOwnProperty('filter_params')) {
            self.filter_params = {};
            self.filtered_collection = this;
          }
        },
        hasFilters: function() {
          return (this.filtered_collection != this);
        },
        resetCollectionFilters: function() {
          this.filter_params = {};
          this.filtered_collection = this;
        }
      },
      List: {
        filterBy(_params) {
          var self = this,
              filtered_list,
              filtered_collection;

          filtered_list = self.$asList(function(records){
            return searchjs.matchArray(records, _params);
          });

          filtered_collection = self.$type.$collection();

          _.each(filtered_list, function(item){
            filtered_collection.$buildRaw(item).$reveal();
          });

          self.filter_params = _.merge(self.filter_params, _params);

          self.$dispatch('after-collection-filters-applied');

          return filtered_collection;
        },
        fuzzyFilterBy(_params) {
          return this.filterBy(_.merge(_params, {_text: true}));
        },
        where(_params) {
          return this.filterBy(_params);
        },
        whereNot(_params) {
          return this.filterBy(_.merge(_params, {_not: true}));
        }
      }
    }
  })
}
