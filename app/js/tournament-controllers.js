'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

/*GENShYFT's TournamentController*/
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
      return counter = 0;
    }else if(timeLimit <= timeDifference){
      return counter = 0;
    }else if(timeLimit >= timeDifference){
      return counter = timeLimit - timeDifference;
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

  //Gets tournaments created by user.
	$scope.get_mytournaments = function(){
        console.log("get_mytournaments");
        $resource("/jsonapi/mytournaments/all").get({},function(response){
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

/*Previous Controller from controllers.js*/
function TournamentController($scope,$resource,$http,$cookieStore,$location,$timeout){
    $scope.TournamentModel = $resource('/jsonapi/list_open_tournaments');
    $scope.TournamentHeatGameModel = $resource('/jsonapi/create_game/heatID/:heatID');
    $scope.TournamentHeatModel = $resource('/jsonapi/get_heat_ranking');
    //$scope.Tournament = $resource('/jsonapi/tournament/tournamentID');
    $scope.tournamentID = null;
    //$scope.heatID = 12883052;
    $scope.heat = null;
    $scope.round = null;
    $scope.roundDirty = false;

  $scope.my_range = function(n) {
    var result = [];
    var counter = 1;
    for(var i=0;i<n;i++){
      result.push(counter);
      counter ++;
    }
        return result;
        //return Array(n);
    };
    //A method to fetch a generic model and id. 
    //Pass in ID
    $scope.check_location = function(){
      $scope.heatID = $location.search().heatID;
      if (!$scope.heatID){
        alert("No heat ID passed via URL.");
      }
      else{
        //console.log("Fetching heat "+$scope.heatID);
        $scope.fetch_heat($scope.heatID);
      }
    }

    $scope.fetch_heat = function(heatID){
          $scope.TournamentHeatModel.get({"heatID":heatID}, function(response){
              $scope.heat = response;
          });
    };

  $scope.fetch_heat_with_time = function(heatID,time){
      console.log("Fetching heat with time.");
          $scope.TournamentHeatModel.get({"heatID":heatID, "time":time}, function(response){
              $scope.heat = response;
          });
  };

    $scope.fetch_current_heat = function(){
        console.log("Fetching latest heat results");
          $scope.TournamentHeatModel.get({"heatID":$scope.heatID}, function(response){
              $scope.heat = response;
          });
    };

    $scope.mytimeout = false;
  $scope.continually_update_heat_results = function(){
    if($scope.mytimeout){
      $scope.fetch_current_heat();
          var temp = $timeout($scope.continually_update_heat_results,20000);
        }   
  };
  $scope.stop_heat_updates = function(){
    $scope.mytimeout = false;   
  };
  $scope.start_heat_updates = function(){
    $scope.mytimeout = true;
    $scope.continually_update_heat_results();   
  };
    $scope.create_heat_game = function(){
          $scope.TournamentHeatGameModel.get({"heatID":$scope.heat.heatID}, function(response){
              $scope.game = response;
          });
    };

    $scope.fetch_tournaments = function(){
          $scope.TournamentModel.query({}, function(response){
              $scope.tournaments = response;
          });
    };

    $scope.register_for_tournament = function(tournamentID, tournamentPassword){
        //Use a normal form post for this legacy API.
        console.log("id "+tournamentID+" "+tournamentPassword);
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.post("/jsonapi/register_for_tournament_updated", {
            tournamentID: tournamentID,
            password: tournamentPassword
        }).success(function (data, status, headers, config) {
            $scope.registration_response = data;
            console.log(data);
            if (data.failed){
              alert(data.failed);
            }
            else{
              $scope.tournamentID = tournamentID;
              $scope.fetch_tournament(tournamentID);
            }
        }).error(function (data, status, headers, config) {
          console.log("Error");
            alert("An error occurred.")
            console.log(data);
        });
    };

    $scope.create_tournament = function(){
          $scope.tournamentDirty = false;
          var data = {"description":"description",
                       "password": "password",
                       "shortTitle":"shortTitle",
                       "longTitle": "longTitle",
                       "smallPicture": "smallPicture",
                       "largePicture": "largePicture",
                       "status": "Closed",
                       "type": "Normal"}
          $scope.NewTournament = $resource('/jsonapi/add_or_update_tournament');
      var new_tournament = new $scope.NewTournament(data);
      new_tournament.$save(function(response){
         if(response.error) {
          console.log(response.error)
         }
         else{

        $scope.tournament = response;
       }
      }); 
    };

    $scope.update_tournament = function(tournamentID){
          $scope.tournamentDirty = false;
          var data = {"description":$scope.tournament.description,
                       "password": $scope.tournament.password,
                       "shortTitle":$scope.tournament.shortTitle,
                       "longTitle": $scope.tournament.longTitle,
                       "smallPicture":$scope.tournament.smallPicture,
                       "largePicture": $scope.tournament.largePicture,
                       "status":$scope.tournament.status,
                       "type": $scope.tournament.type}
          $scope.NewTournament = $resource('/jsonapi/add_or_update_tournament/'+tournamentID);
      var new_tournament = new $scope.NewTournament(data);
      new_tournament.$save(function(response){
         if(response.error) {
          console.log(response.error)
         }
         else{
        //$scope.tournament = response;
        $scope.fetch_tournament(tournamentID); //Using legacy fetch. 
       }
      });
    };
  $scope.fetch_tournament = function(tournamentID){
          $resource('/jsonapi/tournament/:tournamentID').get({"tournamentID":tournamentID}, function(response){
              $scope.tournament = response;
              //$scope.startTime = new Date("2013-09-29 08:24:46.840830");
              //$scope.stopTime = new Date("2013-09-29 12:00:11.784760");
              //console.log(($scope.stopTime - $scope.startTime)/1000);
          });

    };

    $scope.get_seconds_to_start = function(startTime, currentTime){
      var diff = Math.round((new Date(startTime) - new Date(currentTime))/1000);
      if (diff > 0){
        return diff;
      }
      else if (startTime==null){
        console.log("Round has not startTime");
      return -1;  
      }
      else return 0;
    };

    $scope.get_time_delta = function(startTime, stopTime){
      var start_date = startTime.split(' ')[0];
      console.log("start_date "+start_date)
      stopTime = start_date+" "+stopTime;
      var diff = Math.round((new Date(stopTime) - new Date(startTime))/1000);
      console.log("start time "+startTime+" "+new Date(startTime));
      console.log("stop time "+stopTime+" "+new Date(stopTime));
      var sec = diff % 60;
      var min = (diff - sec)/60;
      return min+ " min "+sec+ "sec";
      //return new Date(stopTime) - new Date(startTime);

    };

  $scope.add_round = function(tournamentID){
          $scope.roundDirty = false;
          var data = {'timelimit':3600,
                  'description':'Update this description',
                  'problemIDs':[],
                  'tournamentID':tournamentID}
          $scope.NewRound = $resource('/jsonapi/add_or_update_round');
      var new_round = new $scope.NewRound(data);
      new_round.$save(function(response){
         if(response.error) {
          console.log(response.error)
         }
         else{
        $scope.round = response;
       }
      }); 
          
    };
    $scope.update_round = function(roundID){
          $scope.roundDirty = false;
          var data = {"timelimit":3600,
                "problemIDs":$scope.round.problemIDs,
                "description":$scope.round.description}
          $scope.NewRound = $resource('/jsonapi/add_or_update_round/'+roundID);
      var new_round = new $scope.NewRound(data);
      new_round.$save(function(response){
         if(response.error) {
          console.log(response.error)
         }
         else{
        //$scope.round = response;
        $scope.fetch_round(roundID);//Using legacy fetch
       }
      });
    };
  $scope.fetch_round = function(roundID){
          $resource('/jsonapi/round/:roundID').get({"roundID":roundID}, function(response){
              $scope.round = response;
              $scope.roundDirty = false;
          });
    };

  $scope.add_problem_to_round = function(problemID){
          $scope.roundDirty = true;
          $scope.round.problemIDs.push(problemID);
          $scope.round.problemDetails[problemID] = {};
          
          $scope.round.problemDetails[problemID].description = "Placeholder description until reloaded.";
          $scope.round.problemDetails[problemID].name = "Placeholder name until reloaded.";
              
    };

    $scope.remove_problem_from_round = function(problemID){
      $scope.roundDirty = true;
      var index = $scope.round.problemIDs.indexOf(problemID);
      if (index > -1) {
        $scope.round.problemIDs.splice(index, 1);
    }

    };
    $scope.move_problem_down_in_round = function(problemID){
      $scope.roundDirty = true;
      var index = $scope.round.problemIDs.indexOf(problemID);
      if (index > -1 && index < $scope.round.problemIDs.length-1) {
        var temp = $scope.round.problemIDs[index];
        var temp2 = $scope.round.problemIDs[index+1];
        $scope.round.problemIDs[index] = temp2;
        $scope.round.problemIDs[index+1] = temp;  

    }
    };
    $scope.move_problem_up_in_round = function(problemID){
      $scope.roundDirty = true;
      var index = $scope.round.problemIDs.indexOf(problemID);
      if (index > 0) {
        var temp = $scope.round.problemIDs[index];
        var temp2 = $scope.round.problemIDs[index-1];
        $scope.round.problemIDs[index] = temp2;
        $scope.round.problemIDs[index-1] = temp;  
    }
    };

    $scope.create_tournament_round_game = function(roundID){
      $scope.CreateGameModel = $resource('/jsonapi/launch_game_for_round?round_id='+roundID);
      $scope.CreateGameModel.get({}, function(response){
        $scope.game = response;
        console.log(response);
        $cookieStore.put("roundID", roundID ); 
      $cookieStore.put("tournamentGameID", $scope.game.gameID); 
      $cookieStore.put("num", $scope.game.problemIDs.length);
    $cookieStore.put("type", "practiceGame");
      
        window.location.href = "tournament_play_page.html";
      });
    };
    
}