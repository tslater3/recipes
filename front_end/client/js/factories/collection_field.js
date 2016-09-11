import _ from  'lodash';

export default /* @ngInject */ function(Field) {
  class CollectionFieldChoices extends Array {
    constructor(...args) {
      return _.flatten(super(...args));
    }
  }

  class CollectionField extends Field {
    [Symbol.iterator]() {
      const self = this;
      let index = 0;
      return {
        next() {
          if (index < self.collection.length) {
            return { value: self.collection[index++] };
          } else {
            return { done: true };
          }
        }
      };
    }

    constructor(name, _collection = [], _options = {}) {
      super(name, _options);
      var self = this;

      self._options = _options;
      self._raw_collection = _collection;
      self.collection = _collection;

      return self;
    }

    set collection(_raw_collection) {
      var self = this;

      if(_.isArray(_raw_collection)) {
        self._collection = new CollectionFieldChoices(..._.map(_raw_collection, function(item) {
          return {
            label: self.formatLabel(self.extractLabelKey(item)),
            value: self.formatValue(self.extractValueKey(item))
          }
        }));
      } else if(_.isObject(_raw_collection)) {
        self._collection = new CollectionFieldChoices(..._.map(_raw_collection, function(value, key){
          return {
            label: self.formatLabel(key),
            value: self.formatValue(value)
          }
        }));
      }
    }

    get collection() {
      return this._collection;
    }

    get format_label_with() {
      return this._options.format_label || false;
    }

    get format_value_with() {
      return this._options.format_value || false;
    }

    get extract_label_key() {
      return this._options.label_key || false;
    }

    get extract_value_key() {
      return this._options.value_key || false;
    }

    extractLabelKey(item) {
      return this.extract_label_key ? item[this.extract_label_key] : item;
    }

    extractValueKey(item) {
      return this.extract_value_key ? item[this.extract_value_key] : item;
    }

    formatLabel(item) {
      var self = this;

      if(self.format_label_with && _.isFunction(self.format_label_with)) {
        return self.format_label_with(item);
      } else if(self.format_label_with && _.isArray(self.format_label_with)) {
        return _.reduce(self.format_label_with, function(result, f) {
          return f(result);
        }, item);
      } else {
        return item;
      }
    }

    formatValue(item) {
      var self = this;

      if(self.format_value_with && _.isFunction(self.format_value_with)) {
        return self.format_value_with(item);
      } else if(self.format_value_with && _.isArray(self.format_value_with)) {
        return _.reduce(self.format_value_with, function(result, f) {
          return f(result);
        }, item);
      } else {
        return item;
      }
    }

    selected(input) {
      var self = this;

      return _.find(self.collection, function(item) {
        return item.value == input;
      });
    }
  }

  return CollectionField;
}
