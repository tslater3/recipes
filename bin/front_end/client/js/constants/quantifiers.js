function quantifier(type, isNegated, label) {
  return {type, isNegated, label};
}

const list = [
  quantifier('all', false, 'when all condition matches'),
  quantifier('all', true, 'when any condition does not match'),
  quantifier('any', false, 'when any condition matches'),
  quantifier('any', true, 'when no condition matches')
];

list.default = list[0];

export default list;
