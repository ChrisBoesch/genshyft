'use strict';

function MBCoachingController($scope,$resource,$cookieStore,$location,$filter){
	
	//Assuming this is what you wanted by calling list in ng-init
    $scope.fetch_game_paths = function(){
		$scope.game_paths = $resource('/jsonapi/get_game_paths').get();		
    };
	
	$scope.resumeHabitChallengeGame = function(chPathID,numPerGame){
		$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

	    //Including details=1 returns the nested problemset progress.
	    $scope.PathModel.get({"pathID":chPathID}, function(response){
		    $scope.path_progress = response;
			$scope.resumePracticeGame(response.path.id,response.path.name,numPerGame);
		});
	};
	
	$scope.resumeBadgeChallengeGame = function(badgeID,numPerGame,difficulty){
		$scope.badgeModel = $resource('/jsonapi/all_badges');

	    //Including details=1 returns the nested problemset progress.
	    $scope.badgeModel.get({}, function(response){
		    $scope.allBadges = response.badges;
			for(var i=0; i<$scope.allBadges.length; i++){
				if($scope.allBadges[i].id==badgeID){
					$scope.chpathid = $scope.allBadges[i].path_id;
					$scope.levelid = $scope.allBadges[i].problemset_id;
					$scope.levelNumber = $scope.allBadges[i].awardOrder;
					//alert($scope.chpathid+" "+$scope.levelid+" "+$scope.levelNumber);
					break;
				}
			}
			
			$scope.PathPModel = $resource('/jsonapi/get_path_progress/:pathID');

			//Including details=1 returns the nested problemset progress.
			$scope.PathPModel.get({"pathID":$scope.chpathid,"details":1}, function(response1){
				$scope.path_progress = response1;
				//console.log($scope.path_progress.details);
				for (var i=0;i<$scope.path_progress.details.length;i++)
				{ 
					if($scope.path_progress.details[i].problemsInProblemset>$scope.path_progress.details[i].currentPlayerProgress){
						$scope.nextLvlNum = $scope.path_progress.details[i].pathorder;
						break;
					}
					else if(i==($scope.path_progress.details.length-1)){
						$scope.nextLvlNum = i+1;
						break;
					}
				}
				if($scope.levelNumber<=$scope.nextLvlNum)
				{
					$cookieStore.put("name", $scope.levelid);
					$cookieStore.put("num", numPerGame);
					$cookieStore.put("type", "practiceGame");
					$cookieStore.put("level", $scope.levelNumber);		
					$cookieStore.put("gameDifficulty", difficulty);			
					$cookieStore.put("nameOfPath", $scope.path_progress.path.name);
					$cookieStore.put("path_IDD", $scope.path_progress.path.id);					
					if(difficulty == "Drag-n-Drop"){
						window.location.href = "practice_play_page.html";
					}
					else{
						window.location.href = "normal_play_page.html";
					}
				}
				else{
					alert("Please go to practice game and clear previous level before take this challenge!");
				}
			});
		});
	};
	
    $scope.list = function(){
    	$scope.paths_unfiltered = $resource('/jsonapi/get_game_paths').get();
		$scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
		$scope.abc = $cookieStore.get("pid");
		$scope.lvlName = 1;
		$scope.player_progress = "";
		$scope.difficulty = "";
		$scope.path_ID = "";
		$scope.path_name = "a Language";
		$scope.practice_path_name = "";
		$scope.currentURL = location.href;
		
		setTimeout(function () {
			$scope.paths = $scope.paths_unfiltered;
			$scope.paths_grouped = $filter('groupBy')($scope.paths.paths, 3);
			$scope.mobile_paths_grouped = $filter('groupBy')($scope.mobile_paths, 3);
			$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

		    //Including details=1 returns the nested problemset progress.
		    $scope.PathModel.get({"pathID":$scope.abc,"details":1}, function(response){
		        $scope.path_progress = response;
		    });
		    $('#largeSelectPlay').click();
		}, 1500);
    };

	//Try to only fetch what you need in the init of the controller.
	if(location.href.indexOf("difficulty") > -1){
		$scope.passed_in_difficulty = location.hash.split('difficulty=')[1].split("&")[0];
	}

	if(location.href.indexOf("path_ID") > -1 && location.href.indexOf("path_ID=undefined") == -1){
		var passed_in_path_ID = location.hash.split('path_ID=')[1].split("&")[0];
		setTimeout(function () {
			$scope.path_filtered = $filter('filter')($scope.paths_unfiltered.paths,passed_in_path_ID);
			if($scope.path_filtered[0]){
				$scope.path_name = $scope.path_filtered[0].name;
			}else{
				$scope.mobile_path_filtered = $filter('filter')($scope.mobile_paths,passed_in_path_ID);
				$scope.path_name = $scope.mobile_path_filtered[0].name;
			}
			$('#largeSelectPlay').click();
		}, 2000);
	}

	// this method add background color to the selected images 
	$scope.practiceSelection=function(){
		$('#myCarousel input:image').click(function() {
		  $('#myCarousel input:image').removeClass('selected');   
		  $(this).addClass('selected');
		});
	}

	$scope.practiceBeginnerSelection=function(){
		$('#myCarouselB input:image').click(function() {
		  $('#myCarouselB input:image').removeClass('selected');   
		  $(this).addClass('selected');
		});
	}

	$scope.practiceBeginnerSelectionSmall=function(){
		$('#myCarouselSmallB input:image').click(function() {
		  $('#myCarouselSmallB input:image').removeClass('selected');   
		  $(this).addClass('selected');
		});
	}

	$scope.practiceSelectionSmall=function(){
		$('#myCarouselSmall input:image').click(function() {
		  $('#myCarouselSmall input:image').removeClass('selected');   
		  $(this).addClass('selected');   
		});
	}

	//rank
	$scope.pathSelectRank=function(checker){
		$('#myCarouselRank input:image').click(function() {
		  $('#myCarouselRank input:image').removeClass('selected'); 
		  $(this).addClass('selected'); 
		});
		if(checker == 2){
		  setTimeout(function () {
		    $('#myCarouselRank input:image').eq(2).click();
		  }, 2000);	
		}
	}

	$scope.pathSelectRankSmall=function(checker){
		$('#myCarouselRankSmall input:image').click(function() {
		  $('#myCarouselRankSmall input:image').removeClass('selected'); 
		  $(this).addClass('selected');
		});
		if(checker == 2){
		  setTimeout(function () {
		    $('#myCarouselRankSmall input:image').eq(2).click();
		  }, 2000);	
		}
	}
  
	$scope.setDefaultButton=function(name,problemID){

		$scope.lvlName = name;
			
		$scope.lvlModel = $resource('/jsonapi/problems/:problemID');

		//Including details=1 returns the nested problemset progress.
		$scope.lvlModel.get({"problemID":problemID,"details":1}, function(response){
			$scope.problems = response;
		});	
	};
	
	//assign the level number to the buttons
	$scope.setButton=function(name,problemID){
	
		$scope.lvlName = name;
		
		$('#myTab a:last').tab('show');
			
		$scope.lvlModel = $resource('/jsonapi/problems/:problemID');

		//Including details=1 returns the nested problemset progress.
		$scope.lvlModel.get({"problemID":problemID,"details":1}, function(response){
			$scope.problems = response;
		});	
	};
	
	$scope.setButton1=function(name,problemID){
	
		$scope.lvlName = name;
		
		$('#myTab1 a:last').tab('show');
			
		$scope.lvlModel = $resource('/jsonapi/problems/:problemID');

		//Including details=1 returns the nested problemset progress.
		$scope.lvlModel.get({"problemID":problemID,"details":1}, function(response){
			$scope.problems = response;
		});	
	};
	
	
	//resume game from profile page
    $scope.resumePracticeGame=function(pathid,pathname,num){
		$scope.path_progress = null;
		$cookieStore.put("pid", pathid);
        $scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

        //Including details=1 returns the nested problemset progress.
        $scope.PathModel.get({"pathID":pathid,"details":1}, function(response){
            $scope.path_progress = response;
			if(pathname.substring(0,9).trim()=="Beginner"){
				$scope.difficulty = "Drag-n-Drop";
			}
			else{
				$scope.difficulty = "Easy";
			}
			for (var i=0;i<$scope.path_progress.details.length;i++)
			{ 
				if($scope.path_progress.details[i].problemsInProblemset>$scope.path_progress.details[i].currentPlayerProgress){
					console.log("level "+$scope.path_progress.details[i].pathorder);
					$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder);
					break;
				}
			}
        });

	};
	
	$scope.changePath = function (pathid){
		$scope.path_ID = pathid;
		console.log("The path id is "+pathid);
		//Set the current path. 
		$scope.update_path_progress(pathid);
		if(pathid != "" && $scope.difficulty != ""){
			//$location.search({path_ID: pathid, difficulty: $scope.difficulty});
		}
		$scope.practice_path_name = "Updating";
		
		$scope.pathModel = $resource('/jsonapi/get_path_progress/:path_ID');
		$scope.pathModel.get({"path_ID":pathid}, function(response){
	    	$scope.practice_path_name = response.path.name;
	    });
	};
	
	//change the difficulty level as well as the path level detail table
	$scope.changeDifficulty = function(difficulty,pathName,coach){
		if(difficulty == "Drag-n-Drop" && pathName.indexOf("Beginner") == -1){
			$scope.path_ID = undefined;
			$scope.practice_path_name = undefined;
			$('#myCarousel input:image').removeClass('selected');
			$('#myCarouselSmall input:image').removeClass('selected');
		}
		if(difficulty != "Drag-n-Drop" && pathName.indexOf("Beginner") > -1){
			$('#myCarouselB input:image').removeClass('selected');
			$('#myCarouselSmallB input:image').removeClass('selected');
			$scope.path_ID = undefined;
			$scope.practice_path_name = undefined;
		}
		$scope.difficulty = difficulty;
		$scope.coach = coach;
		if(difficulty != "" && $scope.path_ID != ""){
			//$location.search({path_ID: $scope.path_ID, difficulty: difficulty});
		}
	};
	
	$scope.continuePath = function(num){
		for (var i=0;i<$scope.path_progress.details.length;i++)
		{ 
			if($scope.path_progress.details[i].problemsInProblemset>$scope.path_progress.details[i].currentPlayerProgress){
				console.log("level "+$scope.path_progress.details[i].pathorder);
				$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder);
				break;
			}
		}
	};
	
	$scope.create_prac = function(level,numProblems,lvlnum){
		for (var i=0;i<$scope.path_progress.details.length;i++)
		{ 
			if($scope.path_progress.details[i].problemsInProblemset>$scope.path_progress.details[i].currentPlayerProgress){
				$scope.nextLvlNum = $scope.path_progress.details[i].pathorder;
				break;
			}
			else if(i==($scope.path_progress.details.length-1)){
				$scope.nextLvlNum = i+1;
				break;
			}
		}
		
		if(lvlnum<=$scope.nextLvlNum)
		{
			$cookieStore.put("name", level);
			$cookieStore.put("num", numProblems);
			$cookieStore.put("type", "practiceGame");
			$cookieStore.put("level", lvlnum);		
			$cookieStore.put("gameDifficulty", $scope.difficulty);			
			$cookieStore.put("nameOfPath", $scope.path_progress.path.name);
			$cookieStore.put("path_IDD", $scope.path_progress.path.id);
			$cookieStore.put("coach",$scope.coach);
			if($scope.difficulty == "Drag-n-Drop"){
				window.location.href = "practice_play_page.html";
			}
			else{
				//Hi RJ. Here is the change that I made to help simplify things.
				//The goal is to simplify every game play page to just use one controller. 
				//window.location.href = "mbcoaching-play.html";
				$location.path('mbcoaching-play')
				//window.location.href = "normal_play_page.html";
			}
		}
		else{
			alert("Please unlock previous level first!");
		}
	};
	
	$scope.hideModal = function(){
		$('#levelBlock').modal('hide');
	};
			
    $scope.get_player_progress = function(){
    	setTimeout(function () {			
			$scope.player_progress = $resource('/jsonapi/get_player_progress').get();
		}, 500);
    };
    //$scope.get_player_progress();

    $scope.update_path_details = function(){
        $scope.player_paths = $resource('/jsonapi/get_my_paths').get();
        $scope.current_paths = $resource('/jsonapi/get_current_paths').get();
        $scope.other_paths = $resource('/jsonapi/get_other_paths').get();
        $scope.get_mobile_paths();
    };

    $scope.get_mobile_paths = function(){
        $scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
		setTimeout(function () {			
			$scope.mobile_paths_grouped = $filter('groupBy')($scope.mobile_paths, 3);
		}, 500);
    };
    
	//update path progress for 14 inch window size
    $scope.update_path_progress = function(pathID){
        $scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

        //Including details=1 returns the nested problemset progress.
        $scope.PathModel.get({"pathID":pathID,"details":1}, function(response){
            $scope.path_progress = response;
        });
		//$('#myTab a:first').tab('show');
        ///jsonapi/get_path_progress/200030, 2462233, 6920762
    }; 
	//update path progress for small window size
    $scope.update_path_progress1 = function(pathID){
        $scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

        //Including details=1 returns the nested problemset progress.
        $scope.PathModel.get({"pathID":pathID,"details":1}, function(response){
            $scope.path_progress = response;
        });
		//$('#myTab1 a:first').tab('show');
        ///jsonapi/get_path_progress/200030, 2462233, 6920762
    }; 

    //This may not be needed every time the controller loads. 
    //Try using inite
	
}

