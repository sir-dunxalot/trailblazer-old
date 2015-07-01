import Ember from 'ember';

export function initialize(/* container, app */) {

  Ember.LinkView.reopen({
    classNameBindings: ['className'],

    className() {
      const route = this.get('params.firstObject');

      return `link-to-${route.replace('.', '-')}`;
    }.property('params.[]'),

  });

}

export default {
  name: 'views',
  initialize: initialize
};
