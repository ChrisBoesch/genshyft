/* Controllers */

contactManager.controller('TournamentCtrl',
  function AppCtrl ($scope) {
    $scope.tournaments = [{
			name: 'Tournament 1',
      language: 'Java'
    }];
  });

contactManager.controller('InfoCtrl',
  function InfoCtrl($scope, $routeParams) {
    $scope.tournament = $scope.tournaments[$routeParams.id];
  });

contactManager.controller('AddCtrl',
  function AddCtrl($scope, $location) {
    $scope.tournament = {};
    $scope.add = function () {
      $scope.tournaments.push($scope.tournament);
      $location.url('/');
    };
  });

contactManager.controller('EditCtrl',
  function EditCtrl($scope, $routeParams, $location) {
    $scope.tournament = $scope.tournaments[$routeParams.id];
    $scope.edit = function () {
      $scope.tournaments[$routeParams.id] = $scope.tournament;
      $location.url('/');
    };
  });

contactManager.controller('RemoveCtrl',
  function RemoveCtrl($scope, $routeParams, $location) {
    $scope.tournament = $scope.tournaments[$routeParams.id];
    $scope.remove = function () {
      $scope.tournaments.splice($routeParams.id, 1);
      $location.url('/');
    };
    $scope.back = function () {
      $location.url('/');
    };
  });
