export default /* @ngInject */ function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('base', {
    abstract: false,
    url: "",
    // resolve: {
    //   //get current user wired up eventually
    // },
  });
}
