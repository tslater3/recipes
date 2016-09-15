export default function($stateProvider) {
  "ngInject";
  $stateProvider.state("dashboard", {
    abstract: false,
    // parent: "base",
    url: "/dashboard",
    template: '<dashboard-index layout="column" flex></dashboard-index>',
    // templateUrl: "/dashboard/index.html",
    // controller: "DashboardIndexController as vm",
    // parent: "base",
  });
}
