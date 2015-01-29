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
    // TODO - Just your team
    var users = this.store.find('user');

    this._super(controller, model);
    controller.set('users', users);
  }

});
