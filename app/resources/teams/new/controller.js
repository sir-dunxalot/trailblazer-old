import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    name: {
      presence: true
    },
  },

  cancel() {
    this.transitionToRoute('teams');
  },

  save() {

    /* Save the new team then add the team to the
    user's model */

    this.get('content').save().then(function(team) {
      const user = team.get('members.firstObject');

      user.set('team', team);
      user.save().then(function() {
        this.transitionToRoute('team', team);
      });
    }.bind(this));
  },

});
