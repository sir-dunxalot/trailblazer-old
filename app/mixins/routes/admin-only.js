import Ember from 'ember';

export default Ember.Mixin.create({

  beforeModel(transition) {
    const userId = this.get('userId');

    this.store.find('user', userId).then(function(user) {
      if (user.get('permissionLevel') < 10) {
        transition.abort();
        this.transitionTo('features');
        this.flashMessage('error', 'You do not have sufficient permissions levels for this action');
      }
    }.bind(this));
  },

});
