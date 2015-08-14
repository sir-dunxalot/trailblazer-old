import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import escapeCss from 'trailblazer/utils/escape-css';

const { computed, observer } = Ember;
const filterBy = computed.filterBy;

function escapeNumber(value) {
  return parseFloat(escapeCss(value));
}

export default Ember.Controller.extend({

  /* Filters */

  showCompleted: false,
  showDevelopment: true,
  showPersonal: computed.equal('showPersonalString', 'true'),
  showPersonalString: 'false',
  showPersonalToggle: false,
  showResearch: true,
  showTesting: true,

  /* Tasks */

  completedTasks: filterBy('model.tasks', 'completed', true),
  developmentTasks: filterBy('model.tasks', 'stageName', 'development'),
  datePositionsSet: computed.and('lowerDate', 'upperDate'),
  researchTasks: filterBy('model.tasks', 'stageName', 'research'),
  testingTasks: filterBy('model.tasks', 'stageName', 'testing'),

  /* Dates */

  lowerDate: null,
  lowerDuration: null,
  upperDate: null,
  upperDuration: null,

  lowerDatePosition: computed('lowerDuration', 'model.totalDuration', function() {
    const lowerDuration = this.get('lowerDuration');
    const totalDuration = this.get('model.totalDuration');
    const percentage = MathHelpers.percentage(
      escapeNumber(lowerDuration),
      escapeNumber(totalDuration)
    );

    return (`left:${percentage};`).htmlSafe();
  }),

  upperDatePosition: computed('upperDuration', 'model.totalDuration', function() {
    const totalDuration = this.get('model.totalDuration');
    const upperDuration = this.get('upperDuration');
    const percentage = MathHelpers.percentage(
      escapeNumber(totalDuration - upperDuration),
      escapeNumber(totalDuration)
    );

    return (`left:${percentage};`).htmlSafe();
  }),

  actions: {
    toggleTaskCompletion(task) {
      task.toggleProperty('completed');
      task.save().then(function() {
        // TODO - Success message here
      });
    },
  },

  setDates: observer('model.stages', function() {
    const _this = this;
    const model = this.get('model');

    model.get('stages').then(function(stages) {
      stages.forEach(function(stage) {
        const { duration, rank } = stage.getProperties(
          [ 'duration', 'rank' ]
        );

        if (rank === 1) {
          const startDate = moment(model.get('startDate'));
          const lowerDate = startDate.add(duration, 'd');

          _this.setProperties({
            lowerDuration: duration,
            lowerDate,
          });
        } else if (rank === 3) {
          const endDate = moment(model.get('endDate'));
          const upperDate = endDate.subtract(duration + 1, 'd');// Hack

          _this.setProperties({
            upperDuration: duration,
            upperDate,
          });
        }
      });
    });
  }),

});
