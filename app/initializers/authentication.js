import AuthenticatorBase from 'simple-auth/authenticators/base';
import Ember from 'ember';
import ENV from 'trailblazer/config/environment';
import Session from 'simple-auth/session';

const { RSVP, observer } = Ember;

const firebase = new Firebase(ENV.APP.firebaseUrl);
const Authenticator = AuthenticatorBase.extend({

  authenticate: function(/* options */) {
    const _this = this;

    return new RSVP.Promise(function(resolve, reject) {
      firebase.authWithOAuthPopup('github', function(error, authData) {
        Ember.run(function() {

          if (error) {
            const code = error.code;

            if (code === 'USER_CANCELLED' || code === 'USER_DENIED') {
              // Don't show errors for these
            } else {
              reject(error);
            }
          } else {
            const store = _this.get('container').lookup('store:main');

            store.findRecord('user', authData.uid).then(function(/* user */) {
              // If user is already registered
              resolve(authData);
            }, function() {
              // If user is not registered...
              store.unloadAll('user');
              _this.createUser(authData, store).then(function(/* account */) {
                resolve(authData);
              });
            });
          }
        });
      });
    });
  },

  createUser: function(authData, store) {
    return new RSVP.Promise(function(resolve, reject) {
      const githubData = authData.github;
      const githubProfile = authData.github.cachedUserProfile;
      const nameParts = githubData.displayName.split(' ');
      const newUser = store.createRecord('user', {
        avatarUrl: githubProfile.avatar_url,
        email: githubData.email,
        id: authData.uid,
        firstName: nameParts[0],
        githubUserName: githubData.username,
        lastName: nameParts[1],
      });

      newUser.save().then(function(user) {
        resolve(user);
      }, function() {
        reject();
      });

    });
  },

  invalidate: function(authData) {
    return new RSVP.Promise(function(resolve /*, reject */) {
      firebase.unauth();
      resolve(authData);
    });
  },

  restore: function(authData) {
    return new RSVP.Promise(function(resolve, reject) {
      const timestamp = Math.floor(Date.now() / 1000);

      // TODO - Does simple auth handle this?
      if (authData && authData.expires > timestamp) {
        resolve(authData);
      } else {
        reject();
      }
    });
  },

});

export function initialize(container) {
  container.register('authenticator:firebase', Authenticator);

  Session.reopen({
    currentTeam: null,
    currentUser: null,

    setCurrentUser: observer('uid', function() {
      const store = container.lookup('store:main');
      const userId = this.get('uid');

      if (userId) {
        return store.findRecord('user', userId).then(function(user) {
          this.setProperties({
            currentTeam: user.get('team'),
            currentUser: user
          });
        }.bind(this));
      }
    })

  });
}

export default {
  name: 'authentication',
  initialize: initialize
};
