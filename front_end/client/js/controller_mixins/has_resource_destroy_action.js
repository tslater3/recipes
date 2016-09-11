import _ from 'lodash';

export default /* @ngInject */ function HasResourceDestroyAction(mixin) {
  return {
    included(options={confirm: false}) {
      mixin.require(this, 'HasResource');
      this.has_resource_destroy_action = options;
    },
    set has_resource_destroy_action(val) {
      let self = this;
      self._has_resource_destroy_action = val;

      if(val.confirm) {
        mixin(self, 'HasResourceDestroyWithConfirmationAction', val.confirm);
      }
    },
    get has_resource_destroy_action() {
      return this._has_resource_destroy_action;
    },
    destroyResource(...callbacks) {
      let self = this;
      return self.resource.$destroy().$then(function(result){
        if(self.afterDestroyResource) {
          self.afterDestroyResource.call(self, result);
        }

        _.each(callbacks, function(callback){
          callback.call(self, result);
        });
      });
    }
  };
}
