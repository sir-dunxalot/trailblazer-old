import MathsHelpers from 'trailblazer/utils/math-helpers';
import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['style'],
  classNameBindings: ['content.type.name'],
  classNames: ['stage_block'],
  tagName: 'li',

  style: function() {
    var content = this.get('content');
    var stageDuration = content.get('duration');
    var totalDuration = content.get('feature.totalDuration');
    var percentage = MathsHelpers.percentage(
      stageDuration,
      totalDuration
    );

    return 'width:' + percentage + ';';
  }.property('content.tasks.length', 'content.feature.tasks.length'),

  progressStyle: function() {
    var completedPercentage = this.get('content.completedPercentage');

    return 'width:' + completedPercentage + ';';
  }.property('content.completedPercentage')

});
