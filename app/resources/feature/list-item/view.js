import Ember from 'ember';
import math from 'trailblazer/utils/computed/math';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['roadmap_feature'],
  left: math('percentage',
    'daysOffset',
    'totalDaysDisplayedInRoadmap'
  ),
  totalDaysDisplayedInRoadmap: Ember.computed.oneWay('controller.numberOfDaysDisplayed'),
  tagName: 'li',

  width: math('percentage',
    'content.totalDuration',
    'totalDaysDisplayedInRoadmap'
  ),

  daysOffset: function() {
    var featureStartDate = this.get('content.startDate');
    var roadmapStartDate = this.get('controller.startDate');

    return moment(featureStartDate).diff(roadmapStartDate, 'days');
  }.property('content.startDate', 'controller.startDate'),


  style: function() {
    var left = 'left:' + this.get('left') + ';';
    var width = 'width:' + this.get('width') + ';';

    return left + width;
  }.property('left', 'width'),

});
