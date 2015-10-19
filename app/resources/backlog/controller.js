import Ember from 'ember';

const { $, computed, run } = Ember;

export default Ember.Controller.extend({
  backlogFeatures: computed.filterBy('model', 'inBacklog'),
  queryParams: ['scrollToBottom'],
  rankedBacklogFeatures: computed.sort('backlogFeatures', 'sortBy'),
  scrollToBottom: false,
  sortBy: ['backlogPosition'],

  actions: {

    reorderBacklog(backlog) {
      backlog.forEach(function(feature, i) {
        feature.set('backlogPosition', i);
        feature.save();
      });

      this.flashMessage('success', 'Backlog saved');
    },
  },

  scrollIfNecessary() {
    if (this.get('scrollToBottom')) {
      run.scheduleOnce('render', this, function() {
        $('html,body').animate({
          scrollTop: document.body.scrollHeight,
        }, 1000);
      });
    }
  },

});
