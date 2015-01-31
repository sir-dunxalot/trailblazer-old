import Em from 'ember';

export function initialize(container, app) {

  Em.ControllerMixin.reopen(
    Em.Evented, {

    userId: Em.computed.readOnly('session.content.uid'),
    dateFormat: app.dateFormat

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
