import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.Component.extend({
  classNames: ['roadmap'],
  features: Ember.A(),
  numberOfLanes: 5,
  numberOfMonthsInViewport: 5,
  tagName: 'section',

  months: function() {
    var months = Ember.A();
    var i = 0;
    var month = moment().date(1); // First day of month
    var max = this.get('numberOfMonths');

    while (i < max) {
      months.pushObject(month.format('MMM'));
      month = month.add(1, 'month');
      i++;
    }

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
  }.property('numberOfMonthsInViewport')

});
