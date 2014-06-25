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
            'bower_components/jquery/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/fancybox/source/jquery.fancybox.js',
            'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
            'bower_components/ace-builds/src/ace.js',
            'bower_components/leaflet-dist/leaflet-src.js',
            'bower_components/angularjs-unstable/angular.js',
            'bower_components/angularjs-unstable/angular-cookies.js',
            'bower_components/angularjs-unstable/angular-resource.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-ui-ace/ui-ace.js',
            'bower_components/angular-leaflet-directive/src/angular-leaflet-directive.js',
            'bower_components/bootstrap-css/js/bootstrap.js',
            'app/js/angular-google-maps.js',

            //App-specific Code
            'app/js/app-config.js',
            'app/js/app.js',
            'app/js/admin-controllers.js',
            'app/js/analytics.js',
            'app/js/BATController.js',
            'app/js/controllers.js',
            'app/js/directives.js',
            'app/js/fancybox-fire.js',
            'app/js/filters.js',
            'app/js/PurposeDrivenAdminController.js',
            'app/js/PurposeDrivenController.js',
            'app/js/school-controllers.js',
            'app/js/services.js',
            'app/js/tournament-controllers.js',
            'app/js/TournamentGameController.js',
            'app/js/ymbcoaching-controllers.js',
            'app/js/ymbcoaching-play-controllers.js',
            'app/js/WebGameController.js',

            // Test-Specific Code
            'bower_components/angularjs-unstable/angular-mocks.js'
        ]
    };
};
