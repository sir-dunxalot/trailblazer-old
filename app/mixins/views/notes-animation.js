import Ember from 'ember';

export default Ember.Mixin.create({
  showNotes: Ember.computed.bool('controller.notes'),

  actions: {
    addNotes: function() {
      this.revealNotes();
    }
  },

  revealNotes: function() {
    this.set('showNotes', true);

    Ember.run.next(this, function() {
      this.$().find('.notes .input-textarea').velocity('slideDown', {
        duration: 300,
        display: 'block'
      });

      this.$().find('.notes.control').velocity({
        opacity: 1,
      }, {
        duration: 300,
        queue: false
      });
    });
  },
});
