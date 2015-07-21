import ApplicationRouteAuthMixin from 'simple-auth/mixins/application-route-mixin';
import ApplicationRouteModalMixin from 'ember-modals/mixins/routes/application';
import Ember from 'ember';

export default Ember.Route.extend(
  ApplicationRouteAuthMixin,
  ApplicationRouteModalMixin, {

  authenticate: null,

  // TODO - Have a way of passing a title to the <header> element in the application template

  // actions: {
  //   setTitle: function(title) {
  //     this.set('controller.title', title);
  //   }
  // }

});
