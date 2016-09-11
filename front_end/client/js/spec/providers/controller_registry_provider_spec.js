import {module, inject} from 'angular-mocks';

describe('ControllerRouteRegistryProvider', function() {
  let routes;

  beforeEach(module('frontend'));
  beforeEach(inject(function(controllerRouteRegistry){
    routes = controllerRouteRegistry;
  }));

  describe('#registry', function() {
    it('maps controllers to routes', function() {
      expect(routes.SurveysResourceController.name).toBe('surveys.resource');
    })
  });
});
