const Controller = class dashboardIndexToolbar {};

const TEMPLATE = `
<div ng-cloak>
  <md-fab-toolbar md-open="true" md-direction="left">
    <md-fab-trigger class="align-with-text">
      <md-button aria-label="menu" class="md-fab md-primary">
        <md-icon md-svg-src="/menu.svg"></md-icon>
      </md-button>
    </md-fab-trigger>

    <md-toolbar>
      <div layout="row">
        <h3 flex="40" flex-offset="5">Family Recipes</h3>
        <span flex></span>
        <md-fab-actions flex="40" class="md-toolbar-tools">
          <div layout="row" layout-padding>
            <div layout="column" layout-align="center center">
              <md-button aria-label="test" class="md-icon-button">
                <md-icon md-svg-src="/apple.svg"></md-icon>
              </md-button>
              <span>whatever</span>
            </div>

            <div layout="column" layout-align="center center">
              <md-button aria-label="test" class="md-icon-button">
                <md-icon md-svg-src="/apple.svg"></md-icon>
              </md-button>
              <span>whatever</span>
            </div>

            <div layout="column" layout-align="center center">
              <md-button aria-label="test" class="md-icon-button">
                <md-icon md-svg-src="/apple.svg"></md-icon>
              </md-button>
              <span>whatever</span>
            </div>
          </div>
        </md-fab-actions>
      </div>
    </md-toolbar>
  </md-fab-toolbar>
</div>
`;

export default {
  controller: Controller,
  template: TEMPLATE
};
