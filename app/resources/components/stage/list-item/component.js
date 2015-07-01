import Ember from 'ember';
import escapeCss from 'trailblazer/utils/escape-css';
import math from 'trailblazer/utils/computed/math';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['stage.type.name'],
  classNames: ['roadmap_feature_stage'],
  featureDuration: null,
  stage: null,
  tagName: 'li',
  width: math('percentage', 'stage.duration', 'featureDuration'),

  style: computed('width', function() {
    const width = escapeCss(this.get('width'));

    return (`width:${width};`).htmlSafe();
  }),

});
