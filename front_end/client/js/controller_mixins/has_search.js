import _ from 'lodash';

export default /* @ngInject */ function(mixin) {
  return {
    //we can pull off required config vars instead of waiting for them to be assigned here.
    included(options) {
      mixin.require(this, 'HasCollection');

      const _has_search_defaults = {
        is_disabled: false,
        config: {
          min_chars: 3,
          debounce_duration: 300
        },
        placeholder: '',
        fields: [],
        text: ''
      };
      const _config = _.merge(_has_search_defaults, options);
      const self = this;

      this.search_field = {
        fields: _config.fields,
        field: _config.fields[0],
        text: ''
      };

      if(this.$stateParams) {
        let default_search_field = _.find(self.search_field.fields, function(field){ return self.$stateParams.hasOwnProperty(field) && self.$stateParams[field] });
        if(default_search_field) {
          self.search_field.field = default_search_field;
          self.search_field.text = self.$stateParams[default_search_field];
        }
      }

      this.has_search = _config;
    },
    clearSearchControlVisible() {
      return (this.search_field.text.length > 0 && !this.collection.$is_loading) || this.hasSearchFilters();
    },
    clearSearchFilters() {
      var self = this;

      self.has_search.fields.forEach(function(filter_name){
        if(self.collection.search_params.hasOwnProperty(filter_name)) {
          self.removeSearchFilter(filter_name);
        }
      });

      return self;
    },
    clearSearch() {
      return this.clearSearchFieldText().clearSearchFilters().executeSearch();
    },
    clearSearchFieldText() {
      this.search_field.text = '';
      return this;
    },
    executeSearch(_search_params={}) {
      var self = this,
          _params = _.merge({}, _search_params);

      if(self.search_field.text.length > 2) {
        _params[self.search_field.field] = self.search_field.text;
      }

      if(self.collection.hasOwnProperty('pagination')) {
        self.collection.setPage(1).setPerPage(self.collection.pagination.per_page);
      }

      _.extend(self.collection.$params, _params);
      _.extend(self.collection.search_params, _params);

      self.collection.$refresh({});
    },
    hasSearchFilters() {
      return this.collection.hasSearchFilters();
    },
    setSearchField(field_name) {
      this.search_field.field = field_name;
      this.clearSearch();
      return this;
    },
    removeSearchFilter(filter_name) {
      delete this.collection.search_params[filter_name];

      if(this.collection.$params && this.collection.$params.hasOwnProperty(filter_name)) {
        delete this.collection.$params[filter_name];
      }

      return this;
    },
    set has_search(val) {
      this._has_search = val;
    },
    get has_search() {
      return this._has_search;
    }
  };
}
