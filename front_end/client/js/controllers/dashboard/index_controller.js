export default /* @ngInject */ class DashboardIndexController {
  constructor(dashboards, mixin) {
    mixin(this, 'AutoAssign', {args: arguments});
  }
}
