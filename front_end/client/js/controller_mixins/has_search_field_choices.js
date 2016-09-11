import _ from 'lodash';

export default /* @ngInject */ function(mixin) {
  return {
    included(options={}) {
      mixin.require(this, 'HasSearch');
      let self = this, _choice;

      self.has_search_field_choices = {};
      self.has_search_field_choices['fields'] = _.keys(options);
      self.has_search_field_choices['choices'] = [];

      _.each(options, function(items, k){
        _.each(items, function(item){
          if(_.isObject(item)) {
            _choice = _.extend({ field: k }, item);
          } else {
            _choice = {label: item, value: item, field: k};
          }

          self.has_search_field_choices.choices.push(_choice);
        });
      });
    },
    addSearchField(field) {
      this.search_field.field = field;
    },
    selectedSearchFieldHasChoices() {
      return _.contains(this.has_search_field_choices.fields, this.search_field.field);
    },
    searchChoicesForField(field_name) {
      return _.filter(this.has_search_field_choices.choices, function(option){ return option.field == field_name });
    },
    setSearchFieldTextThenExecute(val) {
      this.search_field.text = val;
      this.executeSearch();
    },
    set has_search_field_choices(val) {
      this._has_search_field_choices = val;
    },
    get has_search_field_choices() {
      return this._has_search_field_choices;
    }
  };
}
