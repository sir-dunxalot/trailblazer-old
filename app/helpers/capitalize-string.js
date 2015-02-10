import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(string) {
  string = defaultFor(string, '');

  return string.capitalize();
});
