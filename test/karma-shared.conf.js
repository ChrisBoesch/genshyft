module.exports = function () {
  return {
    basePath: '../',
    frameworks: ['jasmine', 'mocha'],
    reporters: ['spec'],
    browsers: [
      'PhantomJS',
      // 'Chrome',
      //'ChromeCanary'
    ],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,

    files: [
      //3rd Party Code
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
      'app/scripts/lib/router.js',

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
      'app/js/app.js',

      //Test-Specific Code
      // 'node_modules/chai/chai.js',
      // 'test/lib/chai-should.js',
      // 'test/lib/chai-expect.js'
    ]
  }
};