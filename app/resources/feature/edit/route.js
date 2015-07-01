import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  /* TODO - is there a way to rollback nested resources? */

  undoDurationChanges: Ember.on('willTransition', function() {
    const stages = this.get('controller.content.stages');

    stages.forEach(function(stage) {
      if (stage.get('isDirty')) {
        stage.rollback();
      }
    });
  }),

  model: function() {
    return this.modelFor('feature');
  },

});
