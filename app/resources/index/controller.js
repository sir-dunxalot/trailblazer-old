import Ember from 'ember';
import AuthenticationControllerMixin from 'simple-auth/mixins/authentication-controller-mixin';

export default Ember.Controller.extend(
  AuthenticationControllerMixin, {

  authenticator: null,

  actions: {
    authenticateFor(provider) {
      this.set('authenticator', `authenticator:${provider}`);

      this.send('authenticate');
    },

    showLoginModal() {
      this.showModal('modals/login');
    },
  }
});
