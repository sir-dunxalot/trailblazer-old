import Ember from 'ember';
import Submitting from 'trailblazer/mixins/views/submitting';

export default Ember.View.extend(
  Submitting, {

  showNotes: Em.computed.bool('controller.notes'),

  actions: {
    addNotes: function() {
      this.set('showNotes', true);
      this.revealNotes();
    }
  },

  revealNotes: function() {
    Em.run.next(this, function() {
      this.$().find('.notes .input-textarea').velocity('slideDown', {
        duration: 300
      });
    });
  },

});
