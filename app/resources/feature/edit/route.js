import Rollback from 'trailblazer/mixins/routes/rollback';
import Ember from 'ember';

export default Ember.Route.extend(
  Rollback, {

  model: function(params) {
    return this.store.find('feature', params.id);
  },

});
