import _ from 'lodash';
const DEFAULT_WARNING_TEXT = 'It looks like there are unsaved changes. If you change pages, these changes will be lost. Do you want to continue?';
const DEFAULT_TITLE = 'Change pages?';
const DEFAULT_OK = 'Yes, Change pages';
const DEFAULT_CANCEL = 'No, Stay On Current Page';

export default /* @ngInject */ function(mixin, $mdDialog, $state) {
  return {
    included(options={}) {
      mixin.require(this, 'HasScope');
      _.requireDefinedProperties(options, 'confirmIf', 'onConfirm');
      let self = this;

      let stateChangeStartWatcher = this.$scope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams, error) {
        if(options.confirmIf.call(self)) {
          event.preventDefault();

          let warning_text = options.warning_text || DEFAULT_WARNING_TEXT,
              confirm = self.$mdDialog
              .confirm()
              .title(options.title || DEFAULT_TITLE)
              .content(warning_text)
              .ariaLabel('Confirm page change')
              .targetEvent(event)
              .ok(options.ok || DEFAULT_OK)
              .cancel(options.cancel || DEFAULT_CANCEL);

          self.$mdDialog.show(confirm).then(function() {
            options.onConfirm.call(self);
            stateChangeStartWatcher();
            self.$state.go(toState.name);
          });
        }
      });
    }
  };
}
