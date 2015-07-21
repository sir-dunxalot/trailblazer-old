import Ember from 'ember';
import ModalView from 'ember-modals/views/modal';

const { on } = Ember;

export default ModalView.extend({
  center: true,
  classNameBindings: ['center'],

  _listen: on('willInsertElement', function() {
    const modalController = this.get('controller.modal');

    modalController.on('closeModal', this, function() {
      if (!this.get('isDestroying')) {
        this.hide();
      }
    });
  }),

});
