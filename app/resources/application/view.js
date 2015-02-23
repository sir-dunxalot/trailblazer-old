import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNameBindings: ['currentRoute'],
  classNames: ['app'],
  role: 'application',

  currentRoute: function() {
    var routeName = defaultFor(this.get('controller.currentRouteName'),'');

    return routeName.replace('.', '-');
  }.property('controller.currentRouteName'),

  onRoadmap: function() {
    var currentRoute = this.get('currentRoute');

    return currentRoute === 'features-index';
  }.property('currentRoute')
});
