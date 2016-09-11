import _ from 'lodash';

export default /* @ngInject */ function(mixin, ToastTemplates, $mdToast) {
  return {
    included(_options={}) {
      mixin.require(this, 'HasScope');

      let self = this;

      self.notifications = {
        $mdToast: $mdToast,
        controller: self,
        toasts: {}
      };

      let target_controller_assignment = _.isDefined(self.vm) ? 'vm' : '$ctrl';

      _.each(_options, function(_notification, action_name){
        let hide_method_name = _.camelize(`hide_${action_name}`),
            show_method_name = _.camelize(`show_${action_name}`),
            close_method = `${target_controller_assignment}.notifications.${hide_method_name}()`,
            notification;

        notification = _.merge({close: close_method, type: 'Notice'}, _notification);

        self.notifications.toasts[`${action_name}`] = $mdToast.simple({
          preserveScope: true,
          position: _notification.position || 'bottom right',
          hideDelay: _notification.hideDelay || false,
          scope: self.$scope,
          template: ToastTemplates[notification.type](notification.text, notification)
        });

        self.notifications[show_method_name] = function() {
          $mdToast.show(self.notifications.toasts[`${action_name}`]);
        };

        self.notifications[hide_method_name] = function() {
          $mdToast.hide(self.notifications.toasts[`${action_name}`]);
        };
      });
    }
  };
}
