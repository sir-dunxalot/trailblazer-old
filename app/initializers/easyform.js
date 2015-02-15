import Config from 'trailblazer/config/environment';
import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';
import { EmberSelectizeComponent } from 'ember-cli-selectize/index';

export default {
  name: 'easy-form',

  initialize: function( container, app ) {

    /* Datepicker built with pickaday */

    Ember.EasyForm.DatePicker = Em.EasyForm.TextField.extend({
      classNames: ['datepicker', 'removed'],
      datepicker: null,
      type: 'hidden',

      // TODO - set container so calendar doesn't render into the DOM multiple times

      format: function() {
        return defaultFor(
          this.get('parentView.format'),
          Config.APP.dateFormat
        );
      }.property('parentView.format'),

      renderDatePicker: function() {
        var _this = this;
        var defaultDate = new Date(this.get('value'));
        var format = this.get('format');
        var parentView = this.get('parentView');
        var inputId = parentView.get('datepickerInputId');
        var minDate = defaultFor(
          parentView.get('minDate'),
          moment().toDate()
        );

        this.set('datepicker',
          new Pikaday({
            defaultDate: defaultDate,
            field: document.getElementById(inputId),
            format: format,
            margin: this.get('margin'),
            maxDate: parentView.get('maxDate'),
            minDate: minDate,

            onSelect: function(date) {
              _this.set('value', new Date(date));
            }
          })
        );

        parentView.$().find('#' + inputId).val(
          moment(defaultDate).format(format)
        );
      }.on('didInsertElement'),

      update: function(view, key) {
        var datepicker = this.get('datepicker');
        var method = 'set' + key.split('.')[1].capitalize();

        if (datepicker) {
          datepicker[method](moment(this.get(key)));
        }
      }.observes('parentView.minDate', 'parentView.maxDate')

    });

    Ember.EasyForm.Config.registerInputType('date',
      Ember.EasyForm.DatePicker
    );

    Ember.EasyForm.Selectize = EmberSelectizeComponent.extend({
      content: Em.computed.oneWay('parentView.content'),
      disabled: Em.computed.oneWay('parentView.disabled'),
      loading: Em.computed.not('content.isLoaded'),
      value: Em.computed.alias('selection'),
    });

    Ember.EasyForm.Config.registerInputType('selectize',
      Ember.EasyForm.Selectize
    );

  }
};
