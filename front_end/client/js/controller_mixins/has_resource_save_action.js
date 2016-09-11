import _ from 'lodash';

export default /* @ngInject */ function HasResourceSaveAction(mixin) {
  return {
    included(options={}) {
      this.has_resource_save_action = options;
    },
    set has_resource_save_action(val) {
      this._has_resource_save_action = val;
    },
    get has_resource_save_action() {
      return this._has_resource_save_action;
    },
    saveResource(...callbacks) {
      let self = this,
          is_new = self.resource.isNew();

      return self.resource.$save().$then(function(result){
        if(self.afterSaveResource) {
          self.afterSaveResource.call(self, result);
        }

        _.each(callbacks, function(callback){
          callback.call(self, result);
        });

        if(is_new && self.afterCreateResource) {
          self.afterCreateResource.call(self, result);
        }
      });
    }
  };
}
