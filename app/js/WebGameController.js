function WebGameController($scope,$resource,$cookieStore,$timeout){
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

    if($cookieStore.get("type")){
      $scope.gameType = $cookieStore.get("type"); //retrieve game type
    }
    
    /*
    Create Tournament Game.
    
    */
    
    $scope.fetch = function(gameID){
		$scope.GameModel = $resource('/jsonapi/game/:gameID');
      
		$scope.GameModel.get({"gameID":gameID}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
		});
    };

    $scope.update_remaining_problems = function(){
      $scope.remaining_problems = [];
      //loop through problems and find unsolved. Add to remaining_problems.
      for (var i = 0; i < $scope.game.problemIDs.length; i++) {
        if($scope.game.solvedProblemIDs.indexOf($scope.game.problemIDs[i])<0){
          $scope.remaining_problems.push($scope.game.problemIDs[i]);
        }
      }

      if($scope.remaining_problems.length == 0){
				alert("Congrats! You have solved all the problems in this round.");
        window.location.href="index.html#/roundranking?heatID="+$scope.game.heatID;

      }
      //Update the current problem index based on remaining problems and items skipped. 
      $scope.move_to_next_unsolved_problem();
    };

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
        //IFrame Loading
        $scope.fill_iframe();
        $scope.fill_example_iframe();
        $scope.fill_test_iframe();

      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution1 = null;
        $scope.solution_check_result = null;
      }

    }
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
    }


    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID

      //Update the iFrames when run is clicked.
      $scope.theTab=1; 
      $scope.fill_iframe();
      //$scope.fill_example_iframe();
      $scope.fill_test_iframe();

      $('#t11').removeClass('active');
      $('#t21').addClass('active');
      $('#ta11').removeClass('active');
      $('#ta21').addClass('active');
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};
      
      //Post the solution
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
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
        
      //Fill the iFrame with data from a textarea. 
    $scope.fill_iframe = function() { 
      console.log("filling solution iFrame");
      var iFrame = angular.element( document.querySelector( '#anIframe' ) );
      iFrame.attr("src",'data:text/html;charset=utf-8,' +encodeURI($scope.solution1));
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
      iframe.attr("src","web_test_example.html");//'data:text/html;charset=utf-8,' +encodeURI($scope.game.problems.problems[$scope.current_problem_index].examples));
      $scope.log_test_iframe();

    };
    $scope.log_test_iframe = function() { 
      var iframe = angular.element( document.querySelector( '#testIframe' ).contentDocument.getElementsByTagName('div')[0].innerText.split("Errors"));
      var errors = iframe[1].split(" ")[0];
      var failures = iframe[1].split(" ")[1].split("Failures")[1];
      $scope.issues = parseInt(errors) + parseInt(failures);      
      console.log("There were "+errors+" errors and "+failures+" failures and "+$scope.issues+" issues overall.");
      
    };
    $scope.counter = -1;
    $scope.run_timer=true;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
          $scope.start_timer(10);
          if($scope.run_timer){
            $scope.fill_iframe();
          }
        }
    }
    $scope.start_timer = function(countdown){
      //Only start the timer if coundown >=0
      if (countdown >= 0){
      $scope.counter = countdown;//countdown;
      mytimeout = $timeout($scope.onTimeout,1000);
      }
      else{
        console.log("Negative number passed to start_timer "+countdown);
      }
    }
      
    var mytimeout = null;
    $scope.start_timer(5);
  
  $scope.fetch(123456);
  
}

