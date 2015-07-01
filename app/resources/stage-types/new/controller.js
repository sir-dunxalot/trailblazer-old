import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  save() {
    this.get('content').save().then(function(/* stageType */) {
      this.transitionToRoute('features');
    }.bind(this));
  },

});
