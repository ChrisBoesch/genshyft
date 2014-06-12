function TournamentGameController($scope,$resource,$cookieStore,$timeout,$location){
    //$scope.currentProblem
    //$scope.game = $resource('test_data/python_game.json').get();
    //$scope.mobile_game = $resource('test_data/mobile_python_game.json').get();
    
    /*
    To play a game via the SingPath API you must do the following. 
    1. Create a game using create_practice_game and get the gameID in the response. 
    2. Call check_solution_for_game() for a problem until the player correctly solves the problem. 
    3. Call fetch(gameID) to get the updated status of the game after correct solves. 
    4. Redirect the player to the proper page once the game is completed.
    */

    $scope.skip_problem_count = 0;
    $scope.current_problem_index = 0;
    $scope.mentor_hasArrived = false;
    $scope.mentor_id = null;
    $scope.codeType = null;

    $scope.timeoutVarMentor = null;
    $scope.tournamentGameStatus=null;

    if($cookieStore.get("type")){
      $scope.gameType = $cookieStore.get("type"); //retrieve game type
    }
    
    /*
    Create Tournament Game.
    
    */
    
    $scope.fetch = function(gameID){
    $scope.mentor_hasArrived = false;
    $scope.mentor_id = null;
		$scope.GameModel = $resource('/jsonapi/game/:gameID');
      
		$scope.GameModel.get({"gameID":gameID}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
        //Added by GENShYFT - Glen
        $scope.get_mentor($scope.game.heatID, $scope.game.playerID);
        $scope.problems = $scope.game.problems.problems;
        $scope.codeType=$scope.problems[$scope.current_problem_index].interface.codeHighlightKey;

        console.log($scope.problems[$scope.current_problem_index].interface.codeHighlightKey);
    });
    };

    $scope.update_remaining_problems = function(){
      $scope.remaining_problems = [];
      //loop through problems and find unsolved. Add to remaining_problems.
      for (var i = 0; i < $scope.game.problemIDs.length; i++) {
        if($scope.game.solvedProblemIDs.indexOf($scope.game.problemIDs[i])<0){
          console.log($scope.game.problemIDs[i]);
          $scope.remaining_problems.push($scope.game.problemIDs[i]);
        }
      }

      if($scope.remaining_problems.length == 0){
        $scope.get_mentee($scope.game.heatID, $scope.game.playerID);
        $("#finish_all_info").modal();
				//alert("Congrats! You have solved all the problems in this round.");
        //$location.search({"heatID":$scope.game.heatID}).path("tournament-ranking");
        //window.location.href="index.html#/roundranking?heatID="+$scope.game.heatID;

      }
      //Update the current problem index based on remaining problems and items skipped. 
      $scope.move_to_next_unsolved_problem();
    };

    $scope.check_solution_for_game_html = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID

      //Update the iFrames when run is clicked.
      $scope.theTab=1; 
      $scope.fill_iframe();
      //$scope.fill_example_iframe();
      $('#t11').removeClass('active');
      $('#t21').addClass('active');
      $('#ta11').removeClass('active');
      $('#ta21').addClass('active');
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.problemId,
                        game_id:$scope.gameID};
      
      //Post the solution
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            //If solved, update the game.
            $scope.urlToPass = $scope.solution_check_result.url;
            $scope.testURL = $scope.solution_check_result.testUrl;
            
            console.log("This is test URL " + $scope.testURL);

          $scope.fill_test_iframe();  
            if($scope.solution_check_result.last_solved){
                $scope.fetch($scope.game.gameID);
            }
      });



    };

    $scope.fill_iframe = function() { 
      console.log("filling solution iFrame");
      var iFrame = angular.element( document.querySelector( '#anIframe' ) );
      iFrame.attr("src","/jsonapi/lastsolution.html");
    };
    $scope.fill_example_iframe = function() { 
      console.log("filling example iFrame");
      var iFrame = angular.element( document.querySelector( '#exampleIframe' ) );
      iFrame.attr("src",'data:text/html;charset=utf-8,' +encodeURI($scope.game.problems.problems[$scope.current_problem_index].examples));
    };

    $scope.fill_test_iframe = function() { 
      console.log("filling test iFrame");
      var iframe = angular.element( document.querySelector( '#testIframe' ) );
      //iFrame.attr("src",'data:text/html;charset=utf-8,' +encodeURI($scope.tests));
      iframe.attr("src", "/jsonapi/runner.html");//'data:text/html;charset=utf-8,' +encodeURI($scope.game.problems.problems[$scope.current_problem_index].examples));
      //var scopeToShare = angular.element(document.querySelector('[ng-controller="EZWebGameController"]')).scope().urlToPass;
      //console.log(scopeToShare + " from fill");
      //document.getElementById("testIframe").contentWindow.angular.element();
      //$scope.log_test_iframe();

    };
    $scope.log_test_iframe = function() { 
      var iframe = angular.element( document.querySelector( '#testIframe' ).contentDocument.getElementsByTagName('div')[0].innerText.split("Errors"));
      var errors = iframe[1].split(" ")[0];
      var failures = iframe[1].split(" ")[1].split("Failures")[1];
      $scope.issues = parseInt(errors) + parseInt(failures);      
      console.log("There were "+errors+" errors and "+failures+" failures and "+$scope.issues+" issues overall.");
      
    };

    //By GENShYFT - Getting Mentee
    $scope.get_mentee = function(heatID, playerID){
      $resource('/jsonapi/get_heat_ranking').get({"heatID":heatID,"nocache":true}, function(response){
        $scope.current_heat = response;
        for(var i =0;i< $scope.current_heat.ranking.length;i++){
          if($scope.current_heat.ranking[i].playerid === playerID){
            $scope.mentee_name = $scope.current_heat.ranking[i].mentee;
            break;
          }
        }
      }); 
    };

    //By GENShYFT - Getting Mentor
    $scope.get_mentor = function(heatID, playerID){

      if($scope.tournamentGameStatus != "Closed"){
        $resource('/jsonapi/get_heat_ranking').get({"heatID":heatID}, function(response){
          $scope.current_heat = response;
          $scope.tournamentGameStatus = $scope.current_heat.tournamentStatus;
          for(var i =0;i< $scope.current_heat.ranking.length;i++){
            if($scope.current_heat.ranking[i].playerid === playerID){
              $scope.mentor_id = $scope.current_heat.ranking[i].mentorID;
              $scope.mentor_name= $scope.current_heat.ranking[i].mentor;
              $scope.mentor_hasArrived = $scope.current_heat.ranking[i].mentorHasArrived;
              break;
            }
          }
        });
      }

     if($scope.tournamentGameStatus != "Closed" && $scope.current_heat.heatIsFinished !== true){
        console.log("get_mentor()");
        $scope.timeoutVar = $timeout(function(){ $scope.get_mentor(heatID, playerID); }, 10000); 
     }else{
       console.log("cancelling get mentor loop since heat has finished or tournament has been closed.");  
       $timeout.cancel($scope.timeoutVar);
        
      } 
      
    };

    $scope.get_mentor_once = function(heatID, playerID){
      $resource('/jsonapi/get_heat_ranking').get({"heatID":heatID,"nocache":"true"}, function(response){
        $scope.current_heat = response;
        for(var i =0;i< $scope.current_heat.ranking.length;i++){
          if($scope.current_heat.ranking[i].playerid === playerID){
            $scope.mentor_id = $scope.current_heat.ranking[i].mentorID;
            $scope.mentor_name= $scope.current_heat.ranking[i].mentor;
            $scope.mentor_hasArrived = $scope.current_heat.ranking[i].mentorHasArrived;
            break;
          }
        }
      });
      console.log("get_mentor_once()");
    };


    //By GENShYFT - Round to Ranking Redirection
    $scope.round_end_ranking = function(heatID){
      $timeout.cancel($cookieStore.get("timeoutVar"));
      $location.search({"heatID":$scope.game.heatID}).path("tournament-ranking");
      $('.modal-backdrop').remove();
    };

    //By GENShYFT - Round to Join Tournament Redirection
    $scope.round_end_tournament_lobby = function(heatID){
      $timeout.cancel($cookieStore.get("timeoutVar"));
      $location.path("tournament-grpjoin");
      $('.modal-backdrop').remove();
    };

    //By GENShYFT - Setting Mentor Arrival
    $scope.mentor_arrived =function(playerID, heatID){
      console.log("mentor_arrived : heatID=" + heatID);

      var data = {
        'playerID':playerID,
        'heatID':heatID
      };
      $scope.mentor_arrival = $resource('/jsonapi/mentor_has_arrived');
      var hasArrived = new $scope.mentor_arrival(data);
      hasArrived.$save(function(response){
        if(response.error) {
          console.log(response.error);
        }else{
          console.log(response);
        }
      });
      $scope.get_mentor_once(heatID, playerID);

      if($scope.mentor_hasArrived == false){
        console.log("retrieving mentor again");
        $scope.timeoutVarMentor = $timeout(function(){$scope.mentor_arrived(playerID, heatID);}, 5000);
      }else if($scope.mentor_hasArrived == true){
        $timeout.cancel($scope.timeoutVarMentor);
      }
    }

    $scope.move_to_next_unsolved_problem = function(){
      $scope.sampleAnswers = "yes";
      if ($scope.remaining_problems.length>0){
        $('#t11').addClass('active');
        $('#t21').removeClass('active');
        $('#ta11').addClass('active');
        $('#ta21').removeClass('active');
        //Todo:If you are already on the problem, you don't need to reload it. 
        $scope.current_problem = $scope.remaining_problems[$scope.skip_problem_count % $scope.remaining_problems.length];
        $scope.current_problem_index = $scope.game.problemIDs.indexOf($scope.current_problem);
        $scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
        $scope.solution_check_result = null;
        var editor = ace.edit("editorPractice");
        editor.getSession().setMode("ace/mode/" + $scope.game.problems.problems[$scope.current_problem_index].interface.codeHighlightKey);
      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution1 = null;
        $scope.solution_check_result = null;
      }

    };

    $scope.skip_problem = function(){
      $('#t11').addClass('active');
      $('#t21').removeClass('active');
      $('#ta11').addClass('active');
      $('#ta21').removeClass('active');
      if ($scope.remaining_problems.length>1){
        $scope.skip_problem_count += 1;
        $scope.move_to_next_unsolved_problem();
      }
      console.log("Skipping problem. count="+$scope.skip_problem_count+" remaining "+$scope.remaining_problems.length);
    };


    $scope.check_solution_for_game = function() {
      console.log("Non-html");
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID
      if ($scope.codeType != 'html'){
        $('#t11').removeClass('active');
        $('#ta11').removeClass('active');
        $('#t21').addClass('active');
        $('#ta21').addClass('active');
      }else{
        $('#t111').removeClass('active');
        $('#ta111').removeClass('active');
        $('#t211').removeClass('active');
        $('#ta211').removeClass('active');
        $('#t311').addClass('active');
        $('#ta311').addClass('active');
      }
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};
      
      //Post the solution
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            if($scope.codeType == 'html'){
              $scope.fill_iframe();
              $scope.fill_test_iframe();
            }
            //If solved, update the game.
            if($scope.solution_check_result.last_solved){
                $scope.fetch($scope.game.gameID);
            }
      });
    };

    $scope.render_html = function(){
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            $scope.fill_iframe();
            //If solved, update the game.
            if($scope.solution_check_result.last_solved){
                $scope.fetch($scope.game.gameID);
            }
      });

    };

    $scope.run_e2e_tests = function(){
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            $scope.fill_test_iframe();
            //If solved, update the game.
            if($scope.solution_check_result.last_solved){
                $scope.fetch($scope.game.gameID);
            }
      });

    };

    $scope.verify_solution = function() {
      //$scope.solution
      //$scope.tests
      $scope.solution_check_result = $resource('/jsonapi/check_code_with_interface').get();
    };
    //Mobile Problem Methods
    //If the user selects a correct permutation. 
    //You can mark the permutation correct and post to the server. 
    //This will result in the game proceeding. 

    $scope.check_permutation = function() {
      //$scope.permutation
      //$scope.tests
      //alert("permutation="+$scope.permutation);
      //Update the solution with the permutations of lines.
      $scope.permutation_lines = "";
      //Loop through the permutation and add all of the lines of code
      for (var i = 0; i < $scope.permutation.length; i++) {
        //alert(parseInt($scope.permutation[i]));
        $scope.permutation_lines += $scope.game.problems.problems[$scope.current_problem_index].lines[parseInt($scope.permutation[i])-1]+"\n";
      }
      //Then put the resulting combination of lines in the solution model. 
      $scope.solution = $scope.permutation_lines;
      $scope.solution_check_result =  {"error":"This solution will not compile."};
      $scope.ner =  {"error":"This solution will not compile."};
      
      var nonErrorResult = $scope.game.problems.problems[$scope.current_problem_index].nonErrorResults[$scope.permutation];
      if(nonErrorResult){
    
        $scope.solution_check_result = nonErrorResult;
        $scope.ner = nonErrorResult;
        //If the solution passes, then call verify for the solution to progress in the game. 
        if(nonErrorResult.solved){
          $scope.check_solution_for_game();
          //alert("All solved. Checking solution for game."+nonErrorResult.solved);
        }
      }
    };
    

	//Check for a roundID to see if this is a tournament game. 
	if($cookieStore.get("roundID")){
      $scope.roundID = $cookieStore.get("roundID"); 
      $scope.tournamentGameID = $cookieStore.get("tournamentGameID"); 
      $scope.fetch($scope.tournamentGameID);
      //$scope.update_remaining_problems();
      console.log("Found a roundID in the cache "+$scope.roundID);//retrieve name of the path
      console.log("Found a gameID in the cache "+$scope.tournamentGameID);//retrieve name of the path
      
    }
    else{
      alert("No roundID passed to TournamentGameController.")
    }

}

