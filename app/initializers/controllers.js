import Ember from 'ember';

export function initialize(container, app) {
  var dateFormat = app.dateFormat;
  var shortDateFormat = dateFormat.split(',')[0];

  Ember.ControllerMixin.reopen(
    Ember.Evented, {

    userId: Ember.computed.readOnly('session.content.uid'),
    dateFormat: dateFormat,
    shortDateFormat: shortDateFormat

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
