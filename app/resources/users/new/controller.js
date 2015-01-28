import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    email: {
      presence: true
    },

    name: {
      presence: true
    }
  },

  save: function() {
    var _this = this;

    this.get('content').save().then(function(user) {
      _this.transitionToRoute('show', user);
    });
  },

});
