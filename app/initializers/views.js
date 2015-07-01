import Ember from 'ember';

export function initialize(/* container, app */) {

  Ember.LinkView.reopen({
    classNameBindings: ['className'],

    className: Ember.computed('params.[]', function() {
      const route = this.get('params.firstObject');

      return `link-to-${route.replace('.', '-')}`;
    }),

  });

}

export default {
  name: 'views',
  initialize: initialize
};
