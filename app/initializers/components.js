import Ember from 'ember';

export function initialize(/* container, app */) {

  Ember.LinkComponent.reopen({
    classNameBindings: ['className'],

    className: Ember.computed('params.[]', function() {
      const route = this.get('params.firstObject');

      return `link-to-${route.replace('.', '-')}`;
    }),

  });

}

export default {
  name: 'components',
  initialize: initialize
};
