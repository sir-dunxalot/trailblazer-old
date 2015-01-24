import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  lowerValue: 5,
  upperValue: 7,

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

});
