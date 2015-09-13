import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import escapeCss from 'trailblazer/utils/escape-css';

const { computed, observer, on } = Ember;
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

  formattedFeatures: computed('features.[]', function() {
    return this.get('features').map(function(feature) {
      return {
        content: feature.get('name'),
        className: 'feature123',
        end: feature.get('endDate'),
        start: feature.get('startDate'),
      }
    });
  }),

  renderTimeline: on('didInsertElement', function() {
    const formattedFeatures = this.get('formattedFeatures');

    let timelineItems = [];

    if (formattedFeatures.get('length')) {
      timelineItems = formattedFeatures;
    }

    const timeline = new vis.Timeline(this.get('element'), timelineItems, {
      // height: '100%',
      editable: true,
      // timeAxis: {
      //   scale: 'day',
      //   step: 1,
      // },
      type: 'range',
      zoomKey: 'metaKey',
    });

    this.set('timeline', timeline);
  }),

  updateTimeline: observer('formattedFeatures.[]', function() {
    const timeline = this.get('timeline');

    if (!timeline) {
      return;
    } else {
      timeline.setItems(this.get('formattedFeatures'));
    }
  }),

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
