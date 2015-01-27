import Ember from 'ember';

export default Ember.Mixin.create({

  // TODO - Stages doesn't rollback

  rollback: function() {
    var model = this.get('controller.content');

    if (model.get('isDirty')) {
      model.rollback();
    }
  }.on('willTransition'),

});
