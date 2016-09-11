import _ from 'lodash';

export function snake(path) {
  return path.replace(/^\.\/|\.js$/g, '').replace(/\//g, '_');
};
export function snakeToPascal(str) {
  return str.split('_').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
};
export function snakeToCamel(str) {
  return str.replace(/_[a-z]/g, (s) => s[1].toUpperCase());
};

export const camel =  _.compose(snakeToCamel, snake);
export const pascal = _.compose(snakeToPascal, snake);
export const none =   _.constant(null);
