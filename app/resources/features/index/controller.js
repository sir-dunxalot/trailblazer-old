import Ember from 'ember';

export default Ember.ArrayController.extend({

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
  }.on('init')

});
