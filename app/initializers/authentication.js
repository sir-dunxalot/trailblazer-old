import AuthenticatorBase from 'simple-auth/authenticators/base';
import Ember from 'ember';

var CustomAuthenticator = AuthenticatorBase.extend({

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      console.log('farts');
    });
  },

  invalidate: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

    });
  }

});

export function initialize(container, app) {
  container.register('authenticator:firebase', CustomAuthenticator);
};

export default {
  name: 'authentication',
  initialize: initialize
};
