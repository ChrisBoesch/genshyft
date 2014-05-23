function yMBcoachingPlayController($scope,$resource,$cookieStore,$timeout,$http,$route,$location){
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
	
	$scope.problemsInSequence = 0;
	$scope.codeType = null;
	$scope.areyouthereWarnings = 0;
	
	
	
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
		if($scope.counter > 55 ){
			$scope.counter = 0;
			
			if( $scope.areyouthereWarnings <3){
				$scope.audio = $scope.audiofile.areyouthere;
				$scope.areyouthereWarnings = $scope.areyouthereWarnings +1;
				var audioplayer = document.getElementsByTagName('audio')[0];
				audioplayer.play();
				$scope.words = $scope.audiotext.areyouthere;
				$scope.coachImage =$scope.pictures.areyouthere;
			}
			$scope.counter = 0;
		}
		
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }

	
	
	
	

	
// Get current status of player	
	$scope.getCurrentMastery = function(){
	  $resource('/jsonapi/current_coaching_status').get({},function(response){
		  $scope.mastery = response;
		  console.log("Response for current_coaching_stats \n\n" + JSON.stringify($scope.mastery));
		   
		   $scope.currentCoach = $scope.mastery.coach;
		   $scope.currentPathId = $scope.mastery.pathId;
		   $scope.currentPathName = $scope.mastery.pathName;
		   $scope.nextProblemID = $scope.mastery.nextProblemID;
		   $scope.fromProblemSetID = $scope.mastery.fromProblemSetID;
		   $scope.showUserNewProblem = $scope.mastery.showNewProblems;
		   $scope.problemsToDo =[];
		   
			$scope.problemViaURL = ($location.search()).problemID;
			if($scope.problemViaURL != null){
				$scope.problemsToDo.push($scope.problemViaURL);
				console.log("Take problem from URL : + "+$scope.problemViaURL);
				$scope.nextProblemID = $scope.problemViaURL;
			}			   
		   
		   $scope.problemsToDo.push($scope.nextProblemID);
		   $scope.master_next_ten_qn = $scope.mastery.next_ten;

		   
		   console.log("Array for next ten  :  " + $scope.master_next_ten_qn );
		   
		   
		   
		   
		   
		   try{
				 console.log("first in list is " + $scope.problemsToDo[0]);
		   
			   for(var i = 1;i<$scope.master_next_ten_qn.length;i++){
					$scope.problemsToDo.push($scope.master_next_ten_qn[i].problemId);
					console.log("Problems added into list are " + $scope.problemsToDo[i]);
			   }
		   }
		   catch(err){
			alert("Please do several questions at Practice and come back later.");
			location.path("#/practice");
		   
		   }
		   
		   
		   $scope.problemsInSequence = 0;
		   if($scope.problemsToDo>$scope.problemsInSequence){
			//$scope.nextProblemID = $scope.mastery.next_ten[$scope.problemsInSequence].problemId
			$scope.nextProblemID = $scope.problemsToDo[$scope.problemsInSequence];
		   }
		   
		   
		   $scope.goal = $scope.mastery.goal;
		   console.log("coach name : " + $scope.mastery.coach);
		   $scope.getCoaches($scope.currentCoach);
		   console.log("EXECUTING METHOD: $scope.getCoaches($scope.currentCoach); ");
		   })		
	}
	
