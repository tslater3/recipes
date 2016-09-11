import _ from 'lodash';

export default /* @ngInject */ function(ComparisonRule, quantifiers) {
  class QuantifierRule {
    constructor() {
      this.rules = [];
      this.selectedQuantifier = quantifiers.default;
    }
    canAdd() {
      return true;
    }
    add(rule = new ComparisonRule()) {
      this.rules.push(rule);
      rule.parentRule = this;
      return this;
    }
    canDestroy() {
      return true;
    }
    destroy() {
      this.parentRule.remove(this);
    }
    remove(rule) {
      this.replace(rule);

      const [first, ...rest] = this.rules;
      if (rest.length === 0) {
        this.parentRule.replace(this, first);
      }
    }
    replace(oldRule, newRule) {
      const index = this.rules.indexOf(oldRule);
      if (index < 0) { return; }

      delete oldRule.parentRule;

      if (_.isUndefined(newRule)) {
        this.rules.splice(index, 1);
      } else {
        newRule.parentRule = this;
        this.rules.splice(index, 1, newRule);
      }
    }
    replaceWithQuantifier(rule) {
      const quantifier = new QuantifierRule();
      this.replace(rule, quantifier);

      if (quantifier.parentRule === this) {
        quantifier.add(rule).add();
      }
    }
    get compiled() {
      const rules = this.rules || [];
      const quantifier = this.selectedQuantifier;

      if (!quantifier) { return; }

      const children_attributes = _.filter(rules.map(_.property('compiled')), _.isObject);

      if (_.isEmpty(children_attributes)) { return; }

      return {
        children_attributes,
        question_id: null,
        answer_value: null,
        is_negated: quantifier.isNegated,
        operator: quantifier.type
      };
    }
    get quantifiers() {
      return quantifiers;
    }
    get type() {
      return 'quantifier';
    }
    static load(condition, questionResolver) {
      let rule;

      if (_.any(condition.children_attributes)) {
        rule = new this();
        rule.selectedQuantifier = _.findWhere(quantifiers, {
          type: condition.operator,
          isNegated: condition.is_negated
        });
        condition.children_attributes.forEach((child) => rule.add(this.load(child, questionResolver)));
      } else {
        rule = ComparisonRule.load(condition, questionResolver);
      }

      return rule;
    }
  }

  return QuantifierRule;
}
