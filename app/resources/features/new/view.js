import Ember from 'ember';
import NotesAnimation from 'trailblazer/mixins/views/notes-animation';
import Submitting from 'ember-easy-form-extensions/mixins/views/submitting';

export default Ember.View.extend(
  NotesAnimation,
  Submitting, {

});
