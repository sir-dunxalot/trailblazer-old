import Ember from 'ember';

export default Ember.Component.extend({
  checked: false,
  classNameBindings: ['label'],
  tagName: 'label',
});
