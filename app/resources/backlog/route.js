import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('feature');
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('scrollToBottom', false);
    }
  },

  setupController(controller, model) {
    controller.scrollIfNecessary();
    // this._super(controller, model);
  },

});
