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

  save: function() {
    var _this = this;

    this.get('content').save().then(function(feature) {
      _this.transitionToRoute('show', feature);
    });
  },

  setStageDurations: function() {

  }.observes('lowerValue', 'upperValue', 'totalDuration'),

});
