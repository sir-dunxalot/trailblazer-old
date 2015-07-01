import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  model() {
    return this.store.createRecord('stageType');
  }

});
