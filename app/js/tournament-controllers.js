'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})

/*TournamentController*/
function GenshyftTournamentController($scope,$resource){

	$scope.rounds = [1];
	$scope.tournaments = {};
	$scope.unregisteredPlayers = {};
	$scope.registeredPlayers = {};

	$scope.add_tournaments = function(){
		$scope.tournament_title = {};
		$scope.tournament_type = {};
		$scope.tournament_rounds = {};
	}

	$scope.add_rounds= function(){
		$scope.rounds.push("1");
	}

	$scope.delete_rounds = function(index){
		if(index!=0){
			$scope.rounds.splice(index, 1);
		}	
	}

  //To implement for Create Tournaments
	$scope.questions = function(){

       
	}

	$scope.get_tournaments = function(){
        console.log("get_tournaments");
        $resource("/jsonapi/tournamentsTest/ALL").get({},function(response){
            $scope.tournaments = response; // stores the Json files
            console.log($scope.tournaments);
       	})
    }

    $scope.get_unregisteredPlayers = function(){
        console.log("get_unregisteredPlayers");
        $resource("/jsonapi/unregisteredPlayersTest/ALL").get({},function(response){
            $scope.unregisteredPlayers = response; // stores the Json files
            console.log($scope.unregisteredPlayers);
       	})
    }

    $scope.get_registeredPlayers = function(){
        console.log("get_registeredPlayers");
        $resource("/jsonapi/registeredPlayersTest/ALL").get({},function(response){
            $scope.registeredPlayers = response; // stores the Json files
            console.log($scope.registeredPlayers);
       	})
    }

    //list_rankings() method is for Group Rankings page. To implement method.
    $scope.list_rankings = function(){

    }
  
}