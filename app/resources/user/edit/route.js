import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  model() {
    return this.modelFor('user');
  },

  setupController(controller, model) {
    const team = model.get('team');

    this._super(controller, model);

    if (team) {
      controller.set('teamId', team.get('id'));
    }
  },

});
