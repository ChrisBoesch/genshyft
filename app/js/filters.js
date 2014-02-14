(function() {
    'use strict';

    /* Filters */
    var module = angular.module('myApp.filters', []);


    module.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

    module.filter("renderPermutation", function() {
        return function (lines, permutations) {
            return permutations.
                toString().
                split('').
                map(function(lineNumber){
                    var index = parseInt(lineNumber, 10) - 1;
                    return lines[index];
                }).
                join('/n');
        };
    });

})();