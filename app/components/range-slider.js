import Ember from 'ember';

const { computed, observer, on, run } = Ember;

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

  lowerDate: computed('lower', function() {
    let startDate = this.get('startDate');

    if (startDate) {
      startDate = moment(startDate);

      return startDate.add(this.get('lower'), 'd');
    } else {
      return null;
    }
  }),

  upperDate: computed('upper', function() {
    let startDate = this.get('startDate');

    if (startDate) {
      startDate = moment(startDate);

      return startDate.add(this.get('upper'), 'd');
    } else {
      return null;
    }
  }),

  /* Methods */

  _cacheMax: function() {
    this.set('_previousMax', this.get('max'));
  }.observesBefore('max'),

  /* Recalculate values is the min-max range changes */

  calculateRangeValues: observer('max', function() {
    const previousMax = this.get('_previousMax');

    if (previousMax && this.get('rendered')) {
      const max = this.get('max');
      const lowerRatio = this.get('lower') / previousMax;
      const upperRatio = this.get('upper') / previousMax;
      const newLowerValue = Math.round(max * lowerRatio);
      const newUpperValue = Math.round(max * upperRatio);

      this.$().val([newLowerValue, newUpperValue]);

      this.set('rendered', false);
      this.rerender();

      this.setProperties({
        lower: newLowerValue,
        upper: newUpperValue
      });
    }
  }),

  renderSlider: function() {
    const _this = this;
    const element = this.$().find('.slider');
    const startDate = this.get('startDate');

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
    }, true);

    element.on({
      slide: function() {
        const values = element.val();

        _this.setProperties({
          lower: values[0],
          upper: values[1],
        });
      }
    });

    /* Add tooltips */

    if (startDate) {
      const toggles = [element.Link('lower'), element.Link('upper')];

      toggles.forEach(function(element) {
        element.to('-inline-<div class="slider_date"></div>', function (value) {
          let date = moment(startDate);

          date = date.add(value, 'd').format('D MMM');

          Ember.$(this).html(date);
        });
      });
    }
  },

  setInitialValues: on('didInsertElement',
    observer('lower', 'upper', function(context, key) {
      if (key && !this.get(key)) {
        this.set(key, this.get(key));
      } else if (!this.get('rendered') && this.get('upper') && this.get('lower')) {
        this.set('rendered', true);

        run.scheduleOnce('afterRender', this, function() {
          this.renderSlider();
        });
      }
    })
  ),

});
