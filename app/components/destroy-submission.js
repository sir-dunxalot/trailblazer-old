import Ember from 'ember';

export default Ember.Component.extend(
  Em.ViewTargetActionSupport, {

  classNameBindings: ['destroySubmitted:button:button-primary'],
  destroyText: 'Delete',
  iconClass: 'icon-times-circle',
  tagName: 'button',
  test: 'destroy',

  click: function() {
    this.triggerAction({
      action: 'destroy',
      target: this.get('parentView'),
    });
  },

  destroySubmitted: function() {
    var page = this.get('parentView');
    var controller = page.get('controller');
    var formSubmitted = controller.get('formSubmitted');

    return formSubmitted;
  }.property('parentView.controller.formSubmitted'),
});
