import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Em.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  watchForEmptyComponent: function() {
    if (!this.get('cancel') && !this.get('submit')) {
      Em.warn('Form submission component: you are not showing the submit or the cancel button.');
    }
  }.observes('cancel', 'submit'),

  animationButtons: function() {
    if (this.get('formSubmitted')) {
      this.$().find('button').velocity({
        'padding-left': 0,
        'padding-right': 0,
        width: 0,
        opacity: 0
      }, {
        duration: 100
      });
    } else {
      this.$().velocity('reverse');
    }
  }.observes('formSubmitted'),
});
