import Ember from 'ember';

var helpers;

/* Allows value of zero to return true */

export function isNumber(maybeNumber) {
  return Ember.typeOf(maybeNumber) === 'number';
}

/* Maths methods */

export function add(a, b) {
  return a + b;
};

export function divide(a, b) {
  return a / b;
};

export function multiply(a, b) {
  return a * b;
};

export function percentage(a, b) {
  var result = a === 0 ? 1 : divide(a, b) * 100;

  return result + '%';
};

export function round(a) {
  return Math.round(a);
};

export function subtract(a, b) {
  return a - b;
};

helpers = {
  isNumber: isNumber,
  add: add,
  divide: divide,
  multiply: multiply,
  percentage: percentage,
  round: round,
  subtract: subtract
};

export default function(methodName, keyOne, keyTwo) {

  /* List methods that only accept one argument... */

  var singleArgMethods = ['round'];

  /* ... Then check to see whether methodName falls
  into that category */

  if (singleArgMethods.indexOf(methodName) === -1) {

    /* Observes two properties */

    return function() {
      var a = this.get(keyOne);
      var b = this.get(keyTwo);

      if (isNumber(a) && isNumber(b)) {
        return helpers[methodName](a, b);
      } else {
        return null;
      }
    }.property(keyOne, keyTwo);

  } else {

    /* Observe one property */

    return function() {
      var a = this.get(keyOne);

      if (isNumber(a)) {
        return helpers[methodName](a);
      } else {
        return null;
      }
    }.property(keyOne)

  }
}
