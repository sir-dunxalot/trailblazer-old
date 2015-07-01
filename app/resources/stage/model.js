import DS from 'ember-data';
import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

const { computed } = Ember;
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
  type: belongsTo('stage-type', {
    async: true
  }),

  completedPercentage: Ember.computed('tasks.length', 'completedTasks.length', function() {
    const tasksLength = this.get('tasks.length');
    const completedTasksLength = this.get('completedTasks.length');

    return MathHelpers.percentage(
      completedTasksLength,
      tasksLength
    );
  })
});
