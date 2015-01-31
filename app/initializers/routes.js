import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import Ember from 'ember';

export function initialize(/* container, app */) {

  /**
  @class Em.Route
  @submodule routes
  */

  Ember.Route.reopen(
    Ember.Evented, {

    authenticate: true,

    addAuthenticationMixin: function() {
      // So null doesn't add anything
      if (this.get('authenticate')) {
        this.reopen(AuthenticatedRouteMixin);
      } else if (this.get('authenticate') === false) {
        this.reopen(UnauthenticatedRouteMixin);
      }
    }.on('init'),

    /**
    @ISSUE https://github.com/emberjs/ember.js/issues/5394
    */

    _actions: {

      /**
      Adds the `routeDidTransition` event to the route's controller. The event will trigger everytime the router has finished transitioning into the route - it triggers on the route that has been transitioned into, not the previous route. Thus, it can be used to reliably reset controller properties on 'page load'. For example:

      ```
      App.SomeController = Em.ObjectController.extend({
        templateChosen: false,

        resetTemplateChosen: function() {
          this.set('templateChosen', false);
        }.on('routeDidTransition'),
      });
      ```

      Also triggers `didTransition` on this route so methods can run on the `didTransition` event without overwriting this action.

      @event didTransition
      @return true so the action bubbles
      */

      didTransition: function() {
        this.get('controller').trigger('routeDidTransition');
        this.trigger('didTransition');

        return true; // So action bubbles
      },

      /**
      Adds the `routeWillTransition` event to the route's controller. This event will trigger when the user is about to navigate away from the current route. Thus, it can be used to manually remove observers, tear down methods, undo changes, etc.

      Also triggers `willTransition` on this route so methods can run on the `willTransition` event without overwriting this action.

      @event willTransition
      @return true so the action bubbles
      */

      willTransition: function() {
        this.get('controller').trigger('routeWillTransition');
        this.trigger('willTransition');

        return true;
      }
    }
  });

}

export default {
  name: 'routes',
  initialize: initialize
};
