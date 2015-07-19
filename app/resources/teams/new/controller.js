import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  validations: {
    'model.name': {
      presence: true
    },
  },

  cancel() {
    this.transitionToRoute('teams');
  },

  save() {

    /* Save the new team then add the team to the
    user's model */

    this.get('model').save().then(function(team) {
      const user = team.get('model.members.firstObject');

      user.set('team', team);
      user.save().then(function() {
        this.transitionToRoute('team', team);
      });
    }.bind(this));
  },

});
