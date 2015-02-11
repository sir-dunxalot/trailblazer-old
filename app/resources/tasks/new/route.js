import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    var store = this.store;
    var feature = this.modelFor('feature');
    var userId = this.get('session.uid');

    return store.createRecord('task', {
      assignee: store.find('user', userId),
      feature: feature
    });
  },

  setupController: function(controller, model) {
    // TODO - Just the team of the user
    var _this = this;
    var store = _this.store;
    var feature = model.get('feature');
    var userId = this.get('session.uid');
    var users = store.find('user');

    this._super(controller, model);

    feature.get('stages').then(function(stages) {

      var testTask = store.createRecord('task', {
        assignee: store.find('user', userId),
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
