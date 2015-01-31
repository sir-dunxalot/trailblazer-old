import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  features: hasMany('feature', {
    async: true
  }),
  name: attr('string'),
  members: hasMany('user', {
    async: true
  })
});