function ProblemsetController($scope,$resource){
    //$scope.pathID = null;
    $scope.problemsets = null;
    
    $scope.ProblemsetModel = $resource('/jsonapi/problemsets/:pathID');
    
    $scope.get_problemsets = function(pathID){
        $scope.problemsets = $scope.ProblemsetModel.get({"pathID":pathID});
    };
}

function MBCoachingPlayController($scope,$resource,$cookieStore){
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
    $scope.permutation = "12345"; 
    
    if($cookieStore.get("name")){
      $scope.LevelID = $cookieStore.get("name"); //retrieve level id from practice page
    }
    if($cookieStore.get("num")){
      $scope.numProblems = $cookieStore.get("num"); //retrieve the number of problems per game from practice page
    }
    if($cookieStore.get("type")){
      $scope.gameType = $cookieStore.get("type"); //retrieve game type
    }
    if($cookieStore.get("level")){
      $scope.levelNumber = $cookieStore.get("level"); //retrieve the level number
    }
    if($cookieStore.get("gameDifficulty")){
      $scope.gameDifficulty = $cookieStore.get("gameDifficulty"); //retrieve the game difficulty
    }
    if($cookieStore.get("nameOfPath")){
      $scope.nameOfPath = $cookieStore.get("nameOfPath"); //retrieve name of the path
    }
    if($cookieStore.get("path_IDD")){
      $scope.path_IDD = $cookieStore.get("path_IDD"); //retrieve name of the path
    }	
    if($cookieStore.get("coach")){
      $scope.nameOfSelectedCoach = $cookieStore.get("coach"); //retrieve name of the coach
    }	
    
    if($cookieStore.get("coach")==="Shannon"){
    	$scope.coachPicture='img/mbcoach/dummy_woman.jpg';
    }
    if($cookieStore.get("coach")==="Sandra"){
    	$scope.coachPicture='img/mbcoach/dummy_woman_2.jpg';
    }
    if($cookieStore.get("coach")==="Zandar"){
    	$scope.coachPicture='img/mbcoach/dummy_man.jpg';
    }
    if($cookieStore.get("coach")==="Sgt Major"){
    	$scope.coachPicture='img/mbcoach/dummy_man_2.jpg';
    }
    
   
	
	$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');
		$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
		$scope.problems_progress = response;
		$scope.current_level_progress = $scope.problems_progress.currentPlayerProgress;
		$scope.total_level_progress = $scope.problems_progress.problemsInProblemset;
	});

		
    $scope.create_practice_game = function(){
    	$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

		$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
			$scope.problems_progress = response;
		});
    }
	
    //alert($scope.qid);
    $scope.create_practice_game = function(LevelID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');
      
      $scope.CreateGameModel.get({"problemsetID":LevelID,"numProblems":numProblems}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
		});
    };


    $scope.create_resolve_problemset_game = function(problemsetID){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/resolve');
      
      $scope.CreateGameModel.get({"problemsetID":problemsetID}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
		});
    };         
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
			$scope.create_practice_game($scope.LevelID,$scope.numProblems);
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
        editor.getSession().removeListener('change', callback);
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
    }


    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID
      $('#t11').removeClass('active');
      $('#t21').addClass('active');
      $('#ta11').removeClass('active');
      $('#ta21').addClass('active');
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};
      
      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) { 
              $scope.solution_check_result = response;
              if($scope.solution_check_result.last_solved){
				$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

				$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
					$scope.problems_progress = response;
					$scope.current_level_progress = $scope.problems_progress.currentPlayerProgress;
					$scope.total_level_progress = $scope.problems_progress.problemsInProblemset;
					if($scope.problems_progress.problemsInProblemset<=$scope.problems_progress.currentPlayerProgress){
						alert("Congrats! You have successfully complete this level!");
					window.location.href="index.html#/practice";
					}
				});
                //If you hardcode to the game, this will automatically advance the game to the next problem. 
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
	
$scope.create_practice_game($scope.LevelID,$scope.numProblems);
	
	//to retrieve path info to display on path play page
/* 		$scope.$watch('game.problems.problems[current_problem_index].name', function() {
        var path_id = $scope.path_IDD;
		$scope.retrieved_path = $resource('/jsonapi/get_path_progress/:path_id?details=1');
        //Including details=1 returns the nested problemset progress.
        $scope.retrieved_path.get({"path_id":path_id}, function(response){
        	$scope.single_path_info = response;

        	$scope.p_S_order = $scope.single_path_info.currentProblemsetID;


        	for( var i=0; i<$scope.single_path_info.details.length;i++){
        		if($scope.single_path_info.details[i].id == $scope.p_S_order){
        			$scope.current_level_progress = $scope.single_path_info.details[i].currentPlayerProgress;
        			$scope.total_level_progress = $scope.single_path_info.details[i].problemsInProblemset;
        		}

        	}
        });
 	},true); */

}




