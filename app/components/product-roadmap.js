import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.Component.extend({
  classNames: ['roadmap'],
  features: Ember.A(),
  numberOfLanes: 5,
  numberOfDaysDisplayed: 0,
  numberOfMonthsInViewport: 5,
  tagName: 'section',
  today: moment(),
  sortedFeatures: Ember.computed.sort('features', 'sortProperties'),
  sortProperties: ['startDate'],
  startDate: moment().date(1),

  months() {
    const max = this.get('numberOfMonths');
    const months = Ember.A();
    const startDate = this.get('startDate');
    const month = startDate.clone(); // First day of month

    let i = 0;

    while (i < max) {
      months.pushObject(month.format('MMM'));
      month.add(1, 'month');
      i++;
    }

    month.subtract(1, 'month'); // TODO - hacky

    const lastDate = month.endOf('month').startOf('day');
    const totalDays = lastDate.diff(startDate, 'days');

    this.set('numberOfDaysDisplayed', totalDays);

    return months;
  }.property('numberOfMonths'),

  maxDate() {
    const features = this.get('features');
    const endDates = features.mapBy('endDate');
    const maxDate = new Date(Math.max.apply(null, endDates));

    return maxDate;
  }.property('features.@each.endDate'),

  numberOfDays() {
    const maxDate = this.get('maxDate');
    const numberOfDays = moment(maxDate).diff(moment(), 'days');

    return numberOfDays;
  }.property('maxDate'),

  numberOfMonths() {
    const maxDate = this.get('maxDate');
    const numberOfMonths = moment(maxDate).diff(moment(), 'months');
    const monthsInViewport = this.get('numberOfMonthsInViewport');

    return numberOfMonths < monthsInViewport ? monthsInViewport : numberOfMonths;
  }.property('maxDate'),

  monthStyle() {
    const monthsInViewport = this.get('numberOfMonthsInViewport');
    const percentage = MathHelpers.percentage(1, monthsInViewport);

    return `width:${percentage};`;
  }.property('numberOfMonthsInViewport'),

  lanes() {
    const lanes = Ember.A();
    const numberOfLanes = this.get('numberOfLanes');
    const percentPerLane = 100 / (numberOfLanes + 1);
    const height = `height:${percentPerLane}%;`;

    let i = 0;

    while (i < numberOfLanes) {

      lanes.pushObject({
        style: height
      });

      i++;
    }

    return lanes;
  }.property('numberOfLanes'),

  todayLineStyle() {
    const numberOfDaysDisplayed = this.get('numberOfDaysDisplayed');
    const today = this.get('today');
    const startDate = this.get('startDate');
    const difference = today.diff(startDate, 'days');
    const left = MathHelpers.percentage(difference, numberOfDaysDisplayed);

    return `left:${left};`;
  }.property('startDate'),

});
