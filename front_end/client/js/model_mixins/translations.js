/**
 * @mixin Translatable
 *
 * @description
 *
 *
 */

// 'use strict';

// export default /* @ngInject */ function(restmod) {
//   return restmod.mixin({
//     $extend : {
//       Model: {
//         cache: {},
//       }
//     }
//   }, function() {
//
//     this
//         // this will cache record by its type within cache, as apparently cache
//         // variable as assigned above will be shared between models
//         .define('Model.$cache', function(){
//           var self = this;
//
//           if(self.cache.hasOwnProperty(self.identity())) {
//             return self.cache[self.identity()];
//           } else {
//             return self.cache[self.identity()] = {};
//           }
//         })
//         .define('Model.$new', function(_key, _scope) {
//           var self = this;
//
//           if(_key) {
//             // search for instance with same key, if key is found then return instance
//             if(self.$cache().hasOwnProperty(_key)) {
//               return self.$cache()[_key];
//             } else {
//               return (self.$cache()[_key] = this.$super(_key, _scope));
//             }
//           } else {
//             return this.$super(_key, _scope);
//           }
//         })
//
//         // override record.$decode to update cache on decoding.
//         .define('Model.$decode', function(_raw, _mask) {
//           var self = this,
//               result = this.$super(_raw, _mask);
//
//           if(result.$pk) {
//             self.$cache()[result.$pk] = this;
//           }
//
//           return this.$super(_raw, _mask);
//         });
//   });
// }
export default {};
