import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

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
          // TODO - set feature here
          type: type,
          duration: Math.round(durations[i])
        });

        newFeature.get('stages').pushObject(stage);
      });
    });
  },

  model: function() {
    return this.store.createRecord('feature');
  },

});
