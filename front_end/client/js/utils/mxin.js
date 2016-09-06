import _ from 'lodash';

function propertyDefaults(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  keys.forEach(function(key) {
    const targetDescriptor = Object.getOwnPropertyDescriptor(target, key);
    const sourceDescriptor = Object.getOwnPropertyDescriptor(source, key);
    if (!targetDescriptor) {
      Object.defineProperty(target, key, sourceDescriptor);
    }
  });
}

export default /* @ngInject */ function($injector) {
  function mixinService(target, mixinName, options) {
    $injector.invoke([mixinName, function(source) {
      _.set(target, ['_loadedMixins', mixinName], true);

      propertyDefaults(target, source);
      if (source.included) {
        //if it's a boolean, call with no args, so default options hash in mixin
        // gets used instead
        if(_.isBoolean(options) || (_.isObject(options) && _.isEmpty(options)) ) {
          source.included.call(target);
        } else {
          source.included.call(target, options);
        }
      }
    }]);
  }

  mixinService.require = function require(target, mixinName) {
    if (!_.get(target, ['_loadedMixins', mixinName])) {
      throw new Error(`Target is missing required mixin ${mixinName}`);
    }
    return true;
  };

  mixinService.requireOneOf = function require(target, ...args) {
    let meets_requirements = _.any(args, arg => _.get(target, ['_loadedMixins', arg]));

    if(!meets_requirements) {
      throw new Error(`Target is missing one of required mixins ${args.join(', ')}`);
    }

    return true;
  };


  return mixinService;
}
