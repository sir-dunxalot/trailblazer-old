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

    /* Save the new team then add the team to the
    user's model */

    this.get('content').save().then(function(team) {
      var user = team.get('members.firstObject');

      user.set('team', team);
      user.save().then(function() {
        _this.transitionToRoute('team', team);
      });
    });
  },

});