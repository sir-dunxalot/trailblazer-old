import Ember from 'ember';

export default Ember.Route.extend({

  // TODO - Deprecate route

  model() {
    return this.modelFor('user');
  },

});
