import Ember from 'ember';
import NotesAnimation from 'trailblazer/mixins/views/notes-animation';
import Submitting from 'trailblazer/mixins/views/submitting';

export default Ember.View.extend(
  NotesAnimation,
  Submitting, {

  classNameBindings: ['controller.stage.type.name'],

});
