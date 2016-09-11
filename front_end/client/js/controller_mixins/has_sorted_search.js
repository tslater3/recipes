import _ from 'lodash';

class HasSortedSearchFields {
  constructor(_config = {}) {
    _.assign(this, _config);
  }

  addField(name) {
    this.fields.push(field);
  }

  clearSortFields() {
    let self = this;

    _.each(this.paramsSortScopeNames(), function(scope_name){
      delete self.controller.collection.$params[scope_name];
    });

    _.each(this.paramsSearchScopeNames(), function(scope_name){
      delete self.controller.collection.search_params[scope_name];
    });

    return self;
  }

  paramsSortScopeNames() {
    return _.keysStartingWith(this.controller.collection.$params, 'sort_by');
  }

  paramsSearchScopeNames() {
    return _.keysStartingWith(this.controller.collection.search_params, 'sort_by');
  }

  isSortingBy(field_name, direction) {
    return (this.controller.sorting_by.field_name == field_name && this.controller.sorting_by.direction == direction);
  }

  sortByParams() {
    return {[this.sortByScopeName()]: true};
  }

  sortByScopeName() {
    return `sort_by_${this.controller.sorting_by.field_name}_${this.controller.sorting_by.direction}`;
  }

  sortByField(field_name, direction) {
    this.clearSortFields().setSortField(field_name).setSortDirection(direction);
    this.controller.executeSearch(this.sortByParams());
  }

  setSortField(field_name) {
    this.controller.sorting_by.field_name = field_name;
    return this;
  }

  setSortDirection(direction) {
    this.controller.sorting_by.direction = direction;
    return this;
  }

  clearSortField() {
    if(this.controller.collection.$params.hasOwnProperty(this.sortByScopeName())) {
      delete this.controller.collection.$params[this.sortByScopeName()];
    }

    if(this.controller.collection.search_params.hasOwnProperty(this.sortByScopeName())) {
      delete this.controller.collection.search_params[this.sortByScopeName()];
    }

    return this;
  }

  get fields() {
    return this._fields;
  }

  set fields(val) {
    this._fields = val;
  }
}

const DefaultOptions = {
  fields: [],
  sort_field_name: 'sorting_by_field_name'
}

export default /* @ngInject */ function(mixin) {
  return {
    included(_options={}) {
      let self = this,
          options = _.defaultOptionsObject(this, DefaultOptions, _options);

      options['controller'] = this;

      mixin.require(self, 'HasSearch');
      mixin.require(self, 'Observe');

      self.sorting_by = { field_name: null, direction: null };

      self.has_sorted_search = new HasSortedSearchFields(options);

      self.$onChange(options.sort_field_name, function(new_value, old_value){
        let dir = _.startsWith(new_value, '-') ? 'desc' : 'asc';
        let field = _.startsWith(new_value, '-') ? new_value.slice(1, new_value.length) : new_value;

        self.sorting_by.field_name = field;
        self.sorting_by.direction = dir;

        if(self.sorting_by.field_name && self.sorting_by.direction) {
          self.has_sorted_search.sortByField(field, self.sorting_by.direction);
        }
      });
    },
    set has_sorted_search(val) {
      this._has_sorted_search = val;
    },
    get has_sorted_search() {
      return this._has_sorted_search;
    }
  };
}
