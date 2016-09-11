export default /* @ngInject */ function($q) {
  class ReadFile {
    constructor(file){
      var deferred = $q.defer();

      var reader = new FileReader();

      reader.onload = function() {
        deferred.resolve(reader.result);
      };

      reader.readAsDataURL(file);

      return deferred.promise;
    }
  }

  return ReadFile;
}
