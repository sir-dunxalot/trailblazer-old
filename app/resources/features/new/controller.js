import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

const { observer } = Ember;

export default Ember.Controller.extend(
  FormMixin, {

  lowerDuration: null,
  upperDuration: null,
  userCanCreateFeature: false, // Set by route

  /* Validations */

  validations: {
    'model.name': {
      presence: true
    },

    'model.endDate': {
      presence: true
    },

    'model.startDate': {
      presence: true
    }
  },

  /* Methods */

  cancel() {
    this.transitionToRoute('index');
  },

  save() {
    const _this = this;
    const model = this.get('model');

    model.save().then(function(feature) {

      feature.get('stages').forEach(function(stage) {
        stage.save();
      });

      _this.transitionToRoute('feature', feature);
    });
  },

  // TODO - redo how the durations are bound

  setStageDurations: observer('lowerDuration', 'upperDuration', function() {
    const lower = this.get('lowerDuration');
    const upper = this.get('upperDuration');

    if (lower && upper) {
      const hash = {
        research: lower,
        development: upper - lower,
        testing: this.get('model.totalDuration') - upper
      };

      this.get('model.stages').then(function(stages) {
        stages.forEach(function(stage) {
          stage.get('type').then(function(type) {
            stage.set('duration', hash[type.get('name')]);
          });
        });
      });
    }

  }),

  setDurations: observer('model.stages.[]', function() {
    this.get('model.stages').then(function(stages) {
      const researchStage = stages.objectAt(0);
      const developmentStage = stages.objectAt(1);

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
