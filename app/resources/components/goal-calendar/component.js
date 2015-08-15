import Ember from 'ember';

const { computed, observer, on } = Ember;

export default Ember.Component.extend({
  calendar: null,
  features: null,

  /* Temporary hack */

  addEvents: observer('features.[]', function() {
    const events = [];
    const store = this.get('container').lookup('store:main');
    const { calendar, features } = this.getProperties(
      [ 'calendar', 'features' ]
    );

    function addEvent({ className, date, title }) {
      calendar.fullCalendar('renderEvent', {
        allDay: true,
        className: className,
        start: date,
        title: title,
      });
    }

    if (!calendar) {
      return;
    }

    calendar.fullCalendar('removeEvents');

    features.forEach(function(feature) {
      const featureName = feature.get('name');
      const { endDate, startDate } = feature.getProperties(
        [ 'endDate', 'startDate' ]
      );

      /* Add the feature start date */

      addEvent({
        className: 'start',
        date: startDate,
        title: `Start ${featureName}`,
      });

      /* Add each stage end date */

      feature.get('stages').then(function(stages) {
        stages.forEach(function(stage) {
          stage.getDates().then(function({ stageStartDate, stageEndDate }) {
            stage.get('type').then(function(type) {
              const stageName = type.get('name');

              addEvent({
                className: stageName,
                date: stageEndDate,
                title: `Finish ${stageName} for ${featureName}`,
              });
            });
          });
        });
      });
    });
  }),

  _renderCalendar: on('didInsertElement', function() {
    const _this = this;
    const calendar = $(`#${this.get('elementId')}`).fullCalendar({
      firstDay: 1,
      businessHours: true,
      header: {
        center: 'title',
        left: 'prev',
        right: 'today basicWeek month next'
      },
    });

    this.setProperties({ calendar });
  }),

});
