module.exports = function() {
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
    
    files : [
      // 3rd Party Code
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-resource.js',
      'app/js/cookies.js',
      'app/js/ui-ace.js',
      'app/js/analytics.js',
      'app/js/angular-google-maps.js',
      // 'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
      // This file doesn't exist
      // 'app/scripts/lib/router.js',

      //App-specific Code
      //'app/scripts/config/config.js',
      //'app/scripts/services/**/*.js',
      //'app/scripts/directives/**/*.js',
      //'app/scripts/controllers/**/*.js',
      //'app/scripts/filters/**/*.js',
      //'app/scripts/config/routes.js',
      //'app/scripts/app.js',
      //'app/js/**/*.js',
      'app/js/controllers.js',
      'app/js/directives.js',
      'app/js/app.js',
      'app/js/app-config.js'

      // Test-Specific Code
      // 'node_modules/chai/chai.js',
      // 'test/lib/chai-should.js',
      // 'test/lib/chai-expect.js'
    ]
  }
};
