import FeatureController from 'trailblazer/resources/features/new/controller';

export default FeatureController.extend({
  saveButtonText: 'save',

  actions: {
    confirmDelete() {
      this.showModal('modals/confirm-feature-delete');
    },
  },

  cancel() {
    this.transitionToRoute('feature', this.get('model'));
  },

  delete() {
    this.get('modal').hide();
    this.get('model').destroyRecord().then(() => {
      this.transitionToRoute('features');
    });
  },

});
