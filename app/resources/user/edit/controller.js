import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  teamId: null,

  validations: {

    avatarUrl: {
      presence: true
    },

    firstName: {
      presence: true
    },

    lastName: {
      presence: true
    },

    teamId: {
      presence: true
    }

  },

  teamHint: Ember.computed('team.name', function() {
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
      _this.get('content').save().then(function(/* user */) {
        _this.transitionToRoute('settings');
      });
    };

    if ('teamId') {
      this.store.find('team', teamId).then(function(/* team */) {
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
