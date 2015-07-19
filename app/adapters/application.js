import DS from 'ember-data';
import ENV from 'trailblazer/config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(ENV.APP.firebaseUrl),
});
