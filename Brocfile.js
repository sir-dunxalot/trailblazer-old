/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var bowerDir = 'bower_components/';

var app = new EmberApp({

  flashMessages: {
    layout: true,
  },

});

/* Boilerplate stuff */

app.import({
  development: bowerDir + 'modernizr/modernizr.js',
  production: bowerDir + 'modernizr/modernizr.js' // TODO - add custom build here
});

app.import(bowerDir + 'normalize.css/normalize.css', {
  prepend: true
});

/* Dependencies */

app.import(bowerDir + 'firebase/firebase.js');
app.import(bowerDir + 'emberfire/dist/emberfire.js');

app.import('vendor/lib-link.js');
app.import(bowerDir + 'nouislider/distribute/jquery.nouislider.js');
app.import(bowerDir + 'nouislider/distribute/jquery.nouislider.min.css');

app.import(bowerDir + 'velocity/velocity.js');

app.import(bowerDir + 'moment/moment.js');

app.import(bowerDir + 'pikaday/pikaday.js');
app.import(bowerDir + 'pikaday/css/pikaday.css');

app.import(bowerDir + 'intro.js/intro.js');
app.import(bowerDir + 'intro.js/introjs.css');
app.import(bowerDir + 'intro.js/themes/introjs-nassim.css');

module.exports = app.toTree();
