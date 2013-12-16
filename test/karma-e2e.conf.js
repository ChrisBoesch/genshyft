var sharedConfig = require('./karma-shared.conf');

module.exports = function (config) {
  var conf = sharedConfig();

  // in e2e tests we dont need files that are needed in unit testing
  conf.files = [
    './test/temp/scenarios.js'

  ];

  // web server needs to run at this url so karma can load them in iframe
  conf.proxies = {
    '/': 'http://localhost:8888/'
  };

  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  config.set(conf);
};