import Ember from 'ember';

export default Ember.Mixin.create({

  deleteRecord() {
    const model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.deleteRecord();
    }
  }.on('willTransition'),

});
