// export default /* @ngInject */ function(restmod) {
//   var model = restmod.model('/accounts').mix(
//     'BaseModel',
//     'NestedDirtyModel',
//     {
//       $config: {
//         name: "account",
//         plural: "accounts"
//       },
//       $extend: {
//         List: {
//           salesforceAccount() {
//             return _.first(this.selectByKinds("salesforce"));
//           },
//           filterByKind(...kinds) {
//             var self = this;
//
//             return self.$asList(function(records){
//               return _.filter(records, function(record){ return _.include(kinds, record.kind) });
//             });
//           },
//           rejectByKinds(...kinds) {
//             var self = this;
//
//             return self.$asList(function(records){
//               return _.reject(records, function(record){ return _.include(kinds, record.kind) });
//             });
//           }
//         }
//       }
//     }
//   );
//
//   return model;
// }
