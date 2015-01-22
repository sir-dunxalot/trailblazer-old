import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('name'),
  // tasks: hasMany('task')
});
