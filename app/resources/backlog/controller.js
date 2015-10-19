import Ember from 'ember';

const { computed, on, run } = Ember;

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
    if (this.get('scrollToBottom') === 'true') {
      run.scheduleOnce('render', this, function() {
        console.log('scrolling down');
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  },

});
