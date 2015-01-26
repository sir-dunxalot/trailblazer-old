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
    var lower = this.get('lower');
    var upper = this.get('upper');

    lower = defaultFor(lower, this.get('max') * 0.3);
    upper = defaultFor(upper, this.get('max') * 0.7);

    if (!this.get('lower') || !this.get('upper')) {
      _this.setProperties({
        lower: lower,
        upper: upper,
      });
    }

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

  rerenderSlider: function() {
    Em.run.debounce(this, this.rerender, 100);
  }.observes('min', 'max'),

});
