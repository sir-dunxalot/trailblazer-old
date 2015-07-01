import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import escapeCss from 'trailblazer/utils/escape-css';
import math from 'trailblazer/utils/computed/math';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNames: ['roadmap_feature'],
  feature: null,
  index: null,
  left: math('percentage', 'daysOffset', 'totalDaysDisplayedInRoadmap'),
  numberOfLanes: 5, // Default
  roadmapStartDate: null,
  tagName: 'li',
  totalDaysDisplayedInRoadmap: Ember.computed.oneWay('controller.numberOfDaysDisplayed'),
  width: math('percentage', 'feature.totalDuration', 'totalDaysDisplayedInRoadmap'),

  daysOffset: computed('feature.startDate', 'roadmapStartDate', function() {
    const featureStartDate = this.get('feature.startDate');
    const roadmapStartDate = this.get('roadmapStartDate');

    return moment(featureStartDate).diff(roadmapStartDate, 'days');
  }),

  style: Ember.computed('left', 'top', 'width', function() {
    let style = '';

    ['left', 'top', 'width'].forEach(function(property) {
      const value = escapeCss(this.get(property));

      style += `${property}:${value};`;
    }, this);

    return (style).htmlSafe();
  }),

  top: computed('index', function() {
    const index = this.get('index');
    const numberOfLanes = this.get('numberOfLanes');
    const lane = ((index + 1) % numberOfLanes);

    return MathHelpers.percentage(lane, numberOfLanes + 1);
  }),
});
