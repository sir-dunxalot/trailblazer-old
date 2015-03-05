import Ember from 'ember';

export default Ember.ArrayController.extend({
  tourShown: false,

  renderTour: function() {
    var tour = introJs();
    var selector = function(name) {
      return '[data-tour="' + name + '"]';
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

    Ember.run.scheduleOnce('afterRender', this, function() {
      tour.start();
    });
  },

  // TODO - remvoed the below tour until a userOnboarded flag is added to the user account

  // watchContent: function() {
  //   var content = this.get('content');

  //   // console.log(content);

  //   if (!content.get('length') && content.get('isLoaded') && !this.get('tourShown')) {
  //     this.renderTour();
  //     this.set('tourShown', true);
  //   }
  // }.observes('content.isLoaded')

});
