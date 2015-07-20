import AuthenticatorBase from 'trailblazer/authenticators/base';
import Ember from 'ember';

export default AuthenticatorBase.extend({
  provider: 'github',
  scope: 'user:email',

  createUser: function(authData, store) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
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

});
