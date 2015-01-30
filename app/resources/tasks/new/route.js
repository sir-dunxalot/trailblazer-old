import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    var feature = this.modelFor('feature');

    return this.store.createRecord('task', {
      // TODO - set assignee here
      feature: feature
    });
  },

  setupController: function(controller, model) {
    // TODO - Just the team of the user
    var _this = this;
    var feature = model.get('feature');
    var users = this.store.find('user');

    this._super(controller, model);

    feature.get('stages').then(function(stages) {

      var testTask = _this.store.createRecord('task', {
        // TODO - set assignee here
        feature: feature,
        stage: stages.findBy('type.name', 'testing')
      });

      // HERE - stage is undefined
      console.log(stages);

      controller.setProperties({
        users: users,
        testTask: testTask
      });

    });
  },

});

// TODO - ability to add branch name with github integration
// TODO - Ability to delete things (feature just gets hidden)
