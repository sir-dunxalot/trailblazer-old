import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';

var previousMax;

export default Ember.Component.extend({
  lower: null,
  max: 10,
  min: 0,
  upper: null,
  step: 1,

  _cacheMax: function() {
    previousMax = this.get('max');
  }.observesBefore('max'),

  calculateValues: function() {
    var max = this.get('max');
    var lower = this.get('lower');
    var upper = this.get('upper');
    var lowerRatio = lower ? lower / previousMax : 0.3;
    var upperRatio = upper ? upper / previousMax : 0.7;

    this.setProperties({
      lower: Math.round(max * lowerRatio),
      upper: Math.round(max * upperRatio)
    });
  }.observes('max').on('init'),

  renderSlider: function() {
    var _this = this;
    var element = this.$();

    element.noUiSlider({
      animate: true,
      connect: true,
      margin: 1,
      start: [this.get('lower'), this.get('upper')],
      range: {
        min: this.get('min'),
        max: this.get('max'),
      },
      step: this.get('step')
    });

    element.on({
      slide: function() {
        var values = element.val();

        _this.setProperties({
          lower: values[0],
          upper: values[1],
        });
      }
    });
  }.on('didInsertElement'),

  rerenderSlider: function() {
    Em.run.debounce(this, this.rerender, 100);
  }.observes('min', 'max'),

});
