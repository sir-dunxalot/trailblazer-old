import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  model() {
    return this.modelFor('task');
  },

  setupController(controller, model) {
    const users = this.store.findRecord('user', {
      team: this.get('session.currentTeam')
    });

    this._super(controller, model);

    controller.set('users', users);
  },

});
