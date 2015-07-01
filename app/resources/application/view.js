import defaultFor from 'trailblazer/utils/default-for';
import Ember from 'ember';

const { computed } = Ember;

export default Ember.View.extend({
  attributeBindings: ['role'],
  classNameBindings: ['currentRoute'],
  classNames: ['app'],
  onLandingPage: computed.equal('currentRoute', 'index'),
  onRoadmap: computed.equal('currentRoute', 'features-index'),
  role: 'application',

  currentRoute() {
    const routeName = defaultFor(this.get('controller.currentRouteName'), '');

    return routeName.replace('.', '-');
  }.property('controller.currentRouteName'),
});
