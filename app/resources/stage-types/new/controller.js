import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';

export default Ember.ObjectController.extend(
  FormMixin, {

  save() {
    this.get('model').save().then(function(/* stageType */) {
      this.transitionToRoute('features');
    }.bind(this));
  },

});
