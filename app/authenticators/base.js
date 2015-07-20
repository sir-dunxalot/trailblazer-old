import AuthenticatorBase from 'simple-auth/authenticators/base';
import Ember from 'ember';
import ENV from 'trailblazer/config/environment';

const { RSVP, run } = Ember;
const firebase = new Firebase(ENV.APP.firebaseUrl);

export default AuthenticatorBase.extend({
  provider: null,

  authenticate: function(/* options */) {
    const _this = this;
    const { provider, scope } = this.getProperties(
      [ 'provider', 'scope' ]
    );

    return new RSVP.Promise(function(resolve, reject) {
      firebase.authWithOAuthPopup(provider, function(error, authData) {
        run(function() {

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
      }, {
        scope
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
