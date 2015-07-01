import Ember from 'ember';

const { computed } = Ember;

export function initialize(container, app) {

  Ember.ControllerMixin.reopen(
    Ember.Evented, {

    userId: computed.readOnly('session.content.uid'),
    dateFormat: app.dateFormat,
    shortDateFormat: app.shortDateFormat

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
