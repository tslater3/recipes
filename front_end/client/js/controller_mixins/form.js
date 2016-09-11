export default /* @ngInject */ function(Field, CollectionField) {
  return {
    _fields: {},

    addField(name, _options = {}) {
      this.fields[name] = new Field(name, _options);

      return this;
    },

    addCollectionField(name, collection = [], options = {}) {
      this.fields[name] = new CollectionField(name, collection, options);

      return this;
    },

    get fields() {
      return this._fields;
    },

    set fields(_fields = {}) {
      this._fields = _fields;
    }
  };
}
