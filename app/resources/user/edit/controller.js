import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import defaultFor from 'trailblazer/utils/default-for';

export default Ember.ObjectController.extend(
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
    return defaultFor(
      'You are currently a member of ' + this.get('team.name'),
      'Don\'t know your team ID? Ask a colleague'
    );
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
        _this.set('teamId', null);
        // TODO - Team not found
        alert('Team not found!');
      });
    } else {
      save();
    }

  },

});
