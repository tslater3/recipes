import _ from 'lodash';

const findParentControllerFor = function(context) {
  if(context.$scope.$parent) {
    return context.$scope.$parent.vm;
  }
}

export default /* @ngInject */ function Base(mixin) {
  return {
    included(options={}) {
      _.requireDefinedProperties(options, '$scope');
      mixin(this, 'HasScope', options.$scope);

      let parent_controller = findParentControllerFor(this);

      if(!parent_controller) {
        return;
      }

      this.children = [];

      if(_.isArray(this.$scope.$parent.vm.children)) {
        this.parent = parent_controller;
        this.parent.children.push(this);
      }
    },
    childCollections() {
      return _.filter(this.children, child => child.has_collection);
    },
    dirtyChildCollections() {
      return _.filter(this.childCollections(), child => child.has_collection.isDirty());
    },
    hasDirtyChildCollections() {
      return _.any(this.dirtyChildCollections());
    },
    saveDirtyChildCollections() {
      _.map(this.dirtyChildCollections(), child => child.has_collection_actions.saveAll());
    },
    $on(...args) {
      return this.$scope.$on(...args);
    }
  };
}
