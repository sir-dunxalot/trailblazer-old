import AuthenticatorBase from 'simple-auth/authenticators/base';
import Ember from 'ember';

var firebase = new Firebase('https://trailblazer.firebaseio.com');
var CustomAuthenticator = AuthenticatorBase.extend({

  authenticate: function(/* options */) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      firebase.authWithOAuthPopup('github', function(error, authData) {
        Ember.run(function() {

          if (error) {
            var code = error.code;

            if (code === 'USER_CANCELLED' || code === 'USER_DENIED') {
              // Don't show errors for these
            } else {
              reject(error);
            }
          } else {
            var store = _this.get('container').lookup('store:main');

            store.find('user', authData.uid).then(function(user) {
              // If user if already registered
              resolve(authData);
            }, function() {
              // If user is not registered...
              store.unloadAll('user');
              _this.createUser(authData, store).then(function(account) {
                resolve(authData);
              });
            });
          }
        });
      });
    });
  },

  createUser: function(authData, store) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var githubData = authData.github;
      var githubProfile = authData.github.cachedUserProfile;
      var nameParts = githubData.displayName.split(' ');
      var newUser = store.createRecord('user', {
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
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      firebase.unauth();
      resolve(authData);
    });
  },

  restore: function(authData) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var timestamp = Math.floor(Date.now() / 1000);

      // TODO - Does simple auth handle this?
      if (authData && authData.expires > timestamp) {
        resolve(authData);
      } else {
        reject();
      }
    });
  },

});

export function initialize(container, app) {
  container.register('authenticator:firebase', CustomAuthenticator);
}

export default {
  name: 'authentication',
  initialize: initialize
}
