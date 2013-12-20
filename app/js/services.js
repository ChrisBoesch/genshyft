'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')

  .factory('currentUser', function () {
    var _user = {};
    return {
      setUser: function (user) {
        _user = user;
      },
      getUser: function () {
        return _user;
      }
    }
  });