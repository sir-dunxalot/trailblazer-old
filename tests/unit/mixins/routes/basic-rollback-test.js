import Ember from 'ember';
import RoutesBasicRollbackMixin from 'trailblazer/mixins/routes/basic-rollback';

module('RoutesBasicRollbackMixin');

// Replace this with your real tests.
test('it works', function() {
  var RoutesBasicRollbackObject = Ember.Object.extend(RoutesBasicRollbackMixin);
  var subject = RoutesBasicRollbackObject.create();
  ok(subject);
});
