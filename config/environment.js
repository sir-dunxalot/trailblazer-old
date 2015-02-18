/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'trailblazer',
    podModulePrefix: 'trailblazer/resources',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      dateFormat: 'MMM D, YYYY',
      shortDateFormat: 'D MMM'
    },

    contentSecurityPolicy: {
      'connect-src': "'self' wss://*.firebaseio.com",
      'frame-src': "'self' https://*.firebaseio.com",
      'font-src': "'self' http://fonts.gstatic.com https://s3.amazonaws.com",
      'img-src': "'self' https://*.githubusercontent.com",
      'script-src': "'self' 'unsafe-eval' https://*.firebaseio.com",
      'style-src': "'self' 'unsafe-inline' https://s3.amazonaws.com http://fonts.googleapis.com",
    },

    'ember-cli-toggle': {
      defaultTheme: 'ios',
      includedThemes: ['ios'],
      excludedThemes: ['default', 'flat', 'flip', 'light', 'skewed'],
    },

    'simple-auth': {
      authenticationRoute: 'sign-in',
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
