import Ember from 'ember';

export default Ember.ObjectController.extend({
  featureController: Ember.computed.oneWay('controllers.feature/index'),
  needs: ['feature/index'],
  shouldShow: true,

  observeShowPersonal: Ember.on('init', Ember.observer(
    'model.assignee',
    'model.completed',
    'featureController.showCompleted',
    'featureController.showPersonal',
    function() {
      const currentUserID = this.get('session.currentUser.id');
      const task = this.get('model');
      const assigneeID = task.get('assignee.id');
      const showPersonal = this.get('featureController.showPersonal');
      const shouldShowIfPersonal = showPersonal && currentUserID === assigneeID;
      const completed = this.get('model.completed');
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
