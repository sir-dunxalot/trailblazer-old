/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'trailblazer',
    podModulePrefix: 'trailblazer/resources',
    environment: environment,
    firebase: 'https://YOUR-FIREBASE-NAME.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {

      }
    },

    APP: {
      dateFormat: 'MMM D, YYYY',
      shortDateFormat: 'D MMM',

      /* Firebase app details. Also see firebase.json */

      firebaseApp: 'trailblazer-dev',
      firebaseUrl: null, // Set below
    },

    contentSecurityPolicy: {
      'connect-src': "'self' wss://*.firebaseio.com",
      'frame-src': "'self' https://*.firebaseio.com",
      'font-src': "'self' http://fonts.gstatic.com https://s3.amazonaws.com",
      'img-src': "'self' https://*.githubusercontent.com",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com",
      'style-src': "'self' 'unsafe-inline' https://s3.amazonaws.com http://fonts.googleapis.com",
    },

    'ember-cli-toggle': {
      defaultTheme: 'ios',
      includedThemes: ['ios'],
      excludedThemes: ['default', 'flat', 'flip', 'light', 'skewed'],
    },

    'simple-auth': {
      authenticationRoute: 'index',
      routeAfterAuthentication: 'features',
      routeIfAlreadyAuthenticated: 'features'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
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
    ENV.APP.firebaseApp = 'trailblazer';
  }

  ENV.APP.firebaseUrl = 'https://' + ENV.APP.firebaseApp + '.firebaseio.com';

  return ENV;
};
