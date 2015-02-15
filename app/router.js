import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('about');

  this.resource('users', function() {
    this.route('new');

    this.resource('user', { path: '/:user_id' }, function() {
      this.route('edit');
    });
  });

  this.resource('features', function() {
    this.route('new');

    this.resource('feature', { path: '/:feature_id' }, function() {
      this.route('edit');

      this.resource('tasks', function() {
        this.route('new');

        this.resource('task', { path: '/:task_id' }, function() {
          this.route('edit');
        });
      });
    });
  });

  this.route('settings');
  this.route('sign-in');

  this.resource('stage-types', function() {
    this.route('new');
  });

  this.resource('teams', function() {
    this.route('new');

    this.resource('team', { path: '/:team_id' }, function() {

    });
  });

});

export default Router;
