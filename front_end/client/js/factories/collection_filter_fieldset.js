import _ from  'lodash';

export default /* @ngInject */ function() {
  const ComparisonsForPropertyTypeOptions = {
    text: [ 'contains', 'equals', 'not_contain', 'not_equal' ],
    numeric: [ 'greater_than_or_equal', 'equals', 'less_than_or_equal'],
    boolean: [ 'equals' ]
  }

  const FilterField = class FilterField {
    constructor(property_name, property_type) {
      this.property_name = property_name;
      this.property_type = property_type;
      this.comparisons = ComparisonsForPropertyTypeOptions[this.property_type];
    }
  }

  class CollectionFilterFieldset {
    constructor(...fields) {
      var self = this;

      _.each(fields, function(field){
        self[field.property_name] = field;
      });
    }

    addField(property_name, type) {
      this[property_name] = new FilterField(property_name, type);
      return this;
    }
  }

  return CollectionFilterFieldset;
}
