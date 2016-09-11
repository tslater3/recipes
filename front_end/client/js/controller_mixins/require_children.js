import _ from 'lodash';

function findChildByClassName(class_name, children) {
  return _.find(children, function(child){ return child.constructor.name === class_name });
}

export default function RequireChildren(mixin, $timeout) {
  "ngInject";

  return {
    included(options={}) {
      let self = this;

      $timeout(function(){
        _.each(options, function(klass_name, property){
          let child = findChildByClassName(klass_name, self.children);
          self[property] = child;
        })
      }, 0);
    }
  };
}
