import Ember from 'ember';
import defaultFor from 'trailblazer/utils/default-for';
import insert from 'trailblazer/utils/computed/insert';

export default Ember.Component.extend({
  lower: null,
  upper: null,

  max: 10,
  min: 0,
  step: 1,

  renderSlider: function() {
    var _this = this;
    var element = this.$();
    var lower = defaultFor(
      this.get('lower'),
      this.get('max') * 0.3
    );
    var upper = defaultFor(
      this.get('upper'),
      this.get('max') * 0.7
    );

    ['max', 'min'].forEach(function(key) {
      if (typeof _this.get(key) !== 'number') {
        Ember.assert('You must pass the ' + key +
          ' property to the range-slider component');
      }
    });

    element.noUiSlider({
      animate: true,
      connect: true,
      margin: 1,
      start: [lower, upper],
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
});
