import Ember from 'ember';

export default Ember.ObjectController.extend({
  completedTasks: Ember.computed.filter('tasks', 'completed', true),
});
