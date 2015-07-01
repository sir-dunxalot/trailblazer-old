import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Mixin.create({
  showNotes: computed.bool('controller.notes'),

  actions: {
    addNotes() {
      this.revealNotes();
    }
  },

  revealNotes() {
    this.set('showNotes', true);

    run.next(this, function() {
      const jqueryElement = this.$();

      jqueryElement.find('.notes .input-textarea').velocity('slideDown', {
        duration: 300,
        display: 'block'
      });

      jqueryElement.find('.notes.control').velocity({
        opacity: 1,
      }, {
        duration: 300,
        queue: false
      });
    });
  },
});
