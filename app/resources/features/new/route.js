import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  afterModel: function(newFeature) {
    var store = this.store;

    store.find('stageType').then(function(types) {

      types.forEach(function(type) {
        var stage = store.createRecord('stage', {
          // TODO - set feature here
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
