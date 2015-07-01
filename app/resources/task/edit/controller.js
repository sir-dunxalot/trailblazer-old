import TaskController from 'trailblazer/resources/tasks/new/controller';

export default TaskController.extend({

  // TODO - Delete method

  save() {

    // TODO - save task on assignee here

    this.get('model').save().then(function(/* task */) {
      this.transition();
    }.bind(this));
  },

  setDefaultStage: null

});
