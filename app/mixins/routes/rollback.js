import Ember from 'ember';

export default Ember.Mixin.create({

  // TODO - Stages doesn't rollback

  rollback: Ember.on('willTransition', function() {
    var model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.rollback();
    }
  }),

});
