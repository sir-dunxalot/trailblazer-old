import Ember from 'ember';

export default Ember.ObjectController.extend({
  featureController: Ember.computed.alias('controllers.feature/index'),
  needs: ['feature/index'],
  shouldShow: true,

  observeCompleted: function() {
    var completed = this.get('content.completed');
    var showCompleted = this.get('featureController.showCompleted');
    var shouldShowIfCompleted = completed && showCompleted;

    this.set('shouldShow', shouldShowIfCompleted || !completed);
  }.observes(
    'content.completed',
    'featureController.showCompleted'
  ).on('init'),

  // observeShowPersonal: function() {
  //   var currentUserID = this.get('session.currentUser.id');
  //   var task = this.get('content');
  //   var assigneeID = task.get('assignee');
  //   var showPersonal = this.get('featureController.showPersonal');
  //   var shouldShowIfPersonal = showPersonal && currentUserID === assigneeID;

  //   this.set('shouldShow', shouldShowIfPersonal || !showPersonal);
  // }.observes(
  //   'content.assignee',
  //   'featureController.showPersonal'
  // ).on('init'),

});
