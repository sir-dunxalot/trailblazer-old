import InputGroupComponent from 'ember-easy-form-extensions/components/input-group';
import insert from 'trailblazer/utils/computed/insert';

const { computed } = Ember;

export default InputGroupComponent.extend({
  isDatepicker: computed.equal('type', 'datepicker'),
  formattedInputId: insert('elementId', 'formatted-input-for-{{value}}'),
  formattedValue: null,
});
