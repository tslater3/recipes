import _ from 'lodash';

export default /* @ngInject */ function($state, mixin) {
  return {
    included({tabs, baseState, config}) {
      mixin.require(this, 'HasScope');

      this._tabBaseState = baseState || "";
      this.tabs = tabs;
    },
    get selectedIndex() {
      return _.findIndex(this.tabs, (tab) => {
        return this.$state.includes("**" + tab.route + ".**");
      });
    },
    set selectedIndex(index) {
      // Swallow
    },
    isTabSelected(tab) {
      return tab === this.tabs[this.selectedIndex];
    },
    tabSelected(tab) {
      if (this.isTabSelected(tab)) { return; }
      let params = tab.default_params || {};
      $state.go(tab.route, params, {relative: this._tabBaseState});
    }
  };
}
