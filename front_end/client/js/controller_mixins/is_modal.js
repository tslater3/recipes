export default function(mixin, $mdDialog, $state, $timeout) {
  "ngInject";
  return {
    included({templateUrl, onCancelled, onClosed, template, target, close}) {
      template ? _.requireDefinedProperties(this, '$scope', '$element') : _.requireDefinedProperties(this, '$scope');

      let config = { scope: this.$scope };

      if(target) {
        config['parent'] = angular.element(document.querySelector(target));
      }

      if(_.isUndefined(templateUrl)) {
        config['template'] = template;
      } else {
        config['templateUrl'] = templateUrl;
      }

      $mdDialog.show(config);

      this.cancel = (response, transition_to='^', state_params={}, state_options={}) => {
        if(this.transitionToWhenClosed) {
          [transition_to, state_params, state_options] = this.transitionToWhenClosed();
        }

        $mdDialog.cancel(response);
        $state.go(transition_to, state_params, state_options);
        if (onCancelled) {
          onCancelled.call(this, response);
        }
      };

      this.close = (response, transition_to='^', state_params={}, state_options={}) => {
        if(this.transitionToWhenClosed) {
          [transition_to, state_params, state_options] = this.transitionToWhenClosed();
        }

        $mdDialog.hide(response);
        $state.go(transition_to, state_params, state_options);
        if (onClosed) {
          onClosed.call(this, response);
        }
      };
    },
    $postLink() {
      $timeout(() => {
        this.modal = this.$element.find("md-dialog");
      }, 0);
    },
    $scrollToElement(ele) {
      $timeout(() => {
        let modal_content = this.modal.find("md-dialog-content");
        let position = ele.offset().top + ele.height();
        modal_content.scrollTop(position);
      }, 0);
    }
  };
}
