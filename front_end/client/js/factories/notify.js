import { decorate } from 'core-decorators';
import _, { debounce } from 'lodash';

const RESOURCES_SAVE_SUCCESS_MESSAGES = {
  1: function(resources){
    return `${_.formatResourceModelName(resources[0])} ${_.tryName(resources[0])} was saved successfully.`;
  },
  2: function(resources) {
    return `
      ${_.formatResourceModelName(resources[0])} ${_.tryName(resources[0])},
      ${_.tryName(resources[1])} were saved successfully.
    `;
  },
  more_than_two: function(resources){
    return `
      ${_.tryName(resources[0])}, ${_.tryName(resources[1])} and ${resources.length} other
      ${_.formatResourceModelName(resources[0])}s were saved successfully.
    `
  }
};

const RESOURCES_SAVE_SUCCESS_TEMPLATE = function(...resources) {
  let method = RESOURCES_SAVE_SUCCESS_MESSAGES[resources.length] || RESOURCES_SAVE_SUCCESS_MESSAGES['more_than_two'];
  return method(resources);
}

export default function($rootScope, ToastTemplates) {
  "ngInject";

  class Notify {
    constructor() {
      "ngInject";
      this.resource_save_success_queue = [];
    }

    copiedToClipboard(subject) {
      let message = `${subject} copied to clipboard!`;
      let template = ToastTemplates['Notice'](message, {close: `vm.close('copied_to_clipboard')`});
      let config = {template: template, event_name: 'copied_to_clipboard', type: 'Notice'};
      $rootScope.$broadcast('show.notification', config);
    }

    resourceSaveSuccess(resource) {
      this.resource_save_success_queue.push(resource);
      this.fireResourceSaveSuccess();
    }

    @decorate(debounce, 500)
    fireResourceSaveSuccess() {
      let message = RESOURCES_SAVE_SUCCESS_TEMPLATE(...this.resource_save_success_queue);
      let template = ToastTemplates['Success'](message, {close: `vm.close('resource_save_success')` });
      let config = {template: template, event_name: 'resource_save_success', type: 'Success'};
      $rootScope.$broadcast('show.notification', config);
      this.resource_save_success_queue = [];
    }
  }

  return new Notify();
}
