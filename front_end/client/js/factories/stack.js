import _ from  'lodash';

export default /* @ngInject */ function() {
  class Stack extends Array {
    constructor(...args) {
      //it looks like super here does not actually work in terms of setting values,
      //but im not sure if it's doing any other setup, so to be safe:
      super(...args);
      this.push(...args);
    }

    isFirst(element) {
      return this.indexOf(element) === 0;
    }

    isLast(element) {
      return this.indexOf(element) === this.length - 1;
    }

    move(element, offset) {
      let index = this.indexOf(element),
          new_index = (index + offset),
          removed_element;

      if(new_index > -1 && new_index < this.length) {
        removed_element = this.splice(index, 1)[0];

        this.splice(new_index, 0, removed_element);
      }

      return this;
    }

    moveUp(element) {
      return this.move(element, -1);
    }

    moveDown(element) {
      return this.move(element, 1);
    }

    //this is because restmod treats our array here as an object for some reason
    //when serializing
    toArray() {
      let new_array = _.values(this);
      new_array.pop();
      return new_array;
    }
  }

  return Stack;
}
