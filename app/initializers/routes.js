import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import Ember from 'ember';

const { computed, on } = Ember;

export function initialize(/* container, app */) {

  /**
  @class Em.Route
  @submodule routes
  */

  Ember.Route.reopen(
    Ember.Evented, {

    authenticate: true,
    userId: computed.readOnly('session.content.secure.uid'),

    addAuthenticationMixin: on('init', function() {
      // So null doesn't add anything
      if (this.get('authenticate')) {
        this.reopen(AuthenticatedRouteMixin);
      } else if (this.get('authenticate') === false) {
        this.reopen(UnauthenticatedRouteMixin);
      }
    }),

    flashMessage(type, message) {
      this.notifications.addNotification({
        autoClear: true,
        message,
        type,
      });
    },

  });

}

export default {
  name: 'routes',
  initialize: initialize
};
