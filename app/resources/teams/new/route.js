import AdminOnlyMixin from 'trailblazer/mixins/routes/admin-only';
import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  AdminOnlyMixin,
  DirtyRecordHandler, {

  afterModel(model) {
    const userId = this.get('userId');

    /* Add the user to the team model */

    this.store.findRecord('user', userId).then(function(user) {
      model.get('members').pushObject(user);
    });
  },

  model() {
    return this.store.createRecord('team');
  },

});
