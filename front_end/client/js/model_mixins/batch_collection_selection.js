export default /* @ngInject */ function(restmod, $http) {
  return restmod.mixin({
    $extend: {
      Collection: {
        initBatchCollectionSelection: function() {
          this.selected_resources = [];
        },
        clearSelections: function() {
          var self = this;

          if(self.selected_resources.length > 0) {
            self.selected_resources = [];
          }
        },
        hasSelections: function() {
          return this.selected_resources.length > 0;
        },
        indexOfResourceInSelection: function(resource) {
          var self = this;

          return _.indexOf(self.selected_resources, resource);
        },
        isSelected: function(resource) {
          var self = this;

          return _.contains(self.selected_resources, resource);
        },
        selectAll: function() {
          this.clearSelections();
          this.toggleAll();
        },
        toggleAll: function() {
          var self = this;

          angular.forEach(self, function(resource) {
            self.toggleResourceSelection(resource);
          });
        },
        toggleResourceSelection(resource) {
          var self = this;

          if(self.isSelected(resource)) {
            self.selected_resources.splice(self.indexOfResourceInSelection(resource), 1);
          } else {
            self.selected_resources.push(resource);
          }
        },
        removeUnselectedResources() {
          var self = this;

          _.each(self.unselectedResources(), function(_resource) {
            self.toggleResourceSelection(_resource);
            self.removeFromCollection(_resource);
          });

          return self;
        },
        removeSelectedResources() {
          var self = this;

          _.each(self.selected_resources, function(_resource) {
            self.toggleResourceSelection(_resource);
            self.removeFromCollection(_resource);
          });

          return self;
        },
        unselectedResources() {
          return _.without(self, self.selected_resources);
        }
      },
      Record: {
        toggleSelection: function() {
          var self = this;

          self.$scope.toggleResourceSelection(self);
        },
        isSelected: function() {
          var self = this;

          return self.$scope.isSelected(self);
        },
        indexInSelection: function() {
          var self = this;

          return _.indexOf(self.$scope.selected_resources, self);
        }
      }
    },
    $hooks: {
      'after-fetch-many': function(_response) {
        var self = this;

        self.clearSelections();
      },
      'after-collection-init': function() {
        this.initBatchCollectionSelection();
      }
    }
  });
}
