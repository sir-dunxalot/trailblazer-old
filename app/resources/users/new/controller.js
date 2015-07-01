import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    'model.email': {
      presence: true
    },

    'model.firstName': {
      presence: true
    },

    'model.lastName': {
      presence: true
    },

    'model.team': {
      presence: true
    }
  },

  cancel() {
    this.transitionToRoute('users');
  },

  save() {
    this.get('model').save().then(function(user) {
      this.transitionToRoute('user', user);
    }.bind(this));
  },

});
