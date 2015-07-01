import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['stage.type.name'],
  classNames: ['stage_block'],
  stage: null,
  tagName: 'li',

  style: Ember.computed('stage.tasks.length', 'stage.feature.tasks.length', function() {
    const stage = this.get('content');
    const stageDuration = stage.get('duration');
    const totalDuration = stage.get('feature.totalDuration');
    const percentage = MathHelpers.percentage(
      stageDuration,
      totalDuration
    );

    return `width:${percentage};`;
  }),

  progressStyle: Ember.computed('stage.completedPercentage', function() {
    const completedPercentage = this.get('stage.completedPercentage');

    return `width:${completedPercentage};`;
  }),
});
