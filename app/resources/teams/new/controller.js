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
    const _this = this;
    const currentUser = this.get('session.currentUser');

    /* Save the new team then add the team to the
    user's model */

    this.get('model').save().then(function(team) {
      function transition() {
        _this.transitionToRoute('team', team);
      }

      if (currentUser.get('isAdmin')) {
        transition();
      } else {
        currentUser.set('team', team);
        currentUser.save().then(function() {
          transition();
        });
      }
    }.bind(this));
  },

});
