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
  startDate: moment().date(1),

  months: function() {
    var months = Ember.A();
    var i = 0;
    var startDate = this.get('startDate');
    var month = startDate.clone(); // First day of month
    var max = this.get('numberOfMonths');
    var totalDays, lastDate;

    while (i < max) {
      months.pushObject(month.format('MMM'));
      month.add(1, 'month');
      i++;
    }

    month.subtract(1, 'month'); // TODO - hacky

    lastDate = month.endOf('month').startOf('day');
    totalDays = lastDate.diff(startDate, 'days');
    this.set('numberOfDaysDisplayed', totalDays);

    return months;
  }.property('numberOfMonths'),

  maxDate: function() {
    var features = this.get('features');
    var endDates = features.mapBy('endDate');
    var maxDate = new Date(Math.max.apply(null, endDates));

    return maxDate;
  }.property('features.@each.endDate'),

  numberOfDays: function() {
    var maxDate = this.get('maxDate');
    var numberOfDays = moment(maxDate).diff(moment(), 'days');

    return numberOfDays;
  }.property('maxDate'),

  numberOfMonths: function() {
    var maxDate = this.get('maxDate');
    var numberOfMonths = moment(maxDate).diff(moment(), 'months');
    var monthsInViewport = this.get('numberOfMonthsInViewport');

    return numberOfMonths < monthsInViewport ? monthsInViewport : numberOfMonths;
  }.property('maxDate'),

  monthStyle: function() {
    var percentage = MathHelpers.percentage(
      1,
      this.get('numberOfMonthsInViewport')
    );

    return 'width:' + percentage + ';';
  }.property('numberOfMonthsInViewport'),

  lanes: function() {
    var i = 0;
    var lanes = Ember.A();
    var numberOfLanes = this.get('numberOfLanes');
    var percentPerLane = 100 / (numberOfLanes + 1);
    var height = 'height:' + percentPerLane + '%;';

    while (i < numberOfLanes) {

      lanes.pushObject({
        style: height
      });

      i++;
    }

    return lanes;
  }.property('numberOfLanes'),

  todayLineStyle: function() {
    var today = this.get('today');
    var startDate = this.get('startDate');
    var difference = today.diff(startDate, 'days');
    var numberOfDaysDisplayed = this.get('numberOfDaysDisplayed');
    var left = MathHelpers.percentage(difference, numberOfDaysDisplayed);

    return 'left:' + left + ';';
  }.property('startDate'),

});
