import Ember from 'ember';
import ViewsFormMixin from 'trailblazer/mixins/views/form';

module('ViewsFormMixin');

// Replace this with your real tests.
test('it works', function() {
  var ViewsFormObject = Ember.Object.extend(ViewsFormMixin);
  var subject = ViewsFormObject.create();
  ok(subject);
});
