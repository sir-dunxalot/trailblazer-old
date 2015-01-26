import Ember from 'ember';
import FeatureController from 'trailblazer/controllers/feature/new';

export default FeatureController.extend({

  setDurations: function() {
    var stages = this.get('stages');
    var researchStage = stages.findBy('type.name', 'research');
    var developmentStage = stages.findBy('type.name', 'development');
    var lower = researchStage.get('duration');
    var upper = lower + developmentStage.get('duration');

    this.setProperties({
      lowerDuration: lower,
      upperDuration: upper
    });

  },

})
