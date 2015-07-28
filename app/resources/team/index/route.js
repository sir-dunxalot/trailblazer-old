import Ember from 'ember';

export default Ember.Route.extend({

  // TODO - Only allow access by admin and team admins

  model() {
    return this.modelFor('team');
  },

});
