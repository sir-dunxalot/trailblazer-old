import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    var feature = this.modelFor('feature');

    return this.store.createRecord('task', {
      assignee: this.get('session.currentUser'),
      feature: feature
    });
  },

  setupController: function(controller, model) {
    var users = this.store.find('user', {
      team: this.get('session.currentTeam')
    });

    this._super(controller, model);

    controller.set('users', users);
  },

});

// TODO - ability to add branch name with github integration
// TODO - Ability to delete features/tasks (they should actually just get hidden)
