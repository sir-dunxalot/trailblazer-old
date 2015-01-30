import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  lowerDuration: null,
  upperDuration: null,

  totalDuration: function() {
    var endDate = moment(this.get('endDate'));
    var startDate = moment(this.get('startDate'));

    return endDate.diff(startDate, 'days');
  }.property('startDate', 'endDate'),

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

  cancel: function() {
    this.transitionToRoute('index');
  },

  save: function() {
    var _this = this;
    var feature = this.get('content');

    this.get('stages').forEach(function(stage) {
      stage.set('feature', feature);
      stage.save();
    });

    feature.save().then(function(feature) {
      _this.transitionToRoute('feature', feature);
    });
  },

  // TODO - redo how the durations are bound

  setStageDurations: function() {
    var lower = this.get('lowerDuration');
    var upper = this.get('upperDuration');
    var hash;

    if (lower && upper) {
      hash = {
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

  }.observes('lowerDuration', 'upperDuration'),

});
