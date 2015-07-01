import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  // TODO - deprecate route

  model() {
    return this.store.createRecord('user');
  },

  setupController(controller, model) {
    const teams = this.store.find('team');

    this._super(controller, model);
    controller.set('teams', teams);
  },

});
