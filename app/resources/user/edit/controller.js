import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

const { computed, on } = Ember;

export default Ember.Controller.extend(
  FormMixin, {


  highlightInputFor: null,
  highlightMessage: null,
  queryParams: ['highlightInputFor', 'highlightMessage'],
  teamId: null,
  tooltip: null,

  validations: {

    'model.avatarUrl': {
      presence: true
    },

    'model.firstName': {
      presence: true
    },

    'model.lastName': {
      presence: true
    },

    'model.teamId': {
      presence: true
    }

  },

  teamHint: computed('model.team.name', function() {
    const teamName = this.get('team.name');

    if (teamName) {
      return `You are currently a member of ${teamName}`;
    } else {
      return 'Don\'t know your team ID? Ask a colleague';
    }
  }),

  /* Methods */

  highlightInput: on('routeDidTransition', function() {
    const { highlightInputFor, highlightMessage } = this.getProperties(
      [ 'highlightInputFor', 'highlightMessage' ]
    );

    if (highlightInputFor) {
      Ember.run.scheduleOnce('afterRender', this, function() {
        const dasherizedName = Ember.String.dasherize(highlightInputFor);
        const selector = `[data-test="input-wrapper-for-${dasherizedName}"] input`;
        const inputElement = Ember.$(selector)[0];
        const tooltip = renderTooltip(inputElement, {
          content: highlightMessage,
          effectClass: 'slide',
          event: 'blur',
        }).toggle(); // Show immediately

        this.set('tooltip', tooltip);
      });
    }
  }),

  removeHighlight: on('routeWillTransition', function() {
    const tooltip = this.get('tooltip');

    if (tooltip) {
      tooltip.detach();
    }
  }),

  cancel() {
    this.transitionToRoute('settings');
  },

  save() {
    const _this = this;
    const teamId = this.get('teamId');
    const save = function() {
      _this.get('model').save().then(function(/* user */) {
        _this.transitionToRoute('settings');
      });
    };

    if (teamId) {
      this.store.find('team', teamId).then(function(/* team */) {
        save();
      }, function() {
        this.set('teamId', null);
        this.flashMessage('error', 'Team not found');
      }.bind(this));
    } else {
      save();
    }

  },

});