// get all coaches data 	
	$scope.getCoaches = function(currentCoach){
	  console.log("EXECUTING METHOD : $scope.getCoaches = function(currentCoach){ ");
	  $resource('/jsonapi/coach').get({},function(response){
		  $scope.allCoachesData = response;
		  
		  for(var i =0; i < $scope.allCoachesData.coachesData.length ; i++){
			if($scope.allCoachesData.coachesData[i].name == currentCoach){
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
			audioplayer.play();
			$scope.words = $scope.audiotext.welcomeback;
			//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
			$scope.getGameID();
	  });	   			   
	}
	

	
	$scope.getGameID = function(){
	
	$timeout(function(){ 
	
		$scope.gameModel = $resource('/jsonapi/create_game_for_problems');
		var tempArrayProblemID =[];
		tempArrayProblemID.push($scope.problemsToDo[$scope.problemsInSequence]);		
		var data = {"problemIDs":$scope.problemsToDo};
	      var item = new $scope.gameModel(data);
          item.$save(function(response) { 
                  $scope.response = response;
				  $scope.gameDetails = $scope.response;	
							//Execute Game
				$scope.counter = 0;
				$scope.create_practice_game($scope.gameDetails);							
 		 
          });	
		  
		
	}, 9000);			  
		  
		  
	}	
	$scope.getGameID_wo_delay = function(){
		$scope.gameModel = $resource('/jsonapi/create_game_for_problems');
		var tempArrayProblemID =[];
		tempArrayProblemID.push($scope.problemsToDo[$scope.problemsInSequence]);
		var data = {"problemIDs":tempArrayProblemID};
		//var data = {"problemIDs":$scope.problemsToDo};
	      var item = new $scope.gameModel(data);
          item.$save(function(response) { 
                  $scope.response = response;
				  $scope.gameDetails = $scope.response;	
				  console.log("CREATING NEW GAME _ WO_ DELAY ");
							//Execute Game
								$scope.create_practice_game($scope.gameDetails);		 		 
          });	
	}	
	
	
  // yousof version with gameId given
  $scope.create_practice_game = function(game){
  
  
		//$scope.GameModel = $resource('/jsonapi/game/:gameID');
         console.log("CALLED METHOD   $scope.create_practice_game = function(game) ");
        $scope.game = game;
		$scope.current_problem_index =0;
		
		for(var i = 0; i<$scope.game.problems.problems.length-0; i++){
				$scope.solution1 = "loading...";
			if($scope.game.problems.problems[i].id == $scope.nextProblemID){
				$scope.current_problem_index = i;
				console.log("comparing" + $scope.game.problems.problems[i].id + " with " + $scope.nextProblemID);
				//$scope.solutionToProblem = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
				$scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
				$scope.solutionExamples = $scope.game.problems.problems[$scope.current_problem_index].examples;
				$scope.descriptionToProblem = $scope.game.problems.problems[$scope.current_problem_index].description;
				$scope.nameToProblem = $scope.game.problems.problems[$scope.current_problem_index].name;
				$scope.problems = $scope.game.problems.problems;
        		$scope.codeType=$scope.problems[$scope.current_problem_index].interface.codeHighlightKey;
				
				//$scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
				console.log("CURRENT PROBLEM INDEX IS " + i );
				console.log("skeleton is ->" + $scope.game.problems.problems[$scope.current_problem_index].skeleton);
				break;
			}
		
		}

		if($scope.mastery.next_ten[$scope.current_problem_index].percentile_time < $scope.mastery.next_ten[$scope.current_problem_index].percentile_attempts){
			$scope.audio = $scope.audiofile.faster;
			$scope.words = $scope.audiotext.faster;
			$scope.coachImage =$scope.pictures.faster;
			console.log("selecting goal type faster");
		}
		else{
			$scope.audio = $scope.audiofile.lessattempts;
			$scope.words = $scope.audiotext.lessattempts;
			$scope.coachImage =$scope.pictures.lessattempts;	
			console.log("selecting goal type lessattempts ");
		}
		//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
			 	
			$scope.runButton = true;
			$scope.skipButton = true;				

		
		/*$timeout(function(){
			$scope.solution1 = $scope.solutionToProblem;
			$scope.runButton = true;
			$scope.skipButton = true;
		},10000);
		*/
    };
	
	/*$scope.getGameID = function(){
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
					audioplayer.play()	;	
							//Execute Game
							$timeout(function(){ 
								$scope.create_practice_game($scope.gameID);
								$scope.runButton = true;
							}, 8000);	 	
				}, 10000); 
          });	
	}	  
	*/
	$scope.nextQuestion = function(){
		//$route.reload();
		$scope.counter = 0;
		console.log("next question");
		$scope.problemsInSequence = $scope.problemsInSequence + 1;
		console.log($scope.problemsInSequence + ": ProblemInSequence");
		console.log($scope.nextProblemID + "current problem Id"); 
		
		$scope.audio = $scope.audiofile.dontgiveup;
		var audioplayer = document.getElementsByTagName('audio')[0];
		$scope.words = $scope.audiotext.dontgiveup;		
		
		$scope.solution1 ="Loading new problem ...";
		$scope.nameToProblem ="...";
		$scope.descriptionToProblem ="Are you ready for the next problem ?";
		
		
		//remove sample solution
		$scope.solutionExamples= "";
		//remove sample test result
		$scope.solution_check_result = ""; 
		//stop timer from asking "are you there ";
		$scope.stop(); 		
		
		
		
		if($scope.problemsInSequence < $scope.problemsToDo.length){
		
			$scope.nextProblemID = $scope.problemsToDo[$scope.problemsInSequence];
			console.log($scope.nextProblemID + "newly changed problem Id ");
			//$scope.create_practice_game($scope.gameDetails);
			$scope.getGameID_wo_delay();
			$scope.showNewQuestion = false;
			$scope.runButton = false;
			$scope.skipButton = false;
		}
		else{
			$route.reload();
		}
	}

	
	
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
		if($scope.counter > 50 ){
			$scope.counter = 0;
			
			if( $scope.areyouthereWarnings <3){
				$scope.audio = $scope.audiofile.areyouthere;
				$scope.areyouthereWarnings = $scope.areyouthereWarnings +1;
				var audioplayer = document.getElementsByTagName('audio')[0];
				audioplayer.play();
				$scope.words = $scope.audiotext.areyouthere;
				$scope.coachImage =$scope.pictures.areyouthere;
			}
			$scope.counter = 0;
		}
		
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }
		
	
	
    //alert($scope.qid);
  /*  $scope.create_practice_game = function(problemSetID,numProblems){
	//level = problemsetID, 5, levelnumber = path number
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');
	  console.log("CALLED METHOD   $scope.create_practice_game = function(problemSetID,numProblems) ");
      
      $scope.CreateGameModel.get({"problemsetID":problemSetID,"numProblems":numProblems}, function(response){
        $scope.game = response;
       // $scope.update_remaining_problems();
		});
    };
*/
	
	

  
/*  // yousof version with gameId given
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
*/	
    
    $scope.fetch = function(gameID){
		$scope.GameModel = $resource('/jsonapi/game/:gameID');
      
		$scope.GameModel.get({"gameID":gameID}, function(response){
        $scope.game = response;
      //  $scope.update_remaining_problems();
		});
    };

    $scope.fill_iframe = function() { 
      console.log("filling solution iFrame");
      var iFrame = angular.element( document.querySelector( '#anIframe' ) );
      iFrame.attr("src","/jsonapi/lastsolution.html");
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

    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
	  //$scope.game.gameID
		$scope.counter = 0; //reset timer

		  $scope.SaveResource = $resource('/jsonapi/verify_for_game');
		  //alert($scope.game.gameID);
		  $scope.theData = {user_code:$scope.solution1,
							problem_id:$scope.nextProblemID,
							game_id:$scope.game.gameID};
	
		  var item = new $scope.SaveResource($scope.theData);
		  item.$save(function(response) { 
			  $scope.solution_check_result = response;

			  if($scope.codeType == 'html'){
              	$scope.fill_iframe();
              	$scope.fill_test_iframe();
              }
			  if($scope.solution_check_result.last_solved){//check if last question was solved correctly
					//CORRECT
						$scope.audio = $scope.audiofile.correctanswer;
						var audioplayer = document.getElementsByTagName('audio')[0];
						$scope.words = $scope.audiotext.correctanswer;
						//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
						audioplayer.play();
						$scope.runButton = false;
						$scope.skipButton = false;
						
		  if ($scope.codeType != 'html'){

		  $('#t21').removeClass('active');
		  $('#t11').addClass('active');
		  $('#ta21').removeClass('active');
		  $('#ta11').addClass('active');
	      }else{

		  $('#t211').removeClass('active');
		  $('#t311').removeClass('active');
		  $('#t111').addClass('active');
		  $('#ta211').removeClass('active');
		  $('#ta311').removeClass('active');
		  $('#ta111').addClass('active');
	      }




						
						


						$timeout(function(){
							$scope.audio = $scope.audiofile.tryother;
							var audioplayer = document.getElementsByTagName('audio')[0];
							$scope.words = $scope.audiotext.tryother;		
							$scope.coachImage =$scope.pictures.tryother;
							audioplayer.play();
							
							$scope.solution1 ="Waiting for your response...";
							$scope.nameToProblem ="...";
							$scope.descriptionToProblem ="Are you ready for the next problem ?";
							
							
							//remove sample solution
							$scope.solutionExamples = "";
							//remove sample test result
							$scope.solution_check_result = ""; 
							//stop timer from asking "are you there ";
							$scope.stop(); 
							
							
								$timeout(function(){
									/*if($scope.showUserNewProblem == false){
											$scope.showNextQuestion = true;
										}
									else{
											$scope.showNewQuestion = true;
										}
								   */ $scope.showNewQuestion = true;
									
								}, 2000);
						}, 7000);
						
						
			  }
			  else {
					//WRONG
					$scope.audio = $scope.audiofile.dontgiveup;
					var audioplayer = document.getElementsByTagName('audio')[0];
					$scope.words = $scope.audiotext.dontgiveup;
					//$scope.image = "img\\mbcoach\\"+$scope.nameOfCoach+"\\"+Math.floor((Math.random()*5)+1)+".jpg";
					$timeout(function(){
						audioplayer.play();
						$scope.coachImage =$scope.pictures.dontgiveup;
					}, 1000);
			  }
			  
			  
			  
			  
			});

		  


    };

    $scope.render_html = function(){
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.nextProblemID,
                        game_id:$scope.game.gameID};
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            $scope.fill_iframe();
            //If solved, update the game.
            
      });

    };

    $scope.run_e2e_tests = function(){
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.nextProblemID,
                        game_id:$scope.game.gameID};
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
            $scope.solution_check_result = response;
            $scope.fill_test_iframe();
            //If solved, update the game.
            
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

}