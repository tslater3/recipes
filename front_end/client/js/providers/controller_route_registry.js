// import _ from 'lodash';
//
// export default /* @ngInject */ function($stateProvider) {
//   class ControllerRouteRegistry {
//     constructor(registry) {
//       let self = this;
//
//       _.map(registry, function(v,k){ self[k] = v; });
//     }
//   };
//
//   ControllerRouteRegistry.registry = {};
//
//   ControllerRouteRegistry.register = function(controller_name, state_config) {
//     this.registry[controller_name] = state_config;
//   };
//
//   ControllerRouteRegistry.$get = function() {
//     return new ControllerRouteRegistry(this.registry);
//   };
//
//   $stateProvider.decorator('views', function(state, parent) {
//     let result = {},
//         views = parent(state);
//
//     angular.forEach(views, function (config, name) {
//       if(_.isString(config.controller)) {
//         let controller_name = config.controller.split(" as").shift();
//         ControllerRouteRegistry.register(controller_name, state);
//       }
//
//       result[name] = config;
//     });
//
//     return result;
//   });
//
//   return ControllerRouteRegistry;
// }
