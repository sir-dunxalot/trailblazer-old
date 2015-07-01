import Ember from 'ember';
import math from 'trailblazer/utils/computed/math';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['roadmap_feature'],
  left: math('percentage', 'daysOffset', 'totalDaysDisplayedInRoadmap'),
  tagName: 'li',
  templateName: 'feature/list-item',
  totalDaysDisplayedInRoadmap: Ember.computed.oneWay('controller.numberOfDaysDisplayed'),
  width: math('percentage', 'content.totalDuration', 'totalDaysDisplayedInRoadmap'),

  daysOffset() {
    const featureStartDate = this.get('content.startDate');
    const roadmapStartDate = this.get('controller.startDate');

    return moment(featureStartDate).diff(roadmapStartDate, 'days');
  }.property('content.startDate', 'controller.startDate'),

  style() {
    let style = '';

    ['left', 'top', 'width'].forEach(function(property) {
      const value = this.get(property);

      style += `${property}:${value};`;
    }, this);

    return style;
  }.property('left', 'top', 'width'),

  top() {
    const contentIndex = this.get('contentIndex');
    const numberOfLanes = this.get('controller.numberOfLanes');
    const lane = ((contentIndex + 1) % numberOfLanes);

    return MathHelpers.percentage(lane, numberOfLanes + 1);
  }.property('contentIndex'),

});
