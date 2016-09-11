import _ from 'lodash';

export default function HasQuestionChoices(mixin) {
  "ngInject";
  return {
    included(options={}) {
      _.requireDefinedProperties(this.question, 'choices');
      this.custom_values_allowed = !this.areLabelsAndValuesEqual();
    },

    areLabelsAndValuesEqual() {
      return _.every(this.question.choices, choice => choice.label === choice.value);
    },

    assignValuesToEqualLabels() {
      if(!this.custom_values_allowed) {
        _.each(this.question.choices, choice => choice.value = choice.label);
      }
    }
  };
}
