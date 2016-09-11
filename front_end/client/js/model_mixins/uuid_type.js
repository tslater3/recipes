export default /* @ngInject */ function(restmod, inflector) {
  return restmod.mixin({
    $extend : {
      Record: {
        uuid: function() {
          var self = this;

          return self.$pk.uuid();
        },
        uuidType: function() {
          this.uuid().type();
        }
      }
    }
  }, function() {

    this
    // this will cache record by its type within cache, as apparently cache
    // variable as assigned above will be shared between models
    .define('Model.$cache', function(){

    })
    // .define('Model.$new', function(_key, _scope) {
    //   var self = this,
    //       result = this.$super(_key, _scope),
    //       type = result.uuid().type,
    //       uuid_type_key = _.underscored(result.uuid().type),
    //       model_type_key = _.underscored(self.identity());
    //
    //       window.mymodel = this;
    //
    //       window.myresult = result;
    //       console.log('hello');
    //       console.log(_key, _scope);
    //
    //   if(uuid_type_key !== model_type_key) {
    //
    //     console.log(uuid_type_key, model_type_key);
    //
    //     if(!result.hasOwnProperty(uuid_type_key)) {
    //       console.log('does not have own prop', result);
    //       console.log('prop', uuid_type_key);
    //       // return result.type();
    //       return result;
    //     } else {
    //       console.log('had uuid type key', result[uuid_type_key]);
    //       console.log(result[uuid_type_key].$scope);
    //
    //       window.mysubthing = result[uuid_type_key].$scope.$target.$buildRaw(result);
    //
    //       return result.type();
    //
    //       return result[uuid_type_key].$scope.$target.$buildRaw(result);
    //       // return result[uuid_type_key].$scope.$target.$new(result);
    //     }
    //   }
    //
    //   return result;
    //
    // })

    // override record.$decode to update cache on decoding.
    // .define('Model.$decode', function(_raw, _mask) {
    //   console.log('record being decoded');
    //   var self = this,
    //   result = this.$super(_raw, _mask);
    //
    //   console.log("decoding");
    //
    //   // console.log('DECODE BEING CALLED');
    //
    //   return result;
    //
    //   return this.$super(_raw, _mask);
    // })
    // .define('Scope.$add', function(_obj, _idx){
    //   console.log('collection add being called', _obj);
    //   // _obj = _obj.modelType();
    //   console.log(_obj.modelType());
    //
    //   return this.$action(function() {
    //     if(_obj.$position === undefined) {
    //       if(_idx !== undefined) {
    //         this.splice(_idx, 0, _obj.modelType());
    //       } else {
    //         this.push(_obj.modelType());
    //       }
    //       _obj.$position = true; // use true for now, keeping position updated can be expensive
    //       this.$dispatch('after-add', [_obj.modelType()]);
    //     }
    //   });
    //
    // })

    ;
  });
}
