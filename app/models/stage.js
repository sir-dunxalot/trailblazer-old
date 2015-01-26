import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
  duration: attr('number'),
  feature: belongsTo('feature'),
  type: belongsTo('stageType')
});
