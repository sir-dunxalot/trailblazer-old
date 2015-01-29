import Ember from 'ember';
import FeatureController from 'trailblazer/resources/features/new/controller';

export default FeatureController.extend({

  setDurations: function() {
    var _this = this;

    this.get('stages').then(function(stages) {
      var researchStage = stages.objectAt(0);
      var developmentStage = stages.objectAt(1);
      var lower, upper;

      console.log(researchStage);

      if (researchStage) {
        lower = researchStage.get('duration');
        upper = lower + developmentStage.get('duration');

        console.log(upper, lower);

        _this.setProperties({
          lowerDuration: lower,
          upperDuration: upper
        });
      }
    });

  }.observes('stages.[]'),

})
