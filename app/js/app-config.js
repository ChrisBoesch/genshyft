var myAppConfig = angular.module('myAppConfig', ['ngCookies','ngResource', 'analytics','ui.ace','myApp.directives', 'myApp.services']).config(['$routeProvider', function($routeProvider) {
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
	  $routeProvider.when('/roundranking', {templateUrl: 'partials/roundranking.html', controller: IndexController});
    $routeProvider.when('/events', {templateUrl: 'partials/events.html', controller: IndexController});
    $routeProvider.when('/create', {templateUrl: 'partials/create_paths_and_levels.html', controller: IndexController});
    $routeProvider.when('/videos', {templateUrl: 'partials/videos.html', controller: IndexController});
    $routeProvider.when('/feedback', {templateUrl: 'partials/feedback.html', controller: IndexController});
    $routeProvider.when('/schoolregistration', {templateUrl: 'partials/schoolregistration.html', controller: IndexController});
    $routeProvider.when('/schoolregistrationstats', {templateUrl: 'partials/schoolregistrationstats.html', controller: IndexController});
    $routeProvider.when('/schoolsmap', {templateUrl: 'partials/schoolsmap.html', controller: IndexController});
    $routeProvider.when('/mytournaments', {templateUrl: 'partials/mytournaments.html', controller: IndexController});
    $routeProvider.when('/mytournaments-create', {templateUrl: 'partials/mytournaments_create.html', controller: IndexController});
    $routeProvider.when('/mytournaments-manage', {templateUrl: 'partials/mytournaments_manage.html', controller: IndexController});
    $routeProvider.when('/tournament-grpjoin', {templateUrl: 'partials/tournament_grpjoin.html', controller: IndexController});
    $routeProvider.when('/tournament-grpplay', {templateUrl: 'partials/tournament_grpplay.html', controller: IndexController});
    $routeProvider.when('/tournament-ranking', {templateUrl: 'partials/tournament_ranking.html', controller: IndexController});

    $routeProvider.when('/purposedriven', {templateUrl: 'partials/purposedriven.html', controller: IndexController});
    $routeProvider.when('/purposedriven-play', {templateUrl: 'partials/purposedriven-play.html', controller: IndexController});
    $routeProvider.when('/purposedriven-admin', {templateUrl: 'partials/purposedriven-admin.html', controller: IndexController});
    $routeProvider.when('/ymbcoaching', {templateUrl: 'partials/ymbcoaching.html', controller: IndexController});
    $routeProvider.when('/ymbcoaching-play', {templateUrl: 'partials/ymbcoaching-play.html', controller: IndexController});
    $routeProvider.when('/ymbcoaching-cache', {templateUrl: 'partials/ymbcoaching-cache.html', controller: IndexController});
    $routeProvider.when('/batpage', {templateUrl: 'partials/acepartial.html', controller: IndexController});
    
    $routeProvider.when('/home2', {templateUrl: 'partials/home2.html', controller: IndexController});
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
