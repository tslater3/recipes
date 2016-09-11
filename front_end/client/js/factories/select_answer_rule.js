import _ from 'lodash';

const NUMBER_SCALE_TYPES = ["Census::Questions::NumberScaleQuestion", "Census::Questions::NpsNumberScaleQuestion"];
const MULTIPLE_CHOICE_TYPES = ["Census::Questions::MultipleChoiceQuestion", "Census::Questions::MultipleChoiceManyQuestion"];

function isBoolean(question) {
  return 'Census::Questions::BooleanQuestion' === question.type;
}
function booleanOptions(question) {
  return [
    {label: question.true_value_name, value: true},
    {label: question.false_value_name, value: false}
  ];
}

function isNumberScale(question) {
  return _.include(NUMBER_SCALE_TYPES, question.type);
}
function numberScaleOptions(question) {
  const min = question.answer_min_value;
  const inclusive_range = question.answer_max_value - min + 1;

  return _.times(inclusive_range, function(i) {
    const number = min + i;
    return {label: `${number}`, value: number};
  });
}

function isMultipleChoice(question) {
  return _.include(MULTIPLE_CHOICE_TYPES, question.type);
}
function multipleChoiceOptions(question) {
  return _.map(question.all_choices, function(choice) {
    return {label: choice.label, value: choice.id};
  });
}

export default /* @ngInject */ function() {
  class SelectAnswerRule {
    constructor(question, isMany) {
      if (isBoolean(question)) {
        this.options = booleanOptions(question);
      } else if (isNumberScale(question)) {
        this.options = numberScaleOptions(question);
      } else if (isMultipleChoice(question)) {
        this.options = multipleChoiceOptions(question);
      } else {
        this.options = [];
      }

      this.isMany = isMany;
    }
    load(answer) {
      const load = (value) => _.findWhere(this.options, {value});
      this.answer = this.isMany ? _.map(answer, load) : load(answer);
    }
    get compiled() {
      const answer = this.answer;

      if (_.isArray(answer)) {
        return {answer_value: _.map(answer, _.property('value'))};
      } else if (_.isObject(answer)) {
        return {answer_value: answer.value};
      }
    }
    get type() {
      return this.isMany ? 'select_many' : 'select';
    }
  }

  return SelectAnswerRule;
}
