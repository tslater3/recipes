import _ from 'lodash';

export default /* @ngInject */ function BaseSharedComponent(mixin) {
  return {
    included(options={}) {
      _.requireDefinedProperties(this, 'parent');
      this.children = [];
      this._mixin_service = mixin;

      if(this.parent && _.isArray(this.parent.children)) {
        this.parent.children.push(this);
      }
    },
    mixin(mixin_name, mixin_options={}) {
      this._mixin_service(this, mixin_name, mixin_options);
    },
    idForElement(...args) {
      if(this.parent && _.isFunction(this.parent.idForElement)) {
        return this.parent.idForElement(...args);
      }
    }
  };
}
