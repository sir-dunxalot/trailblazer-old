import DS from 'ember-data';
import defaultFor from 'trailblazer/utils/default-for';

var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),

  capitalizedName: function() {
    var string = defaultFor(this.get('name'), '');

    return string.capitalize();
  }.property('name'),
});
