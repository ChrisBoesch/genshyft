'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1')

    .factory('currentUserService', function () {
        var _user = {};
        return {
            setUser: function (user) {
                _user = user;
            },
            getUser: function () {
                return _user;
            }
        }
    })

    // Todo: Make it a provider so that _basePath can be configured from app.config
    .factory('gameService', function ($resource, $q) {
        var _basePath = '/jsonapi/',
            _promiseWrapper = function (url, method) {
                if(angular.isUndefined(method)) {
                    method = 'get';
                }
                return function () {
                    var deferred = $q.defer();
                    $resource(_basePath + url)[method](function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }
        return {
            getGamePaths: _promiseWrapper('get_game_paths'),
            getMobilePaths: _promiseWrapper('mobile_paths', 'query')
        }
    });
