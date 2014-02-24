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
        };
    })

    .factory('ace', function($window){
        return $window.ace;
    })

    .factory('now', function($window) {
        if ($window.Date.now) {
            return $window.Date.now;
        } else {
            return function() {
                return new Date().getTime();
            };
        }
    })

    .factory('Timer', function(now) {
        var Timer = function() {
            this._start = now();
            this._stop = null;
        };

        Timer.prototype = {
            stop: function() {
                this._stop = now();
            },

            delta: function() {
                var ref = this._stop ? this._stop : now();
                    
                return ref - this._start;
            },

            rate: function(count) {
                var d = count || 1;

                if (count === 0) {
                    return 0;
                }

                return this.delta() / d ;
            },

            running: function (argument) {
                return this._stop === null;
            }

        };

        return Timer;

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
            };
        return {
            getGamePaths: _promiseWrapper('get_game_paths'),
            getMobilePaths: _promiseWrapper('mobile_paths', 'query')
        };
    })

    .factory('permutations', function(){
        function permute(a, b) {
            var ret = [],
                sub_ret = {},
                element,
                P1,
                P2,
                P1_JOIN,
                P2_JOIN;

            for (var element_a in a) {
                for (var element_b in b) {
                    if (b[element_b].indexOf(a[element_a][0]) >= 0) {
                        continue;
                    }
                    P1 = a[element_a].concat(b[element_b]);
                    P2 = b[element_b].concat(a[element_a]);
                    P1_JOIN = P1.join('');
                    if (P1_JOIN in sub_ret) {
                        continue;
                    } else {

                        ret.push(P1);
                        sub_ret[P1_JOIN] = true;

                    }
                    P2_JOIN = P2.join('');
                    if (P2_JOIN in sub_ret) {
                        continue;
                    } else {

                        ret.push(P2);
                        sub_ret[P2_JOIN] = true;
                    }

                }
            }
            return ret;
        }

        return function (n) {
            var i,
                range = [],
                permute_elementes,
                ret2,
                both,
                topadditional = 0,
                top = [],
                bottom = [],
                limit = n;

            if (n > 7) {
                both = parseInt((n - 7) / 2, 10);
                topadditional = (n - 7) % 2 + both;
                limit = topadditional + 7;
            }

            i = 1 + topadditional;
            while (i <= limit) {
                range.push([i]);
                i = i + 1;
            }

            i = 1;
            while (i <= topadditional) {
                top.push(i);
                i = i + 1;
            }

            i = limit + 1;
            while (i <= n) {
                bottom.push(i);
                i = i + 1;
            }

            ret2 = JSON.parse(JSON.stringify(range));
            permute_elementes = JSON.parse(JSON.stringify(range));

            i = 0;
            while (i < (range.length - 1)) {
                permute_elementes = JSON.parse(JSON.stringify(permute(range, permute_elementes)));
                ret2 = ret2.concat(permute_elementes);
                i = i + 1;
            }

            for (i in ret2) {
                ret2[i] = top.concat(ret2[i]);
                ret2[i] = ret2[i].concat(bottom);
            }

            return ret2;
        };
    });
