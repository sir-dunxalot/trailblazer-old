import Rollback from 'trailblazer/mixins/routes/rollback';
import Ember from 'ember';

export default Ember.Route.extend(
  Rollback, {

  model: function() {
    return this.modelFor('task');
  },

  setupController: function(controller, model) {
    var users = this.store.find('user', {
      team: this.get('session.currentTeam')
    });

    this._super(controller, model);

    controller.set('users', users);
  },

});
