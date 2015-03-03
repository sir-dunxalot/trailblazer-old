import Rollback from 'trailblazer/mixins/routes/rollback';
import Ember from 'ember';

export default Ember.Route.extend(
  Rollback, {

  /* TODO - is there a way to rollback nested resources? */

  undoDurationChanges: function() {
    var stages = this.get('controller.content.stages');

    stages.forEach(function(stage) {
      if (stage.get('isDirty')) {
        stage.rollback();
      }
    });
  }.on('willTransition'),

  model: function() {
    return this.modelFor('feature');
  },

});
