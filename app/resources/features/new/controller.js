import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

const { computed, observer } = Ember;

export default Ember.Controller.extend(
  FormMixin, {

  ignoreWeekendWarning: false,
  lowerDuration: null,
  upperDuration: null,
  userCanCreateFeature: false, // Set by route
  weekendWarning: null,

  /* Properties for the walkthrough */

  inBacklog: null,
  queryParams: ['inBacklog'],

  walkthroughComplete: computed('model.inBacklog', function() {
    const inBacklog = this.get('model.inBacklog');

    return typeof inBacklog === 'boolean';
  }),

  saveButtonText: computed('model.inBacklog', function() {
    const inBacklog = this.get('model.inBacklog');

    return inBacklog ? 'Add to backlog' : 'Add to roadmap';
  }),

  /* Validations */

  validations: {
    'model.name': {
      presence: true
    },

    'model.endDate': {
      presence: {
        unless: 'model.inBacklog'
      }
    },

    'model.inBacklog': {
      presence: true // Will pass for false
    },

    'model.startDate': {
      presence: {
        unless: 'model.inBacklog'
      }
    },
  },

  actions: {
    ignoreWeekendWarning() {
      this.get('modal').hide();
      this.set('ignoreWeekendWarning', true);
      this.save();
    },

    setInBacklog(value) {
      this.setProperties({
        inBacklog: value,
      });
    },

  },

  /* Methods */

  queryParamsToBoolean: observer('inBacklog', function() {
    const inBacklog = this.get('inBacklog');

    let value = null;

    if (inBacklog === 'true') {
      value = true;
    } else if (inBacklog === 'false') {
      value = false;
    }

    if (this.get('model')) {
      this.set('model.inBacklog', value);
    }
  }),

  cancel() {
    this.transitionToRoute('index');
  },

  runCustomValidations() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      const { ignoreWeekendWarning, model } = this.getProperties(
        [ 'ignoreWeekendWarning', 'model' ]
      );

      if (model.get('inBacklog') || ignoreWeekendWarning) {
        return resolve();
      }

      const endDate = model.get('endDate');
      const endDay = endDate.getDay();
      const endDayIsWeekend = endDay === 0 || endDay === 6;
      const startDate = model.get('startDate');
      const startDay = startDate.getDay();
      const startDayIsWeekend = startDay === 0 || startDay === 6;

      let warning;

      if ((!endDayIsWeekend && !startDayIsWeekend))  {
        return resolve();
      } if (endDayIsWeekend && startDayIsWeekend) {
        warning = 'Your feature starts and ends on a weekend';
      } else if (endDayIsWeekend) {
        warning = 'Your feature will be released on a weekend';
      } else if (startDayIsWeekend) {
        warning = 'Your feature starts on a weekend';
      }

      this.set('weekendWarning', warning);

      this.showModal('modals/confirm-weekend');

      reject();
    }.bind(this));
  },

  save() {
    const _this = this;
    const model = this.get('model');

    /* Set walkthrough properties on the model*/

    model.save().then(function(feature) {
      const stages = feature.get('stages');

      stages.forEach(function(stage, i) {
        stage.save().then(function() {

          /* If we've saved three stages... */

          if (i === stages.get('length') - 1) {
            if (feature.get('inBacklog')) {
              _this.transitionToRoute('backlog', {
                queryParams: {
                  scrollToBottom: true,
                },
              });
            } else {
              _this.transitionToRoute('feature', feature);
            }
          }
        });
      });
    });
  },

  // TODO - redo how the durations are bound

  setStageDurations: observer('lowerDuration', 'upperDuration', function() {
    const lower = this.get('lowerDuration');
    const upper = this.get('upperDuration');

    if (lower && upper) {
      const values = [
        lower,
        upper - lower,
        this.get('model.totalDuration') - upper
      ];

      this.get('model.stages').then(function(stages) {
        stages.forEach(function(stage) {
          stage.set('duration', values[stage.get('rank') - 1]);
        });
      });
    }

  }),

  setDurations: observer('model.stages.[]', function() {
    const model = this.get('model');

    model.get('stages').then(function(stages) {

      if (model.get('isDeleted')) {
        return;
      }

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
