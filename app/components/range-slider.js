import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slider_wrapper'],
  lower: null,
  max: 10,
  min: 0,
  upper: null,
  _previousMax: null,
  rendered: false,
  startDate: null,
  step: 1,

  /* Computed properties */

  lowerDate: function() {
    var startDate = this.get('startDate');

    if (startDate) {
      startDate = moment(this.get('startDate'));

      return startDate.add(this.get('lower'), 'd');
    } else {
      return null;
    }
  }.property('lower'),

  upperDate: function() {
    var startDate = this.get('startDate');

    if (startDate) {
      startDate = moment(this.get('startDate'));

      return startDate.add(this.get('upper'), 'd');
    } else {
      return null;
    }
  }.property('upper'),

  /* Methods */

  _cacheMax: function() {
    this.set('_previousMax', this.get('max'));
  }.observesBefore('max'),

  /* Recalculate values is the min-max range changes */

  calculateRangeValues: function() {
    var previousMax = this.get('_previousMax');
    var max, newLowerValue, lowerRatio, newUpperValue, upperRatio;

    if (previousMax && this.get('rendered')) {
      max = this.get('max');
      lowerRatio = this.get('lower') / previousMax;
      upperRatio = this.get('upper') / previousMax;
      newLowerValue = Math.round(max * lowerRatio);
      newUpperValue = Math.round(max * upperRatio);

      this.$().val([newLowerValue, newUpperValue]);

      this.set('rendered', false);
      this.rerender();

      this.setProperties({
        lower: newLowerValue,
        upper: newUpperValue
      });
    }
  }.observes('max'),

  renderSlider: function() {
    var _this = this;
    var element = this.$().find('.slider');
    var startDate = _this.get('startDate');
    var toggles;

    element.noUiSlider({
      animate: true,
      connect: true,
      start: [this.get('lower'), this.get('upper')],
      range: {
        min: this.get('min'),
        max: this.get('max'),
      },
      step: this.get('step'),
      format: {
        to: function(value) {
          return parseInt(value).toFixed(0);
        },
        from: function(value) {
          return parseInt(value).toFixed(0);
        }
      }
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

    /* Add tooltips */

    if (startDate) {
      toggles = [element.Link('lower'), element.Link('upper')];

      toggles.forEach(function(element) {
        element.to('-inline-<div class="slider_date"></div>', function (value) {
          var date = moment(startDate);

          date = date.add(value, 'd').format('D MMM');

          Ember.$(this).html(date);
        });
      });
    }
  },

  setInitialValues: function(context, key) {
    if (key && !this.get(key)) {
      this.set(key, this.get(key));
    } else if (!this.get('rendered') && this.get('upper') && this.get('lower')) {
      this.set('rendered', true);

      Ember.run.scheduleOnce('afterRender', this, function() {
        console.log('here');
        this.renderSlider();
      });
    }
  }.observes('lower', 'upper').on('didInsertElement'),

});
