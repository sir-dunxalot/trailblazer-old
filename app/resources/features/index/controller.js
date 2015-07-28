import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Controller.extend({
  tourShown: false,

  tooltipContent: computed('model.length', 'model.isUpdating', function() {
    const showTooltip = !this.get('model.length') && !this.get('model.isUpdating');

    return showTooltip ? 'Add your first feature' : false;
  }),

  renderTour() {
    const tour = window.introJs();
    const selector = function(name) {
      return `[data-tour="${name}"]`;
    };

    tour.setOptions({
      doneLabel: 'Start',
      showStepNumbers: false,
      steps: [
        {
          // TODO - tour should say "team's features" not "your features", etc
          intro: 'Welcome to Trailblazer! This is your roadmap, which you will add features to',
          tooltipClass: 'introjs-tooltipwide'
        }, {
          element: selector('new_feature_button'),
          intro: 'Add a new feature by clicking the feature icon',
          position: 'bottom-right-aligned'
        }, {
          element: selector('settings_button'),
          intro: 'Join a team and customize Trailblazer by clicking the settings icon',
          position: 'right',
          tooltipClass: 'introjs-tooltiplast introjs-tooltipwide'
        }
      ],
      prevLabel: 'Back',
      nextLabel: 'Next',
      overlayOpacity: 0.8,
      skipLabel: 'Close',
    });

    run.scheduleOnce('afterRender', this, function() {
      tour.start();
    });
  },

  // TODO - remvoed the below tour until a userOnboarded flag is added to the user account

  // watchContent: function() {
  //   var content = this.get('model');

  //   // console.log(content);

  //   if (!content.get('length') && content.get('isLoaded') && !this.get('tourShown')) {
  //     this.renderTour();
  //     this.set('tourShown', true);
  //   }
  // }.observes('content.isLoaded')

});
