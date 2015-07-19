import Ember from 'ember';
import NotesAnimation from 'trailblazer/mixins/views/notes-animation';

export default Ember.View.extend(
  NotesAnimation, {

  classNameBindings: ['controller.stage.type.name'],
});
