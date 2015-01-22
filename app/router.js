import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('index', { path: 'roadmap' });

  this.resource('user', function() {
    this.route('new');
    this.route('show', { path: '/:id' });
  });

  this.resource('feature', function() {
    this.route('edit', { path: '/:id/edit' });
    this.route('new');
    this.route('show', { path: '/:id' });
  });

});

export default Router;
