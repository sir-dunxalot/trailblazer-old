import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';

export default Ember.Component.extend({
  checked: false,
  classNameBindings: ['className'],
  classNames: ['checkbox_wrapper'],
  inputId: insert('elementId', 'input-{{value}}'),
  tagName: 'label',
  label: null,

  className: function() {
    return this.get('label').dasherize();
  }.property('label'),
});
