import _ from 'lodash';

const REQUIRED_CONFIG_PROPERTIES = ['controller', 'templateUrl'];

export default /* @ngInject */ function(mixin, $mdDialog) {
  return {
    included(_options={}) {
      mixin.require(this, 'HasScope');

      const _defaults = {
        preserveScope: true,
        bindToController: true,
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        onShowing(scope, element, options, controller) {
          controller.cancel = () => $mdDialog.cancel();
          controller.close = () => $mdDialog.hide();
        }
      };

      this.modals = {};

      _.each(_options, (_modal_options, modal_name) => {
        _.requireDefinedProperties(_modal_options, ...REQUIRED_CONFIG_PROPERTIES);

        const _config = _.cloneMerge(_defaults, _modal_options);

        this.modals[modal_name] = {
          show: () => $mdDialog.show(_config)
        };
      });
    }
  };
}
