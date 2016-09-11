export default /* @ngInject */ function(restmod) {
  return restmod.mixin(function() {
    // this.define('Model.$new', function(_key, _scope) {
    //   console.log('initializing');
    //   var self = this.$super(_key, _scope);
    //   tracePropAccess(self);
    //
    //   var proxy = new Proxy(self,
    //     {
    //       set(target, propertyKey, value, receiver) {
    //       console.log(propertyKey+'='+value);
    //       target[propertyKey] = value;
    //     }
    //   });
    //
    //   console.log(proxy);
    // })
    this
    .on('after-init', function(){
      console.log('after initi', this);

      var self = this;

      var attributes = _.keys(self.attributes());

      self.$changes = _.tracePropAccess(self, ...attributes);

      return self;

      // this.call(watcher);

      // return watcher;
      //
      // console.log(watcher);

    })
    .define('Record.$initialize', function(...args) {


    })
    // .on('after-init', function(rec){
    //   console.log(rec);
    //   console.log('afterinitrecord');
    // })
    .define('Model.$decode', function(_raw, _mask) {
      var self = this,
          wrapped = new Proxy(self.$super(_raw, _mask), {
            set(target, propertyKey, value, receiver) {
              console.log(propertyKey+'='+value);
              target[propertyKey] = value;
            }
          });

      console.log('decoding');
      window.wrapped = wrapped;
      return wrapped;
    })


  });

}
