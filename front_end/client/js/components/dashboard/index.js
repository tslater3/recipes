const Controller = class dashboardIndex {}

const TEMPLATE = `
<div layout="row" layout-align="end center">
  <dashboard-index-toolbar flex="100"></dashboard-index-toolbar>
</div>
<dashboard-index-header flex="100"></dashboard-index-header>
`;

export default {
  controller: Controller,
  template: TEMPLATE,
  // bindings: {
  //   record: '<',
  //   parent: '<'
  // }
};
