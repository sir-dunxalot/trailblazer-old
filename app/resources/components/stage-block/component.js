import Ember from 'ember';
import MathHelpers from 'trailblazer/utils/math-helpers';
import escapeCss from 'trailblazer/utils/escape-css';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['stage.type.name'],
  classNames: ['stage_block'],
  stage: null,
  tagName: 'li',

  style: Ember.computed('stage.tasks.length', 'stage.feature.tasks.length', function() {
    const stage = this.get('stage');
    const stageDuration = stage.get('duration');
    const totalDuration = stage.get('feature.totalDuration');

    let percentage = MathHelpers.percentage(
      stageDuration,
      totalDuration
    );

    percentage = escapeCss(percentage);

    return (`width:${percentage};`).htmlSafe();
  }),

  progressStyle: Ember.computed('stage.completedPercentage', function() {
    const completedPercentage = escapeCss(this.get('stage.completedPercentage'));

    return (`width:${completedPercentage};`).htmlSafe();
  }),
});
