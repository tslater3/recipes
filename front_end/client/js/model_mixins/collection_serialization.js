import _ from 'lodash';

export default /* @ngInject */ function(restmod, papa) {
  return restmod.mixin({
    $extend: {
      Collection: {
        $toCsv(options={}) {
          return papa.unparse(this.$toJson(options));
        },
        $toObjects(options={}) {
          return _.map(this, function(record){ return record.attributes(options); });
        },
        $toJson(options={}){
          return this.$toObjects(options);
        }
      }
    }
  })
}
