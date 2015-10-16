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
    const model = this.get('model');

    this.get('modal').hide();


    model.destroyRecord().then((feature) => {
      feature.get('stages').invoke('destroyRecord');
      feature.get('tasks').invoke('destroyRecord');
      this.transitionToRoute('features');
    });
  },

});
