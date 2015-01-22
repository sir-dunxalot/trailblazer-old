/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import(app.bowerDirectory + '/firebase/firebase.js');
app.import(app.bowerDirectory + '/emberfire/dist/emberfire.js');

module.exports = app.toTree();
