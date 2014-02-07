'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

/*GENShYFT's TournamentController*/
function GenshyftTournamentController($scope,$resource,$timeout,$location,$cookieStore,$http,$route){
  $scope.GTournModel = $resource('/jsonapi/tournament_progress/:tournamentID');
  $scope.tournamentID = null;
  $scope.location = $location;
  $scope.playerRanks = [];
  //$scope.$watch('location.search()', function() {
    //  $scope.tournamentID = ($location.search()).tournamentID;
  //}, true);

  //$scope.heatID = 12883052;
  $scope.heat = null;
  $scope.round = null;
  $scope.roundDirty = false;


  $scope.grpTourRoundName="";
  $scope.grpTourRoundMins=0;
  $scope.cartQuestions = [];
  $scope.bankQuestions =[];
  $scope.newTournamentRounds = [];
  $scope.tourStatus = "";

  $scope.loading = function(){	
    $scope.rounds = [1];
  	$scope.tournaments = {};
  	$scope.unregisteredPlayers = {};
  	$scope.registeredPlayers = {};
    $scope.statusValue = 0;

    $scope.grpTourTitle="";
    $scope.grpTourDescription="";
    $scope.grpTourPassword="";
    $scope.grpTourPasswordConfirm="";
    $scope.grpTourStatus="closed";
    $scope.grpTourType="individual";
    $scope.grpTourMentor="";
    $scope.grpTourNoGroup=2;
    $scope.grpTourMaxNoPlayer=1;
    $scope.qnsLanguage="Ruby";

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

  $scope.check_location = function(){
    $scope.tournamentID = ($location.search()).tournamentID;
    if (!$scope.tournamentID){
      alert("No Tournament ID passed via URL.");
    }
    else{
      //console.log("Fetching heat "+$scope.heatID);
      $scope.fetch_ranks($scope.tournamentID);
    };
  };

  $scope.fetch_ranks = function(tournamentID){
      $scope.GTournModel.get({"tournamentID":tournamentID}, function(response){
        $scope.tournament = response;
        console.log("test");
        //console.log($scope.tournament.round[0].registeredPlayers);
        $scope.playerRanks = $scope.tournament.round[0].registeredPlayers;
        //console.log($scope.playerRanks);
        $timeout(function() {
        $scope.fetch_ranks($scope.tournamentID)
      }, 1000);
      });
  };

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

    $scope.startRef = function(){
      $timeout.cancel($scope.fetch_ranks(tournamentID));
    };

  /*not in use anymore
  $scope.add_tournaments = function(){
		$scope.tournament_title = {};
		$scope.tournament_type = {};
		$scope.tournament_rounds = {};
	};

  
	$scope.add_rounds= function(){
		if($scope.rounds.length < 5){
      $scope.rounds.push("1");
    } 
	};

	$scope.delete_rounds = function(index){
		if(index!=0){
			$scope.rounds.splice(index, 1);
		}	
	};

  $scope.add_round = function(tournamentID){
    //$scope.roundDirty = false;
    $scope.questionCart = $resource('/jsonapi/added_rounds');
    $scope.questionCart.query({}, function(response){
      $scope.questionCart = {};

      
      if($scope.roundModel.name==""){
        alert("The round name cannot be empty!");
      }
      else if($scope.roundModel.duration==""){
        alert("The round duration cannot be empty!");
      }
      else{
        var data = {"name":$scope.roundModel.name,
                "timelimit":$scope.roundModel.duration,
                "description":'Update this description',
                "problemIDs":$scope.roundModel.questions,
                "tournamentID":tournamentID}
        $scope.NewRound = $resource('/jsonapi/add_round');
        var new_round = new $scope.NewRound(data);
        new_round.$save(function(response){
          if(response.error) {
            console.log(response.error)
          }
          else{
            $scope.round = response;
          }
        });
        //$('#myModal').modal('hide');
        console.log("new_round_added");
        console.log(new_round);
      }
    }); 
    //$location.path("mytournaments");
  };
  */

  //Save each created round into an array 
  $scope.save_round = function(){      
    if($scope.grpTourRoundName == undefined || $scope.grpTourRoundName == ""){
      alert("The round name cannot be empty!");
    }
    else if($scope.grpTourRoundMins == undefined || $scope.grpTourRoundName == 0){
      alert("The round time limit cannot be empty!");
    }
    else if($scope.cartQuestions.length == 0){
      alert("You have not add any questions! Please add a question first!");
    }
    else{
      var roundQuestions = [];
      for(var j = 0; j < $scope.cartQuestions.length; j++){
        roundQuestions.push($scope.cartQuestions[j].questionId);
      }
      $scope.newTournamentRounds.push({roundName:$scope.grpTourRoundName,timeLimit:$scope.grpTourRoundMins,problemIDs:roundQuestions});
      
      $scope.grpTourRoundName = "";
      $scope.grpTourRoundMins = "";
      
      // Question Choice Model
      $scope.cartQuestions = [];
      console.log(roundQuestions);
      $('#roundSaved').modal('show');
    }
  }

  //delete selected round from newTournamentRounds array before saving tournament
  $scope.deleteRound = function(index){
    $scope.newTournamentRounds.splice(index,1);
  }

  //delete selected round from newTournamentRounds array before saving tournament
  $scope.deleteFromCart = function(index){
    $scope.cartQuestions.splice(index,1);
  }

  /*To implement for Create Tournaments - engsen
    method to get all relevant tournament questions 
    according to question language*/
	$scope.get_tournamentLvl = function(qnsLanguage){
    console.log("get_tournamentLevels");
    $resource("/jsonapi/list_tournamentQns/all").get({},function(response){
      $scope.tournamentQns = response; 
      $scope.roundLvl = {};
      $scope.roundLvl.language = qnsLanguage;
      $scope.list_levels($scope.roundLvl.language, $scope.tournamentQns);
    });
       
	};

  /*method to filter path level based on language*/
  $scope.list_levels = function(qnsLanguage, tournamentQns){
    $scope.lvlArray = [];
    console.log("list_pathlevels");
    for(var i = 0; i < tournamentQns.tourQns.length; i++){
      var language = tournamentQns.tourQns[i].language;
      if(language==qnsLanguage){
        var pathLevel = tournamentQns.tourQns[i].pathLevel;
        $scope.lvlArray.push(pathLevel);
      }
    }
    //console.log($scope.lvlArray);
  };

   /*To implement for Create Tournaments - engsen
    method to get all relevant tournament questions 
    according to question language*/
  $scope.get_tournamentQns = function(qnsLanguage, pathLevel){
    console.log("get_tournamentQns");
    console.log(pathLevel);
    $resource("/jsonapi/list_tournamentQns/all").get({},function(response){
      $scope.tournamentQns = response; 
      $scope.roundQns = {};
      $scope.roundQns.language = qnsLanguage;
      $scope.roundQns.pathLevel = pathLevel;
      $scope.list_questions($scope.roundQns.language, $scope.roundQns.pathLevel, $scope.tournamentQns);
    });
  };

  /*method to filter questions based on language and pathLevel*/
  $scope.list_questions = function(qnsLanguage, pathLevel, tournamentQns){
    $scope.qnsArray = [];
    console.log("list_questions");
    //console.log(qnsLanguage);
    //console.log(pathLevel);
    for(var i = 0; i < tournamentQns.tourQns.length; i++){
      var language = tournamentQns.tourQns[i].language;
      var level = tournamentQns.tourQns[i].pathLevel;
      if(language==qnsLanguage && level==pathLevel){
        $scope.qnsArray = tournamentQns.tourQns[i].questionSet;
      }
    }
    //console.log($scope.qnsArray);
    $scope.bankQuestions = $scope.qnsArray;
  };

  //Add selected questions to a cart(array)
  $scope.addToCart = function(question){
    var addedQuestion = question;
    var exist = false;
    for(var i=0;i<$scope.cartQuestions.length;i++){
      var cartQuestion = $scope.cartQuestions[i];
      if(addedQuestion.questionId == cartQuestion.questionId){
        exist = true;
      } 
    }
    if(!exist){
      $scope.cartQuestions.push(addedQuestion);
    }else{
      alert("This question has been added! Please select another question!");
    }
    console.log($scope.cartQuestions);
  }

  //Retrieve question information and display to user
  $scope.viewQuestionInfo = function(id){
    $scope.questionName = "-";
    $scope.questionDescription = "-";
    $scope.questionExamples = "-";
    $scope.skeleton = "-";
      // Searches both questionBank and questionCart for the clicked question
    for(var j = 0; j < $scope.bankQuestions.length; j++){
      if($scope.bankQuestions[j].questionId == id){
        $scope.questionName = $scope.bankQuestions[j].question;
        $scope.questionDescription = $scope.bankQuestions[j].questionDescription;
        $scope.questionExamples = $scope.bankQuestions[j].questionExamples;
        $scope.skeleton = $scope.bankQuestions[j].skeleton;      
      }
    }
    console.log($scope.bankQuestions);
    for(var i = 0; i < $scope.cartQuestions.length; i++){
      if($scope.cartQuestions[i].id == id){
        $scope.questionName = $scope.cartQuestions[i].question;
        $scope.questionDescription = $scope.cartQuestions[i].questionDescription;
        $scope.questionExamples = $scope.cartQuestions[i].questionExamples;
        $scope.skeleton = $scope.cartQuestions[i].skeleton;     
      }
    }
    $('#questionInfo').modal('show');
  }


  //Gets tournaments created by user.
	$scope.get_mytournaments = function(){
    console.log("get_mytournaments");
    $resource("/jsonapi/added_tournaments").query({},function(response){
        $scope.grpTournaments = response; // stores the Json files
        console.log($scope.grpTournaments);
    });
  };

  /*Get players of indivdual Tournament or Players without Group in Group Tournament - By Glen*/
  $scope.get_indivNoGrpPlayers = function(tournament){
      fetchRegisteredUser(tournament); 
  };
  /*Function to seperate Registered Users without group or Individual Tournament - By Glen*/
  var fetchRegisteredUser =function(tournament){
    $scope.registeredPlayersArray =[];
    console.log("fetchRegisteredUser: " + tournament.tournamentID);
    for(var i =0; i < tournament.registeredPlayers.length; i++){
      if(tournament.registeredPlayers[i].Group===0){
        var playerDetails = {"playerName":tournament.registeredPlayers[i].playerName,"playerId":tournament.registeredPlayers[i].playerId};
        $scope.registeredPlayersArray.push(playerDetails);
      }
    }
  }

  //list_rankings() method is for Group Rankings page. To implement method.
  $scope.list_rankings = function(){

  };

  /*method to create tournaments*/
  $scope.create_grptournament = function(tournamentID){
    $scope.grpTourModel = $resource('/jsonapi/added_tournaments');
    $scope.grpTourModel.query({}, function(response){
      $scope.newGrpTournament = {};
      $scope.newGrpTournament.title = $scope.grpTourTitle;
      $scope.newGrpTournament.description = $scope.grpTourDescription;
      $scope.newGrpTournament.password = $scope.grpTourPassword;
      $scope.newGrpTournament.passwordConfirm = $scope.grpTourPasswordConfirm;
      $scope.newGrpTournament.addDetails = $scope.grpTourAddDetails;
      $scope.newGrpTournament.status = $scope.grpTourStatus;
      $scope.newGrpTournament.type = $scope.grpTourType;
      $scope.newGrpTournament.mentorAssignment = $scope.grpTourMentor;
      $scope.newGrpTournament.noGroup = $scope.grpTourNoGroup;
      $scope.newGrpTournament.maxNoPlayer = $scope.grpTourMaxNoPlayer;
      $scope.newGrpTournament.rounds = $scope.newTournamentRounds;
      //$scope.newGrpTournament.roundName = $scope.grpTourRoundName;

      //console.log($scope.grpTourTitle);
      if($scope.newGrpTournament.title==""){
        alert("The tournament title cannot be empty!");
      }
      /*
      else if($scope.newGrpTournament.roundName==""){
        alert("sian");
      }
      */
      else if($scope.newGrpTournament.password==""){
        alert("The tournament password cannot be empty!");
      }
      else if($scope.newGrpTournament.password!=$scope.newGrpTournament.passwordConfirm){
        alert("The tournament password does not match!");
      }
      else if($scope.newGrpTournament.type=="group"){
        var data = {"tournamentId":tournamentID,
                    "description":$scope.newGrpTournament.description,
                     "password": $scope.newGrpTournament.password,
                     "passwordConfirm": $scope.newGrpTournament.passwordConfirm,
                     "addDetails":$scope.newGrpTournament.addDetails,
                     "title":$scope.newGrpTournament.title,
                     "status": $scope.newGrpTournament.status,
                     "type": $scope.newGrpTournament.type,
                     "mentorAssignment": $scope.grpTourMentor,
                     "noGroup": $scope.grpTourNoGroup,
                     "maxNoPlayer": $scope.grpTourMaxNoPlayer,
                     "lastDateChanged": Date(),
                     "rounds": $scope.newGrpTournament.rounds
                   }
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
      }
      else{
        var data = {"tournamentId":tournamentID,
                    "description":$scope.newGrpTournament.description,
                     "password": $scope.newGrpTournament.password,
                     "title":$scope.newGrpTournament.title,
                     "status": $scope.newGrpTournament.status,
                     "type": $scope.newGrpTournament.type,
                     "lastDateChanged": Date(),
                     "rounds": $scope.newGrpTournament.rounds
                   }
        $scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
        var new_grpTournament = new $scope.NewGrpTournament(data);
        new_grpTournament.$save(function(response){
           if(response.error) {
            console.log(response.error);
           }
           else{

          $scope.grpTournament = response;
          //$scope.newGrpTournamentID = response.id;
          }
        });
        $('#grpTournamentCreated').modal('show');
      }
    });
  };

  /*method to hide modal after successfully created tournament*/
  $scope.hideSuccessTournamentModal = function(){
    $location.path("mytournaments");
    $('.modal-backdrop').remove();

    //window.location="index.html#/mytournaments";
  };

  /*method to hide modal after successfully save round*/
  $scope.hideSuccessRoundSaved = function(){
    $('#roundSaved').modal('hide');
    $location.path("mytournaments-create");
    //window.location="index.html#/mytournaments";
  };

  /*method to hide modal after seeing questions information*/
  $scope.hideQuestionInfo = function(){
    $('#questionInfo').modal('hide');
  };

  /*method to show modal to view questions added to cart*/
  $scope.viewQuestionsInCart = function(){
    $('#questionsInCart').modal('show');
  };

  $scope.viewQuestionsInfoInCart = function(){
    $('#questionsInCart').modal('hide');
    $('#questionInfo').modal('show');
  };

  /*method to hide modal after seeing questions in questions cart information*/
  $scope.hideQuestionsInCart = function(){
    $('#questionsInCart').modal('hide');
  };

  $scope.hideQuestionsInfoInCart = function(){
    $('#questionsInfo').modal('hide');
    $('#questionsInCart').modal('show');
  };

  /*Tournament Join page initialization - By Glen*/
  $scope.tournamentInit=function(){
      //$scope.tournamentID = ($location.search()).tournamentID;
      //$scope.fetch_tournament_details(($location.search()).tournamentID);
      if($cookieStore.get("tournamentID")){
          $scope.fetch_tournament_details($cookieStore.get("tournamentID"));
      }else{
        alert("No tournamentID passed to GenshyftTournamentController.")
      }
          
  }

  /*JSON API Call to retrieve tournament data - By Glen*/
  $scope.fetch_tournament_details = function(tournamentID){
    $resource('/jsonapi/tournament_progress/:tournamentID').get({"tournamentID":tournamentID}, function(response){
        $scope.tournament = response;
        console.log("fetch_tournament_details = "+ $scope.tournament.tournamentID );
        $scope.get_indivNoGrpPlayers($scope.tournament);
        console.log("tournType : " + $scope.tournament.tournType );
        if($scope.tournament.tournType == "Group"){
          $scope.get_grpPlayers($scope.tournament);
        }       
    });
    //$timeout(function(){ $scope.fetch_tournament_details(tournamentID); }, 5000);
  };

  /*JSON API Call to retrieve tournament data once - By Glen*/
  $scope.fetch_tournament_details_once = function(){
    $scope.tournamentID = ($location.search()).tournamentID;      
    $resource('/jsonapi/tournament_progress/:tournamentID').get({"tournamentID": $scope.tournamentID}, function(response){
        $scope.tournament = response;
        console.log("fetch_tournament_details = "+ $scope.tournament.tournamentID );
        $scope.get_indivNoGrpPlayers($scope.tournament);
        console.log("tournType : " + $scope.tournament.tournType );
        if($scope.tournament.tournType == "Group"){
          $scope.get_grpPlayers($scope.tournament);
        }       
    });
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
            var player = {"playerName":tournament.registeredPlayers[j].playerName,"playerId":tournament.registeredPlayers[j].playerId};
            grouping.push(player);      
           }

           if(tournament.registeredPlayers[j].playerId === tournament.currentPlayerID){
              $scope.currentUserGrping = tournament.registeredPlayers[j].Group;
              $scope.have_grp($scope.currentUserGrping);
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
          //$scope.tournamentID = tournamentID;
          //$location.search({"tournamentID":tournamentID}).path("tournament-grpjoin");
          $cookieStore.put("tournamentID", tournamentID);
          $location.path("tournament-grpjoin");
          
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });
  };

  $scope.manage_my_tournament = function(tournamentID){
      $cookieStore.put("tournamentID", tournamentID);
      $location.path("mytournaments-manage");
  }

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
          $scope.fetch_tournament_details_once();
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });   
  };

  $scope.have_grp =  function(group){

    $scope.isInGrp = false;

    if(group<=0){
      $scope.isInGrp = false;
    }else{
      $scope.isInGrp = true;
    }
  };

  /*Remove from tournament - by Glen (GENShYFT)*/
  $scope.remove_from_tournament = function(playerId, tournamentId){
    console.log("remove_from_tournament:"+ playerId+" tournamentId="+tournamentId);

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post("/jsonapi/removePlayer/tournament", {
        playerID: playerId,
        tournamentID: tournamentId,
    }).success(function (data, status, headers, config) {
        $scope.registration_response = data;
        console.log(data);
        if (data.failed){
          alert(data.failed);
        }
        else{
          $resource('/jsonapi/removePlayer/check').query({}, function(response){
            $scope.removePlayerVal = response;
           console.log("removePlayerVal = " + $scope.removePlayerVal.length);
          }); 
          $scope.fetch_tournament_details_once();
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });   
  };

  $scope.create_tournament_round_game_new = function(roundID, grpHave, tournamentType){
    if(tournamentType==="Group"){
      if(grpHave==true){
        $scope.CreateGameModel = $resource('/jsonapi/launch_game_for_round?round_id='+roundID);
        $scope.CreateGameModel.get({}, function(response){
          $scope.game = response;
          console.log(response);
          $cookieStore.put("roundID", roundID ); 
          $cookieStore.put("tournamentGameID", $scope.game.gameID); 
          $cookieStore.put("num", $scope.game.problemIDs.length);
          $cookieStore.put("type", "practiceGame");
        
          //window.location.href = "tournament_play_page.html";
          $location.path("tournament-grpplay");
        });
      }else{
        alert("Please join a group in order to Play!");
      }
    }else{
      $scope.CreateGameModel = $resource('/jsonapi/launch_game_for_round?round_id='+roundID);
      $scope.CreateGameModel.get({}, function(response){
        $scope.game = response;
        console.log(response);
        $cookieStore.put("roundID", roundID ); 
        $cookieStore.put("tournamentGameID", $scope.game.gameID); 
        $cookieStore.put("num", $scope.game.problemIDs.length);
        $cookieStore.put("type", "practiceGame");
      
        //window.location.href = "tournament_play_page.html";
        $location.path("tournament-grpplay");
      });  
    }
  };
  
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
              console.log($scope.tournaments.length);
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