import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  backlogFeatures: computed.filterBy('model', 'inBacklog'),
});
