'use strict';

/*Scripts for tabs*/

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

/*GENShYFT's TournamentController*/
function GenshyftTournamentController($scope,$resource,$timeout,$location,$cookieStore,$http,$route){
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

  //variables for create tournament details
  $scope.grpTourTitle="";
  $scope.grpTourDescription="";
  $scope.grpTourPassword="";
  $scope.grpTourPasswordConfirm="";
  $scope.grpTourStatus="Closed";
  $scope.grpTourType="individual";
  $scope.grpTourMentor="";
  $scope.grpTourNoGroup=2;
  $scope.grpTourMaxNoPlayer=1;
  $scope.qnsLanguage="Ruby";

  //variables for edit tournament details
  $scope.selectedTournament;
  $scope.selectedRound;
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

  //Save each created round into an array 
  $scope.save_round = function(){      
    if($scope.newTournamentRounds.length == 5){
      alert("The maximum number of rounds per tournament is 5!");
    }
    else if($scope.grpTourRoundName == undefined || $scope.grpTourRoundName == ""){
      alert("The round name cannot be empty!");
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
        roundQuestions.push($scope.cartQuestions[j].questionId);
      }
      //roundId is used to simulate actual saving into backend. To remove after integrating
      console.log("Saving round into $scope.newTournamentRounds to be saved into tournament later");
      $scope.newTournamentRounds.push({roundId:$scope.roundIdTracker,roundName:$scope.grpTourRoundName,timeLimit:$scope.grpTourRoundMins,problemIDs:roundQuestions,description:$scope.grpTourRoundDesc});
      
      $scope.grpTourRoundName = "";
      $scope.grpTourRoundMins = "";
      $scope.grpTourRoundDesc = "";
      //increases roundId to have a different roundId for every round
      $scope.roundIdTracker += 1;
      
      // Question Choice Model
      $scope.cartQuestions = [];
      //console.log(roundQuestions);
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
    console.log("Retrieving all available levels for questions");
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
    console.log("Filtering questions based on language");
    for(var i = 0; i < tournamentQns.tourQns.length; i++){
      var language = tournamentQns.tourQns[i].language;
      if(language==qnsLanguage){
        var pathLevel = tournamentQns.tourQns[i].pathLevel;
        $scope.lvlArray.push(pathLevel);
      }
    }
    //console.log($scope.lvlArray);
  };

   /*To implement for Create Tournaments - GenShyft
    method to get all relevant tournament questions 
    according to question language*/
  $scope.get_tournamentQns = function(qnsLanguage, pathLevel){
    console.log("Retrieving available questions in DB");
    $resource("/jsonapi/list_tournamentQns/all").get({},function(response){
      $scope.tournamentQns = response; 
      $scope.roundQns = {};
      $scope.roundQns.language = qnsLanguage;
      $scope.roundQns.pathLevel = pathLevel;
      $scope.list_questions($scope.roundQns.language, $scope.roundQns.pathLevel, $scope.tournamentQns);
    });
  };

  /*method to filter questions based on language and pathLevel-GenShyft*/
  $scope.list_questions = function(qnsLanguage, pathLevel, tournamentQns){
    console.log("Filtering questions based on language and pathlevel")
    $scope.qnsArray = [];
    for(var i = 0; i < tournamentQns.tourQns.length; i++){
      var language = tournamentQns.tourQns[i].language;
      var level = tournamentQns.tourQns[i].pathLevel;
      if(language==qnsLanguage && level==pathLevel){
        $scope.qnsArray = tournamentQns.tourQns[i].questionSet;
      }
    }
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
    $scope.questionName = question.question;
    $scope.questionDescription = question.questionDescription;
    $scope.questionExamples = question.questionExamples;
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
    $resource("/jsonapi/added_tournaments").query({},function(response){
      $scope.grpTournaments = response; // stores the Json files
      console.log($scope.grpTournaments);
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
    for(var i =0; i < tournament.registeredPlayers.length; i++){
      if(tournament.registeredPlayers[i].group===0){
        var playerDetails = {"playerName":tournament.registeredPlayers[i].playerName,"playerId":tournament.registeredPlayers[i].playerId};
        $scope.registeredPlayersArray.push(playerDetails);
      }
    }
  }

  /*Method to create tournaments-GenShyft*/
  $scope.create_grptournament = function(tournamentID){
    console.log("Create tournament executed here")
    var currentDate = new Date(); 

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
    else if($scope.newTournamentRounds.length==0){
      alert("Please add at least one round for your tournament!");
    }
    else if($scope.grpTourType=="group"){
      var isGroup = true;
      var data = {"shortTitle":$scope.grpTourTitle,
                   "description":$scope.grpTourDescription,
                   "password": $scope.grpTourPassword,
                   "roundCount": $scope.newTournamentRounds.length,
                   "rounds": $scope.newTournamentRounds,
                   "utcOffset": currentDate.toLocaleString(),
                   /*"tournamentId":tournamentID,
                   "passwordConfirm": $scope.grpTourPasswordConfirm,
                   "addDetails":$scope.grpTourAddDetails,
                   "status": $scope.grpTourStatus,*/
                   "isGroup": isGroup,
                   "mentorAssignInTeam": $scope.grpTourMentor,
                   "numberOfGrp": $scope.grpTourNoGroup,
                   "numPlayerPerGrp": $scope.grpTourMaxNoPlayer
                 }
      /*$scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
      $scope.NewGrpTournament = $resource('/jsonapi/create_tournament');
      var new_grpTournament = new $scope.NewGrpTournament(data);
      new_grpTournament.$save(function(response){
         if(response.error) {
          console.log(response.error);
         }
         else{
          console.log("Save Group tournament into DB")
          $scope.grpTournament = response;
        }
      });
      */
      $.ajax({
        url: '../jsonapi/add_grptournament',
        type: 'POST',
        async: false,
        data: data,
        dataType: "text",
        success: function(){
          $('#grpTournamentCreated').modal('show');
        },
        error: function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        }
      }); 
      //$('#grpTournamentCreated').modal('show');
    }
    else{
      var isGroup = false;
      var data = {"shortTitle":$scope.grpTourTitle,
                   "description":$scope.grpTourDescription,
                   "password": $scope.grpTourPassword,
                   "roundCount": $scope.newTournamentRounds.length,
                   "rounds": $scope.newTournamentRounds,
                   "utcOffset": currentDate.toLocaleString(),
                   /*"tournamentId":tournamentID,
                   "passwordConfirm": $scope.grpTourPasswordConfirm,
                   "addDetails":$scope.grpTourAddDetails,
                   "status": $scope.grpTourStatus,*/
                   "isGroup": isGroup,
                   "mentorAssignInTeam": false,
                   "numberOfGrp": 0,
                   "numPlayerPerGrp": 0
                 }
      /*$scope.NewGrpTournament = $resource('/jsonapi/add_grptournament');
      $scope.NewGrpTournament = $resource('/jsonapi/create_tournament');
      var new_grpTournament = new $scope.NewGrpTournament(data);
      new_grpTournament.$save(function(response){
         if(response.error) {
          console.log(response.error);
         }
         else{
          console.log("Save normal tournament into DB")
          $scope.grpTournament = response;
        //$scope.newGrpTournamentID = response.id;
        }
      });*/
      $.ajax({
        url: '../jsonapi/add_grptournament',
        type: 'POST',
        async: false,
        data: data,
        dataType: "text",
        success: function(){
          $('#grpTournamentCreated').modal('show');
        },
        error: function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        }
      }); 
      //$('#grpTournamentCreated').modal('show');
    }
  };

  /*Method to save edited tournament details-GenShyft*/
  $scope.updateTournament = function(){
    if($scope.selectedTournament.shortTitle=="" || $scope.selectedTournament.shortTitle==undefined){
      alert("The tournament title cannot be empty!");
    }
    else if($scope.selectedTournament.password=="" || $scope.selectedTournament.password==undefined){
      alert("The tournament password cannot be empty!");
    }
    else if($scope.selectedTournament.password!=$scope.selectedTournament.passwordConfirm){
      alert("The tournament password does not match!");
    }
    else if($scope.selectedTournament.isGroup==true){
      var updatedTournament = {"shortTitle":$scope.selectedTournament.shortTitle,
                  "description":$scope.selectedTournament.description,
                   "password": $scope.selectedTournament.password,
                   "tournamentId":$scope.selectedTournament.tournamentID,
                   "addDetails":$scope.selectedTournament.addDetails,
                   "status": $scope.selectedTournament.status,
                   "mentorAssignment": $scope.selectedTournament.mentorAssignment,
                   "numberOfGrp": $scope.selectedTournament.numberOfGrp,
                   "numPlayerPerGrp": $scope.selectedTournament.numPlayerPerGrp

                 }
      //codes copied from managetournament.js, updateTournament() in SingPath Ender codes
      $.ajax({
        url: '../jsonapi/updateTournament',
        type: 'POST',
        async: false,
        data: updatedTournament,
        dataType: "text",
        success: function(){
          console.log("Update Group tournament into DB")
          $('#editTournInfo').modal('hide');
          $('#changesSaved').modal('show');
        },
        error: function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        }
      });
      $('#editTournInfo').modal('hide');
      $('#changesSaved').modal('show');
    }
    else{
      var updatedTournament = {"shortTitle":$scope.selectedTournament.shortTitle,
                  "description":$scope.selectedTournament.description,
                   "password": $scope.selectedTournament.password,
                   "tournamentId":$scope.selectedTournament.tournamentID,
                   "addDetails":$scope.selectedTournament.addDetails,
                   "status": $scope.selectedTournament.status,
                 }
      //codes copied from managetournament.js, updateTournament() in SingPath Ender codes
      $.ajax({
        url: '../jsonapi/updateTournament',
        type: 'POST',
        async: false,
        data: updatedTournament,
        dataType: "text",
        success: function(){
          console.log("Update normal tournament into DB")
          $('#editTournInfo').modal('hide');
          $('#changesSaved').modal('show');
        },
        error: function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        }
      });
      $('#editTournInfo').modal('hide');
      $('#changesSaved').modal('show');
    }
  };

  /*Method to save edited tournament round details-GenShyft*/
  $scope.updateRound = function(){
    if($scope.selectedRound.roundName == undefined || $scope.selectedRound.roundName == ""){
      alert("The round name cannot be empty!");
    }
    else if($scope.selectedRound.timeLimit == undefined || $scope.selectedRound.timeLimit == 0){
      alert("The round time limit cannot be empty!");
    }
    else{
      var roundQuestions = [];
      for(var j = 0; j < $scope.cartQuestions.length; j++){
        roundQuestions.push($scope.cartQuestions[j].questionId);
      }
      var updatedRound = {"roundId":$scope.selectedRound.roundId,"roundName":$scope.selectedRound.roundName,"timeLimit":$scope.selectedRound.timeLimit,"problemIDs":roundQuestions,"description":$scope.selectedRound.description};    
      //codes copied from managetournament.js, updateRound()
      $.ajax({
        url: '../jsonapi/updateRound',
        type: 'POST',
        async: false,
        data: updatedRound,
        dataType: "text",
        success: function(){
          console.log("Update rounds into DB")
          $scope.cartQuestions = [];
          $('#changesSaved').modal('show');
        },
        error: function(jqXHR, textStatus) {
          alert( "Request failed: " + textStatus );
        }
      });
      $scope.cartQuestions = [];
      $('#editTournRound').modal('hide');
      $('#changesSaved').modal('show');
    }
  };

  /*Method to load details of selected round with Round ID to display in Mange Tournament from all the questions in DB-GenShyft*/
  $scope.edit_round = function(roundId){
    for(var i = 0; i < $scope.selectedTournament.rounds.length; i++){
      var checkRound = $scope.selectedTournament.rounds[i];
      if(roundId == checkRound.roundId){
        $scope.selectedRound = checkRound;
      }
    }
    $resource("/jsonapi/list_tournamentQns/all").get({},function(response){
      $scope.tournamentQns = response; 
      for(var i = 0; i < $scope.selectedRound.problemIDs.length; i++){
        for(var j = 0; j < $scope.tournamentQns.tourQns.length; j++){
          for(var k = 0; k < $scope.tournamentQns.tourQns[j].questionSet.length; k++){
            if($scope.selectedRound.problemIDs[i] == $scope.tournamentQns.tourQns[j].questionSet[k].questionId){
              $scope.cartQuestions.push($scope.tournamentQns.tourQns[j].questionSet[k]);
            }
          }
        }
      }
    });
    $('#editTournRound').modal('show');
  }

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

  $scope.viewQuestionsInfoInCart = function(question){
    $scope.questionName = question.question;
    $scope.questionDescription = question.questionDescription;
    $scope.questionExamples = question.questionExamples;
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
  }

  $scope.hideQuestionsInfoInCart = function(){
    $('#questionsInfoInCart').modal('hide');
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
        if($scope.tournament.isGroup){
          $scope.get_grpPlayers($scope.tournament);
        }       
    });
    //$timeout(function(){ $scope.fetch_tournament_details(tournamentID); }, 5000);
  };

  /*JSON API Call to retrieve tournament data once - By Glen*/
  $scope.fetch_tournament_details_once = function(tournamentID){  
    $resource('/jsonapi/tournament_progress/:tournamentID').get({"tournamentID": tournamentID}, function(response){
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

      for(var i=0; i < tournament.numberOfGrp ; i++){
        var grouping = [];
        grouping.push("Group "+(i+1));
        
        for(var j=0; j < tournament.registeredPlayers.length ;j++){
          if(tournament.registeredPlayers[j].group == (i+1)){
            var player = {"playerName":tournament.registeredPlayers[j].playerName,"playerId":tournament.registeredPlayers[j].playerId};
            grouping.push(player);      
           }

           if(tournament.registeredPlayers[j].playerId === tournament.currentPlayerID){
              $scope.currentUserGrping = tournament.registeredPlayers[j].group;
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

  $scope.manageSelectedTournament = function(){
    var tID = $cookieStore.get("tournamentID");

    $resource("/jsonapi/added_tournaments").query({},function(response){
      $scope.grpTournaments = response; // stores the Json files
      for(var i = 0; i < $scope.grpTournaments.length; i++){
        if(tID == $scope.grpTournaments[i].tournamentId){
          $scope.selectedTournament = $scope.grpTournaments[i];
        }
      }
      //console.log($scope.selectedTournament.status);
    });
  }

  //need to reference to deletePlayerTournament() function in manageTournament.js
  $scope.delete_my_tournament = function(tournamentID){
      for(var i = 0; i < $scope.grpTournaments.length; i++){
        if(tournamentID == $scope.grpTournaments[i].tournamentId){
          $scope.grpTournaments.splice(i,1);
        }
      }
  }

  /*Join Group or Leave Group for group tournament - by Glen (GENShYFT)*/
  $scope.join_grp = function(playerId, tournamentId, groupNo){
    console.log("join_grp : playerId="+ playerId+" tournamentId="+tournamentId+" group="+groupNo);

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
          /*Method to check whether local testing works
          $resource('/jsonapi/join_group/check').query({}, function(response){
            $scope.joinGrpingVal = response;
           console.log("joinGrpingVal = " + $scope.joinGrpingVal.length);
          });*/ 
          $scope.fetch_tournament_details_once(tournamentId);
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });   
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

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
          /* Method to check whether data passes through in local testing work
          $resource('/jsonapi/remove_player/check').query({}, function(response){
            $scope.removePlayerVal = response;
           console.log("removePlayerVal = " + $scope.removePlayerVal.length);
          });*/ 
          $scope.fetch_tournament_details_once();
        }
    }).error(function (data, status, headers, config) {
      console.log("Error");
        alert("An error occurred.")
        console.log(data);
    });   
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