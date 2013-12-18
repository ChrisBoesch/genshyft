var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    // App specific files
    // './test/e2e/**/*.js'
    './test/e2e/routesSpec.js'
  ]);

  conf.proxies = {
    '/': 'http://localhost:8888/'
  };

  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  config.set(conf);
};
