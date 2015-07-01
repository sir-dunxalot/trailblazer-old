import Ember from 'ember';

export default Ember.ObjectController.extend({
  featureController: Ember.computed.alias('controllers.feature/index'),
  needs: ['feature/index'],
  shouldShow: true,

  observeShowPersonal: Ember.on('init', Ember.observer(
    'content.assignee',
    'content.completed',
    'featureController.showCompleted',
    'featureController.showPersonal',
    function() {
      const currentUserID = this.get('session.currentUser.id');
      const task = this.get('content');
      const assigneeID = task.get('assignee.id');
      const showPersonal = this.get('featureController.showPersonal');
      const shouldShowIfPersonal = showPersonal && currentUserID === assigneeID;
      const completed = this.get('content.completed');
      const showCompleted = this.get('featureController.showCompleted');
      const shouldShowIfCompleted = completed && showCompleted;

      if (currentUserID !== assigneeID) {
        this.set('featureController.showPersonalToggle', true);
      }

      this.set('shouldShow',
        (shouldShowIfPersonal || !showPersonal) &&
        (shouldShowIfCompleted || !completed)
      );
    }
  )),

});
