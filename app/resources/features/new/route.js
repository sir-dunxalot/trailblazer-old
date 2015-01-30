import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  // undoStageCreation: function() {
  //   var stages = this.get('controller.content.stages');

  //   stages.forEach(function(stage) {
  //     if (stage.get('isDirty')) {
  //       stage.deleteRecord();
  //     }
  //   })
  // }.on('willTransition'),

  afterModel: function(newFeature) {
    var store = this.store;
    var duration = newFeature.get('totalDuration');
    var durations = [
      duration * 0.2,
      duration * 0.6,
      duration * 0.2
    ];

    store.find('stageType').then(function(types) {

      types.forEach(function(type, i) {
        var stage = store.createRecord('stage', {
          duration: Math.round(durations[i]),
          feature: newFeature,
          type: type
        });

        newFeature.get('stages').pushObject(stage);
      });
    });
  },

  model: function() {
    return this.store.createRecord('feature');
  },

});
