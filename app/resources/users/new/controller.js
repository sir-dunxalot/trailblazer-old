import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.ObjectController.extend(
  FormMixin, {

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
