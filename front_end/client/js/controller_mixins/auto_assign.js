export default /* @ngInject */ function() {
  return {
    included({args}) {
      const inject = this.constructor.$inject || [];
      inject.forEach((key, i) => this[key] = args[i]);
    }
  };
}
