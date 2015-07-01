import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  // TODO - remove
  this.route('about');

  this.route('users', function() {
    this.route('new');

    this.route('user', { path: '/:user_id' }, function() {
      this.route('edit');
    });
  });

  this.route('features', function() {
    this.route('new');

    this.route('feature', { path: '/:feature_id' }, function() {
      this.route('edit');

      this.route('tasks', function() {
        this.route('new');

        this.route('task', { path: '/:task_id' }, function() {
          this.route('edit');
        });
      });
    });
  });

  this.route('settings');
  this.route('sign-in'); // TODO - Deprecate

  this.route('stage-types', function() {
    this.route('new');
  });

  this.route('teams', function() {
    this.route('new');

    this.route('team', { path: '/:team_id' }, function() {

    });
  });

});

export default Router;
