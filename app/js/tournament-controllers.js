'use strict';

// TODO: Fix
// 
// /*Scripts for tabs*/

// $('#myTab a').click(function (e) {
//   e.preventDefault();
//   $(this).tab('show');
// });

/*GENShYFT's TournamentController*/
function GenshyftTournamentController($scope,$resource,$timeout,$location,$cookieStore,$http,$route,$window){
  $scope.GHeatModel = $resource('/jsonapi/get_heat_ranking');
  $scope.heatID = null;
  $scope.location = $location;
  $scope.playerRanks = [];
  //$scope.$watch('location.search()', function() {
    //  $scope.tournamentID = ($location.search()).tournamentID;
  //}, true);

  //$scope.heatID = 12883052;
  $scope.heat = null;
  $scope.round = null;
  $scope.roundDirty = false;

  //variables for create tournament rounds
  $scope.grpTourRoundName="";
  $scope.grpTourRoundMins="";
  $scope.grpTourRoundDesc="";

  $scope.roundIdTracker=1001; //to simulate round ID
  $scope.cartQuestions = [];
  $scope.bankQuestions =[];
  $scope.newTournamentRounds = [];
  $scope.tourStatus = "";
  $scope.questionName = "-";
  $scope.questionDescription = "-";
  $scope.questionExamples = "-";
  $scope.questionSkeleton = "-";
  $scope.gamePaths = [];
  $scope.selectedPath;
  $scope.pathLevel;
  $scope.gameLevels = [];

  //variables for create tournament details
  $scope.grpTourTitle="";
  $scope.grpTourDescription="";
  $scope.grpTourAddDetails="";
  $scope.grpTourPassword="";
  $scope.grpTourPasswordConfirm="";
  $scope.grpTourStatus="Closed";
  $scope.grpTourType="individual";
  $scope.grpTourMentor="";
  $scope.grpTourNoGroup=2;
  $scope.grpTourMaxNoPlayer=1;
  $scope.qnsLanguage="Ruby";
  $scope.createdTournament;
  $scope.createdTournamentID="";

  //variables for edit tournament details
  $scope.selectedTournament;
  $scope.selectedTournamentRounds;
  $scope.passwordConfirm="";
  $scope.selectedRound;
  $scope.currentRound;
  $scope.allTournaments = [];

  $scope.loading = function(){	
  	$scope.tournaments = {};
  	$scope.unregisteredPlayers = {};
  	$scope.registeredPlayers = {};
    $scope.statusValue = 0;
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
/*Ranking codes by Fariq*/
  $scope.check_location = function(){
    $scope.heatID = ($location.search()).heatID;
    if (!$scope.heatID){
      alert("No Heat ID passed via URL.");
    }
    else{
      //console.log("Fetching heat "+$scope.heatID);
      $scope.fetch_ranks($scope.heatID);
    };
  };

  $scope.fetch_ranks = function(heatID){
      $scope.GHeatModel.get({"heatID":heatID}, function(response){
        $scope.tournament = response;
        //console.log("test");
        //console.log($scope.tournament.round[0].registeredPlayers);
        $scope.playerRanks = $scope.tournament.ranking;
        
        //Code here continually refreshes every 10 seconds
        $timeout(function() {
        $scope.fetch_ranks($scope.heatID)
      }, 10000);
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
    $timeout.cancel($scope.fetch_ranks(heatID));
  };

  // Loads all the different possible paths into the paths droplist
  $scope.populatePaths = function(){
      if($scope.gamePaths.length!=0){
        
      }else{
        $resource('/jsonapi/get_game_and_my_paths').get({},function(response){
          console.log("Retrieving game paths from DB");
          $scope.gamePaths = response.paths;
          //console.log("Printing response for game paths: \n\n" + JSON.stringify($scope.gamePaths));
        });  
      }
  }
  //$scope.populatePaths();
      
  // Loads all the different possible levels into the level droplist
  $scope.loadLevelList = function(){
    if($scope.selectedPath=="null"){
      $scope.gameLevels=[];
    }else{
      $resource('/jsonapi/problemsets/'+$scope.selectedPath).get({},function(response){
        console.log("Retrieving game levels based on selected game paths from DB");
        $scope.gameLevels = response.problemsets;
      });  
    }
  }

  //Loads the Queried List of Questions                 
  $scope.loadQueriedQuestionTable = function(){
    var path_id = $scope.selectedPath;
    var level_ids = $scope.pathLevel;
    $scope.bankQuestions = [];

    $resource('/jsonapi/problems/'+level_ids).get({},function(response){
      console.log("Retrieving all questions based on selected game paths and path levels from DB");
      $scope.bankQuestions=$scope.bankQuestions.concat(response.problems);
      //console.log(JSON.stringify($scope.bankQuestions));
    });
    //}
  }

  //delete selected round from newTournamentRounds array before saving tournament
  $scope.deleteRound = function(index){
    $scope.newTournamentRounds.splice(index,1);
  }

  //delete selected round from newTournamentRounds array before saving tournament
  $scope.deleteFromCart = function(index){
    $scope.cartQuestions.splice(index,1);
  }

  //Add selected questions to a cart(array)
  $scope.addToCart = function(question){
    var addedQuestion = question;
    var exist = false;
    for(var i=0;i<$scope.cartQuestions.length;i++){
      var cartQuestion = $scope.cartQuestions[i];
      if(addedQuestion.id==cartQuestion.id){
        exist = true;
      } 
    }
    if(!exist){
      if($scope.cartQuestions.length<20){
        $scope.cartQuestions.push(addedQuestion);
      }else{
        alert("You cannot add anymore questions to current round!");
      }
    }else{
      alert("This question has been added! Please select another question!");
    }
  }

  //Retrieve question information and display to user
  $scope.viewQuestionInfo = function(question){
    /*$scope.questionName = question.question;
    $scope.questionDescription = question.questionDescription;
    $scope.questionExamples = question.questionExamples;
    $scope.skeleton = question.skeleton;*/
    $scope.questionName = question.name;
    $scope.questionDescription = question.description;
    $scope.questionExamples = question.examples;
    $scope.skeleton = question.skeleton;
    $('#questionInfo').modal('show');
  }

  //move questions up in cart questions
  $scope.moveQuestionUp = function(id){
    $scope.questionToMoveUp = $scope.cartQuestions[id];
    $scope.questionToMoveDown = $scope.cartQuestions[id-1];
    $scope.cartQuestions[id] = $scope.questionToMoveDown;
    $scope.cartQuestions[id-1] = $scope.questionToMoveUp;
  }

  //move questions down in cart questions
  $scope.moveQuestionDown = function(id){
    $scope.questionToMoveUp = $scope.cartQuestions[id+1];
    $scope.questionToMoveDown = $scope.cartQuestions[id];
    $scope.cartQuestions[id+1] = $scope.questionToMoveDown;
    $scope.cartQuestions[id] = $scope.questionToMoveUp;
  }

  //Gets tournaments created by user-GenShyft
	$scope.get_mytournaments = function(){
    console.log("Retrieving all tournaments created by User from DB");
    $resource("/jsonapi/get_player_tournaments").query({},function(response){
      $scope.grpTournaments = response; // stores the Json files
      console.log($scope.grpTournaments);
      for(var i = 0; i < $scope.grpTournaments.length; i++){
        var localCreated = new Date($scope.grpTournaments[i].created.toString().replace(/ /g,"T")+"+00:00");
        $scope.grpTournaments[i].localCreated = $.format.date(localCreated,'yyyy-MM-dd HH:mm');
      }
    });
  }

  /*Get players of indivdual Tournament or Players without Group in Group Tournament - By Glen*/
  $scope.get_indivNoGrpPlayers = function(tournament){
      fetchRegisteredUser(tournament); 
  };
  /*Function to seperate Registered Users without group or Individual Tournament - By Glen*/
  var fetchRegisteredUser =function(tournament){
    $scope.registeredPlayersArray =[];
    console.log("fetchRegisteredUser: " + tournament.tournamentID);
    for(var i =0; i < tournament.registeredPlayerIDs.length; i++){
      if(tournament.registeredPlayerIDs[i].group===0){
        var playerDetails = {"nickname":tournament.registeredPlayerIDs[i].nickname,"playerID":tournament.registeredPlayerIDs[i].playerID};
        $scope.registeredPlayersArray.push(playerDetails);
      }
    }
  }

  /*Method to create tournaments-GenShyft*/
  $scope.create_grptournament = function(){
    console.log("Create tournament executed here")
    //var currentDate = new Date(); 

    if( $scope.grpTourMentor == ""){
       $scope.grpTourMentor = false;
    }
    if($scope.grpTourTitle==""){
      alert("The tournament title cannot be empty!");
    }
    else if($scope.grpTourPassword==""){
      alert("The tournament password cannot be empty!");
    }
    else if($scope.grpTourPassword!=$scope.grpTourPasswordConfirm){
      alert("The tournament password does not match!");
    }
    else{
      var isGroup = false;
      var mentorAssignInTeam = false;
      var numberOfGrp = 0;
      var numPlayerPerGrp = 0;
      
      if($scope.grpTourType=="group"){
        isGroup = true;
        mentorAssignInTeam = $scope.grpTourMentor;
        numberOfGrp = $scope.grpTourNoGroup;
        numPlayerPerGrp = $scope.grpTourMaxNoPlayer;
      }
      var data = {"shortTitle":$scope.grpTourTitle,
                   "description":$scope.grpTourDescription,
                   "password": $scope.grpTourPassword,
                   "status": "Closed",
                   "type": "Genshyft",
                   "details":$scope.grpTourAddDetails,
                   "isGroup": isGroup,
                   "assignMentorInTeam": mentorAssignInTeam,
                   "maxGroups": numberOfGrp,
                   "maxPlayersPerGroup": numPlayerPerGrp,
                   //"tournamentID":123456 //simulate localhost
                 }
      $scope.NewGrpTournament = $resource('/jsonapi/create_or_update_tournament');
      console.log("printing tournament data here:" + JSON.stringify(data));
      var new_grpTournament = new $scope.NewGrpTournament(data);
      new_grpTournament.$save(function(response){
        if(response.error) {
          console.log("printing response here:" + JSON.stringify(response));
          console.log("printing error in response here:" + response.error);
        }
        //else{}
        console.log("Successfully Save Group tournament into DB")
        $scope.createdTournament = response;
        console.log($scope.createdTournament.id);
        $cookieStore.put("createdTournamentID", $scope.createdTournament.id);
        //$location.path("mytournaments-create-addrounds");
        $('#grpTournamentCreated').modal('show');
        /*
        if($scope.clickOk == true){
        $location.path("mytournaments-create-addrounds");
         }
        }*/
      });
    }
  };

  //Save each created round into an array 
  $scope.save_round = function(){      
    var tournamentID = $cookieStore.get("createdTournamentID");
    if($scope.newTournamentRounds.length == 5){
      alert("The maximum number of rounds per tournament is 5!");
    }
    else if($scope.grpTourRoundName == undefined || $scope.grpTourRoundName == ""){
      alert("The round title cannot be empty!");
    }
    else if($scope.grpTourRoundMins == undefined || $scope.grpTourRoundMins == 0){
      alert("The round time limit cannot be empty!");
    }
    else if($scope.cartQuestions.length == 0){
      alert("You have not add any questions! Please add a question first!");
    }
    else{
      var roundQuestions = [];
      for(var j = 0; j < $scope.cartQuestions.length; j++){
        roundQuestions.push($scope.cartQuestions[j].id);
      }
      //console.log(roundQuestions);
      $scope.newTournamentRounds.push({problemIDs:roundQuestions,description:$scope.grpTourRoundName,timelimit:$scope.grpTourRoundMins});
      var data = {'timelimit':$scope.grpTourRoundMins,
            'description':$scope.grpTourRoundName,
            'problemIDs':roundQuestions,
            'tournamentID':tournamentID}
      $scope.NewRound = $resource('/jsonapi/add_or_update_round');
      var new_round = new $scope.NewRound(data);
      new_round.$save(function(response){
        if(response.error) {
          console.log(response.error)
        }
        else{
          console.log("Successfully Save round into DB");
          $scope.round = response;
          console.log(JSON.stringify($scope.round));
          $scope.grpTourRoundName = "";
          $scope.grpTourRoundMins = "";
          $scope.grpTourRoundDesc = "";
          $scope.cartQuestions = [];
          $('#roundSaved').modal('show');
        }
      }); 
    }
  }

  /*Method to save edited tournament details-GenShyft*/
  $scope.updateTournament = function(){
    if($scope.selectedTournament.shortTitle=="" || $scope.selectedTournament.shortTitle==undefined){
      alert("The tournament title cannot be empty!");
    }
    else if($scope.selectedTournament.password=="" || $scope.selectedTournament.password==undefined){
      alert("The tournament password cannot be empty!");
    }
    else if($scope.selectedTournament.password!=$scope.passwordConfirm){
      alert("The tournament password does not match!");
    }
    else{
      var updatedTournament = {
                  "tournamentID":$scope.selectedTournament.tournamentID,
                  "shortTitle":$scope.selectedTournament.shortTitle,
                  "description":$scope.selectedTournament.description,
                  "password": $scope.selectedTournament.password,
                  "details":$scope.selectedTournament.details,
                  "assignMentorInTeam": $scope.selectedTournament.mentorAssignment,
                  "maxGroups": $scope.selectedTournament.numberOfGrp,
                  "maxPlayersPerGroup": $scope.selectedTournament.numPlayerPerGrp,
                  "status":$scope.selectedTournament.status,
                  "type": $scope.selectedTournament.tournamentType
                 };
      console.log($scope.selectedTournament.shortTitle);
      console.log($scope.selectedTournament.password);
      console.log($scope.selectedTournament.details);
      console.log($scope.selectedTournament.description);
      $scope.NewTournament = $resource('/jsonapi/create_or_update_tournament/'+$scope.selectedTournament.tournamentID);
      var new_tournament = new $scope.NewTournament(updatedTournament);
      new_tournament.$save(function(response){
        if(response.error) {
          console.log("Printing Error Here: " + response.error)
        }
        //$scope.tournament = response;
        console.log("Save edited tournament details into DB")
        $scope.fetch_tournament($scope.selectedTournament.tournamentID); //Using legacy fetch. 
      });
      $('#editTournInfo').modal('hide');
      $('#changesSaved').modal('show');
    }
  };

  $scope.fetch_tournament = function(tournamentID){
    $resource('/jsonapi/tournament/:tournamentID').get({"tournamentID":tournamentID}, function(response){
        $scope.tournament = response;
        console.log("fetch edited tournament = " + $scope.tournament.tournamentID);
        //$scope.startTime = new Date("2013-09-29 08:24:46.840830");
        //$scope.stopTime = new Date("2013-09-29 12:00:11.784760");
        //console.log(($scope.stopTime - $scope.startTime)/1000);
    });
  };

  /*Method to save edited tournament round details-GenShyft*/
  $scope.updateRound = function(){
    if($scope.selectedRound.description == undefined || $scope.selectedRound.description == ""){
      alert("The round title cannot be empty!");
    }
    else if($scope.selectedRound.timelimit == undefined || $scope.selectedRound.timelimit == 0){
      alert("The round time limit cannot be empty!");
    }
    else{
      var roundQuestions = [];
      for(var j = 0; j < $scope.cartQuestions.length; j++){
        roundQuestions.push($scope.cartQuestions[j].id);
      }
      var updatedRound = {"roundID":$scope.selectedRound.roundId,
                          "timelimit":$scope.selectedRound.timelimit,
                          "problemIDs":roundQuestions,
                          "description":$scope.selectedRound.description};    
      $scope.NewRound = $resource('/jsonapi/add_or_update_round/'+$scope.selectedRound.roundID);
      var new_round = new $scope.NewRound(updatedRound);
      new_round.$save(function(response){
        if(response.error) {
          console.log("Printing Error Here: " + response.error)
        }
        //$scope.round = response;
        console.log("Save edited round details into DB")
        $scope.fetch_round($scope.selectedRound.roundID);//Using legacy fetch
      });
      $('#editTournRound').modal('hide');
      $('#changesSaved').modal('show');
    }
  };

  $scope.fetch_round = function(roundID){
    $resource('/jsonapi/round/:roundID').get({"roundID":roundID}, function(response){
        $scope.round = response;
        $scope.roundDirty = false;
    });
  };

  /*Method to load details of selected round with Round ID to display in Mange Tournament from all the questions in DB-GenShyft*/
  $scope.load_round_details = function(round){
    $scope.getRoundProblems = $resource("/jsonapi/array_problems");
    var data = {
      "problemIDs":round.problemIDs
    };
    var problemsInRound = new $scope.getRoundProblems(data);
    problemsInRound.$save(function(response){
      if(response.error) {
        console.log("Printing get problems in round error: " + response.error);
      }
      $scope.cartQuestions = response.problems; 
      console.log(JSON.stringify(response));
      /*
      for(var i = 0; i < $scope.selectedRound.problemIDs.length; i++){
        for(var j = 0; j < $scope.tournamentQns.tourQns.length; j++){
          for(var k = 0; k < $scope.tournamentQns.tourQns[j].questionSet.length; k++){
            if($scope.selectedRound.problemIDs[i] == $scope.tournamentQns.tourQns[j].questionSet[k].id){
              $scope.cartQuestions.push($scope.tournamentQns.tourQns[j].questionSet[k]);
            }
          }
        }
      }
      */
    });
    $scope.selectedRound = round;
    $('#editTournRound').modal('show');
  }

  //method to activate tournament and change status of Tournament to 'Open'
  $scope.activateTournament = function(tournamentID){ 
    $scope.openTournament = $resource('/jsonapi/activate_tournament/'+tournamentID);
    var data = {
      "tournamentID":tournamentID
    };
    var newOpenTournament = new $scope.openTournament(data);
    newOpenTournament.$save(function(response){
      if(response.error) {
        console.log(response.error);
      }
      else{
        console.log("Activate tournament and change status to Open")
        console.log(response);
        $route.reload();
      }
    });
  };
  
  //method to close tournament and change status of Tournament to 'Closed'
  $scope.closeTournament = function(tournamentID){ 
    $scope.closeTournament = $resource('/jsonapi/close_tournament/'+tournamentID);
    var data = {
      "tournamentID":tournamentID
    };
    var newCloseTournament = new $scope.closeTournament(data);
    newCloseTournament.$save(function(response){
      if(response.error) {
        console.log(response.error);
      }
      else{
        console.log("Close tournament and change status to Closed")
        console.log(response);
        $route.reload();
      }
    });
  };
  
  //method to hide tournament and change status of Tournament to 'Invisible'
  $scope.hideTournament = function(tournamentID){ 
    $scope.hideTournament = $resource('/jsonapi/hide_tournament/'+tournamentID);
    var data = {
      "tournamentID":tournamentID
    };
    var newHideTournament = new $scope.hideTournament(data);
    newHideTournament.$save(function(response){
      if(response.error) {
        console.log(response.error);
      }
      else{
        console.log("Hide tournament and change status to Invisible")
        console.log(response);
        $route.reload();
      }
    });  
  };    
  
  //method to delete tournament
  $scope.deletePlayerTournament = function(){
    var tID = $cookieStore.get("deleteTournamentID");
    console.log("ID of tournament to delete: "+tID);
    $scope.deleteTournament = $resource('/jsonapi/delete_tournament/'+tID);
    var data = {
      "tournamentID":tID
    };
    var newDeleteTournament = new $scope.deleteTournament(data);
    newDeleteTournament.$save(function(response){
      if(response.error) {
        console.log(response.error);
      }
      else{
        console.log("Delete tournament successfully")
        console.log(response);
        $route.reload();
      }
    });                  
  };  

  /*method to hide modal after successfully created tournament*/
  $scope.proceedToAddRounds = function(){
    $('#grpTournamentCreated').modal('hide');
    //console.log(tournamentID);
    var tID = $cookieStore.get("createdTournamentID");
    $location.search({"tournamentID":tID}).path('mytournaments-create-addrounds');
  };

  $scope.completeCreateTournament = function(){
    if($scope.newTournamentRounds.length == 0){
      alert("You have not added any tournament round! Please add at least 1 tournament round!");
    }else{
      $scope.newTournamentRounds=[]
      $location.path('mytournaments');
    } 
  }

  /*method to hide modal after successfully save round*/
  $scope.hideSuccessRoundSaved = function(){
    $('#roundSaved').modal('hide');
    $location.path('mytournaments-create-addrounds');
  };

  /*method to show modal to confirm deletion of tournament*/
  $scope.confirmDeleteTourn = function(tournamentID){
    $cookieStore.put("deleteTournamentID", tournamentID);
    $('#deletePlayerTourn').modal('show');
  };

  /*method to hide modal after seeing questions information*/
  $scope.hideQuestionInfo = function(){
    $('#questionInfo').modal('hide');
  };

  /*method to show modal to view questions added to cart*/
  $scope.viewQuestionsInCart = function(){
    $('#questionsInCart').modal('show');
  };

  $scope.viewQuestionsInfoInCart = function(question){
    $scope.questionName = question.name;
    $scope.questionDescription = question.description;
    $scope.questionExamples = question.examples;
    $scope.skeleton = question.skeleton;
    $('#questionsInCart').modal('hide');
    $('#editTournRound').modal('hide');
    $('#questionInfoInCart').modal('show');
  };

  $scope.resetQuestionCart = function(){
    $scope.cartQuestions = [];
  };

  /*method to hide modal after seeing questions in questions cart information*/
  $scope.hideQuestionsInCart = function(){
    $('#questionsInfoInCart').modal('hide');
  };

  $scope.hideQuestionInfoEditRound = function(){
    $('#questionsInCart').modal('hide');
    $('#editTournRound').modal('show');
  };

  $scope.hideQuestionsInfoInCart = function(){
    $('#questionsInfoInCart').modal('hide');
    $('#questionsInCart').modal('show');
  };

  $scope.createHeat = function(tournamentID,roundID,currentHeat,timeTillStart){
    for(var j = 0; j < $scope.selectedTournamentRounds.length; j++){
      if($scope.selectedTournamentRounds[j].roundID == roundID){
        $scope.currentRound = $scope.selectedTournamentRounds[j];
      }
    }
    console.log("Current Round in progress: " + $scope.currentRound);
    if(currentHeat == 0){
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $http.post("/jsonapi/create_heat", {
          tournamentID: tournamentID,
          roundID:roundID,
          startIn:timeTillStart,
          isReset:"true"
      }).success(function (data, status, headers, config) {
          $scope.createHeat_response = data;
          console.log(data);
          if (data.failed){
            alert(data.failed);
          }
          else{
            console.log("Create Round Heat")
            console.log(JSON.stringify(response));
            alert("Heat starting in: " + timeTillStart);
          }
      }).error(function (data, status, headers, config) {
          console.log("Error");
          alert("An error occurred.")
          console.log(data);
      });
    /*if(currentHeat == 0){
      $scope.createHeat = $resource('/jsonapi/create_heat');
      var data = {
          "tournamentID":tournamentID,
          "roundID":roundID,
          "startIn":timeTillStart,
          "isReset":"true"
      };
      var newCreateHeat = new $scope.createHeat(data);
      newCreateHeat.$save(function(response){
      if(response.error) {
        console.log("Printing Create Round Heat error: " + response.error);
      }
      else{
        console.log("Create Round Heat")
        console.log(JSON.stringify(response));
        alert("Heat starting in: " + timeTillStart);
      }
      }); 
    */     
    }else{
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $http.post("/jsonapi/create_heat", {
          tournamentID: tournamentID,
          roundID:roundID,
          startIn:timeTillStart,
          isReset:"true"
      }).success(function (data, status, headers, config) {
          $scope.createHeat_response = data;
          console.log(data);
          if (data.failed){
            alert(data.failed);
          }
          else{
            console.log("Create Round Heat")
            console.log(JSON.stringify(data));
            alert("Heat starting in: " + timeTillStart);
          }
      }).error(function (data, status, headers, config) {
          console.log("Error");
          alert("An error occurred.")
          console.log(data);
      });
      /*
      $scope.createHeat = $resource('/jsonapi/create_heat');
      var data = {
          "tournamentID":tournamentID,
          "roundID":roundID,
          "startIn":timeTillStart,
          "isReset":"true"
      };
      var newCreateHeat = new $scope.createHeat(data);
      newCreateHeat.$save(function(response){
      if(response.error) {
        console.log("Printing Create Round Heat error: " + response.error);
      }
      else{
        console.log("Create Round Heat")
        console.log(JSON.stringify(response));
        alert("Heat starting in: " + timeTillStart);
      }
      });
      */
    }
  };
  
  $scope.stopHeat = function(tournamentID,roundID){
    /*
    $scope.stopHeat = $resource('/jsonapi/stop_heat');
      var data = {
          "tournamentID":tournamentID,
          "roundID":roundID
      };
      var newStopHeat = new $scope.stopHeat(data);
      newStopHeat.$save(function(response){
      if(response.error) {
        console.log("Printing Stop Round Heat error: " + response.error);
      }
      else{
        console.log("Stop current Round Heat")
        console.log(JSON.stringify(response));
        alert("Heat is stopped");
      }
    });  
    */
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post("/jsonapi/stop_heat", {
        tournamentID: tournamentID,
        roundID:roundID
    }).success(function (data, status, headers, config) {
        $scope.stopHeat_response = data;
        console.log(data);
        if (data.failed){
          alert(data.failed);
        }
        else{
          console.log("Stop current Round Heat")
          console.log(JSON.stringify(data));
          alert("Heat is stopped");
        }
    }).error(function (data, status, headers, config) {
        console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });
    $route.reload();
  } 

  /*Tournament Join page initialization - By Glen*/
  $scope.tournamentInit=function(){
    //$scope.tournamentID = ($location.search()).tournamentID;
    //$scope.fetch_tournament_details(($location.search()).tournamentID);
    if($cookieStore.get("tournamentID")){
      $scope.fetch_tournament_details($cookieStore.get("tournamentID"));
    }else{
      alert("No tournamentID passed to GenshyftTournamentController.");
      $location.path('mytournaments');
    }      
  };

  /*JSON API Call to retrieve tournament data - By Glen*/
  $scope.fetch_tournament_details = function(tournamentID){
    $resource('/jsonapi/tournament/:tournamentID').get({"tournamentID":tournamentID}, function(response){
      $scope.tournament = response;
      console.log("fetch_tournament_details = "+ $scope.tournament.tournamentID );
      $scope.get_indivNoGrpPlayers($scope.tournament);
      if($scope.tournament.isGroup){
        $scope.get_grpPlayers($scope.tournament);
      }       
    });
    //$timeout(function(){ $scope.fetch_tournament_details(tournamentID); }, 5000);
  };

  /*JSON API Call to retrieve tournament data once - By Glen*/
  $scope.fetch_tournament_details_once = function(tournamentID){  
    $resource('/jsonapi/tournament/:tournamentID').get({"tournamentID": tournamentID}, function(response){
      $scope.tournament = response;
      console.log("fetch_tournament_details = "+ $scope.tournament.tournamentID );
      $scope.get_indivNoGrpPlayers($scope.tournament);
      if($scope.tournament.isGroup){
        $scope.get_grpPlayers($scope.tournament);
      }       
    });
  };

  /*Extract players and sort them into the respective group - by Glen*/
  $scope.get_grpPlayers = function(tournament){
    console.log("get_grpPlayers");
    $scope.numGrp = [];
    $scope.currentUserGrping = 0;

    for(var i=0; i < tournament.maxGroups ; i++){
      var grouping = [];
      grouping.push("Group "+(i+1));
      
      for(var j=0; j < tournament.registeredPlayerIDs.length ;j++){
        if(tournament.registeredPlayerIDs[j].group == (i+1)){
          var player = {'nickname':tournament.registeredPlayerIDs[j].nickname,'playerID':tournament.registeredPlayerIDs[j].playerID};
          grouping.push(player);      
         }

         if(tournament.registeredPlayerIDs[j].playerID === tournament.currentPlayerID){
            $scope.currentUserGrping = tournament.registeredPlayerIDs[j].group;
            $scope.have_grp($scope.currentUserGrping);
         }
      }
      if(grouping.length>0){
        $scope.numGrp.push(grouping)
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
          $cookieStore.put("tournamentPassword", tournamentPassword);
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

  $scope.manageSelectedTournament = function(){
    $scope.tournamentInit();
    var tID = $cookieStore.get("tournamentID");
    console.log("TournamentID of tournament to be managed: " + tID);
    /*
    for(var i = 0; i < $scope.grpTournaments.length; i++){
      if(tID == $scope.grpTournaments[i].tournamentID){
        $scope.selectedTournament = $scope.grpTournaments[i];
      }
    }
    //console.log($scope.selectedTournament.status);
    */

    $resource('/jsonapi/tournament/' + tID).get({},function(response){
      if(response.error){
        console.log("Error from retrieving tournament: " + JSON.stringify(response.error));
      }
      $scope.selectedTournament = response;
      console.log("fetch_tournament = " + JSON.stringify($scope.selectedTournament));  
      console.log($scope.selectedTournament.password);
      $scope.passwordConfirm = $scope.selectedTournament.password;
      $scope.selectedTournamentRounds = $scope.selectedTournament.rounds;
    });
    /*
    $resource("/jsonapi/get_tournament_rounds/" + tID).query({},function(response){
      $scope.selectedTournamentRounds = response;
    });
  */
  }

  /*Join Group or Leave Group for group tournament - by Glen (GENShYFT)*/
  $scope.join_grp = function(playerId, tournamentId, groupNo){
    console.log("join_grp : playerId="+ playerId+" tournamentId="+tournamentId+" group="+groupNo);

    var data = {
      'playerID':playerId,
      'tournamentID':tournamentId,
      'group':groupNo
    };
    $scope.joining_grp = $resource('/jsonapi/join_group/join/');
    var joingrp = new $scope.joining_grp(data);
    joingrp.$save(function(response){
      if(response.error) {
        console.log(response.error);
      }else{
        console.log(response);
        $scope.fetch_tournament_details_once(tournamentId);
      }
    }); 

    /*$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post("/jsonapi/join_group/join", {
        playerID: playerId,
        tournamentID: tournamentId,
        group: groupNo
    }).success(function (data, status, headers, config) {
        $scope.registration_response = data;
        console.log(data);
        if (data.failed){
          alert(data.failed);
        }
        else{
          //Method to check whether local testing works
          //$resource('/jsonapi/join_group/check').query({}, function(response){
            //$scope.joinGrpingVal = response;
           //console.log("joinGrpingVal = " + $scope.joinGrpingVal.length);
          //}); 
          $scope.fetch_tournament_details_once(tournamentId);
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    }); */  
  };

  /*Check whether in group - by Glen (GENShYFT)*/
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
    $scope.join_grp(playerId, tournamentId, -1);
/*    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post("/jsonapi/remove_player/tournament", {
        playerID: playerId,
        tournamentID: tournamentId,
    }).success(function (data, status, headers, config) {
        $scope.registration_response = data;
        console.log(data);
        if (data.failed){
          alert(data.failed);
        }
        else{
           //Method to check whether data passes through in local testing work
          //$resource('/jsonapi/remove_player/check').query({}, function(response){
           $scope.removePlayerVal = response;
           console.log("removePlayerVal = " + $scope.removePlayerVal.length);
          }); 
          $scope.fetch_tournament_details_once();
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    }); */  
  };

  /*Taken from previous TournamentsController and modified to redirect to the new page- Glen (GENShYFT)*/
  $scope.create_tournament_round_game_new = function(roundID, grpHave, tournamentType){
    if(tournamentType){
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