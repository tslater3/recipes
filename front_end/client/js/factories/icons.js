import _ from  'lodash';

export default /* @ngInject */ function(ICONS, ENV) {
  class MaterialIcon {
    constructor(group, name) {
      this.group = group;
      this.name = name;
    }

    get key(){
      return `${this.group}:${this.name}`;
    }

    get url(){
      return `${ENV.template_path_prefix}/${this.name}.svg`;
    }

    get raw_html() {
      return `<md-icon md-svg-icon="${this.key}"></md-icon>`;
    }
  }

  class Icons {
    constructor() {
      this._icons = _(ICONS).map(function(ikons, group){
        return _.map(ikons, function(ikon) {
          return new MaterialIcon(group, ikon);
        });
      }).flatten().value();
    }

    get all() {
      return this._icons;
    }

    get keys() {
      return _.map(this._icons, 'key');
    }
  }

  return new Icons();
}
