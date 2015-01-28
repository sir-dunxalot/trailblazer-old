import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('users', function() {
    this.route('index', { path: '/team' });
    this.route('new');

    this.resource('user', { path: '/:id' }, function() {

    });
  });

  this.resource('features', function() {
    this.route('new');

    this.resource('feature', { path: '/:id' }, function() {
      this.route('edit');

      this.resource('tasks', function() {
        this.route('new');
      });
    });
  });

  this.resource('stage-types', function() {
    this.route('new');
  });

});

export default Router;
