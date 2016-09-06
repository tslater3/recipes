import _ from 'lodash';

export default /* @ngInject */ function($stateProvider, $urlRouterProvider) {
  // $stateProvider.state("groups", {
  //   abstract: false,
  //   url: "/groups",
  //   parent: "base",
  //   template: `
  //     <groups-index records="::$resolve.groups" layout="column" flex></groups-index>
  //   `,
  //   resolve: {
  //     groups_search_params($stateParams) {
  //       return _.extend({ page: 1, per_page: 12 }, $stateParams);
  //     },
  //     groups(Group, groups_search_params) {
  //       return Group.$search(groups_search_params).$asPromise();
  //     }
  //   }
  // });
}
