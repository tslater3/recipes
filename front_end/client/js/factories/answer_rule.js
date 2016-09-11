import _ from 'lodash';

const SELECT_KINDS = ['boolean', 'multiple_choice_many', 'multiple_choice', 'nps_number_scale', 'number_scale'];
const SET_COMPARISON_TYPES = ['subset', 'superset'];

function isPresentType(question, comparison) {
  return comparison.type === 'present';
}

function isSelectManyType(question, comparison) {
  return question.kind === 'multiple_choice_many' ||
    (_.include(SET_COMPARISON_TYPES, comparison.type) && _.include(SELECT_KINDS, question.kind));
}

function isSelectType(question, comparison) {
  return comparison.type === 'equal' && _.include(SELECT_KINDS, question.kind);
}

export default /* @ngInject */ function(PresentAnswerRule, SelectAnswerRule, TextAnswerRule) {
  class AnswerRule {
    static from(comparison, question) {
      if (!question || !comparison) {
        return;
      } else if (isPresentType(question, comparison)) {
        return new PresentAnswerRule();
      } else if (isSelectManyType(question, comparison)) {
        return new SelectAnswerRule(question, true);
      } else if (isSelectType(question, comparison)) {
        return new SelectAnswerRule(question, false);
      } else {
        return new TextAnswerRule();
      }
    }
  }

  return AnswerRule;
}
