var myAppConfig = angular.module('myAppConfig', ['ngCookies','ngResource', 'analytics','ui.ace','ui.bootstrap']).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('', {templateUrl: 'partials/home.html', controller: IndexController});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: IndexController});
    $routeProvider.when('/quests', {templateUrl: 'partials/selectquests.html', controller: IndexController, reloadOnSearch:false});
    $routeProvider.when('/practice', {templateUrl: 'partials/practice.html', controller: IndexController, reloadOnSearch:false});
    $routeProvider.when('/challenges', {templateUrl: 'partials/challenges.html', controller: IndexController});
    $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: IndexController});
    $routeProvider.when('/teach', {templateUrl: 'partials/teach.html', controller: IndexController});
    $routeProvider.when('/storyboard', {templateUrl: 'partials/storyboard.html', controller: IndexController});
    $routeProvider.when('/story', {templateUrl: 'partials/story.html', controller: IndexController});
	$routeProvider.when('/challengestatistics', {templateUrl: 'partials/challengestatistics.html', controller: IndexController});
	$routeProvider.when('/ranking', {templateUrl: 'partials/ranking.html', controller: IndexController});
	$routeProvider.when('/registration', {templateUrl: 'partials/registration.html', controller: IndexController});
    $routeProvider.when('/challengeCreator', {templateUrl: 'partials/challengeCreator.html', controller: IndexController});
    $routeProvider.when('/challengeEdit', {templateUrl: 'partials/challengeEdit.html', controller: IndexController})
    $routeProvider.when('/tournaments', {templateUrl: 'partials/tournament.html', controller: IndexController});
	$routeProvider.when('/create', {templateUrl: 'partials/create_paths_and_levels.html', controller: IndexController});
    $routeProvider.when('/videos', {templateUrl: 'partials/videos.html', controller: IndexController});
    $routeProvider.when('/feedback', {templateUrl: 'partials/feedback.html', controller: IndexController});
    $routeProvider.when('/b1', {templateUrl: 'bisa/b1.html', controller: IndexController});
    $routeProvider.when('/b2', {templateUrl: 'bisa/b2.html', controller: IndexController});
    $routeProvider.when('/b3', {templateUrl: 'bisa/b3.html', controller: IndexController});
    $routeProvider.when('/b4', {templateUrl: 'bisa/b4.html', controller: IndexController});
    $routeProvider.when('/b5', {templateUrl: 'bisa/b5.html', controller: IndexController});
    $routeProvider.when('/problemcontribution', {templateUrl: 'bisa/problemcontribution.html', controller: IndexController});
    $routeProvider.when('/problemcontribution_edit', {templateUrl: 'bisa/problemcontribution_edit.html', controller: IndexController});
    $routeProvider.when('/problemcontribution_admin', {templateUrl: 'bisa/problemcontribution_admin.html', controller: IndexController});
    $routeProvider.when('/masterycoaching', {templateUrl: 'bisa/masterycoaching.html', controller: IndexController});
    $routeProvider.when('/masterycoaching_quiz', {templateUrl: 'bisa/masterycoaching_quiz.html', controller: IndexController});
    $routeProvider.otherwise({redirectTo: '/home'});
    

}]);

myAppConfig.run(function($rootScope, $location) {
    $rootScope.location = $location;
});

myAppConfig.filter('startFrom', function() {
    return function(input, idx) {
        if(input != undefined){
            var i=idx, len=input.length, result = [];
            for (; i<len; i++)
                result.push(input[i]);
            return result;
        }
    };
});

myAppConfig.filter('groupBy', function() {
    return function(items, groupedBy) {
        if (items) {
            var finalItems = [],
                thisGroup;
            for (var i = 0; i < items.length; i++) {
                if (!thisGroup) {
                    thisGroup = [];
                }
                thisGroup.push(items[i]);
                if (((i+1) % groupedBy) == 0) {
                    finalItems.push(thisGroup);
                    thisGroup = null;
                }
            };
            if (thisGroup) {
                finalItems.push(thisGroup);
            }
            return finalItems;
        }
    };
});
