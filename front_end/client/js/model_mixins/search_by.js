export default /* @ngInject */ function(restmod, RMPackerCache) {

  return restmod.mixin(function() {

    /**
     * @method $findManyUrl
     * @memberOf FindMany
     *
     * @description Provides the url for a findMany/populate operation.
     */
    this.define('Scope.$findManyUrl', function(_resource) {
      return this.$fetchManyUrl ? this.$fetchManyUrl(_resource) : this.$url(_resource);
    })
    .define('Scope.$searchBy', function(_params) {

      // Extract record pks for non resolved records and build a record map
      var record_map = {},
          request_url = [(this.$scope || this).$findManyUrl(this), 'search'].join('/'),
          request_data = _params || {},
          model = this.$type,
          request,
          self = this;

      request = {
        url: request_url,
        method: 'POST',
        data: request_data
      };

      var collection = model.$collection();

      // fire before many hook
      collection.$dispatch('before-find-many', [request]);

      return collection.$send(request, function(_response){
        RMPackerCache.prepare();

        var raw = model.unpack(this, _response.data), pk, records;
        collection.$decode(raw);

        RMPackerCache.clear();
      });
    })

  });
}
