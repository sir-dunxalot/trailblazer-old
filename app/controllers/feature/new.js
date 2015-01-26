import defaultFor from 'trailblazer/utils/default-for';
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

    end: {
      presence: true
    },

    start: {
      presence: true
    }
  },

  /* Methods */

  save: function() {
    var _this = this;

    this.get('content').save().then(function(feature) {
      _this.transitionToRoute('show', feature);
    });
  },

  setStageDurations: function() {
    var lower = this.get('lowerDuration');
    var upper = this.get('upperDuration');
    var hash = {
      research: lower,
      development: upper - lower,
      testing: this.get('totalDuration') - upper
    };

    this.get('stages').forEach(function(stage) {
      stage.set('duration', hash[stage.get('type.name')]);
    });

  }.observes(
    'lowerDuration',
    'upperDuration',
    'totalDuration',
    'stages.[]'
  ),

});
