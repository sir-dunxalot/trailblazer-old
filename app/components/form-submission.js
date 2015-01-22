import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'form_submission'],
  formSubmitted: Em.computed.oneWay('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  watchForEmptyComponent: function() {
    if (!this.get('cancel') && !this.get('submit')) {
      Em.warn('Form submission component: you are not showing the submit or the cancel button.');
    }
  }.observes('cancel', 'submit'),
});
