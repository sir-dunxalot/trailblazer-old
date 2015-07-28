import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  model() {
    const feature = this.modelFor('feature');

    return this.store.createRecord('task', {
      assignee: this.get('session.currentUser'),
      feature: feature
    });
  },

  setupController(controller, model) {
    const currentTeam = this.get('session.currentTeam');

    this._super(controller, model);

    const users = this.store.findAll('user', {
      team: currentTeam.get('id'),
    });

    controller.set('users', users);
  },

});

// TODO - ability to add branch name with github integration
// TODO - Ability to delete features/tasks (they should actually just get hidden)
