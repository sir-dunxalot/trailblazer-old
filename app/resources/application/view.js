import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNameBindings: ['currentRoute'],
  classNames: ['app'],
  onLandingPage: Ember.computed.equal('currentRoute', 'index'),
  onRoadmap: Ember.computed.equal('currentRoute', 'features-index'),
  role: 'application',

  currentRoute: function() {
    var routeName = defaultFor(this.get('controller.currentRouteName'),'');

    return routeName.replace('.', '-');
  }.property('controller.currentRouteName'),
});
