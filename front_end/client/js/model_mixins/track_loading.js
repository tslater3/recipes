export default /* @ngInject */ function(restmod, $timeout) {
  return restmod.mixin({
    $hooks: {
      'before-fetch-many': function(_request) {
        this.$is_loading = true;
      },
      'after-fetch-many': function(_response) {
        var self = this, offset = 450;

        $timeout(function(){
          this.$is_loading = false;
        }.bind(this), offset);
      }
    }
  });
}
