import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
  assignee: belongsTo('user'),
  completed: attr('boolean', {
    defaultValue: false
  }),
  createdAt: attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
  description: attr('string'),
  name: attr('string'),
  feature: belongsTo('feature'),
  stage: belongsTo('stage')
});
