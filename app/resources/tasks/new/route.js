import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  // TODO - delete test record on cancel

  model: function() {
    var feature = this.modelFor('feature');

    return this.store.createRecord('task', {
      assignee: this.get('session.currentUser'),
      feature: feature
    });
  },

  setupController: function(controller, model) {
    var _this = this;
    var session = this.get('session');
    var store = _this.store;
    var feature = model.get('feature');
    var currentUser = session.get('currentUser');
    var users = store.find('user', {
      team: session.get('currentTeam')
    });

    this._super(controller, model);

    feature.get('stages').then(function(stages) {

      var testTask = store.createRecord('task', {
        assignee: currentUser, // TODO - whatever is chosen
        feature: feature,
        stage: stages.findBy('type.name', 'testing')
      });

      controller.setProperties({
        users: users,
        testTask: testTask
      });

    });
  },

});

// TODO - ability to add branch name with github integration
// TODO - Ability to delete things (feature just gets hidden)
