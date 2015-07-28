import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['task.completed'],
  classNames: ['task_item'],
  tagName: 'li',
  task: null,

  actions: {
    toggleTaskCompletion(task) {
      this.get('targetObject').send('toggleTaskCompletion', task);
    }
  }
});
