import Ember from 'ember';

export function initialize(container, app) {

  Ember.ControllerMixin.reopen(
    Ember.Evented, {

    userId: Ember.computed.readOnly('session.content.uid'),
    dateFormat: app.dateFormat,
    shortDateFormat: app.shortDateFormat

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
