import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(
  ApplicationRouteMixin, {

  authenticate: null,

  // TODO - Have a way of passing a title to the <header> element in the application template

  // actions: {
  //   setTitle: function(title) {
  //     this.set('controller.title', title);
  //   }
  // }

});
