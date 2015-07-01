import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';
import math from 'trailblazer/utils/computed/math';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['stage.type.name'],
  classNames: ['roadmap_feature_stage'],
  featureDuration: null,
  stage: null,
  tagName: 'li',
  width: math('percentage', 'stage.duration', 'featureDuration'),
  style: insert('width', 'width:{{value}};'),
});
