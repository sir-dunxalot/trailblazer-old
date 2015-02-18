import Ember from 'ember';

export default Ember.ObjectController.extend({
  featureController: Ember.computed.alias('controllers.feature/index'),
  needs: ['feature/index'],
  shouldShow: true,

  observeShowPersonal: function() {
    var currentUserID = this.get('session.currentUser.id');
    var task = this.get('content');
    var assigneeID = task.get('assignee.id');
    var showPersonal = this.get('featureController.showPersonal');
    var shouldShowIfPersonal = showPersonal && currentUserID === assigneeID;
    var completed = this.get('content.completed');
    var showCompleted = this.get('featureController.showCompleted');
    var shouldShowIfCompleted = completed && showCompleted;

    this.set('shouldShow',
      (shouldShowIfPersonal || !showPersonal) &&
      (shouldShowIfCompleted || !completed)
    );
  }.observes(
    'content.assignee',
    'content.completed',
    'featureController.showCompleted',
    'featureController.showPersonal'
  ).on('init'),

});
