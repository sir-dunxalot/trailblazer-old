import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNames: ['app'],
  role: 'application',
});
