import AuthenticatorBase from 'trailblazer/authenticators/base';
import Ember from 'ember';

export default AuthenticatorBase.extend({
  provider: 'google',
  scope: 'email',

  createUser: function(authData, store) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const googleData = authData.google;
      const googleProfile = authData.google.cachedUserProfile;
      const nameParts = googleData.displayName.split(' ');
      const newUser = store.createRecord('user', {
        avatarUrl: googleData.profileImageURL,
        email: googleData.email,
        id: authData.uid,
        firstName: nameParts[0],
        lastName: nameParts[1],
      });

      newUser.save().then(function(user) {
        resolve(user);
      }, function() {
        reject();
      });

    });
  },

});
