import _ from 'lodash';

export default /* @ngInject */ function OnScopeDestroyCancelActionsFor() {
  return {
    included(...args) {
      var self = this;

      self.$scope.$on('$destroy', function(){
        _.each(args, function(arg){
          const cancellable = self[arg];
          if(cancellable && cancellable.$hasPendingActions()) {
            cancellable.$cancel();
          }
        });
      });
    }
  };
}
