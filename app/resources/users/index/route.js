import Ember from 'ember';

export default Ember.Route.extend({

  // TODO - deprecate route?

  model: function() {
    return this.store.find('user');
  }

});
