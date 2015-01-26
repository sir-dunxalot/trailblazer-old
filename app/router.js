import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('user', function() {
    this.route('index', { path: 'team' });
    this.route('new');
    this.route('show', { path: '/:id' });
  });

  this.resource('feature', function() {
    this.route('edit', { path: '/:id/edit' });
    this.route('new');
    this.route('show', { path: '/:id' });
  });

  this.route('stage-type', function() {
    this.route('new');
  });

});

export default Router;
