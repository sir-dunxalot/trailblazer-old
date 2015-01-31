import DeleteRecord from 'trailblazer/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  afterModel: function(model) {
    var userId = this.get('userId');

    /* Add the user to the team model */

    this.store.find('user', userId).then(function(user) {
      model.get('members').pushObject(user);
    });
  },

  model: function() {
    return this.store.createRecord('team');
  },

});
