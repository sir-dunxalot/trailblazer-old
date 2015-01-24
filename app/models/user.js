import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  email: attr('string'),
  name: attr('string'),
  tasks: hasMany('task', {
    async: true
  }),
  team: belongsTo('team', {
    async: true
  })
});
