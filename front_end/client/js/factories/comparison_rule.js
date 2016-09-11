import _ from 'lodash';

const COMPARISON_SUPPORT = {
  equal: {except: ['ranking']},
  present: true,
  subset: {except: ['boolean', 'multiple_choice_many', 'nps_text', 'ranking', 'text']},
  superset: {only: ['multiple_choice_many', 'nps_text', 'text']}
};

export default /* @ngInject */ function(AnswerRule, Kore, comparisons) {
  class ComparisonRule {
    constructor() {
      this.selectedComparison = comparisons.default;
    }
    canDestroy() {
      return true;
    }
    destroy() {
      this.parentRule.remove(this);
    }
    canStartGroup() {
      return true;
    }
    startGroup() {
      this.parentRule.replaceWithQuantifier(this);
    }
    updateAnswerRule() {
      this.answerRule = AnswerRule.from(this.selectedComparison, this.selectedQuestion);
    }
    get comparisons() {
      if (!this.selectedQuestion || !_.contains(Kore.Census.Question.kind.values, this.selectedQuestion.kind)) {
        return [];
      }

      const supportedComparisons = _.filter(comparisons, ({type}) => {
        const supported = COMPARISON_SUPPORT[type];
        const included = !supported.only || _.contains(supported.only, this.selectedQuestion.kind);
        const excluded = supported.except && _.contains(supported.except, this.selectedQuestion.kind);
        return supported && included && !excluded;
      });

      return supportedComparisons;
    }
    get compiled() {
      const answer = this.answerRule;
      const comparison = this.selectedComparison;
      const question = this.selectedQuestion;
      if (!answer || !comparison || !question) { return; }

      const compiledAnswer = answer.compiled;
      if (!compiledAnswer) { return; }

      return _.merge({
        answer_value: null,
        children_attributes: null,
        is_negated: comparison.isNegated,
        operator: comparison.type,
        question_id: question.id
      }, compiledAnswer);
    }
    get type() {
      return 'comparison';
    }
    static load(condition, questionResolver) {
      const rule = new this();
      rule.selectedComparison = _.findWhere(comparisons, {
        type: condition.operator,
        isNegated: condition.is_negated
      });
      rule.selectedQuestion = questionResolver(condition);
      rule.updateAnswerRule();
      if (rule.answerRule) {
        rule.answerRule.load(condition.answer_value);
      }
      return rule;
    }
  }

  return ComparisonRule;
}
