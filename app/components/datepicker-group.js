import Ember from 'ember';
import ENV from 'trailblazer/config/environment';
import InputGroupComponent from 'trailblazer/components/input-group';
import defaultFor from 'trailblazer/utils/default-for';

const { computed, observer, on } = Ember;

export default InputGroupComponent.extend({
  classNames: ['datepicker-group'],
  datepicker: null,
  format: ENV.APP.dateFormat, // Default
  formattedValue: null,
  // formController: null,
  inputPartial: 'form-inputs/datepicker',
  maxDate: null,
  minDate: null,
  type: null,

  formattedInputId: computed('inputId', function() {
    const inputId = this.get('inputId');

    return `${inputId}-formatted`;
  }),

  // TODO - set container so calendar doesn't render into the DOM multiple times

  renderDatePicker: on('didInsertElement', function() {
    const _this = this;
    const defaultDate = new Date(this.get('value'));
    const format = this.get('format');
    const formattedInputId = this.get('formattedInputId');
    const minDate = defaultFor(
      this.get('minDate'),
      moment().toDate()
    );

    this.set('datepicker',
      new window.Pikaday({
        defaultDate: defaultDate,
        field: document.getElementById(formattedInputId),
        format: format,
        margin: this.get('margin'),
        maxDate: this.get('maxDate'),
        minDate: minDate,

        onSelect: function(date) {
          _this.set('value', new Date(date));
        }
      })
    );

    this.set('formattedValue', moment(defaultDate).format(format));
  }),

  update: observer('minDate', 'maxDate', function(view, key) {
    const capitalizedKey = key.capitalize();
    const datepicker = this.get('datepicker');
    const methodName = `set${capitalizedKey}`;

    if (datepicker) {
      datepicker[methodName](new Date(this.get(key)));
    }
  }),

});
