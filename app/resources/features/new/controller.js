import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  lowerDuration: null,
  upperDuration: null,
  userCanCreateFeature: false, // Set by route

  /* Validations */

  validations: {
    name: {
      presence: true
    },

    endDate: {
      presence: true
    },

    startDate: {
      presence: true
    }
  },

  /* Methods */

  cancel() {
    this.transitionToRoute('index');
  },

  save() {
    const feature = this.get('content');

    this.get('stages').forEach(function(stage) {
      stage.set('feature', feature);
      stage.save();
    });

    feature.save().then(function(feature) {
      this.transitionToRoute('feature', feature);
    }.bind(this));
  },

  // TODO - redo how the durations are bound

  setStageDurations: Ember.observer('lowerDuration', 'upperDuration', function() {
    const lower = this.get('lowerDuration');
    const upper = this.get('upperDuration');

    if (lower && upper) {
      const hash = {
        research: lower,
        development: upper - lower,
        testing: this.get('totalDuration') - upper
      };

      this.get('stages').forEach(function(stage) {
        stage.get('type').then(function(type) {
          stage.set('duration', hash[type.get('name')]);
        });
      });
    }

  }),

  setDurations: Ember.observer('stages.[]', function() {
    this.get('stages').then(function(stages) {
      var researchStage = stages.objectAt(0);
      var developmentStage = stages.objectAt(1);

      if (researchStage) {
        const lower = researchStage.get('duration');
        const upper = lower + developmentStage.get('duration');

        this.setProperties({
          lowerDuration: lower,
          upperDuration: upper
        });
      }
    }.bind(this));

  }),

});
