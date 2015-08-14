import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    const userId = this.get('session.content.secure.uid');

    return this.store.find('user', userId);
  },

});
