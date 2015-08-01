import DS from 'ember-data';
import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import numberOfWorkingDays from 'trailblazer/utils/number-of-working-days';

const { computed, observer } = Ember;
const { attr, belongsTo, hasMany } = DS;

const order = ['research', 'development', 'testing']; // TODO

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

  completedPercentage: computed('completedTasks.length', 'tasks.length', function() {
    const tasksLength = this.get('tasks.length');
    const completedTasksLength = this.get('completedTasks.length');

    return MathHelpers.percentage(
      completedTasksLength,
      tasksLength
    );
  }),

  numberOfWorkingDays: null,

  setNumberOfWorkingDays: observer('duration', 'feature.endDate', 'feature.startDate', 'type.name', function() {
    this.get('feature').then(function(feature) {
      const duration = this.get('duration');
      const featureStartDate = feature.get('startDate');
      const featureEndDate = feature.get('endDate');
      const stageName = this.get('type.name');
      const rank = order.indexOf(stageName) + 1;

      let endDate, startDate;

      if (rank === 1) {
        startDate = featureStartDate;
        endDate = moment(featureStartDate).add(duration, 'd');
      } else if (rank === 2) {
        const researchStage = feature.get('stages').findBy('type.name', 'research');
        const researchDuration = researchStage.get('duration');

        startDate = moment(featureStartDate).add(researchDuration, 'd');
        endDate = startDate.clone().add(duration, 'd');
      } else if (rank === 3) {
        startDate = moment(featureEndDate).subtract(duration, 'd');
        endDate = featureEndDate;
      }

      this.set('numberOfWorkingDays', numberOfWorkingDays(startDate, endDate));
    }.bind(this));
  }),
});
