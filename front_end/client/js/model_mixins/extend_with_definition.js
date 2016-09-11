const EnumExtensions = {
  init(val) {
    return this.findByName(val);
  },
  findByAttributeValue(name, val) {
    return _.find(this.choices, function(choice){ return choice.attributes[name] === val });
  },
  findByName(_name) {
    return _.find(this.choices, function(choice){return choice.name === _name });
  },
  find(val) {
    return this.findByName(val);
  }
}

const KoreTypeExtensions = {
  enum(obj) {
    return _.extend(obj, EnumExtensions);
  },
  struct(obj) {
    _.each(obj.fields, function(field, k){
      extendField(field);
    });

    return obj;
  }
}

function extendModelWithFields(model, _fields) {
  if(model.hasOwnProperty('fields')) {
    return _.extend(model.fields, _fields);
  } else {
    return _.extend(model, {fields: _fields});
  }
}

function extendDefinitionFields(definition) {
  _.each(definition, function(field,k){
    extendField(field);
  });

  return definition;
}

function extendModelWithDefinition(model, definition, inline_field_definition={}) {
  extendDefinitionFields(definition);
  extendModelWithFields(model, definition);

  return model;
}

function extendField(definition){
  let extension = KoreTypeExtensions[definition.type];

  if(_.isFunction(extension)) {
    return extension(definition);
  } else {
    return definition;
  }
}

export default /* @ngInject */ function(restmod) {
  return restmod.mixin({
    $extend : {
      Model: {
        $extendWithDefinition(obj) {
          this._definition = obj;
          return extendModelWithDefinition(this, this._definition);
        }
      }
    }
  })
}
