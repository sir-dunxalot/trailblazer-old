import Ember from 'ember';

const { computed, observer, on } = Ember;

export default Ember.Component.extend({
  calendar: null,
  features: null,

  didInitAttrs() {
    this.addEvents();
  },

  addEvents: observer('features.[]', function() {
    const events = [];
    const store = this.get('container').lookup('store:main');
    const { calendar, features } = this.getProperties(
      [ 'calendar', 'features' ]
    );

    if (!calendar) {
      return;
    }

    features.forEach(function(feature) {
      const featureName = feature.get('name');
      const { endDate, startDate } = feature.getProperties(
        [ 'endDate', 'startDate' ]
      );

      feature.get('stages').then(function(stages) {
        stages.forEach(function(stage) {
          stage.getDates().then(function({ stageStartDate, stageEndDate }) {
            stage.get('type').then(function({ name }) {
              calendar.fullCalendar('renderEvent', {
                allDay: true,
                className: name,
                start: stageEndDate,
                title: `Finish ${name} for ${featureName}`,
              });
            });
          });
        });
      });
    });
  }),

  _renderCalendar: on('didInsertElement', function() {
    const calendar = $(`#${this.get('elementId')}`).fullCalendar({
      firstDay: 1,
      businessHours: true,
      header: {
        left: 'prev',
        right: 'today basicWeek month next'
      }
    });

    this.setProperties({ calendar });
  }),

});
