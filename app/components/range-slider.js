import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';
import insert from 'trailblazer/utils/computed/insert';

var previousMax;

export default Ember.Component.extend({
  lower: null,
  max: 10,
  min: 0,
  upper: null,
  rendered: false,
  step: 1,

  _cacheMax: function() {
    previousMax = this.get('max');
  }.observesBefore('max'),

  /* Recalculate values is the min-max range changes */

  calculateRangeValues: function() {
    var max, lowerRatio, upperRatio;

    if (typeof previousMax === 'number' && this.get('rendered')) {
      max = this.get('max');
      lowerRatio = this.get('lower') / previousMax;
      upperRatio = this.get('upper') / previousMax;

      console.log('Change values');

      this.$().val([
        Math.round(max * lowerRatio),
        Math.round(max * upperRatio)
      ]);

      this.set('rendered', false);
      this.rerender();

      this.setProperties({
        lower: Math.round(max * lowerRatio),
        upper: Math.round(max * upperRatio)
      });

      // this.renderSlider();
    }
  }.observes('max'),

  // TODO - allow values to be passed in when editing a feature

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
  },

  // rerenderSlider: function() {
  //   Em.run.debounce(this, this.rerender, 100);
  // }.observes('min', 'max'),

  setInitialValues: function(context, key) {
    var value = this.get(key);

    if (!value) {
      this.set(key, value);
    } else if (!this.get('rendered')) {
      this.set('rendered', true);

      Em.run.scheduleOnce('afterRender', this, function() {
        this.renderSlider();
      });
    }
  }.observes('lower', 'upper')

});
