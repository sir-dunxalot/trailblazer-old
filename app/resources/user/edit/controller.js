import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.Controller.extend(
  FormMixin, {

  teamId: null,

  validations: {

    'model.avatarUrl': {
      presence: true
    },

    'model.firstName': {
      presence: true
    },

    'model.lastName': {
      presence: true
    },

    'model.teamId': {
      presence: true
    }

  },

  teamHint: Ember.computed('model.team.name', function() {
    const teamName = this.get('team.name');

    if (teamName) {
      return `You are currently a member of ${teamName}`;
    } else {
      return 'Don\'t know your team ID? Ask a colleague';
    }
  }),

  cancel() {
    this.transitionToRoute('settings');
  },

  save() {
    const _this = this;
    const teamId = this.get('teamId');
    const save = function() {
      _this.get('model').save().then(function(/* user */) {
        _this.transitionToRoute('settings');
      });
    };

    if (teamId) {
      this.store.findRecord('team', teamId).then(function(/* team */) {
        save();
      }, function() {
        this.set('teamId', null);
        this.flashMessage('error', 'Team not found');
      }.bind(this));
    } else {
      save();
    }

  },

});
