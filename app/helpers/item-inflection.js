import Ember from 'ember';

export function itemInflection(params) {
  var count = parseFloat(params[0]);
  var word = params[1];

  if (count !== 1) {
    count = count || 0;
    word = Ember.String.pluralize(word);
  }

  return `${count} ${word}`;
}

export default Ember.HTMLBars.makeBoundHelper(itemInflection);
