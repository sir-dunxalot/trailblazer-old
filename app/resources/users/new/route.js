import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    return this.store.createRecord('user');
  },

  setupController: function(controller, model) {
    var teams = this.store.find('team');

    this._super(controller, model);
    controller.set('teams', teams);
  },

});
