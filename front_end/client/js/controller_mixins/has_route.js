export default /* @ngInject */ function($state, controllerRouteRegistry) {
  return {
    included() {
      this.route = controllerRouteRegistry[this.constructor.name];
    },
    idForElement(...args){
      let name_segments = _.compact(_.flatten([
        this.route.name.split('.'), args
      ]));

      return name_segments.join('-');
    }
  }
}
