import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

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

  cancel: function() {
    this.transitionToRoute('user', this.get('content'));
  },

  save: function() {
    var _this = this;
    var teamId = _this.get('teamId');
    var save = function() {
      _this.get('content').save().then(function(user) {
        _this.transitionToRoute('user', user);
      });
    };

    if ('teamId') {
      this.store.find('team', teamId).then(function(team) {
        save();
      }, function() {
        _this.set('teamId', null);
        // Team not found
        alert('Team not found!');
      });
    } else {
      save();
    }

  },

})
