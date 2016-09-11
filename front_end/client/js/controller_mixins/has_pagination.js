export default /* @ngInject */ function(mixin) {
  return {
    included(options={}) {
      mixin.require(this, 'HasCollection');

      const _has_pagination_defaults = { per_page: 25 };
      const _config = _.merge(
        _has_pagination_defaults,
        options
      );

      const _collection_name = this.has_collection.name;
      this.collection.setPerPage(_config['per_page']);
    },
    selectPage(page_number) {
      this.collection.selectPage(page_number);
    }
  };
}
