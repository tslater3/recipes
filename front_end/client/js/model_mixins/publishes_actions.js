import _ from 'lodash';

export default /* @ngInject */ function(restmod, $http, growl) {
  return restmod.mixin({
    $hooks: {
      'after-save': function(_response) {
        var json_root = _response.data.meta.json_root,
            message = [_.humanizeAndTitleize(json_root), _response.data[json_root].id, "saved successfully"].join(' ');

        growl.success(message);
      },
      'after-destroy': function(_response) {
        var json_root = _response.data.meta.json_root,
            message = [_.humanizeAndTitleize(json_root), _response.data[json_root].id, "destroyed successfully"].join(' ');

        growl.info(message);
      }
    }
  })
}
