function yMBcoachingPlayController($scope,$resource,$cookieStore,$timeout,$http,$route){
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
	
	
	$scope.currentAttempts = 1;
	$scope.currentDoneQuestions =[];
	
    $scope.skip_problem_count = 0;
    $scope.current_problem_index = 0;
    $scope.permutation = "12345"; 
	$scope.randomAudioNum =0;
	
    $scope.counter = 0;
	

	
	
	
	
	
	
	
	
	
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
		if($scope.counter > 100 ){
			$scope.counter = 0;
			$scope.audio = $scope.audiofile.areyouthere;
			var audioplayer = document.getElementsByTagName('audio')[0];
			$scope.words = $scope.audiotext.areyouthere;
			$scope.coachImage =$scope.pictures.areyouthere;
			audioplayer.load()
			$scope.counter = 0;
		}
		
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }
	
	
	
		$scope.getCurrentMastery = function(){
          $resource('/jsonapi/current_coaching_status').get({},function(response){
			  $scope.mastery = response;
			   
			   $scope.currentCoach = $scope.mastery.coach;
			   $scope.currentPathId = $scope.mastery.pathId;
			   $scope.currentPathName = $scope.mastery.pathName;
			   $scope.nextProblemID = $scope.mastery.nextProblemID;
			   $scope.fromProblemSetID = $scope.mastery.fromProblemSetID;
			   $scope.goal = $scope.mastery.goal;
			   console.log("coach name : " + $scope.mastery.coach);
			   $scope.getCoaches($scope.currentCoach);
			   console.log("EXECUTING METHOD: $scope.getCoaches($scope.currentCoach); ");
			   })		
		}
	
	$scope.getCoaches = function(currentCoach){
	  console.log("EXECUTING METHOD : $scope.getCoaches = function(currentCoach){ ");
	  $resource('/jsonapi/coach').get({},function(response){
		  $scope.allCoachesData = response;
		  
		  for(var i =0; i < $scope.allCoachesData.coachesData.length ; i++){
			if($scope.allCoachesData.coachesData[i].coach == currentCoach){
				$scope.audiofile = $scope.allCoachesData.coachesData[i].audiofile;
				$scope.audiotext = $scope.allCoachesData.coachesData[i].audiotext;
				$scope.pictures = $scope.allCoachesData.coachesData[i].pictures;
				$scope.coachImage = $scope.allCoachesData.coachesData[i].image;	
				
				$scope.overallCoachData = $scope.allCoachesData.coachesData[1];
				break;
			}
		  }
			//WELCOMEBACK 
			$scope.audio = $scope.audiofile.welcomeback;
			var audioplayer = document.getElementsByTagName('audio')[0];
			$scope.words = $scope.audiotext.welcomeback;
			//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
			audioplayer.load()	;
			$scope.getGameID();
	  });	   			   
	}
	
	
	$scope.getGameID = function(){
		$scope.gameModel = $resource('/jsonapi/play_coaching_game');
		var data = {"problemId":$scope.mastery.nextProblemID,"problemSet":$scope.mastery.fromProblemSetID};
	
	      var item = new $scope.gameModel(data);
          item.$save(function(response) { 
                  $scope.response = response;
				  $scope.gameID = $scope.response.gameID;
                  console.log("Game ID :" + $scope.gameID); 
				var audioplayer = document.getElementsByTagName('audio')[0];
				
				//PLAY GOAL OBJECTIVE AUDIO
				$timeout(function(){
					if($scope.goal=="faster"){
						$scope.audio = $scope.audiofile.faster;
						$scope.words = $scope.audiotext.faster;
						$scope.coachImage =$scope.pictures.faster;
					}
					else if($scope.goal=="lessattempts"){
						$scope.audio = $scope.audiofile.lessattempts;
						$scope.words = $scope.audiotext.lessattempts;
						$scope.coachImage =$scope.pictures.lessattempts;						
					}
					//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
					audioplayer.load()	;	
							//Execute Game
							$timeout(function(){ 
								$scope.create_practice_game($scope.gameID);
								$scope.runButton = true;
							}, 10000);	 	
				}, 15000); 
				

          });	
	}	  
	
	$scope.nextQuestion = function(){
		$route.reload();
		console.log("next question");
	}

	
    //alert($scope.qid);
    $scope.create_practice_game = function(problemSetID,numProblems){
	//level = problemsetID, 5, levelnumber = path number
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');
	  console.log("CALLED METHOD   $scope.create_practice_game = function(problemSetID,numProblems) ");
      
      $scope.CreateGameModel.get({"problemsetID":problemSetID,"numProblems":numProblems}, function(response){
        $scope.game = response;
       // $scope.update_remaining_problems();
		});
    };

	
	// yousof version with gameId given
    $scope.create_practice_game = function(gameID){
		$scope.GameModel = $resource('/jsonapi/game/:gameID');
         console.log("CALLED METHOD   $scope.create_practice_game = function(gameID) ");
		$scope.GameModel.get({"gameID":gameID}, function(response){
        $scope.game = response;
		
		for(var i = 0; i<$scope.game.problems.problems.length-0; i++){
			if($scope.game.problems.problems[i].id == $scope.nextProblemID){
				$scope.current_problem_index = i;
				$scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
				console.log("CURRENT PROBLEM INDEX IS " + i );
				console.log($scope.game.problems.problems[$scope.current_problem_index].skeleton);
				break;
			}
		
		}		
		
		});
    };	
	
    
    $scope.fetch = function(gameID){
		$scope.GameModel = $resource('/jsonapi/game/:gameID');
      
		$scope.GameModel.get({"gameID":gameID}, function(response){
        $scope.game = response;
      //  $scope.update_remaining_problems();
		});
    };

    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
	  //$scope.game.gameID
		$scope.counter = 0; //reset timer
		

		$timeout(function(){// 3sec delay for user to listen
		
		$scope.audio = $scope.audiofile.letscompile;
		var audioplayer = document.getElementsByTagName('audio')[0];
		$scope.words = $scope.audiotext.letscompile;
		$scope.coachImage =$scope.pictures.letscompile;
		//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
		audioplayer.load();
		

		  $('#t11').removeClass('active');
		  $('#t21').addClass('active');
		  $('#ta11').removeClass('active');
		  $('#ta21').addClass('active');

		  $scope.SaveResource = $resource('/jsonapi/verify_for_game');
		  //alert($scope.game.gameID);
		  $scope.theData = {user_code:$scope.solution1,
							problem_id:$scope.nextProblemID,
							game_id:$scope.gameID};
	
		  var item = new $scope.SaveResource($scope.theData);
		  item.$save(function(response) { 
			  $scope.solution_check_result = response;
			  if($scope.solution_check_result.last_solved){//check if last question was solved correctly
					//CORRECT
						$scope.audio = $scope.audiofile.correctanswer;
						var audioplayer = document.getElementsByTagName('audio')[0];
						$scope.words = $scope.audiotext.correctanswer;
						//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
						
						$timeout(function(){audioplayer.load();}, 5000);
						
						$timeout(function(){
							$scope.audio = $scope.audiofile.tryother;
							var audioplayer = document.getElementsByTagName('audio')[0];
							$scope.words = $scope.audiotext.tryother;		
							$scope.coachImage =$scope.pictures.tryother;
							audioplayer.load();
							$scope.showNextQuestion = true;
						}, 10000);
						
						
			  }
			  else {
					//WRONG
					$scope.audio = $scope.audiofile.dontgiveup;
					var audioplayer = document.getElementsByTagName('audio')[0];
					$scope.words = $scope.audiotext.dontgiveup;
					//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
					$timeout(function(){
						audioplayer.load();
						$scope.coachImage =$scope.pictures.dontgiveup;
					}, 5000);
			  }
			  
			  
			  
			  
			});
		},5000); 
		  


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

}