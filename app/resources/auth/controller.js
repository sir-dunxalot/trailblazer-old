import Ember from 'ember';

var firebase = new Firebase('https://trailblazer.firebaseio.com');

export default Ember.Controller.extend({

  user: null,

  createUser: function(user) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var account = this.store.createRecord({
        id: user.uid,
      });

      account.save().then(resolve, reject);
    });
  },

  login: function() {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      firebase.authWithOAuthPopup('github', function(error, authData) {
        Ember.run(function() {

          if (error) {
            reject(error);
          } else {
            var params = { id: authData.uid };

            _this.store.find('user', params).then(function(user) {
              if (!user) {
                _this.createUser(user).then(function(account) {
                  _this.set('user', account);
                  resolve();
                });
              } else {
                _this.set('user', account);
                resolve();
              }
            });
          }
        });
      });
    });
  },

  logout: function() {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      firebase.unauth();
      this.set('user', null);
    });
  }

});


/*

authData: {
  uid: Unique user ID
  token: Firebase auth token for the session
  github.id: Github user ID
  github.accessToken: Github OAuth 2.0 access token
  github.displayName: The github user's full name
}

*/
