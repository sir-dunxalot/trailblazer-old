import DS from 'ember-data';
import defaultFor from 'trailblazer/utils/default-for';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),

  capitalizedName() {
    const string = defaultFor(this.get('name'), '');

    return string.capitalize();
  }.property('name'),

});
