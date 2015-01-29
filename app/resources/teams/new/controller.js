import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    name: {
      presence: true
    },
  },

  cancel: function() {
    this.transitionToRoute('teams');
  },

  save: function() {
    var _this = this;

    this.get('content').save().then(function(team) {
      _this.transitionToRoute('team', team);
    });
  },

});
