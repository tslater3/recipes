import _ from 'lodash';

export default function BaseComponent(mixin) {
  "ngInject";
  
  return {
    included(options={}) {
      this._mixin_service = mixin;
      this.mix('HasAncestry');
    },
    mixin(mixin_name, mixin_options={}) {
      this._mixin_service(this, mixin_name, mixin_options);
    },
    mix(mixin_name, mixin_options={}) {
      this._mixin_service(this, mixin_name, mixin_options);
      return this;
    },
    idForElement(...args) {
      return _.flatten([_.trim(_.dasherize(this.constructor.name), '-'), args]).join('-');
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
    }
  };
}
