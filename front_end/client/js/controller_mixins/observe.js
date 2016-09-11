import _ from 'lodash';
export default /* @ngInject */ function() {
  return {
    included() {
      if(_.isFunction(this.observe)) {
        this.observe();
      }
    },
    $onChange(_property_name, _fn, _watch_object = false) {
      var self = this;

      self.$scope.$watch(angular.bind(self, function() {
        var segs = _property_name.split(".");

        if(segs.length > 1) {
          return _.valueAtObjectKeypath(self, _property_name);
        } else {
          return self[_property_name];
        }
      }), function(newValue, oldValue){
        if(newValue && newValue !== oldValue) {
          return _fn(newValue, oldValue);
        }
      }, _watch_object);
    },
    //watch property until observed property === true, then deregister
    //calling watcher() deregisters
    $watchUntil(_property_name, _fn, _watch_object = false) {
      var self = this,
          watcher;

      watcher = self.$scope.$watch(angular.bind(self, function() {
        var segs = _property_name.split(".");

        if(segs.length > 1) {
          var _property = _.valueAtObjectKeypath(self, _property_name);
          return _.isFunction(_property) ? _property() : _property;
        } else {
          return _.isFunction(self[_property_name]) ? self[_property_name]() : self[_property_name];
        }
      }), function(newValue, oldValue){
        if(newValue && newValue === true) {
          var result = _fn(newValue, oldValue);
          watcher();
          return result;
        }
      }, _watch_object);
    },
// according to SO, this is the correct way to bind watcher when using controllerAs,
    // however, it triggers during digest cycle over and over, im wondering if its
    // just that the digest cycle is showing itself and its same performance,
    // or if its actually a performance issue
    // UPDATE: I think its the latter, I think just having a console log
    // in the below statement is simply exposing the digest cycle more clearly
    // but I could be wrong
    $watch(_property_name, _fn, _watch_object = false) {
      var self = this;

      let watcher = self.$scope.$watch(angular.bind(self, function() {
        var segs = _property_name.split(".");

        if(segs.length > 1) {
          var _property =  _.valueAtObjectKeypath(self, _property_name);
          return _.isFunction(_property) ? _property() : _property;
        } else {
          return _.isFunction(self[_property_name]) ? self[_property_name]() : self[_property_name];
        }
      }), _fn, _watch_object);

      return watcher;
    }
  };
}
