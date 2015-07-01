import MathsHelpers from 'trailblazer/utils/math-helpers';
import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['style'],
  classNameBindings: ['content.type.name'],
  classNames: ['stage_block'],
  tagName: 'li',

  style() {
    const content = this.get('content');
    const stageDuration = content.get('duration');
    const totalDuration = content.get('feature.totalDuration');
    const percentage = MathsHelpers.percentage(
      stageDuration,
      totalDuration
    );

    return `width:${percentage};`;
  }.property('content.tasks.length', 'content.feature.tasks.length'),

  progressStyle() {
    const completedPercentage = this.get('content.completedPercentage');

    return `width:${completedPercentage};`;
  }.property('content.completedPercentage')

});
