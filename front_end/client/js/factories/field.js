import _ from  'lodash';

export default /* @ngInject */ function() {
  class Field {
    constructor(name, _options = {}){
      this.name = name;
      this.$valid = true;
      this.help_is_visible = false;
      _.extend(this, _options);

      return this;
    }
  }
  return Field;
}
