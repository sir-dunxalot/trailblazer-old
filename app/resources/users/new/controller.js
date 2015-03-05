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

  cancel: function() {
    this.transitionToRoute('users');
  },

  save: function() {
    var _this = this;

    this.get('content').save().then(function(user) {
      _this.transitionToRoute('user', user);
    });
  },

});
