import Ember from 'ember';

export default Ember.ArrayController.extend({
  // TODO - move sort to component?
  sortProperties: ['startDate'],
  sortAscending: true
});
