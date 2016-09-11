export default /* @ngInject */ function() {
  class TextAnswerRule {
    load(answer) {
      this.answer = answer;
    }
    get compiled() {
      return {answer_value: this.answer};
    }
    get type() {
      return 'text';
    }
  }

  return TextAnswerRule;
}
