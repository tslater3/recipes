import _ from 'lodash';

export default /* @ngInject */ function HasScope() {
  return {
    included($scope) {
      this.$scope = $scope;
    }
  };
}
