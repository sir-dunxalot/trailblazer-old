import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNameBindings: ['currentRoute'],
  classNames: ['app'],
  role: 'application',

  currentRoute: function() {
    var routeName = defaultFor(
      this.get('controller.currentRouteName'),
      ''
    );

    return routeName.replace('.', '-');
  }.property('controller.currentRouteName'),

  onFeature: function() {
    return this.get('currentRoute') === 'feature-index';
  }.property('currentRoute'),

  onForm: function() {
    var currentRoute = this.get('currentRoute');
    var isNew = currentRoute.indexOf('new') > -1;
    var isEdit = currentRoute.indexOf('edit') > -1;

    return isNew || isEdit;
  }.property('currentRoute')
});
