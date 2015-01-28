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

  save: function() {
    var _this = this;

    this.get('content').save().then(function(task) {
      _this.transitionToRoute('feature.show', task.get('feature'));
    });
  },

});
