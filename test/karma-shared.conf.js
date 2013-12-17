module.exports = function() {
  return {
    basePath: '../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    // browsers: ['Firefox'],
    browsers: ['PhantomJS'],
    autoWatch: true,

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
      'app/js/app.js',

      //Test-Specific Code
      'node_modules/chai/chai.js',
      'test/lib/chai-should.js',
      'test/lib/chai-expect.js'
    ]
  }
};
