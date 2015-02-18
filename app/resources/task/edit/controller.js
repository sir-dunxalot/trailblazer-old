import Ember from 'ember';
import TaskController from 'trailblazer/resources/tasks/new/controller';

export default TaskController.extend({

  // TODO - Delete method

  save: function() {
    var _this = this;

    // TODO - save task on assignee here

    _this.get('content').save().then(function(task) {
      _this.transition();
    });
  },

  setDefaultStage: null

});
