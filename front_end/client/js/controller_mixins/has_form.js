import _ from 'lodash';

export default /* @ngInject */ function HasForm(mixin, $log) {
  return {
    included(options={}) {
      _.requireDefinedProperties(options, 'name');
      _.requireDefinedProperties(this, '$scope');

      let self = this;

      self.has_form = options;

      // wait for form variable to be assigned to the scope then stop watching
      let watcher = self.$scope.$watch(self.has_form.name, function(new_value, old_value){
        if(!self.form) {
          $log.error('HasForm couldnt find form, check the form name');
        }

        self.form.resource_controller = self;
        watcher();
      });
    },
    get form() {
      return this.$scope[this.has_form.name];
    }
  };
}
