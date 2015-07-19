import Ember from 'ember';
import DS from 'ember-data';
import defaultFor from 'trailblazer/utils/default-for';

const { attr } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  name: attr('string'),

  capitalizedName: computed('name', function() {
    const string = defaultFor(this.get('name'), '');

    return string.capitalize();
  }),

});
