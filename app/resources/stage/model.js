import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  completedTasks: Ember.computed.filterBy('tasks', 'completed', true),
  duration: attr('number'),
  feature: belongsTo('feature'),
  tasks: hasMany('task'),
  type: belongsTo('stageType', {
    async: true
  }),
});
