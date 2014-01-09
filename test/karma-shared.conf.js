<<<<<<< HEAD
module.exports = function() {
  return {
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    // browsers: ['Firefox'],
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    autoWatch: false,

    // these are default values anyway
    singleRun: false,
    colors: true,
    // logLevel: LOG_DEBUG,
    files : [
      //3rd Party Code
      'app/lib/angular/angular.js',

      // 'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
      // 'article-app/scripts/lib/router.js',
      // 'node_modules/karma-requirejs/lib/require.js',
      // 'node_modules/chai/lib/chai.js',



      //App-specific Code
      //'app/scripts/config/config.js',
      //'app/scripts/services/**/*.js',
      //'app/scripts/directives/**/*.js',
      //'app/scripts/controllers/**/*.js',
      //'app/scripts/filters/**/*.js',
      //'app/scripts/config/routes.js',
      //'app/scripts/app.js',
      //'app/js/**/*.js',

    "app/lib/angular/angular-resource.js",
    "app/js/cookies.js",
    "app/js/analytics.js",
    "app/js/ui-ace.js",
    'app/js/app-config.js',



      'app/js/controllers.js',
      'app/js/directives.js',
      'app/js/app.js',
      'app/js/app-config.js'
=======
module.exports = function () {
    return {
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        // browsers: ['Chrome'],
        browsers: ['PhantomJS'],
        autoWatch: false,

        // these are default values anyway
        singleRun: false,
        colors: true,

        files: [
            // 3rd Party Code
            'bower_components/angular-unstable/angular.js',
>>>>>>> d0d51bb89e1a86e7931303a81467e9102b1bc93c

            'bower_components/angular-resource-unstable/angular-resource.js',
            'app/js/cookies.js',
            'app/js/ui-ace.js',
            'app/js/analytics.js',
            'app/js/angular-google-maps.js',

            //App-specific Code
            'app/js/controllers.js',
            'app/js/directives.js',
            'app/js/services.js',
            'app/js/app.js',
            'app/js/app-config.js',

            // Test-Specific Code
            'bower_components/angular-mocks-unstable/angular-mocks.js'
        ]
    }
};
