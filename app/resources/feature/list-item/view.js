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

  daysOffset: function() {
    var featureStartDate = this.get('content.startDate');
    var roadmapStartDate = this.get('controller.startDate');

    return moment(featureStartDate).diff(roadmapStartDate, 'days');
  }.property('content.startDate', 'controller.startDate'),

  style: function() {
    var _this = this;
    var style = '';

    ['left', 'top', 'width'].forEach(function(property) {
      style += property + ':' + _this.get(property) + ';';
    });

    return style;
  }.property('left', 'top', 'width'),

  top: function() {
    var contentIndex = this.get('contentIndex');
    var numberOfLanes = this.get('controller.numberOfLanes');
    var lane = ((contentIndex + 1) % numberOfLanes);

    return MathHelpers.percentage(lane, numberOfLanes);
  }.property('contentIndex'),

});
