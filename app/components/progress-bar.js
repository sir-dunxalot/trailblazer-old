import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';
import math from 'trailblazer/utils/computed/math';

export default Ember.Component.extend({
  attributeBindings: [
    'max:aria-valuemax',
    'min:aria-valuemin',
    'role',
    'value:aria-valuenow'
  ],
  classNames: ['progress_bar'],
  max: 100,
  min: 0,
  percentage: math('percentage', 'value', 'max'),
  progressStyle: insert('percentage', 'width:{{value}};'),
  role: 'progressbar',
  tagName: 'dl',
  value: 0,
});
