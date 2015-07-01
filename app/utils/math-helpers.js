import Ember from 'ember';

export default {

  /* Allows value of zero to return true */

  isNumber(maybeNumber) {
    return Ember.typeOf(maybeNumber) === 'number';
  },

  /* Maths methods */

  add(a, b) {
    return a + b;
  },

  divide(a, b) {
    return a / b;
  },

  multiply(a, b) {
    return a * b;
  },

  percentage(a, b, returnNumber) {
    const result = a === 0 ? 0 : this.divide(a, b) * 100;
    const affix = returnNumber === false ? 0 : '%';

    return result + affix;
  },

  round(a) {
    return Math.round(a);
  },

  subtract(a, b) {
    return a - b;
  },

};
