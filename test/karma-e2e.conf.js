var sharedConfig = require('./karma-shared.conf');

module.exports = function (config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        // Test specific files
        './test/lib/ng-scenario-dsl.js',
        './test/lib/window-dialog-commands.js',
        // App specific files
        // './test/e2e/**/*.js'
        './test/e2e/routesSpec.js',
        './test/e2e/controllers/*.js'
    ]);

    conf.proxies = {
        '/': 'http://localhost:8888/'
    };

    conf.urlRoot = '/__karma__/';

    conf.frameworks = ['ng-scenario'];

    config.set(conf);
};
