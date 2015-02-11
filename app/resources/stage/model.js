import DS from 'ember-data';
import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

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

  completedPercentage: function() {
    var tasksLength = this.get('tasks.length');
    var completedTasksLength = this.get('completedTasks.length');

    return MathHelpers.percentage(
      completedTasksLength,
      tasksLength
    );
  }.property('tasks.length', 'completedTasks.length')
});
