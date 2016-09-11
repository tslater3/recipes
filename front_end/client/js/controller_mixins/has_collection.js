import _ from 'lodash';

class HasCollectionClass {
  constructor(_config) {
    _.assign(this, _config);
  }

  filterByIsDirty() {
    return _.filter(this.controller.collection, item => item.$isDirty());
  }

  filterByIsNew() {
    return _.filter(this.controller.collection, item => item.isNew());
  }

  filterByChanged() {
    return _.filter(this.controller.collection, item => item.$isDirty() || item.isNew());
  }

  isDirty() {
    return _.some(this.controller.collection, item => item.$isDirty() || item.isNew());
  }
}

export default /* @ngInject */ function HasCollection() {
  return {
    included(options) {
      let self = this;

      const _has_collection_defaults = {controller: this};
      const _config = _.merge(
        _has_collection_defaults,
        options
      );

      this.has_collection = new HasCollectionClass(_config);
    },
    set has_collection(val) {
      this._has_collection = val;
      this.collection_name = this.has_collection.name;
    },
    get has_collection() {
      return this._has_collection;
    },
    get collection() {
      return this[this.collection_name];
    }
  };
}
