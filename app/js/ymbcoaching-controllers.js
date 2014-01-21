'use strict';

function yMBCoachingController($scope,$resource,$cookieStore,$location,$filter){
	//check if the user had select a mentor before.
	

	$scope.getCurrentMastery = function(){

          $resource('/jsonapi/MasteryBased/CURRENT').get({},function(response){
			  $scope.mastery = response;
			   console.log($scope.mastery.currentUserMastery[0]);
			   
			if($scope.mastery.currentUserMastery[0].coach == null ){
				console.log("remain on page");
			}
			else{
				console.log("will forward to cache page");
				$scope.mastercache = "true";
				$scope.masterselect ="false";
			}
			   });	   		


			   
    } 
			//$scope.getCurrentMastery();
	
	$scope.reset=function(){
				$scope.mastercache = "false";
				$scope.masterselect ="true";
	}
	
	
	$scope.getCoaches = function(){

	  $resource('/jsonapi/MasteryBased/COACHES').get({},function(response){
		  $scope.allCoachesData = response;
		   console.log($scope.allCoachesData.coachesData[0].coach);
		   });	   			   
	}
	
	
	
	
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
    $scope.resumePracticeGame=function(pathid,pathname,num,coach){
		$scope.path_progress = null;
		$cookieStore.put("pid", pathid);
		$cookieStore.put("coach",coach);
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
					
							var data = 	{"pathId":pathid,
										"pathName":pathname,
										"coach":coach
										}
						  
							$http.post('/jsonapi/MasteryBased/UPDATE', data)
							.success(function (data, status, headers, config) {
								window.console.log(data);
								

							}).error(function (data, status, headers, config) {
								$scope.status = status;
							})
					
					
					
					$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder);
					console.log($scope.path_progress.details[i].id);D;D
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
	
	$scope.continuePath = function(num,coach){
	
		$scope.path_progress = null;
		$cookieStore.put("pid", pathid);
		$cookieStore.put("coach",coach);
        $scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');
	
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
			
			if($scope.difficulty == "Drag-n-Drop"){
				window.location.href = "practice_play_page.html";
			}
			else{
				//Hi RJ. Here is the change that I made to help simplify things.
				//The goal is to simplify every game play page to just use one controller. 
				//window.location.href = "ymbcoaching-play";
				$location.path('ymbcoaching-play')
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
	


function ProblemsetController($scope,$resource){
    //$scope.pathID = null;
    $scope.problemsets = null;
    
    $scope.ProblemsetModel = $resource('/jsonapi/problemsets/:pathID');
    
    $scope.get_problemsets = function(pathID){
        $scope.problemsets = $scope.ProblemsetModel.get({"pathID":pathID});
    };
}



}