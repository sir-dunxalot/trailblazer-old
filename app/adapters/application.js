import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'trailblazer/config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(ENV.APP.firebaseUrl),
});
