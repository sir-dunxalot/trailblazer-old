import Ember from 'ember';
import GithubAuthenticator from 'trailblazer/authenticators/github';
import GoogleAuthenticator from 'trailblazer/authenticators/google';
import Session from 'simple-auth/session';

const { observer } = Ember;

export function initialize(container) {
  container.register('authenticator:github', GithubAuthenticator);
  container.register('authenticator:google', GoogleAuthenticator);

  Session.reopen({
    currentTeam: null,
    currentUser: null,

    setCurrentUser: observer('content.secure.uid', function() {
      const store = container.lookup('store:main');
      const userId = this.get('content.secure.uid');

      if (userId) {
        return store.find('user', userId).then(function(user) {
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
