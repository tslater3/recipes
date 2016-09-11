export default /* @ngInject */ function(restmod, inflector) {
  return restmod.mixin({
    $extend: {
      Model: {
        $modelPath: function() {
          return `/${_.last(this.$url().split(this.$type.getProperty('urlPrefix')))}`;
        }
      },
      Scope: {
        $collectionPath: function(..._segments) {
          let segments = [this.$type.getProperty('urlPrefix'), this.$type.$modelPath()];

          return _([segments, _segments]).normalizePathSegments().segmentsToPath().value();
        },
        urlFor(action, params={}) {
          console.warn('todo: deprecate me in favor of $urlForAction since restmod has a $urlFor method already');
          let self = this,
              _url = [self.$url(), action].join('/');

          if(!_.isEmpty(params)) {
            _url = _url + `?${jQuery.param(params)}`;
          }

          return _url;
        },
        $urlForAction(action, params={}){
          let self = this,
              _url = [self.$url(), action].join('/');

          if(!_.isEmpty(params)) {
            _url = _url + `?${jQuery.param(params)}`;
          }

          return _url;
        }
      },
      Record: {
        //todo: deliver me from the jank below
        //part of this is using type declaration via uuid type
        //part of it via a type attribute
        //should probably pick one, likely returning the actual type field
        //as we wont always have uuids when building records on frontend
        //also the uuid type method wasnt working for STI, because
        //in the event of sti we are going to be using the same endpoint
        //event though the uuids are different per subclass type
        $buildBelongsToPath: function(relation_key) {
          var self = this,
          relation_id = self[relation_key],
          relation_name = inflector.parameterize(inflector.pluralize(relation_key.split("_").shift()), '_');

          return [relation_name, relation_id, self.$buildPathForType()].join('/');
        },
        $buildBelongsToUrl: function(relation_key) {
          return this.$buildUrlWithPrefix(this.$buildBelongsToPath(relation_key));
        },
        $buildPathForType: function() {
          var self = this, collection_name;

          collection_name = inflector.parameterize(inflector.pluralize(self.uuid().type), '_');

          return [collection_name, self.$pk].join('/');
        },
        $buildUrlForType: function() {
          return this.$buildUrlWithPrefix(this.$buildPathForType());
        },
        $buildUrlWithPrefix: function(url) {
          return [this.$type.getProperty('urlPrefix'), url].join('/')
        },
        $memberUrl: function(action_name) {
          return this.$urlForAction(action_name);
        },
        $urlForAction: function(action_name) {
          var self = this;

          return [this.$scope.$url(), self.$pk, action_name].join('/');
        }
      }
    }
  });
}
