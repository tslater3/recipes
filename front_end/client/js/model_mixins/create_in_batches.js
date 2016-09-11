import _ from 'lodash';

export default /* @ngInject */ function(restmod, $http, RMPackerCache, $q, ProgressBar) {
  return restmod.mixin({
    $extend: {
      Collection: {
        $withBatchesOf(batch_size=25) {
          let batch_collection = this.$type.$collection();
          batch_collection.original_collection = this;
          batch_collection.batches = _.chunk(batch_collection.original_collection, batch_size);
          batch_collection.progress = new ProgressBar(0, batch_collection.batches.length);
          return batch_collection;
        },
        $createAllBatches() {
          let self = this,
              model = this.$type,
              collection_key = model.getProperty('plural'),
              request_url = model.$collectionPath('create_all'),
              batch_promises,
              batch_records,
              request_data,
              request;

          batch_promises = _.map(self.batches, function(batch){
            batch_records = _.map(batch, function(record){
              return record.$encode();
            });

            request_data = {};
            request_data[collection_key] = batch_records;

            request = {
              url: request_url,
              method: 'POST',
              data: request_data,
              allow_cancellation: true
            };

            self.$dispatch('before-create-batch', [request]);

            let promise = $http(request).then(function(response){
              RMPackerCache.prepare();

              var raw = model.unpack(self, response.data);

              self.$decode(raw);
              self.progress.tick();
              self.$dispatch('after-create-batch', []);
              self.$pending.pop();

              RMPackerCache.clear();
            });

            if(self.hasOwnProperty('$pending') && _.isArray(self.$pending)) {
              self.$pending.push(promise);
            } else {
              self.$pending = [promise];
            }

            return promise;
          });

          return batch_promises;
        }
      }
    }
  })
}
