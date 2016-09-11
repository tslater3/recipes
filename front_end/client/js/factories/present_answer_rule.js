export default /* @ngInject */ function() {
  class PresentAnswerRule {
    load() {
    }
    get compiled() {
      return {};
    }
    get type() {
      return 'present';
    }
  }

  return PresentAnswerRule;
}
