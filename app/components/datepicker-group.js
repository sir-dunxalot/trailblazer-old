import Ember from 'ember';
import ENV from 'trailblazer/config/environment';
import InputGroupComponent from 'traiblazer/components/input-group';
import defaultFor from 'trailblazer/utils/default-for';

export default InputGroupComponent.extend({
  classNames: ['datepicker-group', 'removed'],
  datepicker: null,
  format: ENV.APP.dateFormat, // Default
  maxDate: null,
  minDate: null,
  type: 'hidden',

  // TODO - set container so calendar doesn't render into the DOM multiple times

  renderDatePicker: Ember.on('didInsertElement', function() {
    const _this = this;
    const defaultDate = new Date(this.get('value'));
    const format = this.get('format');
    const inputId = this.get('formattedInputId');
    const minDate = defaultFor(
      this.get('minDate'),
      moment().toDate()
    );

    this.set('datepicker',
      new window.Pikaday({
        defaultDate: defaultDate,
        field: document.getElementById(inputId),
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

  update: Ember.observer('minDate', 'maxDate', function(view, key) {
    const datepicker = this.get('datepicker');
    const method = 'set' + key.split('.')[1].capitalize();

    if (datepicker) {
      datepicker[method](moment(this.get(key)));
    }
  }),

});
