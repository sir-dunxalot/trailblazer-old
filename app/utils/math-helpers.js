import Ember from 'ember';

export default {

  /* Allows value of zero to return true */

  isNumber: function(maybeNumber) {
    return Ember.typeOf(maybeNumber) === 'number';
  },

  /* Maths methods */

  add: function(a, b) {
    return a + b;
  },

  divide: function(a, b) {
    return a / b;
  },

  multiply: function(a, b) {
    return a * b;
  },

  percentage: function(a, b, returnNumber) {
    var result = a === 0 ? 0 : this.divide(a, b) * 100;
    var affix = returnNumber === false ? 0 : '%';

    return result + affix;
  },

  round: function(a) {
    return Math.round(a);
  },

  subtract: function(a, b) {
    return a - b;
  },

};
