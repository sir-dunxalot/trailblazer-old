import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.ObjectController.extend({
  completedTasks: Ember.computed.filter('tasks', 'completed', true),
  datePositionsSet: Ember.computed.and('lowerDate', 'upperDate'),

  lowerDate: null,
  lowerDuration: null,
  upperDate: null,
  upperDuration: null,

  lowerDatePosition: function() {
    var lowerDuration = this.get('lowerDuration');
    var totalDuration = this.get('totalDuration');
    var percentage = MathHelpers.percentage(
      lowerDuration,
      totalDuration
    );

    return 'left:' + percentage + ';';
  }.property('lowerDuration', 'totalDuration'),

  upperDatePosition: function() {
    var lowerDuration = this.get('lowerDuration');
    var upperDuration = this.get('upperDuration');
    var totalDuration = this.get('totalDuration');
    var percentage = MathHelpers.percentage(
      lowerDuration + upperDuration,
      totalDuration
    );

    return 'left:' + percentage + ';';
  }.property('upperDuration', 'totalDuration'),

  setDates: function() {
    var _this = this;

    _this.get('stages').then(function(stages) {
      stages.forEach(function(stage) {
        stage.get('type').then(function(type) {
          var name = type.get('name');
          var duration = stage.get('duration');

          if (name === 'research') {
            var startDate = moment(_this.get('startDate'));
            var lowerDate = startDate.add(duration, 'd');

            _this.set('lowerDuration', duration);
            _this.set('lowerDate', lowerDate);
          } else if (name === 'testing') {
            var endDate = moment(_this.get('endDate'));
            var upperDate = endDate.subtract(duration + 1, 'd');
            // Hack

            _this.set('upperDuration', duration);
            _this.set('upperDate', upperDate);
          }
        });
      });
    });
  }.observes('stages.@each.duration'),

});
