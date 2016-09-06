function comparison(type, isNegated, label) {
  return {type, isNegated, label};
}

const list = [
  comparison('equal', false, 'equals'),
  comparison('equal', true, 'does not equal'),
  comparison('present', false, 'answered'),
  comparison('present', true, 'not answered'),
  comparison('subset', false, 'equals one of'),
  comparison('subset', true, 'does not equal any'),
  comparison('superset', false, 'contains'),
  comparison('superset', true, 'does not contain')
];

list.default = list[0];

export default list;
