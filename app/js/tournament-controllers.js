'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

/*TournamentController*/
function GenshyftTournamentController($scope,$resource,$timeout){

	$scope.rounds = [1];
	$scope.tournaments = {};
	$scope.unregisteredPlayers = {};
	$scope.registeredPlayers = {};
  $scope.statusValue = 0;

  /*Function which auto refresh*/
  var scheduleReload = function(){
    console.log("get_unregisteredPlayers");
    $resource("/jsonapi/unregisteredPlayersTest/ALL").get({},
      function(response){
        $scope.unregisteredPlayers = response; // stores the Json files
        console.log($scope.unregisteredPlayers);
    });
    $timeout(function(){ scheduleReload(); }, 2000);
  };

  /*Function which calculate the countdown time, takes in seconds*/
  var tournamentCountdownCal = function(tournamentActivationTime, currentServerTime, timeLimit){    
    var timeDifference = currentServerTime - tournamentActivationTime;
    counter = 0;
    if(timeDifference <= 0){
      counter = 0;
    }else if(timeLimit <= timeDifference){
      counter = 0;
    }else if(timeLimit >= timeDifference){
      counter = timeLimit - timeDifference;
    }
  };

	$scope.add_tournaments = function(){
		$scope.tournament_title = {};
		$scope.tournament_type = {};
		$scope.tournament_rounds = {};
	};

	$scope.add_rounds= function(){
		$scope.rounds.push("1");
	};

	$scope.delete_rounds = function(index){
		if(index!=0){
			$scope.rounds.splice(index, 1);
		}	
	};

  //To implement for Create Tournaments
	$scope.questions = function(){

       
	}

	$scope.get_tournaments = function(){
        console.log("get_tournaments");
        $resource("/jsonapi/tournamentsTest/ALL").get({},function(response){
            $scope.tournaments = response; // stores the Json files
            console.log($scope.tournaments);
       	});
    };

    $scope.get_unregisteredPlayers = function(){
        scheduleReload(); 
    };

    $scope.get_registeredPlayers = function(){
        console.log("get_registeredPlayers");
        $resource("/jsonapi/registeredPlayersTest/ALL").get({},function(response){
            $scope.registeredPlayers = response; // stores the Json files
            console.log($scope.registeredPlayers);
       	});
    };

    //list_rankings() method is for Group Rankings page. To implement method.
    $scope.list_rankings = function(){

    };
  

    $scope.add_qns = function(qnsLanguage){
      if(qnsLanguage==undefined){
        alert("Please choose a language for the round!");
      }
    };

    $scope.qns_modal = function(qnsLanguage){
      if(qnsLanguage==undefined){
        return false;
      }
    };

    $scope.create_grptournament = function(){
      /*
      $scope.tournamentDirty = false;
      var data = {"description":"description",
                   "password": "password",
                   "title":"title",
                   "status": "Closed",
                   "type": "Normal"}
      $scope.NewTournament = $resource('/jsonapi/add_or_update_grptournament');
      var new_tournament = new $scope.NewTournament(data);
      new_tournament.$save(function(response){
         if(response.error) {
          console.log(response.error);
         }
         else{

        $scope.tournament = response;
        }
      });
      */
      $scope.grpTourModel = $resource('/jsonapi/list_grpTournaments');
      $scope.grpTourModel.get({}, function(response){
        $scope.newGrpTournament = {};
        $scope.newGrpTournament.title = $scope.grpTourTitle;
        $scope.newGrpTournament.description = $scope.grpTourDescription;
        $scope.newGrpTournament.password = $scope.grpTourPassword;
        $scope.newGrpTournament.status = $scope.grpTourStatus;
        $scope.newGrpTournament.type = $scope.grpTourType;
        $scope.newGrpTournament.mentorAssignment = $scope.grpTourMentor
        $scope.newGrpTournament.maxNoGroup = $scope.grpTourMaxNoGroup;
        $scope.newGrpTournament.maxNoPlayer = $scope.grpTourMaxNoPlayer;

        if($scope.newGrpTournament.title==""){
          alert("The tournament title cannot be empty!");
        }
        else if($scope.newGrpTournament.description==""){
          alert("The tournament description cannot be empty!");
        }
        else if($scope.newGrpTournament.password==""){
          alert("The tournament password cannot be empty!");
        }
        else if($scope.newGrpTournament.type==""){
          alert("The tournament type cannot be empty!");
        }
        else if($scope.newGrpTournament.type=="group"){
          if($scope.newGrpTournament.maxNoGroup==""){
            alert("The tournament title cannot be empty!");
          }
          else if($scope.newGrpTournament.maxNoPlayer==""){
            alert("The tournament title cannot be empty!");
          }
        }
        else{
          $scope.NewGrpTournament = $resource('/jsonapi/add_or_update_grptournament');
          var new_grpTournament = new $scope.NewGrpTournament($scope.newGrpTournament);
          new_grpTournament.$save(function(response){
            $scope.grpTournament = response;
            console.log("new group tournament" + response);
            $scope.newGrpTournamentID = response.id;
          });
          $('#grpTournamentCreated').modal('show');
        }
      });
    };

  $scope.hideSuccessTournamentModal = function(){
    $('#grpTournamentCreated').modal('hide');
    window.location="index.html#/mytournaments";
  };

  $scope.get_tournament_details = function(){

  }

}