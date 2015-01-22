import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  end: attr('date'),
  name: attr('string'),
  notes: attr('string'),
  stages: hasMany('stage'),
  start: attr('date'),
  tasks: hasMany('task'),
});
