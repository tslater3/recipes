import _ from 'lodash';

const HasResourceActionMappings = {
  save: 'HasResourceSaveAction',
  destroy: 'HasResourceDestroyAction'
};

export default /* @ngInject */ function HasResource(mixin) {
  return {
    included(options={actions: {save: true}}) {
      _.requireDefinedProperties(options, 'name');
      this.has_resource = options;
    },
    set has_resource(val) {
      let self = this;
      self._has_resource = val;

      self.resource_name = self.has_resource.name;

      if(val.actions) {
        _.each(val.actions, function(v,action){
          mixin(self, HasResourceActionMappings[action], v);
        });
      }
    },
    get has_resource() {
      return this._has_resource;
    },
    get resource() {
      return this[this.resource_name];
    }
  };
}
