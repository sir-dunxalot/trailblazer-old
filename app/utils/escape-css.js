import Ember from 'ember';

export default function escapeCss(unsafeContent) {
  return Ember.Handlebars.Utils.escapeExpression(unsafeContent);
}
