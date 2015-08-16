import Ember from 'ember';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

const { observer, on } = Ember;

export default Ember.Component.extend({
  calendar: null,
  classNames: ['calendar'],
  features: null,

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

      function addEvent({ className, date, description, title }) {
        events.addObject({
          allDay: true,
          className: `${className} fade-out`,
          description: description,
          start: date,
          title: title,
        });
      }

      features.forEach(function(feature, featureIndex) {
        const featureName = feature.get('name');
        const { endDate, startDate } = feature.getProperties(
          [ 'endDate', 'startDate' ]
        );

        /* Add the feature start date */

        addEvent({
          className: 'start',
          date: startDate,
          title: `Start ${featureName} research`,
        });

        /* Add the feature end date */

        addEvent({
          className: 'release',
          date: endDate,
          title: `Release ${featureName}`,
        });

        /* Add each stage end date */

        feature.get('stages').then(function(stages) {
          const stagesLength = stages.get('length');

          stages.forEach(function(stage, stageIndex) {
            stage.getDates().then(function({ stageStartDate, stageEndDate }) {
              stage.get('type').then(function(type) {
                stage.get('tasks').then(function(tasks) {
                  const shouldResolve = featureIndex + 1 === featuresLength && stageIndex + 1 === stagesLength;
                  const stageName = type.get('name');
                  const userIds = tasks.mapBy('assignee.id').filter(function(userId, j, arr) {
                    return arr.indexOf(userId) === j; // Remove duplications
                  });
                  const userIdsLength = userIds.get('length');
                  const userNames = [];

                  if (!userIdsLength) {
                    addEvent({
                      className: stageName,
                      date: stageEndDate,
                      title: `Finish ${stageName} for ${featureName}`,
                    });

                    if (shouldResolve) {
                      resolve(events);
                    }
                  }

                  userIds.forEach(function(userId, userIndex) {
                    store.findRecord('user', userId).then(function(user) {
                      userNames.push(user.get('fullName'));

                      if (userIndex + 1 === userIdsLength) {
                        const description = '<ul><li>' + userNames.join('</li><li>') + '</li></ul>';

                        addEvent({
                          className: stageName,
                          date: stageEndDate,
                          description: description,
                          title: `Finish ${stageName} for ${featureName}`,
                        });

                        if (shouldResolve) {
                          resolve(events);
                        }
                      }
                    });
                  });
                });
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
      buttonIcons: {
        prev: 'arrow-left',
        next: 'arrow-right',
      },
      header: {
        center: 'title',
        left: 'prev',
        right: 'today basicWeek month next'
      },

      events(start, end, timezone, callback) {
        _this.addEvents().then(function(events) {
          callback(events);
        });
      },

      eventAfterRender(event, $element) {
        $element.removeClass('fade-out');
        $element.addClass('fade-in');
      },

      eventRender(event, $element) {
        const description = event.description;

        if (description) {
          renderTooltip($element[0], {
            content: description,
            effectClass: 'fade',
          });
        }
      },
    });

    this.setProperties({ calendar });
  }),

  _rerenderCalendar: observer('features.[]', function() {
    this.get('calendar').fullCalendar('refetchEvents');
  }),

});
