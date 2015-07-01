import Rollback from 'ember-easy-form-extensions/mixins/routes/rollback';
import Ember from 'ember';

export default Ember.Route.extend(
  Rollback, {

  model() {
    return this.modelFor('task');
  },

  setupController(controller, model) {
    const users = this.store.find('user', {
      team: this.get('session.currentTeam')
    });

    this._super(controller, model);

    controller.set('users', users);
  },

});
