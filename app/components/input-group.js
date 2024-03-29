import Ember from 'ember';
import InputGroupComponent from 'ember-easy-form-extensions/components/input-group';
import insert from 'trailblazer/utils/computed/insert';
import layout from 'trailblazer/templates/components/input-group';

const { computed } = Ember;

export default InputGroupComponent.extend({
  className: 'control',
  isDatepicker: computed.equal('type', 'datepicker'),
  formattedInputId: insert('elementId', 'formatted-input-for-{{value}}'),
  formattedValue: null,
  layout,

  actions: {

    showError: function showError() {
      if (!this.get('isDestroying')) {
        this.set('showError', true);
      }
    },

    setGroupAsInvalid: function setGroupAsInvalid() {
      if (!this.get('isDestroying')) {
        this.set('isValid', false);
      }
    },

    setGroupAsValid: function setGroupAsValid() {
      if (!this.get('isDestroying')) {
        this.set('isValid', true);
      }
    }

  },
});
