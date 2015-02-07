import Ember from 'ember';

export default Ember.ObjectController.extend({
  completedTasks: Ember.computed.filter('tasks', 'completed', true),
  lowerDate: null,
  upperDate: null,

  setDates: function() {
    var _this = this;

    _this.get('stages').then(function(stages) {
      stages.forEach(function(stage) {
        stage,get('type').then(function(type) {
          var name = type.get('name');
          var duration = stage.get('duration');

          if (name === 'research') {
            var startDate = moment(_this.get('startDate'));
            var lowerDate = startDate.add(duration, 'd');

            this.set('lowerDate', lowerDate);
          } else if (name === 'testing') {
            var endDate = moment(_this.get('endDate'));
            var upperDate = endDate.subtract(duration, 'd');

            this.set('upperDate', lowerDate);
          }
        });
      });
    });
  }.observes('stages.@each.duration')

});
