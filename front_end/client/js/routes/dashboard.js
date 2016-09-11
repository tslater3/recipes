export default function($stateProvider) {
  "ngInject";
  $stateProvider.state("dashboard", {
    abstract: false,
    url: "/dashboard",
    template: '<h3>testing</h3>',
    // templateUrl: "/dashboard/index.html",
    // controller: "DashboardIndexController as vm",
    // parent: "base",
  });
}
