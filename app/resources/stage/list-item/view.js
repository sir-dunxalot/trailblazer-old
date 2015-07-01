import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';
import math from 'trailblazer/utils/computed/math';

const { computed } = Ember;

export default Ember.View.extend({
  attributeBindings: ['style'],
  classNameBindings: ['content.type.name'],
  classNames: ['roadmap_feature_stage'],
  featureDuration: computed.oneWay('parentView.content.totalDuration'),
  tagName: 'li',
  width: math('percentage', 'content.duration', 'featureDuration'),
  style: insert('width', 'width:{{value}};'),
});
