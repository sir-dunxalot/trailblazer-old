import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Controller.extend({
  backlogFeatures: computed.filterBy('model', 'inBacklog'),
  rankedBacklogFeatures: computed.sort('backlogFeatures', 'sortBy'),
  sortBy: ['backlogPosition'],

  actionResponse: null,
  actionResponseFade: null,
  actionResponseClass: 'fade-out',

  actions: {
    reorderBacklog(backlog) {
      const actionResponseDelay = 3000;

      let actionResponseFade = this.get('actionResponseFade');

      backlog.forEach(function(feature, i) {
        feature.set('backlogPosition', i);
        feature.save();
      });

      if (actionResponseFade) {
        run.cancel(actionResponseFade);
      }

      this.set('actionResponse', 'Saved');

      run.later(this, function() {
        this.set('actionResponseClass', 'fade-in');
      }, 100);

      actionResponseFade = run.later(this, function() {
        this.set('actionResponseClass', 'fade-out');

        run.later(this, function() {
          this.set('actionResponse', null);
        }, 500);
      }, actionResponseDelay);

      this.set('actionResponseFade', actionResponseFade);
    }
  }
});
