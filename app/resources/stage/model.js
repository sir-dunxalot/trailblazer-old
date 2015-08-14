import DS from 'ember-data';
import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import numberOfWorkingDays from 'trailblazer/utils/number-of-working-days';

const { computed, observer } = Ember;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  completedTasks: computed.filterBy('tasks', 'completed', true),
  duration: attr('number'),
  feature: belongsTo('feature', {
    async: true,
  }),
  rank: attr('number'),
  tasks: hasMany('task', {
    async: true,
  }),
  type: belongsTo('stage-type', {
    async: true,
  }),

  completedPercentage: computed('completedTasks.length', 'tasks.length', function() {
    const tasksLength = this.get('tasks.length');
    const completedTasksLength = this.get('completedTasks.length');

    return MathHelpers.percentage(
      completedTasksLength,
      tasksLength
    );
  }),

  getDates() {
    const _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.get('feature').then(function(feature) {
        const { duration, rank } = _this.getProperties(
          [ 'duration', 'rank' ]
        );
        const { endDate, startDate } = feature.getProperties(
          [ 'endDate', 'startDate' ]
        );

        let stageEndDate, stageStartDate;

        _this.get('type').then(function(type) {

          if (rank === 1) {
            stageStartDate = startDate;
            stageEndDate = moment(startDate).add(duration, 'd');
          } else if (rank === 2) {
            const researchStage = feature.get('stages').findBy('type.name', 'research');
            const researchDuration = researchStage.get('duration');
            const _startDate = moment(startDate);

            stageStartDate = _startDate.add(researchDuration, 'd');
            stageEndDate = _startDate.clone().add(duration, 'd');
          } else if (rank === 3) {
            stageStartDate = moment(endDate).subtract(duration, 'd');
            stageEndDate = endDate;
          } else {
            Ember.warn('Stage name not found in the stage order');
            reject();
          }

          resolve({
            stageEndDate,
            stageStartDate,
          });
        });
      });
    });
  },

  getNumberOfWorkingDays() {
    return new Ember.RSVP.Promise(function(resolve) {
      this.getDates().then(function({ stageEndDate, stageStartDate }) {
        const days = numberOfWorkingDays(stageStartDate, stageEndDate);

        rseolve(days);
      });
    });
  },

});
