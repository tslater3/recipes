export default function($stateProvider) {
  "ngInject";
  console.log(hit);
  $stateProvider.state("dashboard", {
    abstract: false,
    url: "/dashboard",
    templateUrl: "/dashboard/index.html",
    controller: "DashboardIndexController as vm",
    parent: "base",
    resolve: {
      check() {
        console.log('hit');
      }
    }
  });
}
