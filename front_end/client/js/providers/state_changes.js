import _ from 'lodash';

export default function($rootScopeProvider) {
  "ngInject";

  class StateChanges {
    static $get($rootScope, $state) {
      "ngInject";

      if(!this.$rootScope) {
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$watchStateChanges();
      }

      return this;
    }

    static $watchStateChanges() {
      this.$rootScope.$on('$stateChangeSuccess', this.onStateChangeSuccess.bind(this));
    }

    static onStateChangeSuccess(ev, to, to_params, from, from_params) {
      this.previous = {
        state: from,
        name: from.name,
        params: from_params
      };

      this.current = {
        state: to,
        name: to.name,
        params: to_params
      };
    }

    static $goBack() {
      this.$state.go(this.previous.name, this.previous.params);
    }
  }

  StateChanges.current = {};
  StateChanges.previous = {};

  return StateChanges;
}
