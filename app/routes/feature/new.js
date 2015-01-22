import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model: function() {
    return this.store.createRecord('feature');
  }

});
