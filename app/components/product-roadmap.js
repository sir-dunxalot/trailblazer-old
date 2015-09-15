import Ember from 'ember';
// import MathHelpers from 'trailblazer/utils/math-helpers';
// import escapeCss from 'trailblazer/utils/escape-css';
// import featureTemplate from 'trailblazer/resources/components/roadmap-feature/template';

const { RSVP, observer, on } = Ember;
const { vis } = window;

export default Ember.Component.extend({
  classNames: ['roadmap'],
  features: Ember.A(),
  numberOfLanes: 5,
  numberOfDaysDisplayed: 0,
  numberOfMonthsInViewport: 4,
  tagName: 'section',
  today: moment(),
  sortedFeatures: Ember.computed.sort('features', 'sortProperties'),
  sortProperties: ['startDate'],
  startDate: moment().date(1),
  timeline: null,

  // formattedFeatures: computed('features.[]', function() {
  //   const features = this.get('features');
  //   const height = 100 / features.get('length');

  //   return features.map(function(feature) {
  //     return {
  //       content: feature.get('name'),
  //       className: 'roadmap_feature',
  //       end: feature.get('endDate'),
  //       id: feature.get('id'),
  //       stages: feature.get('stages.content.currentState'),
  //       start: feature.get('startDate'),
  //     };
  //   });
  // }),

  formatTimelineItem(feature) {
    return {
      content: feature.get('name'),
      className: 'roadmap_feature',
      end: feature.get('endDate'),
      id: feature.get('id'),
      stages: feature.get('stages').map(function(stage) {
        return {
          duration: stage.get('duration'),
          rank: stage.get('rank'),
        };
      }),
      start: feature.get('startDate'),
    };
  },

  renderTimeline: on('didInsertElement', function() {
    const element = this.get('element');
    const timelineHeight = parseInt(window.innerHeight) - 45; // Logo height

    const timeline = new vis.Timeline(element, [], {
      height: `${timelineHeight}px`,
      editable: false, // TODO
      // timeAxis: {
      //   scale: 'day',
      //   step: 2,
      // },
      margin: {
        axis: 20,
        item: 20,
      },
      orientation: 'top',
      selectable: false,
      type: 'range',
      start: moment().subtract(1, 'week'),
      end: moment().add(4, 'week'),
      // zoomKey: 'metaKey',

      template(item) {
        // const featureDuration = moment(item.end).diff(item.start, 'days');
        // const patchForClasses = ['research', 'development', 'testing'];

        let content = `${item.content}`;

        // content += '<ol class="roadmap_feature_stages">';

        // item.stages.forEach(function(stage) {
        //   const className = patchForClasses[stage.rank - 1];
        //   const width = escapeCss(stage.duration / featureDuration * 100);

        //   content +=
        //     `<li class="roadmap_feature_stage ${className}" style="width:${width}%">
        //       <div class="progress"></div>
        //     </li>`;
        // });

        // content += '</ol>';

        return content;
      }
    });

    this.set('timeline', timeline);
    this.updateTimeline();
  }),

  updateTimeline: observer('formattedFeatures.[]', function() {
    const _this = this;
    const timeline = this.get('timeline');
    // const { element, timeline } = this.getProperties(
    //   [ 'element', 'timeline' ]
    // );
    const stagesPromises = [];

    if (!timeline) {
      return;
    } else {
      this.get('features').forEach(function(feature) {
        stagesPromises.pushObject(feature.get('stages'));
      });

      RSVP.allSettled(stagesPromises).then(function() {
        timeline.setItems(_this.get('features').map(function(feature) {
          return _this.formatTimelineItem(feature);
        }));

        // TODO

        // $('.vis-item').hover(function() {
        //   $(element).toggleClass('hovering_over_item');
        //   $(this).toggleClass('vis-item-hovering');
        // });
      });
    }
  }),

  click(event) {
    const featureId = this.get('timeline').getEventProperties(event).item;

    if (featureId) {
      this.get('targetObject').transitionToRoute('feature', featureId);
    }
  },

  // months: Ember.computed('numberOfMonths', function() {
  //   const max = this.get('numberOfMonths');
  //   const months = Ember.A();
  //   const startDate = this.get('startDate');
  //   const month = startDate.clone(); // First day of month

  //   let i = 0;

  //   while (i < max) {
  //     months.pushObject(month.format('MMM'));
  //     month.add(1, 'month');
  //     i++;
  //   }

  //   month.subtract(1, 'month'); // TODO - hacky

  //   const lastDate = month.endOf('month').startOf('day');
  //   const totalDays = lastDate.diff(startDate, 'days');

  //   this.set('numberOfDaysDisplayed', totalDays);

  //   return months;
  // }),

  // maxDate: Ember.computed('features.@each.endDate', function() {
  //   const features = this.get('features');
  //   const endDates = features.mapBy('endDate');
  //   const maxDate = new Date(Math.max.apply(null, endDates));

  //   return maxDate;
  // }),

  // numberOfDays: Ember.computed('maxDate', function() {
  //   const maxDate = this.get('maxDate');
  //   const numberOfDays = moment(maxDate).diff(moment(), 'days');

  //   return numberOfDays;
  // }),

  // numberOfMonths: Ember.computed('maxDate', function() {
  //   const maxDate = this.get('maxDate');
  //   const numberOfMonths = moment(maxDate).diff(moment(), 'months');
  //   const monthsInViewport = this.get('numberOfMonthsInViewport');

  //   return numberOfMonths < monthsInViewport ? monthsInViewport : numberOfMonths;
  // }),

  // monthStyle: Ember.computed('numberOfMonthsInViewport', function() {
  //   const monthsInViewport = this.get('numberOfMonthsInViewport');
  //   const percentage = MathHelpers.percentage(1, monthsInViewport);

  //   return (`width:${percentage};`).htmlSafe();
  // }),

  // lanes: Ember.computed('numberOfLanes', function() {
  //   const lanes = Ember.A();
  //   const numberOfLanes = this.get('numberOfLanes');
  //   const percentPerLane = 100 / (numberOfLanes + 1);
  //   const heightStyle = (`height:${percentPerLane}%;`).htmlSafe();

  //   let i = 0;

  //   while (i < numberOfLanes) {

  //     lanes.pushObject({
  //       style: heightStyle,
  //     });

  //     i++;
  //   }

  //   return lanes;
  // }),

  // todayLineStyle: Ember.computed('numberOfDaysDisplayed', 'startDate', 'today', function() {
  //   const { numberOfDaysDisplayed, today, startDate } = this.getProperties(
  //     [ 'numberOfDaysDisplayed', 'today', 'startDate' ]
  //   );
  //   const difference = today.diff(startDate, 'days');

  //   let left = MathHelpers.percentage(difference, numberOfDaysDisplayed);

  //   left = escapeCss(left);

  //   return (`left:${left};`).htmlSafe();
  // }),

});
