import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import escapeCss from 'trailblazer/utils/escape-css';

const { computed, observer, on } = Ember;
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

  completedTasks: filterBy('tasks', 'completed', true),
  developmentTasks: filterBy('tasks', 'stageName', 'development'),
  datePositionsSet: computed.and('lowerDate', 'upperDate'),
  researchTasks: filterBy('tasks', 'stageName', 'research'),
  taske: computed.oneWay('model.tasks'),
  testingTasks: filterBy('tasks', 'stageName', 'testing'),

  /* Dates */

  lowerDate: null,
  lowerDuration: null,
  upperDate: null,
  upperDuration: null,

  lowerDatePosition: computed('lowerDuration', 'totalDuration', function() {
    const { lowerDuration, totalDuration } = this.getProperties(
      [ 'lowerDuration', 'totalDuration' ]
    );

    const percentage = MathHelpers.percentage(
      escapeNumber(lowerDuration),
      escapeNumber(totalDuration)
    );

    return (`left:${percentage};`).htmlSafe();
  }),

  upperDatePosition: computed('upperDuration', 'totalDuration', function() {
    const { totalDuration, upperDuration } = this.getProperties(
      [ 'totalDuration', 'upperDuration' ]
    );
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

    // console.log('running');

    _this.get('model.stages').then(function(stages) {
      stages.forEach(function(stage) {
        stage.get('type').then(function(type) {
          const name = type.get('name');
          const duration = stage.get('duration');

          if (name === 'research') {
            const startDate = moment(_this.get('startDate'));
            const lowerDate = startDate.add(duration, 'd');

            _this.setProperties({
              lowerDuration: duration,
              lowerDate,
            });
          } else if (name === 'testing') {
            const endDate = moment(_this.get('endDate'));
            const upperDate = endDate.subtract(duration + 1, 'd');
            // Hack

            _this.setProperties({
              upperDuration: duration,
              upperDate,
            });
          }
        });
      });
    });
  }),

});
