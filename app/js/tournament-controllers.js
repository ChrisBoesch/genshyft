'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

/*GENShYFT's TournamentController*/
function GenshyftTournamentController($scope,$resource,$timeout,$location,$cookieStore,$http,$route){

  $scope.tournamentID = null;
  $scope.location = $location;
  //$scope.$watch('location.search()', function() {
    //  $scope.tournamentID = ($location.search()).tournamentID;
  //}, true);

  //$scope.heatID = 12883052;
  $scope.heat = null;
  $scope.round = null;
  $scope.roundDirty = false;

  $scope.loading = function(){	
    $scope.rounds = [1];
  	$scope.tournaments = {};
  	$scope.unregisteredPlayers = {};
  	$scope.registeredPlayers = {};
    $scope.statusValue = 0;

    $scope.grpTourTitle ="";
    $scope.grpTourDescription ="";
    $scope.grpTourPassword ="";
    $scope.grpTourStatus ="closed";
    $scope.grpTourType ="individual";
    $scope.grpTourMentor ="";
    $scope.grpTourMaxNoGroup ="";
    $scope.grpTourMaxNoPlayer ="";
    $scope.qnsLanguage ="Ruby";
  };

  /*Function which auto refresh*/
  //Glen
  /*var scheduleReload = function(){
    console.log("get_unregisteredPlayers");
    $resource("/jsonapi/unregisteredPlayersTest/ALL").get({},
      function(response){
        $scope.unregisteredPlayers = response; // stores the Json files
        console.log($scope.unregisteredPlayers);
    });
    $timeout(function(){ scheduleReload(); }, 2000);
  };*/

  /*Unused - Function which calculate the countdown time, takes in seconds - By Glen*/
  /*var tournamentCountdownCal = function(tournamentActivationTime, currentServerTime, timeLimit){    
    var timeDifference = currentServerTime - tournamentActivationTime;
    counter = 0;
    if(timeDifference <= 0){
      return counter = 0;
    }else if(timeLimit <= timeDifference){
      return counter = 0;
    }else if(timeLimit >= timeDifference){
      return counter = timeLimit - timeDifference;
    }
  };*/

  /*Function to seperate Registered Users without group or Individual Tournament - By Glen*/
  var fetchRegisteredUser =function(tournament){
    $scope.registeredPlayersArray =[];
    console.log("scheduleReloadTourn: " + tournament.tournamentID);
    for(var i =0; i < tournament.registeredPlayers.length; i++){
      if(tournament.registeredPlayers[i].Group===0){
        var playerDetails = tournament.registeredPlayers[i].playerName;
        $scope.registeredPlayersArray.push(playerDetails);
      }
    }
  }

  

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

  //To implement for Create Tournaments - engsen
	$scope.get_tournamentQns = function(){
    console.log("get_tournamentQns");
    $resource("/jsonapi/list_tournamentQns/all").get({},function(response){
        $scope.tournamentQns = response; // stores the Json files
        console.log($scope.tournamentQns);
    });
       
	}

  $scope.list_questions = function(qnsLanguage){
    console.log("list_questions");
    $scope.allQns = $scope.get_tournamentQns();

    $scope.qnsArray = [];
    
    for(var i = 0; i < $scope.allQns.qnsLanguage.length - 1; i++){
      var question = $scope.allQns.qnsLanguage[i].qns;
      qnsArray.push(question);
    }
  }

  //Gets tournaments created by user.
	$scope.get_mytournaments = function(){
    console.log("get_mytournaments");
    $resource("/jsonapi/list_grpTournaments/all").get({},function(response){
        $scope.tournaments = response; // stores the Json files
        console.log($scope.tournaments);
   	});

    $resource("/jsonapi/added_tournaments").query({},function(response){
        $scope.grpTournaments = response; // stores the Json files
        console.log($scope.grpTournaments);
    });
  };

  /*Get players of indivdual Tournament or Players without Group in Group Tournament - By Glen*/
  $scope.get_indivNoGrpPlayers = function(tournament){
      fetchRegisteredUser(tournament); 
  };

  /*Unused - By Glen
  $scope.get_registeredPlayers = function(){
    console.log("get_registeredPlayers");
    $resource("/jsonapi/registeredPlayersTest/ALL").get({},function(response){
        $scope.registeredPlayers = response; // stores the Json files
        console.log($scope.registeredPlayers);
   	});
  };*/

  //list_rankings() method is for Group Rankings page. To implement method.
  $scope.list_rankings = function(){

  };
  
  /* engsen
  $scope.add_qns = function(qnsLanguage){
    if(qnsLanguage==undefined){
      alert("Please choose a language for the round!");
      $('#myModal').modal('hide');
      //return false;
    }
  };

  $scope.qns_modal = function(qnsLanguage){
    if(qnsLanguage==undefined){
      return false;
    }
  };
  */

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
    $scope.grpTourModel = $resource('/jsonapi/list_grpTournaments/all');
    $scope.grpTourModel.get({}, function(response){
      $scope.newGrpTournament = {};
      $scope.newGrpTournament.title = $scope.grpTourTitle;
      $scope.newGrpTournament.description = $scope.grpTourDescription;
      $scope.newGrpTournament.password = $scope.grpTourPassword;
      $scope.newGrpTournament.status = $scope.grpTourStatus;
      $scope.newGrpTournament.type = $scope.grpTourType;
      $scope.newGrpTournament.mentorAssignment = $scope.grpTourMentor;
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
      else if($scope.newGrpTournament.type=="group"){
        if($scope.newGrpTournament.maxNoGroup==""){
          alert("Please specify the maximum number of groups!");
        }
        else if($scope.newGrpTournament.maxNoPlayer==""){
          alert("Please specify the maximum number of players per group!");
        }
        else{
          var data = {"description":$scope.newGrpTournament.description,
                       "password": $scope.newGrpTournament.password,
                       "title":$scope.newGrpTournament.title,
                       "status": $scope.newGrpTournament.status,
                       "type": $scope.newGrpTournament.type,
                       "mentorAssignment": $scope.grpTourMentor,
                       "maxNoGroup": $scope.grpTourMaxNoGroup,
                       "maxNoPlayer": $scope.grpTourMaxNoPlayer,
                       "lastDateChanged": Date()}
          $scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
          var new_grpTournament = new $scope.NewGrpTournament(data);
          new_grpTournament.$save(function(response){
             if(response.error) {
              console.log(response.error);
             }
             else{

            $scope.grpTournament = response;
            }
          });
          $('#grpTournamentCreated').modal('show');
          /*
          $scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
          var new_grpTournament = new $scope.NewGrpTournament($scope.newGrpTournament);
          new_grpTournament.$save(function(response){
            $scope.grpTournament = response;
            console.log("new group tournament" + response);
            $scope.newGrpTournamentID = response.id;
          });
          $('#grpTournamentCreated').modal('show');
          */
        }
      }
      else{
        var data = {"description":$scope.newGrpTournament.description,
                       "password": $scope.newGrpTournament.password,
                       "title":$scope.newGrpTournament.title,
                       "status": $scope.newGrpTournament.status,
                       "type": $scope.newGrpTournament.type,
                       "lastDateChanged": Date()}
          $scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
          var new_grpTournament = new $scope.NewGrpTournament(data);
          new_grpTournament.$save(function(response){
             if(response.error) {
              console.log(response.error);
             }
             else{

            $scope.grpTournament = response;
            }
          });
          $('#grpTournamentCreated').modal('show');
          /*
        $scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
        var new_grpTournament = new $scope.NewGrpTournament($scope.newGrpTournament);
        new_grpTournament.$save(function(response){
          $scope.grpTournament = response;
          console.log("new group tournament" + response);
          $scope.newGrpTournamentID = response.id;
        });
        $('#grpTournamentCreated').modal('show');
        */
      }
    });
  };

  $scope.hideSuccessTournamentModal = function(){
    $('#grpTournamentCreated').modal('hide');
    window.location="index.html#/mytournaments";
  };

  /*Tournament Join page initialization - By Glen*/
  $scope.tournamentInit=function(){
      console.log("tournamentInit ID");
      $scope.tournamentID = ($location.search()).tournamentID;      
      $scope.fetch_tournament_details(($location.search()).tournamentID);
  }

  /*JSON API Call to retrieve tournament data - By Glen*/
  $scope.fetch_tournament_details = function(tournamentID){
    $resource('/jsonapi/tournament_progress/:tournamentID').get({"tournamentID":tournamentID}, function(response){
        $scope.tournament = response;
        console.log("fetch_tournament_details = "+ $scope.tournament.tournamentID );
        $scope.get_indivNoGrpPlayers($scope.tournament);
        $scope.get_grpPlayers($scope.tournament);
    });
    //$timeout(function(){ $scope.fetch_tournament_details(tournamentID); }, 5000);
  };

  /*Extract players and sort them into the respective group - by Glen*/
  $scope.get_grpPlayers = function(tournament){
      console.log("get_grpPlayers");
      $scope.numGrp = [];
      $scope.currentUserGrping = 0;

      for(var i=0; i < tournament.maxNoGrp ; i++){
        var grouping = [];
        grouping.push("Group "+(i+1));
        
        for(var j=0; j < tournament.registeredPlayers.length ;j++){
          if(tournament.registeredPlayers[j].Group == (i+1)){
            var player = tournament.registeredPlayers[j].playerName;
            grouping.push(player);      
           }

           if(tournament.registeredPlayers[j].playerId === tournament.currentPlayerID){
              $scope.currentUserGrping = tournament.registeredPlayers[j].Group;
           }
        }
        if(grouping.length>0){
          $scope.numGrp.push(grouping);
        }
      }

      console.log("Num of Groups :" + $scope.numGrp.length);
      console.log("Current User Grouping : "+$scope.currentUserGrping);
  };

  /*Registered to Tournament and redirect to join page, used in tournament.html - by Glen*/
  $scope.register_for_tournament_new = function(tournamentID, tournamentPassword){
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
          $location.search({"tournamentID":tournamentID}).path("tournament-grpjoin");
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });
  };

  /*Join Group or Leave Group for group tournament - by Glen*/
  $scope.join_grp = function(playerId, tournamentId, groupNo){
    console.log("join_grp : playerId="+ playerId+" tournamentId="+tournamentId+" group="+groupNo);

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post("/jsonapi/joinGroup/join", {
        playerID: playerId,
        tournamentID: tournamentId,
        Group: groupNo
    }).success(function (data, status, headers, config) {
        $scope.registration_response = data;
        console.log(data);
        if (data.failed){
          alert(data.failed);
        }
        else{
          $resource('/jsonapi/joinGroup/check').query({}, function(response){
            $scope.joinGrpingVal = response;
           console.log("joinGrpingVal = " + $scope.joinGrpingVal.length);
          }); 
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });   
  }

  $scope.current_user_group = function(playerId){

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
          //backend POST but not in game-app-test.js --engsen
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
              console.log("fetch_tournament = " + $scope.tournament);
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