import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  validations: {
    stage: {
      presence: true
    },

    name: {
      presence: true
    },

    assignee: {
      presence: true
    }
  },

  cancel: function() {
    this.transitionToRoute('feature', this.get('feature'));
  },

  save: function() {
    var _this = this;

    this.get('content').save().then(function(task) {
      var feature = task.get('feature');

      feature.get('tasks').pushObject(task);
      feature.get('content').save().then(function() {
        _this.transitionToRoute('feature', feature);
      });
    });
  },

  setDefaultStage: function() {
    var _this = this;

    _this.get('feature.stages').then(function(stages) {
      var stage = stages.objectAt(1);

      _this.set('stage', stage);
    });
  }.observes('stages.[]'),

});
