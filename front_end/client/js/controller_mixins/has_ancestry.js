import _ from 'lodash';

export default function HasAncestry(mixin) {
  "ngInject";

  return {
    included(options={}) {
      this.children = [];

      if(this.parent && _.isArray(this.parent.children)) {
        this.parent.children.push(this);
      }
    }
  }
}
