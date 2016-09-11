import _ from 'lodash';

function defaultTitle() {
  return `Are you sure you want to delete ${this.has_resource.name}?`;
}

function defaultContent() {
  return `
    This will delete ${this.has_resource.name} and any associated records.
    Are you sure you want to delete ${this.has_resource.name} ${this.resource.id}?
  `;
}

const DefaultOptions = {
  title: defaultTitle,
  content: defaultContent
}

export default /* @ngInject */ function HasResourceDestroyWithConfirmationAction(mixin, $mdDialog) {
  return {
    included(_options={}) {
      mixin.require(this, 'HasResourceDestroyAction');
      this.has_resource_destroy_with_confirmation_action = _options;
    },
    set has_resource_destroy_with_confirmation_action(val) {
      this._has_resource_destroy_with_confirmation_action = _.defaultOptionsObject(this, DefaultOptions, val);
    },
    get has_resource_destroy_with_confirmation_action() {
      return this._has_resource_destroy_with_confirmation_action;
    },
    maybeDestroyResource() {
      let self = this,
          dialog = $mdDialog.confirm()
                            .title(self.has_resource_destroy_with_confirmation_action.title)
                            .htmlContent(self.has_resource_destroy_with_confirmation_action.content)
                            .ariaLabel(self.has_resource_destroy_with_confirmation_action.title)
                            .ok('Confirm')
                            .cancel('Cancel');

      $mdDialog.show(dialog).then(function(){
        self.destroyResource();
      });
    }
  };
}
