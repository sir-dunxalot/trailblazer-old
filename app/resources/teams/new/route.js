import DeleteRecord from 'ember-easy-form-extensions/mixins/routes/delete-record';
import Ember from 'ember';

export default Ember.Route.extend(
  DeleteRecord, {

  afterModel(model) {
    const userId = this.get('userId');

    /* Add the user to the team model */

    this.store.find('user', userId).then(function(user) {
      model.get('members').pushObject(user);
    });
  },

  model() {
    return this.store.createRecord('team');
  },

});
