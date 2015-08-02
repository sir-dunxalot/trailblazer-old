import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  _passedQueryParams: null,

  /* TODO - is there a way to rollback nested resources? */

  undoDurationChanges: Ember.on('willTransition', function() {
    const stages = this.get('controller.content.stages');

    stages.forEach(function(stage) {
      if (stage.get('isDirty')) {
        stage.rollback();
      }
    });
  }),

  model: function(params) {
    this.set('_passedQueryParams', params); // Hack for setupController

    return this.modelFor('feature');
  },

  setupController(controller, model) {
    const inBacklogParam = this.get('_passedQueryParams.inBacklog');

    let inBacklog;

    if (inBacklogParam === 'true') {
      inBacklog = true;
    } else if (inBacklogParam === 'false') {
      inBacklog = false;
    }

    if (typeof inBacklog === 'boolean') {
      model.set('inBacklog', inBacklog);
    }

    this._super(controller, model);
  }

});
