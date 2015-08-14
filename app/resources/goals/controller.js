import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  roadmapFeatures: computed.filterBy('model', 'inBacklog', false),
});
