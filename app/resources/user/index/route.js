import Ember from 'ember';

export default Ember.Route.extend({

  // TODO - Deprecate route

  model: function() {
    return this.modelFor('user');
  },

});
