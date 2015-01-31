import Rollback from 'trailblazer/mixins/routes/rollback';
import Ember from 'ember';

export default Ember.Route.extend(
  Rollback, {

  model: function() {
    return this.modelFor('user');
  },

  setupController: function(controller, model) {
    var team = model.get('team');

    this._super(controller, model);

    if (team) {
      controller.set('teamId', team.get('id'))
    }
  },

});
