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
            // 'bower_components/angular-unstable/angular.js',
            'app/lib/angular/angular.js',

            'bower_components/angular-route/angular-route.js',
            'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',

            "app/lib/angular/angular-resource.js",
            'app/js/app-config.js',


            // 'bower_components/angular-resource-unstable/angular-resource.js',
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
    };
};
