import Em from 'ember';

export function initialize(container, app) {

  Em.ControllerMixin.reopen(
    Em.Evented, {

    dateFormat: app.dateFormat

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
