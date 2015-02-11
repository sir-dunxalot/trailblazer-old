import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(
  ApplicationRouteMixin, {

  authenticate: null,

  registerCurrentUser: function() {
    var container = this.get('container')
    var userId = this.get('session.uid');

    this.store.find('user', userId).then(function(user) {
      container.register('user:current', user, {
        instantiate: false
      });

      ['route', 'controller', 'view'].forEach(function(place) {
        container.injection(place, 'currentUser', 'user:current');
      });
    });
  }.observes('session.uid').on('init'),

  // TODO - Have a way of passing a title to the <header> element in the application template

  // actions: {
  //   setTitle: function(title) {
  //     this.set('controller.title', title);
  //   }
  // }

});
