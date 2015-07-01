import Ember from 'ember';
import MathHelpers from '../math-helpers';

const { isNumber } = MathHelpers;

export default function(methodName, keyOne, keyTwo) {

  /* List methods that only accept one argument... */

  const singleArgMethods = ['round'];

  /* ... Then check to see whether methodName falls
  into that category */

  if (singleArgMethods.indexOf(methodName) === -1) {

    /* Observes two properties */

    return Ember.computed(keyOne, keyTwo, function() {
      const a = this.get(keyOne);
      const b = this.get(keyTwo);

      if (isNumber(a) && isNumber(b)) {
        return MathHelpers[methodName](a, b);
      } else {
        return null;
      }
    });

  } else {

    /* Observe one property */

    return Ember.computed(keyOne, function() {
      const a = this.get(keyOne);

      if (isNumber(a)) {
        return MathHelpers[methodName](a);
      } else {
        return null;
      }
    });

  }
}
