import _ from  'lodash';

export default /* @ngInject */ function() {
  const FilterTypeMapping = {
    canMap(field, filter) {
      return this.hasOwnProperty(field.property_type) && this[field.property_type].hasOwnProperty(filter.comparison);
    },
    fetch(field, filter) {
      return this[field.property_type][filter.comparison](filter);
    },
    text: {
      contains(condition) {
        let result = {};
        result[condition.property_name] = condition.value;
        result['_text'] = true;
        return result;
      },
      equals(condition) {
        let result = {};
        result[condition.property_name] = condition.value;
        return result;
      },
      not_contain(condition) {
        let result = {};
        result[condition.property_name] = condition.value;
        result['_text'] = true;
        result['_not'] = true;
        return result;
      },
      not_equal(condition) {
        let result = {};
        result[condition.property_name] = condition.value;
        result['_not'] = true;
        return result;
      }
    },
    numeric: {
      greater_than_or_equal(condition) {
        let result = {};
        result[condition.property_name] = { gt: condition.value };
        return result;
      },
      less_than_or_equal(condition) {
        let result = {};
        result[condition.property_name] = { lt: condition.value };
        return result;
      },
      equals(condition) {
        let result = {};
        result[condition.property_name] = condition.value;
        return result;
      }
    }
  }

  class CollectionFilterConditions extends Array {
    constructor(fieldset, ...args) {
      super(...args);
      this.fieldset = fieldset;
      this.conjunctions = [
        {
          label: 'And',
          _join: 'AND'
        },
        {
          label: 'Or',
          _join: 'OR'
        }
      ];

      this.conjunction = this.conjunctions[0]._join;
    }

    add(property_name, comparison, value) {
      this.push({property_name: property_name, comparison: comparison, value: value});
    }

    addBlank() {
      this.add('', '', '');
    }

    params() {
      var self = this;

      return _.reduce(self, function(result, filter){
        let field = self.fieldset[filter.property_name];

        if(field && FilterTypeMapping.canMap(field, filter)) {
          result.terms.push(FilterTypeMapping.fetch(field, filter));
        }

        return result;
      }, { terms: [], _join: self.conjunction });
    }
  }

  return CollectionFilterConditions;
}
