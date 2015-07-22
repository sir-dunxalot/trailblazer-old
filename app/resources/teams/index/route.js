import AdminOnlyMixin from 'trailblazer/mixins/routes/admin-only';
import Ember from 'ember';

export default Ember.Route.extend(
  AdminOnlyMixin, {

  model() {
    return this.store.findAll('team');
  },

});
