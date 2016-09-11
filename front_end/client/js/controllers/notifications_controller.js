const RESOURCE_SAVE_SUCCESS_TEXT = function(resource) {
  return `${_.tryName(resource)} save successfully`;
}

export default class NotificationsController {
  constructor(mixin, $scope, $rootScope, $mdToast) {
    "ngInject";
    mixin(this, 'AutoAssign', {args: arguments});
    mixin(this, 'HasScope', $scope);

    this.notification_types = {};

    this.$scope.$on('show.notification', (_event, config) => { this.show(config) });
    this.$scope.$on('close.notification', (_event, config) => { this.close(config.event_name) });
  }

  close(event_name) {
    this.$mdToast.hide(this.notification_types[event_name]);
  }

  closeAll(event_name) {
    _.each(this.notification_types, (value, event_name) => { this.close(event_name); });
  }

  show(config) {
    this.notification_types[config.event_name] = this.$mdToast.simple({
     preserveScope: true,
     position: config.position || 'bottom right',
     hideDelay: config.hideDelay || false,
     scope: this.$scope,
     template: config.template || config.message
   });

   this.$mdToast.show(this.notification_types[config.event_name]);
  }
}
