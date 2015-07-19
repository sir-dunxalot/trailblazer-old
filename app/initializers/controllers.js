import Ember from 'ember';

const { computed } = Ember;

export function initialize(container, app) {

  Ember.Controller.reopen({
    userId: computed.oneWay('session.content.secure.uid'),
    dateFormat: app.dateFormat,
    shortDateFormat: app.shortDateFormat,
  });

}

export default {
  name: 'controllers',
  initialize: initialize
};
