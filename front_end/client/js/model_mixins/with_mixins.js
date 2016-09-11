import _ from 'lodash';

export default /* @ngInject */ function(restmod) {
  return restmod.mixin({
    $extend: {
      Model: {
        $withMixins: function(...mixins) {
          let model = restmod.model(this.$type.$modelPath()).mix(...this.$$chain).mix(...mixins);

          if(this._definition) {
            model.$extendWithDefinition(this._definition);
          }

          return model;
        }
      }
    }
  });
}
