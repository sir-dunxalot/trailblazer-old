import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // TODO - remove
  this.route('about');

  this.route('users', {
    resetNamespace: true
  }, function() {
    this.route('new');

    this.route('user', {
      path: '/:user_id',
      resetNamespace: true
    }, function() {
      this.route('edit');
    });
  });

  this.route('features', {
    resetNamespace: true
  }, function() {
    this.route('new');

    this.route('feature', {
      path: '/:feature_id',
      resetNamespace: true
    }, function() {
      this.route('edit');

      this.route('tasks', {
        resetNamespace: true
      }, function() {
        this.route('new');

        this.route('task', {
          path: '/:task_id',
          resetNamespace: true
        }, function() {
          this.route('edit');
        });
      });
    });
  });

  this.route('settings');
  // TODO - Deprecate
  this.route('sign-in');

  this.route('stage-types', {
    resetNamespace: true
  }, function() {
    this.route('new');
  });

  this.route('teams', {
    resetNamespace: true
  }, function() {
    this.route('new');

    this.route('team', {
      path: '/:team_id',
      resetNamespace: true
    }, function() {

    });
  });

  this.route('backlog');
});

export default Router;
