import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    email: {
      presence: true
    },

    firstName: {
      presence: true
    },

    lastName: {
      presence: true
    },

    team: {
      presence: true
    }
  },

  cancel() {
    this.transitionToRoute('users');
  },

  save() {
    this.get('content').save().then(function(user) {
      this.transitionToRoute('user', user);
    }.bind(this));
  },

});
