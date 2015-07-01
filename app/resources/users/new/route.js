import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

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
