import MathHelpers from '../math-helpers';

var isNumber = MathHelpers.isNumber;

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
        return MathHelpers[methodName](a, b);
      } else {
        return null;
      }
    }.property(keyOne, keyTwo);

  } else {

    /* Observe one property */

    return function() {
      var a = this.get(keyOne);

      if (isNumber(a)) {
        return MathHelpers[methodName](a);
      } else {
        return null;
      }
    }.property(keyOne);

  }
}
