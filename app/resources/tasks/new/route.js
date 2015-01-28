import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    var feature = this.modelFor('feature');

    return this.store.createRecord('task', {
      feature: feature
    });
  },

});
