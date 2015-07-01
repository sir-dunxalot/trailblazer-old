import DS from 'ember-data';
import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  completedTasks: computed.filterBy('tasks', 'completed', true),
  duration: attr('number'),
  feature: belongsTo('feature', {
    async: true
  }),
  tasks: hasMany('task', {
    async: true
  }),
  type: belongsTo('stageType', {
    async: true
  }),

  completedPercentage() {
    const tasksLength = this.get('tasks.length');
    const completedTasksLength = this.get('completedTasks.length');

    return MathHelpers.percentage(
      completedTasksLength,
      tasksLength
    );
  }.property('tasks.length', 'completedTasks.length')
});
