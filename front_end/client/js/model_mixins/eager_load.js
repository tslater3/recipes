export default /* @ngInject */ function(restmod) {

  return restmod.mixin({
    $extend: {
      Scope: {
        assignEagerLoadedRelation: function(relation_name, related_records) {
          var self = this,
              relation_map = {};

          // build map keyed by related records pk so we can quickly reference
          _.each(related_records, function(related_record){
            relation_map[related_record.$pk] = related_record;
          });

          // iterate through main collection and override existing skeleton relation
          // with the actual loaded relation record
          _.each(self, function(record){
            if(!_.isNull(record[relation_name])) {
              record[relation_name] = relation_map[record[relation_name].$pk];
            }
          });
        },
        eagerLoadRelations: function( /*relation_names*/ ) {
          var self = this,
              relation_names = Array.slice(arguments),
              ids, type;

          if(!self.length > 0) { return []; }

          _.each(relation_names, function(relation_name){
            ids = _.compact(_.uniq(_.pluck(self, function(record) {
              return _.isNull(record[relation_name]) ? null : record[relation_name].$pk;
            })));

            type = _.detect(self, function(record){
              return !_.isNull(record[relation_name]);
            })[relation_name].$type;

            self.eagerLoadRelationByIds(ids, type).$then(function(results){
              self.assignEagerLoadedRelation(relation_name, results);
            });
          });
        },
        eagerLoadRelationByIds: function(ids, relation) {
          var self = this, relation_collection, relation_scope = relation.$collection();

          relation_collection = _.map(ids, function(id){
            return relation_scope.$new(id);
          });

          return relation_scope.$populate(relation_collection);
        }
      }
    }
  });

}
