import Ember from 'ember';
import ControllersFormMixin from 'trailblazer/mixins/controllers/form';

module('ControllersFormMixin');

// Replace this with your real tests.
test('it works', function() {
  var ControllersFormObject = Ember.Object.extend(ControllersFormMixin);
  var subject = ControllersFormObject.create();
  ok(subject);
});
