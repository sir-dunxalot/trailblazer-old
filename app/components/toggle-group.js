import InputGroupComponent from 'trailblazer/components/input-group';

export default InputGroupComponent.extend({
  classNames: ['toggle-group'],
  inputPartial: 'form-inputs/toggle',
  offLabel: 'False',
  onLabel: 'True',
  showLabels: true,
  value: null,

  actions: {
    toggleValue: function(value) {
      this.set('value', value);
    }
  }
});
