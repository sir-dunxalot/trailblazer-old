import FeatureController from 'trailblazer/resources/features/new/controller';

export default FeatureController.extend({
  saveButtonText: 'save',

  cancel() {
    this.transitionToRoute('feature', this.get('model'));
  },

});
