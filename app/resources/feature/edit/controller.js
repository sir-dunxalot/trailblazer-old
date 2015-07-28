import FeatureController from 'trailblazer/resources/features/new/controller';

export default FeatureController.extend({

  cancel() {
    this.transitionToRoute('feature', this.get('model'));
  },

});
