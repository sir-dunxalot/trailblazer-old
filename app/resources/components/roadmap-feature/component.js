import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import math from 'trailblazer/utils/computed/math';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNames: ['roadmap_feature'],
  feature: null,
  left: math('percentage', 'daysOffset', 'totalDaysDisplayedInRoadmap'),
  tagName: 'li',
  totalDaysDisplayedInRoadmap: Ember.computed.oneWay('controller.numberOfDaysDisplayed'),
  width: math('percentage', 'feature.totalDuration', 'totalDaysDisplayedInRoadmap'),

  daysOffset: computed('feature.startDate', 'controller.startDate', function() {
    const featureStartDate = this.get('feature.startDate');
    const roadmapStartDate = this.get('controller.startDate');

    return moment(featureStartDate).diff(roadmapStartDate, 'days');
  }),

  style: Ember.computed('left', 'top', 'width', function() {
    let style = '';

    ['left', 'top', 'width'].forEach(function(property) {
      const value = this.get(property);

      style += `${property}:${value};`;
    }, this);

    return style;
  }),

  top: computed('contentIndex', function() {
    const contentIndex = this.get('contentIndex');
    const numberOfLanes = this.get('controller.numberOfLanes');
    const lane = ((contentIndex + 1) % numberOfLanes);

    return MathHelpers.percentage(lane, numberOfLanes + 1);
  }),
});
