import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNameBindings: ['controller.currentRouteName'],
  classNames: ['app'],
  role: 'application',
});
