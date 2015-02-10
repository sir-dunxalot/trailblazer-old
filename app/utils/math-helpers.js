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

  percentage: function(a, b) {
    var result = a === 0 ? 1 : this.divide(a, b) * 100;

    return result + '%';
  },

  round: function(a) {
    return Math.round(a);
  },

  subtract: function(a, b) {
    return a - b;
  },

}
