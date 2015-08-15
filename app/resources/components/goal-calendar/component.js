import Ember from 'ember';

const { computed, observer, on } = Ember;

export default Ember.Component.extend({
  calendar: null,
  features: null,

  /* Temporary hack */

  // addEvents: observer('features.[]', function() {
  //   const events = [];
  //   const store = this.get('container').lookup('store:main');
  //   const { calendar, features } = this.getProperties(
  //     [ 'calendar', 'features' ]
  //   );

  //   function addEvent({ className, date, title }) {
  //     calendar.fullCalendar('renderEvent', {
  //       allDay: true,
  //       className: className,
  //       start: date,
  //       title: title,
  //     });
  //   }

  //   if (!calendar) {
  //     return;
  //   }

  //   calendar.fullCalendar('removeEvents');

  //   features.forEach(function(feature) {
  //     const featureName = feature.get('name');
  //     const { endDate, startDate } = feature.getProperties(
  //       [ 'endDate', 'startDate' ]
  //     );

  //     /* Add the feature start date */

  //     addEvent({
  //       className: 'start',
  //       date: startDate,
  //       title: `Start ${featureName}`,
  //     });

  //     /* Add each stage end date */

  //     feature.get('stages').then(function(stages) {
  //       stages.forEach(function(stage) {
  //         stage.getDates().then(function({ stageStartDate, stageEndDate }) {
  //           stage.get('type').then(function(type) {
  //             const stageName = type.get('name');

  //             addEvent({
  //               className: stageName,
  //               date: stageEndDate,
  //               title: `Finish ${stageName} for ${featureName}`,
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // }),

  addEvents() {
    const events = Ember.A();
    const features = this.get('features');
    const featuresLength = features.get('length');
    const store = this.get('container').lookup('store:main');

    return new Ember.RSVP.Promise(function(resolve) {

      if (!featuresLength) {
        Ember.warn('No features were passed to the calendar');
        resolve(events);
      }

      function addEvent({ className, date, title }) {
        events.addObject({
          allDay: true,
          className: className,
          start: date,
          title: title,
        });
      }

      features.forEach(function(feature, i) {
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
              console.log(stageStartDate);
              stage.get('type').then(function(type) {
                const stageName = type.get('name');

                addEvent({
                  className: stageName,
                  date: stageEndDate,
                  title: `Finish ${stageName} for ${featureName}`,
                });

                if (i + 1 === featuresLength) {
                  resolve(events);
                }
              });
            });
          });
        });
      });
    });
  },

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

      events: function(start, end, timezone, callback) {
        _this.addEvents().then(function(events) {
          callback(events);
        });
      }
    });

    this.setProperties({ calendar });
  }),

  _rerenderCalendar: observer('features.[]', function() {
    this.get('calendar').fullCalendar('refetchEvents');
  }),

});
