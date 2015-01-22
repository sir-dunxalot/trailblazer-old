import Em from 'ember';

export function initialize(/* container, app */) {

  Em.ControllerMixin.reopen(
    Em.Evented, {

  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
