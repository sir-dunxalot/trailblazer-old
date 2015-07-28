import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

const { observer, on } = Ember;

export default Ember.Controller.extend(
  FormMixin, {

  highlightInputFor: null,
  highlightMessage: null,
  queryParams: ['highlightInputFor', 'highlightMessage'],
  team: null,
  teamId: null,
  teamHint: null,
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

    'model.team': {
      presence: true
    }

  },

  updateTeam: observer('teamId', function() {
    const _this = this;
    const defaultHint = 'Don\'t know your team ID? Ask a colleague';
    const teamId = this.get('teamId');

    if (!teamId) {
      this.set('teamHint', defaultHint);

      return;
    }

    this.store.findRecord('team', teamId).then(function(team) {
      const teamName = team.get('name');

      _this.setProperties({
        'model.team': team,
        teamHint: `You are currently a member of ${teamName}`,
      });
    }, function() {
      _this.flashMessage('error', 'Invalid team ID');
      _this.get('errors.teamId').push('is not a valid team ID');
      _this.setProperties({
        teamHint: defaultHint,
        teamId: null,
      });
    });
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
    const team = this.get('team');

    this.get('model').save().then(function(user) {
      team.get('members').addObject(user);
      team.save().then(function() {
        _this.transitionToRoute('features');
      });
    });
  },

});
