import Ember from 'ember';
import AuthenticationControllerMixin from 'simple-auth/mixins/authentication-controller-mixin';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(
  AuthenticationControllerMixin, {
  // LoginControllerMixin, {

  authenticator: 'authenticator:firebase',

  // actions: {
    // authenticate: function() {


      // firebase.onAuth()
      // logout - firebase.unauth()
      // connection state
    // }
  // }

});
