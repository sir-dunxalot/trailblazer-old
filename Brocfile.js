/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var bowerDir = 'bower_components/';

var app = new EmberApp({

  sassOptions: {
    includePaths: [
      bowerDir + 'compass-mixins/lib'
    ]
  },

});

/* Boilerplate stuff */

app.import({
  development: bowerDir + 'modernizr/modernizr.js',
  production: bowerDir + 'modernizr/modernizr.js' // TODO - add custom build here
});

app.import(bowerDir + 'normalize.css/normalize.css', {
  type: 'vendor',
  prepend: true
});

/* Dependencies */

app.import(bowerDir + 'firebase/firebase.js', {
  type: 'vendor'
});

app.import(bowerDir + 'emberfire/dist/emberfire.js', {
  type: 'vendor'
});

app.import('vendor/lib-link.js', {
  type: 'vendor'
});

app.import(bowerDir +
  'nouislider/distribute/jquery.nouislider.js', {
  type: 'vendor'
});

app.import(bowerDir +
  'nouislider/distribute/jquery.nouislider.min.css', {
  type: 'vendor'
});

app.import(bowerDir + 'velocity/velocity.js');

app.import(bowerDir + 'moment/moment.js', {
  type: 'vendor'
});

app.import(bowerDir + 'pikaday/pikaday.js', {
  type: 'vendor'
});

app.import(bowerDir + 'pikaday/css/pikaday.css', {
  type: 'vendor'
});

module.exports = app.toTree();
