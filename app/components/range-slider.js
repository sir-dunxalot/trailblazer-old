import Ember from 'ember';
import insert from 'trailblazer/utils/insert';

export default Ember.Component.extend({
  lower: null,
  upper: null,

  max: 10,
  min: 0,
  step: 1,

  renderSlider: function() {
    var _this = this;
    var element = this.$();

    ['lower', 'upper', 'max', 'min'].forEach(function(key) {
      if (typeof _this.get(key) !== 'number') {
        Em.assert('You must pass the ' + key +
          ' property to the range-slider component');
      }
    });

    element.noUiSlider({
      animate: true,
      connect: true,
      start: [0, 5],
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
