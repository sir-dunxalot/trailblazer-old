import Ember from 'ember';
import TaskController from 'trailblazer/resources/tasks/new/controller';

export default TaskController.extend({

  save: function() {
    var _this = this;

    // TODO - save task on assignee here

    _this.get('content').save().then(function(task) {
      _this.transitionToRoute('feature', task.get('feature'));
    });
  },

  setDefaultStage: null

});