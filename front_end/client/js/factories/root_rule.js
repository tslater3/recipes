import _ from 'lodash';

export default /* @ngInject */ function(QuantifierRule, ComparisonRule) {
  class RootRule {
    constructor(initialRule) {
      if (initialRule) {
        this.add(initialRule);
      }
    }
    canAdd() {
      return !this._rule;
    }
    add(rule = new ComparisonRule()) {
      this._rule = rule;
      rule.parentRule = this;
      return this;
    }
    remove(rule) {
      this.replace(rule);
    }
    replace(oldRule, newRule) {
      if (oldRule !== this._rule) { return; }
      delete oldRule.parentRule;

      if (newRule) {
        newRule.parentRule = this;
      }
      this._rule = newRule;
    }
    replaceWithQuantifier(rule) {
      const quantifier = new QuantifierRule();
      this.replace(rule, quantifier);

      if (quantifier.parentRule === this) {
        quantifier.add(rule).add();
      }
    }
    get compiled() {
      return this._rule ? this._rule.compiled : null;
    }
    get rules() {
      return this._rule ? [this._rule] : [];
    }
    static load(condition, questions) {
      if (condition) {
        const resolver = (c) => _.findWhere(questions, {id: c.question_id});
        const Rule = _.any(condition.children_attributes) ? QuantifierRule : ComparisonRule;
        return new this(Rule.load(condition, resolver));
      } else {
        return new this();
      }
    }
  }

  return RootRule;
}
