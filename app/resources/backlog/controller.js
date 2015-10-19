import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  backlogFeatures: computed.filterBy('model', 'inBacklog'),
  rankedBacklogFeatures: computed.sort('backlogFeatures', 'sortBy'),
  sortBy: ['backlogPosition'],

  actions: {

    addFirstFeature() {
      this.transitionToRoute('features.new', {
        queryParams: {
          inBacklog: true,
        }
      });
    },

    reorderBacklog(backlog) {
      backlog.forEach(function(feature, i) {
        feature.set('backlogPosition', i);
        feature.save();
      });

      this.flashMessage('success', 'Backlog saved');
    },
  },

});
