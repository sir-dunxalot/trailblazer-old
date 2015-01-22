import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  email: attr('string'),
  name: attr('string'),
  password: attr('string'),
  tasks: hasMany('task')
});
