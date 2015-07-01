import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

const { computed } = Ember;

export default Ember.ObjectController.extend({

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
  testingTasks: filterBy('tasks', 'stageName', 'testing'),

  /* Dates */

  lowerDate: null,
  lowerDuration: null,
  upperDate: null,
  upperDuration: null,

  lowerDatePosition() {
    const { lowerDuration, totalDuration } = this.getProperties(
      [ 'lowerDuration', 'totalDuration' ]
    );
    const percentage = MathHelpers.percentage(
      lowerDuration,
      totalDuration
    );

    return `left:${percentage};`;
  }.property('lowerDuration', 'totalDuration'),

  upperDatePosition() {
    const { totalDuration, upperDuration } = this.getProperties(
      [ 'totalDuration', 'upperDuration' ]
    );
    const percentage = MathHelpers.percentage(
      totalDuration - upperDuration,
      totalDuration
    );

    return `left:${percentage};`;
  }.property('upperDuration', 'totalDuration'),

  actions: {
    toggleTaskCompletion(task) {
      task.toggleProperty('completed');
      task.save().then(function() {
        // TODO - Success message here
      });
    },
  },

  setDates() {
    const _this = this;

    _this.get('stages').then(function(stages) {
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
  }.observes('stages.@each.duration'),

});
