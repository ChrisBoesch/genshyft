/*INSTRUCTIONS ON REMOVING THE DEFAULT CLICKS*/
//Search for keyword "click()" in the editor
//Comment out the setTimeOut fuction where the click resides in, in case the setTimeOut function comes with an "if" block, comment out the if blocks as well
//Find relevant methods in the partial page and delete the function calls in ng-inits

'use strict';

/* Controllers */
//The index controller is mainly used for logging all clicks.
//Logging to Google Analytics and SingPath
function IndexController($scope,$resource,$location,$window){

    $scope.location = $location;
    /*
    $scope.log_to_google_analytics = function($event){
        //Log event to Google Analytics
        //This will log from 127.0.0.1 but not local host.
        //$window._gaq.push(['_trackPageview', $event.target.name]);
        //This is how you log to the SingPath backend.

    };
    */
    $scope.log_event = function($event){
        var result = $location.absUrl().split("/");
        var page = result[result.length-1];
        if($event.target.name){
          page = page + "_" + $event.target.name;
        }
        $scope.Log = $resource('/jsonapi/log_event');
        var item = new $scope.Log({"page": page,
                                   "event":$event.target.name});
        $scope.item = item.$save();
    };

}

function Ctrl($scope) {
  $scope.color = 'blue';
}

function PlayerController($scope,$resource,$location,$cookieStore,$http,currentUserService){
    var resetSearch = function() {
        $location.search('storyID', null);
        $location.search('difficulty', null);
        $location.search('path_ID', null);
    };

	$scope.list=function(){
        $scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
        $scope.player = $resource('/jsonapi/player').get();
        $scope.tags = $resource('/jsonapi/tags').get();
        $scope.$watch('player', function() {
            $scope.current_country = $scope.player.country;
            currentUserService.setUser($scope.player);
            $cookieStore.put("playerID", $scope.player.player_id);
        }, true);
	};

	$scope.addTag = function(addedTag){
		$scope.taglist = addedTag.split(",");
		for(var i=0;i<$scope.taglist.length;i++){
			if($scope.player.tags.indexOf($scope.taglist[i]) > -1){
				alert("Duplicate tag is not allowed!");
			}
			else{
				$scope.player.tags.push($scope.taglist[i]);
			}
		}
		$scope.taglist=[];
    };

    $scope.firstLoad=function(paid){
        if($scope.player.nickname){
            resetSearch();
            $cookieStore.put("pid", paid);
            $location.path("practice");
        } else {
            alert("Please login with FaceBook or Google Account first!");
        }
    };

    $scope.login = function() {};

    var checkLogin = function(path) {
        if($scope.player.nickname){
            $location.path(path);
        }
        else{
            alert("Please login with FaceBook or Google Account first!");
        }
    };

    var checkLoginResetSearch = function (path) {
        if($scope.player.nickname){
            resetSearch();
            $location.path(path);
        } else {
            alert("Please login with FaceBook or Google Account first!");
        }
    };

    $scope.checkQuestLogin = checkLoginResetSearch.bind($scope, 'quests');
    $scope.checkStoryLogin = checkLoginResetSearch.bind($scope, 'story');
    $scope.checkChallengesLogin = checkLoginResetSearch.bind($scope, 'challenges');
    $scope.checkRankingLogin = checkLoginResetSearch.bind($scope, 'ranking');
    $scope.checkFeedbackLogin = checkLoginResetSearch.bind($scope, 'feedback');
    $scope.checkProfileLogin = checkLoginResetSearch.bind($scope, 'profile');

//GENShYFT Codes
    $scope.toVideos = function(){
        $location.path("videos");
    };

    $scope.checkPracticeLogin = checkLogin.bind($scope, 'practice');
    $scope.checkCreatePathorLevelLogin = checkLogin.bind($scope, 'editproblem');
	$scope.checkSchoolRegistrationLogin = checkLogin.bind($scope, 'schoolregistration');
    $scope.checkMasteryLogin = checkLogin.bind($scope, 'ymbcoaching');
    $scope.checkPurposeDrivenLogin = checkLogin.bind($scope, 'purposedriven');
    $scope.checkTournamentLogin = checkLogin.bind($scope, 'tournaments');
    $scope.checkCreateTournamentLogin = checkLogin.bind($scope, 'mytournaments');
    $scope.checkEventsLogin = checkLogin.bind($scope, 'events');
    $scope.checkCreateEventsLogin = checkLogin.bind($scope, 'eventsManage');
    $scope.checkSchoolsMapLogin = checkLogin.bind($scope, 'schoolsmap');

	// End GENShYFT Code



    $scope.update_player_profile = function($event){

    	if($scope.player.nickname.length>20){
    		alert("Name no more than 20 characters.");
    		window.location.reload('profile')
    	}else{
	        var data = {"nickname":$scope.player.nickname,
	                    "professional":$scope.player.professional,
	                    "about":$scope.player.about,
						"location":$scope.player.location,
						"tags":$scope.player.tags,
	                    "gender":$scope.player.gender};

	        $http.post("/jsonapi/update_player_profile", data)
	            .success(function (data, status, headers, config) {
	                window.console.log(data);
	                $scope.player = data;

	            }).error(function (data, status, headers, config) {
	                $scope.status = status;
	            });

	        //$route.reload('profile');
	        window.location.reload('profile')
   	 	}
    };

    $scope.log_event = function($event){

        var result = $location.absUrl().split("/");
        var page = result[result.length-1];
        if($event.target.innerText){
          page = page + "_" + $event.target.innerText;
        }
        $scope.Log = $resource('/jsonapi/log_event');
        var item = new $scope.Log({"page": page});
        $scope.item = item.$save();
    };

    $scope.dismissModal = function(){
      $('#loginAlert').modal('hide')
    };

    $scope.show_panel = function(){
      $('#edit_profile').modal('show')
    };

    $scope.logout=function(){
        $resource('/sign_out').get({}, function(response){
            $scope.logoutresponse = response;
            $scope.player = $resource('/jsonapi/player').get();
            //{"error": "No player logged in"}
            if ($scope.player.error){
              $scope.abc = 'true';
              $scope.def = 'false';
            }
            window.location.href = "index.html";
        });
    };
}

function AceController($scope){
	$scope.modes=['javascript', 'XML', 'java'];
	$scope.mode=$scope.modes[0];
	$scope.solution1 = 'abc';

	$scope.aceOption = {
		mode: 'html',

		onLoad: function (_ace){
			$scope.modeChanged = function(){
				_ace.getSession().setMode('ace/mode/' + $scope.mode.toLowerCase());
			};
		}
	};
}

function InterfaceController($scope,$resource){
    $scope.interfaces = $resource('/jsonapi/interfaces').get();
}

function PathController($scope,$resource,$cookieStore,$location,$filter,gameService,$q){
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
        $scope.abc = $cookieStore.get("pid");
        $scope.lvlName = 1;
        $scope.player_progress = "";
        $scope.difficulty = "";
        $scope.path_ID = "";
        $scope.path_name = "a Language";
        $scope.practice_path_name = "";
        $scope.currentURL = location.href;
        $scope.paths_unfiltered = null;
        $scope.mobile_paths = null;

        $q.all([
            gameService.getGamePaths(),
            gameService.getMobilePaths()
        ])
        .then(function (responseArray) {
            $scope.paths_unfiltered = responseArray[0];
            $scope.mobile_paths = responseArray[1];
            $scope.paths = $scope.paths_unfiltered;
            $scope.paths_grouped = $filter('groupBy')($scope.paths.paths, 3);
            $scope.mobile_paths_grouped = $filter('groupBy')($scope.mobile_paths, 3);
            $scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

            // Including details=1 returns the nested problemset progress.
            $scope.PathModel.get({"pathID":$scope.abc,"details":1}, function(response){
                $scope.path_progress = response;
            });

            // Todo: I don't really know what it was doing!
            // $('#largeSelectPlay').click();
        });
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
					$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder,false);
					break;
				}
			}
        });

	};

  $scope.get_beginner_path_id = function(pathid){
    //Need to lookup the mobile path at this point. 
    var beginner_path_id = null;
    for (var i=0; i<$scope.paths.paths.length;i++){
        //Check if hasMobile
        if ($scope.paths.paths[i].id==pathid){
          beginner_path_id = $scope.paths.paths[i].mobilePathID;
        }  
    }
    return beginner_path_id;
  };
  

	$scope.changePath = function (pathid){
		$scope.path_ID = pathid;
    $scope.beginner_path_ID = $scope.get_beginner_path_id(pathid);
    if($scope.difficulty== "Drag-n-Drop" && $scope.beginner_path_ID===null){
      alert("Selected path has no beginner problems. Change your difficulty to Easy to play this path.");
      return;
    }

    //need to change both the main path and the mobile path which will be used when difficulty == Drag-n-Drop
		console.log("The path id is "+pathid+ "diffculty "+$scope.difficulty+ " beginner path id "+$scope.beginner_path_ID);
		//Set the current path.
		$scope.practice_path_name = "Updating";
		$scope.pathModel = $resource('/jsonapi/get_path_progress/:path_ID');
        
    if ($scope.difficulty == "Drag-n-Drop"){
      $scope.pathModel.get({"path_ID":$scope.beginner_path_ID,"details":1}, function(response){
	    	$scope.practice_path_name = response.path.name;
        $scope.path_progress = response;
        console.log("Fetching for path_ID "+$scope.beginner_path_ID);
	    });
            
    } else {
		$scope.pathModel.get({"path_ID":pathid,"details":1}, function(response){
	    	$scope.practice_path_name = response.path.name;
        $scope.path_progress = response;
        console.log("Fetching for path_ID "+pathid);
	    });
    }
	};

	//change the difficulty level as well as the path level detail table
	$scope.changeDifficulty = function(difficulty,pathName){
    //Need to update path on difficulty changes. 
    
    console.log("difficulty changes here. pathID "+$scope.path_ID);
    if($scope.path_ID === ""){
        alert("Please select a path first.");
        return;
    }
    if(difficulty== "Drag-n-Drop" && $scope.beginner_path_ID===null){
      alert("Selected path has no beginner problems. Change your difficulty to Easy to play this path.");
      return;
    }

    if(difficulty == "Drag-n-Drop"){
       $scope.pathModel.get({"path_ID":$scope.beginner_path_ID,"details":1}, function(response){
	    	$scope.practice_path_name = response.path.name;
         $scope.path_progress = response;
        console.log("Fetching for path_ID "+$scope.beginner_path_ID);
	    });
		}
		if(difficulty != "Drag-n-Drop"){
			$scope.pathModel.get({"path_ID":$scope.path_ID,"details":1}, function(response){
	    	$scope.practice_path_name = response.path.name;
        $scope.path_progress = response;
        console.log("Fetching for path_ID "+$scope.path_ID);
	    });
		}
    $resource('/jsonapi/set_difficulty_setting').get({"difficulty":difficulty}, function(response){
      //update difficulty based on returned value from API setting. 
      $scope.difficulty = difficulty;
    });
	};

	$scope.continuePath = function(num){
		for (var i=0;i<$scope.path_progress.details.length;i++)
		{
			if($scope.path_progress.details[i].problemsInProblemset>$scope.path_progress.details[i].currentPlayerProgress){
				console.log("level "+$scope.path_progress.details[i].pathorder);
				$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder,false);
				break;
			}
		}
	};

  //This needs to be extended to support resolving of the level.
	$scope.create_prac = function(level,numProblems,lvlnum, re_solve){
    console.log("In create prac level "+ level + " numProblems " +numProblems + " Level " + lvlnum + " resolve "+re_solve);
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
      $cookieStore.put("re_solve", re_solve); 
			$cookieStore.put("num", numProblems);
			$cookieStore.put("type", "practiceGame");
			$cookieStore.put("level", lvlnum);
			$cookieStore.put("gameDifficulty", $scope.difficulty);
			$cookieStore.put("nameOfPath", $scope.path_progress.path.name);
			$cookieStore.put("path_IDD", $scope.path_progress.path.id);
			$cookieStore.put("practicePathName", $scope.practice_path_name);
			if($scope.difficulty == "Drag-n-Drop"){
				window.location.href = "practice_play_page.html";
			}
			else{
				//Hi RJ. Here is the change that I made to help simplify things.
				//The goal is to simplify every game play page to just use one controller.
				//window.location.href = "practice_game_play.html";
				//window.location.href = "normal_play_page.html";

				//Migration to partial by Glen GENShYFT
				$location.path("practice-game-play");

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
        //$scope.other_paths = $resource('/jsonapi/get_other_paths').get();
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

function ProblemController($scope,$resource,$http){
    $scope.problemsetID = null;
    $scope.problems = null;

    $scope.ProblemsetProgress = $resource('/jsonapi/get_problemset_progress/:problemsetID');
    $scope.ProblemModel = $resource('/jsonapi/problems/:problemsetID');


    $scope.get_progress = function(){
        $scope.progress = $scope.ProblemsetProgress.get({"problemsetID":$scope.problemsetID});
    };

    $scope.get_problems = function(){
        //Including ?details=1 will return if the problem has been solved.
        //$scope.problems = $scope.ProblemModel.get({"problemsetID":$scope.problemsetID});
        $scope.problems = $scope.ProblemModel.get({"problemsetID":$scope.problemsetID, "details":1});
    };
	$scope.get_problems_for_problemset = function(problemsetID){
        $scope.problems = $resource('/jsonapi/problems/'+problemsetID).get();
    };
    $scope.get_contributed_problems = function(){
        $scope.ContributedProblemsModel = $resource('/jsonapi/contributed_problems');

          $scope.ContributedProblemsModel.query({}, function(response){
            $scope.contributed_problems = response;
            //alert("There are "+$scope.contributed_problems.length+" contributed problems being under review.")
          });
    };
    $scope.verify_problem_solution = function() {
      //The API is expecting a form post so this method is used.
      var theURL = '/jsonapi/check_code_with_interface';

      var source = {interface_id:$scope.the_current_problem.problem.interface_id,
        source_code:$scope.the_current_problem.problem.solution,
        examples:$scope.the_current_problem.problem.examples,
        tests:$scope.the_current_problem.problem.tests
        };
      var xsrf = $.param(source);

      $http({
        method: 'POST',
        url: theURL,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: xsrf
      }).success(function (data, status, headers, config) {
          $scope.solution_check_result = data;
			    console.log(data);
			    console.log("You have successfully submitted your problem");
		   });

    };
    $scope.get_problem = function(problemID){
      $scope.the_current_problem = $resource('/jsonapi/get_problem?problem_id='+problemID).get()
    };
    $scope.save_problem = function() {
      //The API is expecting a form post so this method is used.
      //if no id, then create problem, else edit problem.
      var theURL = "/jsonapi/new_problem";
      if ($scope.the_current_problem.problem.problem_id){
          theURL = "/jsonapi/edit_problem";
      }

      var source = {problemset_id:$scope.the_current_problem.problem.problemset_id,
        path_id:$scope.the_current_problem.problem.path_id,
        interface_id:$scope.the_current_problem.problem.interface_id,
        problem_id:$scope.the_current_problem.problem.problem_id,
        level_id:$scope.the_current_problem.problem.problemset_id,
        name:$scope.the_current_problem.problem.name,
        details:$scope.the_current_problem.problem.description,
        solution_code:$scope.the_current_problem.problem.solution,
        skeleton_code:$scope.the_current_problem.problem.skeleton,
        examples:$scope.the_current_problem.problem.examples,
        publicTests:$scope.the_current_problem.problem.tests,
        privateTests:$scope.the_current_problem.problem.other_tests
        };

      var xsrf = $.param(source);

      $http({
        method: 'POST',
        url: theURL,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: xsrf
      }).success(function (data, status, headers, config) {
			    console.log(data);
			    console.log("You have successfully submitted your problem");
           $scope.result = data;
		   });

    };

}


function BadgeController($scope,$resource){
	$scope.loadAllBadges = function(){
		$scope.badgepathNames = [];
		$scope.badgepathIDs = [];
		$scope.playerBadges = [];
		$scope.badgesAndName = [];
		var badgename = "";
		$resource('/jsonapi/badges_for_current_player').get({},function(response){
			$scope.playerBadges = response.badges;

			for( var i=0; i<$scope.playerBadges.length; i++){
				if($scope.badgepathIDs.indexOf($scope.playerBadges[i].pathID) <= -1 && $scope.playerBadges[i].pathID != null){
					$scope.badgepathIDs.push($scope.playerBadges[i].pathID);
					$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

					//Including details=1 returns the nested problemset progress.
					$scope.PathModel.get({"pathID":$scope.playerBadges[i].pathID}, function(response1){
					var badge = {name: response1.path.name, id: response1.path.id};
					$scope.badgesAndName.push(badge);
					$scope.badgepathNames.push(response1.path.name);
					});
				}
			}
		});
	};

	$scope.list_paths= function(){
		$scope.pathModel = $resource('/jsonapi/get_game_paths');
		$scope.pathModel.get({}, function(response){
			$scope.ListAllPaths = response.paths;
		});
	};
}


//to the list of challenges EDITED by viTech
function ChallengeController($scope,$resource,$location,$cookieStore,$http,$route){

	$scope.loading = function(){

		$scope.defaultCountry = "";
		//variable for badge challenge
		$resource('/jsonapi/get_game_paths').get({},function(response){
			$scope.paths = response;
			$scope.theBadges = {};

			for( var i=0; i<$scope.paths.paths.length; i++){
				$scope.theBadges[$scope.paths.paths[i].id] = $scope.paths.paths[i].badges;

			}
		});
		$scope.mobilePaths = $resource('/jsonapi/mobile_paths').query();

		$scope.listChallenges = $resource('/jsonapi/list_challenges').get();

		// difficulty levels
		$scope.levels = [{'name':'Drag-n-Drop', 'id':'Drag-n-Drop'},{'name':'Easy','id':'Easy'},{'name':'Medium', 'id':'Medium'},{'name':'Hard','id':'Hard'}];
		$scope.days = [{'name':1, 'id':1},{'name':2,'id':2},{'name':3, 'id':3},{'name':4,'id':4},{'name':5,'id':5},{'name':6,'id':6},{'name':7,'id':7},{'name':8,'id':8},{'name':9,'id':9},{'name':10,'id':10}];
		//variable for challenge creation
		$scope.challengeTypes = [];
		$scope.challengeTypes.push({'challengeType':'Badge','name':'Badge Challenge'});
		$scope.challengeTypes.push({'challengeType':'Quest','name':'Quest Challenge'});
		$scope.challengeTypes.push({'challengeType':'Habit','name':'Habit Challenge'});

		$scope.chType="Badge";
		$scope.chName="";
		$scope.chDescription="";
		$scope.badges = [null, null, null, null, null, null];
		$scope.selectedPath = [null, null, null, null, null, null];
		$scope.chLocation = "";
		$scope.chaPathID="";
		$scope.storyID="";
		$scope.difficulty="Easy";
		$scope.problemsPerDay="";
		$scope.totalDays="";
		$scope.chPubMsg="";
		$scope.chPriMsg="";

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}

		$scope.chStartDate= dd+'/'+ mm +'/'+yyyy;
		$scope.chEndDate= dd+'/'+ mm +'/'+yyyy;;

		//retrieve published and user's own stories
		$scope.pubStories = [];
		$scope.StoryModel = $resource('/jsonapi/story');
		$scope.StoryModel.query({}, function(response){
			$scope.stories = response;
			for(var i=0;i<$scope.stories.length;i++){
				if($scope.stories[i].published==true && $scope.stories[i].archived == false){
					var aStory = {name: $scope.stories[i].name, id: $scope.stories[i].id};
					$scope.pubStories.push(aStory);
				}
			}
		});

		$scope.myStoryModel = $resource('/jsonapi/player_stories');
		$scope.myStoryModel.query({}, function(response){
			$scope.myStories = response;
			for(var i=0;i<$scope.myStories.length;i++){
				if($scope.myStories[i].published == false && $scope.myStories[i].archived == false){
					var aStory = {name: $scope.myStories[i].name, id: $scope.myStories[i].id};
					$scope.pubStories.push(aStory);
				}
			}
		});

	}

	// To display particular challenge in the registration page

    var open_challenge_ID = $cookieStore.get("challengeID");
    if( open_challenge_ID != null){
    	$scope.get_open_challenge = $resource('/jsonapi/get_challenge?challenge_id=:open_challenge_ID');
   		$scope.get_open_challenge.get({"open_challenge_ID":open_challenge_ID}, function(response){
   			$scope.single_challenge = response;

   			//To retrieve story name by using story ID
   			var storyID = $scope.single_challenge.challenge.storyID;
   			$scope.get_story_for_name_conversion = $resource('/jsonapi/story/:storyID');
   			$scope.get_story_for_name_conversion.get({"storyID":storyID},function(response){
   				$scope.selected_Story_Name = response;
   			})

   			//To retrieve pathName by using path ID
   			var pathID = $scope.single_challenge.challenge.pathID;
   			$scope.get_path_for_name_conversion = $resource('/jsonapi/get_path_progress/:pathID');
   			$scope.get_path_for_name_conversion.get({"pathID":pathID},function(response){
   				$scope.selected_Path_Name = response;
   			})


	    	//To fetch the badge img url's by using badge ID from required badge
	        $scope.get_all_badges = $resource('/jsonapi/all_badges');
	        $scope.get_all_badges.get({},function(response){
	        	$scope.all_the_badges = response;

	        	for( var i=0; i<$scope.single_challenge.challenge.unlockRequiredBadges.length; i++){
	        		for(var j=0; j<$scope.all_the_badges.badges.length; j++){
	        			if($scope.all_the_badges.badges[j].id == $scope.single_challenge.challenge.unlockRequiredBadges[i]){
	        				$scope.single_challenge.challenge.unlockRequiredBadges[i] = $scope.all_the_badges.badges[j].imageURL;
	        			}
	        		}

	        	}

	        });
        });
	}


	$scope.loadEditChallenge = function(){
		$scope.loading();
		var open_challenge_ID = $cookieStore.get("challengeID");
		if( open_challenge_ID != null){
			$scope.get_open_challenge = $resource('/jsonapi/get_challenge_for_edit?challenge_id=:open_challenge_ID');
			$scope.get_open_challenge.get({"open_challenge_ID":open_challenge_ID}, function(response){
				$scope.challengeToEdit = response;
				$scope.chaPathID = $scope.challengeToEdit.challenge.pathID;
				$scope.challengeToEdit.challenge.startDate = $scope.challengeToEdit.challenge.startDate.split("-").reverse().join("/");
				$scope.challengeToEdit.challenge.endDate = $scope.challengeToEdit.challenge.endDate.split("-").reverse().join("/");
			});
		};
	};

    $scope.goToChallengeCreator=function()
    {
      $location.path("challengeCreator");
    };

	//Create Habit Challenge
	//Create Badge Challenge
	//Create Quest Challenge
	//save challenge and go to summary page
	$scope.goToChallengeSummary=function()
    {
		$scope.challengeNameList = [];
		$scope.chaModel = $resource('/jsonapi/list_challenges');
		$scope.chaModel.get({}, function(response){
			$scope.allChallenges = response.challenges;
			for(var i=0;i<$scope.allChallenges.length;i++){
				$scope.challengeNameList.push($scope.allChallenges[i].name);
			}

			$scope.newChallenge = {};
			$scope.newChallenge.challengeType = $scope.chType;
			$scope.newChallenge.name = $scope.chName;
			$scope.newChallenge.publicMessage = $scope.chPubMsg;
			$scope.newChallenge.privateMessage = $scope.chPriMsg;
			$scope.newChallenge.description = $scope.chDescription;
			$scope.newChallenge.startDate = $scope.chStartDate;
			$scope.newChallenge.endDate = $scope.chEndDate;
			$scope.newChallenge.allowedCountries = [];

			//habit challenge
			$scope.newChallenge.pathID=$scope.chaPathID;
			$scope.newChallenge.difficulty=$scope.difficulty;
			$scope.newChallenge.problemsPerDay=$scope.problemsPerDay;

			//derive date difference from start date and end date
			var date1 = new Date($scope.newChallenge.startDate.split("/").reverse().join("/"));
			var date2 = new Date($scope.newChallenge.endDate.split("/").reverse().join("/"));

			//// The number of milliseconds in one day
			var ONE_DAY = 1000 * 60 * 60 * 24

			// Convert both dates to milliseconds
			var date1_ms = date1.getTime()
			var date2_ms = date2.getTime()

			// Calculate the difference in milliseconds
			var difference_ms = Math.abs(date1_ms - date2_ms)

			$scope.newChallenge.totalDays=Math.round(difference_ms/ONE_DAY)+1;
			var endDate = new Date($scope.newChallenge.endDate);
			var startDate = new Date($scope.newChallenge.startDate);
			//badge challenge
			$scope.newChallenge.unlockRequiredBadges = [];

			//Quest challenge
			$scope.newChallenge.storyID = $scope.storyID;

			for(var i = 0; i<$scope.badges.length; i++){
				if($scope.badges[i]){
					$scope.newChallenge.unlockRequiredBadges.push($scope.badges[i]);
				}
			}
			if($scope.chLocation == "1"){
				$scope.newChallenge.worldwide = "1";
			}
			else{
				$scope.newChallenge.worldwide = "0";
				$scope.countryModel = $resource('/jsonapi/all_countries');
				$scope.countryModel.get({}, function(response){
					$scope.ListAllCountries = response.countries;

					$scope.player_info = $resource('/jsonapi/player');
					$scope.player_info.get({},function(response){
						$scope.player = response;
					console.log($scope.ListAllCountries + $scope.player.countryCode);

						for(var i=0;i<$scope.ListAllCountries.length;i++){
							if($scope.ListAllCountries[i].countryCode == $scope.player.countryCode)
							{
								$scope.newChallenge.allowedCountries.push($scope.ListAllCountries[i].id);
								break;
							}
						}

					});
				});
			}
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}

			$scope.todayDate= dd+'/'+ mm +'/'+yyyy;

			if($scope.newChallenge.name==""){
				alert("The challenge name cannot be empty!");
			}
			else if($scope.challengeNameList.indexOf($scope.chName) > -1){
				alert("The challenge name has been taken already, please change another one!");
			}
			else if($scope.newChallenge.description==""){
				alert("The challenge description cannot be empty!");
			}
			else if($scope.newChallenge.publicMessage==""){
				alert("The challenge public Message cannot be empty!");
			}
			else if($scope.newChallenge.privateMessage==""){
				alert("The challenge private Message cannot be empty!");
			}
			else if($scope.newChallenge.startDate.split("/").reverse().join() < $scope.todayDate.split("/").reverse().join()){
				alert("The start date can not be earlier than today's date!");
			}
			else if($scope.newChallenge.endDate.split("/").reverse().join() < $scope.newChallenge.startDate.split("/").reverse().join()){
				alert("The start date should earlier than end date!");
			}
			else{
				//validate attribute of badge challenge
				if($scope.newChallenge.challengeType=='Badge'){
					$scope.newChallenge.pathID = $scope.selectedPath[0];
					if($scope.newChallenge.unlockRequiredBadges[0]==null){
						alert("Please choose at least one badge!");
					}
					else{
						$scope.NewChallenge = $resource('/jsonapi/save_edit_challenge');
						var new_challenge = new $scope.NewChallenge($scope.newChallenge);
						new_challenge.$save(function(response){
							$scope.challenge = response;
							console.log("new badge "+response);
							$scope.newChallengeID = response.id;
						});
						$('#challengeCreated').modal('show');
					}
				}
				//validate attribute of habit challenge
				else if($scope.newChallenge.challengeType=='Habit'){
					if($scope.newChallenge.pathID==""){
						alert("Please choose the language!");
					}
					else if($scope.newChallenge.problemsPerDay==""){
						alert("Please choose the number of problems Per Day!");
					}
					else if($scope.newChallenge.totalDays==""){
						alert("Please choose the total number of days!");
					}
					else{
						$scope.NewChallenge = $resource('/jsonapi/save_edit_challenge');
						var new_challenge = new $scope.NewChallenge($scope.newChallenge);
						new_challenge.$save(function(response){
							$scope.challenge = response;
							console.log("new badge "+response);
							$scope.newChallengeID = response.id;
						});
						$('#challengeCreated').modal('show');
					}
				}
				//validate attribute of quest challenge
				else if($scope.newChallenge.challengeType=='Quest'){
					if($scope.newChallenge.pathID==""){
						alert("Please choose the Path ID!");
					}
					else if($scope.newChallenge.storyID==""){
						alert("Please choose the Story ID!");
					}
					else{
						$scope.NewChallenge = $resource('/jsonapi/save_edit_challenge');
						var new_challenge = new $scope.NewChallenge($scope.newChallenge);
						new_challenge.$save(function(response){
							$scope.challenge = response;
							console.log("new badge "+response);
							$scope.newChallengeID = response.id;
						});
						$('#challengeCreated').modal('show');
					}
				}
			}
		});
		//setTimeout('window.location="index.html#/challenges"',1000);

    };

	$scope.hideSuccessModal = function(){
		$('#challengeCreated').modal('hide');
		window.location="index.html#/challenges";
	};

    $scope.goToChallengeD=function()
    {
      $location.path("challengestatistics");

    };
    $scope.backtoChallenges=function()
    {
      $location.path("challenges");

    };
    $scope.goToRegistration = function(challenge_id)
    {
    	$cookieStore.put("challengeID", challenge_id)
    	$location.path("registration");

    };
	$scope.goToChallengeEdit = function(challenge_id){
	    $cookieStore.put("challengeID", challenge_id)
    	$location.path("challengeEdit");
	}

	$scope.goToChallengeStats=function(challenge_id)
    {
    	$cookieStore.put("challengeID", challenge_id)
    	$location.path("challengestatistics");

    };

	//1. All Challenges Tab - load accepted challenges
	$scope.list_challenges= function(){
		$scope.challengeModel = $resource('/jsonapi/list_challenges');

		$scope.challengeModel.get({}, function(response){
			$scope.ListAllChallenges = response.challenges;

			//fetch the flag img url for each
			$scope.countryModel = $resource('/jsonapi/all_countries');
				$scope.countryModel.get({}, function(response){
				$scope.ListAllCountries = response.countries;

				for(var i=0;i<$scope.ListAllChallenges.length;i++){
					for(var j=0;j<$scope.ListAllCountries.length;j++){
						if($scope.ListAllChallenges[i].allowedCountries[0]==$scope.ListAllCountries[j].id)
						{
							$scope.ListAllChallenges[i].allowedCountries[0]=$scope.ListAllCountries[j].flagUrl;
						}
					}

				}
			});
        });

    };

	//2. All Challenges Tab - load accepted challenges
		//if "_playerRegistered": true, add to array
	$scope.registered_challenges= function(){

		$scope.challengeModel = $resource('/jsonapi/list_challenges');

		$scope.challengeModel.get({}, function(response){
			$scope.challengeReg = response;

			var RegisteredChallenges = $resource('/jsonapi/list_challenges').get();

			$scope.playerRegisteredChallenges=[];
			//get to each challenge
			for (var i=0;i<$scope.challengeReg.challenges.length;i++){

				//You have to ensure that this property exists first if it won't always be present.
				if($scope.challengeReg.challenges[i]._playerRegistered==true){
					$scope.playerRegisteredChallenges.push($scope.challengeReg.challenges[i]);
				}
				//This is a bit annoying. Try logging to console rather than alerting when debugging.
				//alert($scope.playerRegisteredChallenges.length+"success");

				//fetch the flag img url for each challenge in playerRegisteredChallenges
				$scope.countryModel = $resource('/jsonapi/all_countries');
					$scope.countryModel.get({}, function(response){
					$scope.ListAllCountries = response.countries;

					for(var i=0;i<$scope.playerRegisteredChallenges.length;i++){
						for(var j=0;j<$scope.ListAllCountries.length;j++){
							if($scope.playerRegisteredChallenges[i].allowedCountries[0]==$scope.ListAllCountries[j].id)
							{
								$scope.playerRegisteredChallenges[i].allowedCountries[0]=$scope.ListAllCountries[j].flagUrl;
							}
						}

					}
				});

			}


			/*//fetch the flag img url for each challenge in playerRegisteredChallenges
			$scope.countryModel = $resource('/jsonapi/all_countries');
				$scope.countryModel.get({}, function(response){
				$scope.ListAllCountries = response.countries;

				for(var i=0;i<=$scope.playerRegisteredChallenges.length;i++){
					for(var j=0;j<=$scope.ListAllCountries.length;j++){
						if($scope.playerRegisteredChallenges[i].allowedCountries[0]==$scope.ListAllCountries[j].id)
						{
							$scope.playerRegisteredChallenges[i].allowedCountries[0]=$scope.ListAllCountries[j].flagUrl;
						}
					}

				}
			});*/


		});

    };

    // It will enable the user to register
    $scope.register_me = function(required_challenge_id){

    	var to_register = required_challenge_id;
    	$scope.to_register_challenge = $resource('/jsonapi/register_challenge/?challenge_id=:to_register');
    	$scope.to_register_challenge.get({"to_register":to_register},function(response){
    		$scope.registered_this_challenge = response;
    		console.log("Checking player registration status : " +  $scope.registered_this_challenge.info);

    	});
    	//$route.reload('registration');
    	window.location.reload("registration");


    };

	//3. My Creation - Load Challenges I've Made
	$scope.list_challenges_I_created= function(){

        $scope.ChallengesICreatedModel = $resource('/jsonapi/list_my_challenges');

		$scope.ChallengesICreatedModel.get({}, function(response){
			$scope.ListMyChallenges = response.challenges;

			//fetch the flag img url for each challenge created by user
			$scope.countryModel = $resource('/jsonapi/all_countries');
				$scope.countryModel.get({}, function(response){
				$scope.ListAllCountries = response.countries;

				for(var i=0;i<$scope.ListMyChallenges.length;i++){
					for(var j=0;j<$scope.ListAllCountries.length;j++){
						if($scope.ListMyChallenges[i].allowedCountries[0]==$scope.ListAllCountries[j].id)
						{
							$scope.ListMyChallenges[i].allowedCountries[0]=$scope.ListAllCountries[j].flagUrl;
						}
					}

				}
			});

        });
    };

	//4. My Creation - Challenges others Made
	$scope.others_challenges= function(){

		$scope.challengeModel = $resource('/jsonapi/list_challenges');

		$scope.challengeModel.get({}, function(response){

			//obtain current user's id
			var data = {"player_id":$scope.player.player_id};
			var creatorId = data.player_id;

			$scope.challengeOther = response;

			var AllChallenges = $resource('/jsonapi/list_challenges').get();

			$scope.playerOtherChallenges=[];
			//get to each challenge
			for (var i=0;i<=$scope.challengeOther.challenges.length;i++){
				//challenge owner !== current user
				if($scope.challengeOther.challenges[i].owner.player_id!==creatorId){
					$scope.playerOtherChallenges.push($scope.challengeOther.challenges[i]);
				}

			}

			//fetch the flag img url for each challenge created by other users
			$scope.countryModel = $resource('/jsonapi/all_countries');
				$scope.countryModel.get({}, function(response){
				$scope.ListAllCountries = response.countries;

				for(var i=0;i<=$scope.playerOtherChallenges.length;i++){
					for(var j=0;j<=$scope.ListAllCountries.length;j++){
						if($scope.playerOtherChallenges[i].allowedCountries[0]==$scope.ListAllCountries[j].id)
						{
							$scope.playerOtherChallenges[i].allowedCountries[0]=$scope.ListAllCountries[j].flagUrl;
						}
					}

				}
			});



		});


    };



	//3. challengestatistics.html - Load stats for each challenge
	$scope.all_players= function(){
		var challengeId = $cookieStore.get("challengeID");
		//alert(challengeId);

		$scope.challengestatisticsModel = $resource('/jsonapi/list_challenge_players?challenge_id=:challengeId');
		$scope.challengestatisticsModel.get({"challengeId" :challengeId}, function(response){
			$scope.challengePlayers = response.players
			$scope.all_the_players = [];
			console.log($scope.challengePlayers.length);
			//$scope.RegDate=challengestatistics.substring(0,9).trim();
			for(var i=0;i<$scope.challengePlayers.length;i++){
				var full_date = $scope.challengePlayers[i].playerRegisteredDate;
				var exact_date = full_date.lastIndexOf(' ');
				$scope.challengePlayers[i].playerRegisteredDate = full_date.substring(0,exact_date);
				$scope.all_the_players.push($scope.challengePlayers[i]);
			}

        });
	};
		//3b. Registered players
	$scope.registered_players= function(){
		var challengeId = $cookieStore.get("challengeID");
		//alert(challengeId);

		$scope.challengestatisticsModel = $resource('/jsonapi/list_challenge_players?challenge_id=:challengeId');
		$scope.challengestatisticsModel.get({"challengeId" :challengeId}, function(response){
			$scope.challengePlayers = response.players;
			$scope.challenge_id_display = response.challenge.description;
			$scope.registeredPlayers=[];
			//if playerUnlocked=false
			for(var i=0;i<$scope.challengePlayers.length;i++){
				if($scope.challengePlayers[i].playerUnlocked==false){
					var full_date = $scope.challengePlayers[i].playerRegisteredDate;
					var exact_date = full_date.lastIndexOf(' ');
					$scope.challengePlayers[i].playerRegisteredDate = full_date.substring(0,exact_date);
					$scope.registeredPlayers.push($scope.challengePlayers[i]);

				}
			}
        });
	};

		//3c. Unlocked players
	$scope.unlocked_players= function(){
		var challengeId = $cookieStore.get("challengeID");
		$scope.challengestatisticsModel = $resource('/jsonapi/list_challenge_players?challenge_id=:challengeId');
		$scope.challengestatisticsModel.get({"challengeId" :challengeId}, function(response){
			$scope.challengePlayers = response.players;
			$scope.unlockedPlayers=[];
			//if playerUnlocked=true
			for(var i=0;i<=$scope.challengePlayers.length;i++){
				if($scope.challengePlayers[i]){
					if($scope.challengePlayers[i].playerUnlocked==true){
						var full_date = $scope.challengePlayers[i].playerRegisteredDate;
						var exact_date = full_date.lastIndexOf(' ');
						$scope.challengePlayers[i].playerRegisteredDate = full_date.substring(0,exact_date);

						var full_date_unlock = $scope.challengePlayers[i].playerUnlockedDate;
						var exact_date_unlock = full_date_unlock.lastIndexOf(' ');
						$scope.challengePlayers[i].playerUnlockedDate = full_date_unlock.substring(0,exact_date_unlock);

						$scope.unlockedPlayers.push($scope.challengePlayers[i]);
					}
				}
			}
        });
	};

		//3d. Submitted players
	$scope.submitted_players= function(){
		var challengeId = $cookieStore.get("challengeID");
		$scope.challengestatisticsModel = $resource('/jsonapi/list_challenge_players?challenge_id=:challengeId');
		$scope.challengestatisticsModel.get({"challengeId" :challengeId}, function(response){
			$scope.challengePlayers = response.players;
			$scope.submittedPlayers=[];
			//if playerSubmitted=true
			for(var i=0;i<=$scope.challengePlayers.length;i++){
				if($scope.challengePlayers[i]){
					if($scope.challengePlayers[i].playerSubmitted==true){
						var full_date = $scope.challengePlayers[i].playerRegisteredDate;
						var exact_date = full_date.lastIndexOf(' ');
						$scope.challengePlayers[i].playerRegisteredDate = full_date.substring(0,exact_date);

						var full_date_unlock = $scope.challengePlayers[i].playerUnlockedDate;
						var exact_date_unlock = full_date_unlock.lastIndexOf(' ');
						$scope.challengePlayers[i].playerUnlockedDate = full_date_unlock.substring(0,exact_date_unlock);

						$scope.submittedPlayers.push($scope.challengePlayers[i]);
					}
				}
			}
        });
	};

	//4. Enable registering for challenge
	//8. Edit Challenges

	//Player submit the message after completing the challenge
	$scope.player_submission_check = function(){
		var challengeId = $cookieStore.get("challengeID");
		//var $scope.player_challenge_details = {};
		//alert(challengeId);
		$scope.challengestatisticsModel = $resource('/jsonapi/list_challenge_players?challenge_id=:challengeId');
		$scope.challengestatisticsModel.get({"challengeId" :challengeId}, function(response){
			$scope.challengePlayers = response.players;
			$scope.challengeDetails = response.challenge;

			console.log("private message = " + $scope.challengeDetails.registeredMessage);

			$scope.player_info = $resource('/jsonapi/player');
			$scope.player_info.get({},function(response){
				$scope.player = response;

				for(var i=0; i<$scope.challengePlayers.length;i++){
					if($scope.challengePlayers[i].player_id == $scope.player.player_id){
						$scope.player_challenge_details = $scope.challengePlayers[i];
					}
				}
			});
		});

	}

	//to submit user's message to the challenge creator
	$scope.submit_msg=function(playerMsg){
		$scope.player_msg = playerMsg;
		$scope.attachment_Name = $scope.file_name;
		$scope.attachment_content = $scope.files;
		$scope.domain_urls = 'http://www.singpath.com';
		$scope.challenge_msg_submission = $cookieStore.get("challengeID");
		console.log("Player Message = " + $scope.player_msg);
		//alert($scope.challenge_msg_submission);
		//alert($scope.attachment_Name);

		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.post('/jsonapi/submit_challenge_message/'+$scope.challenge_msg_submission, {
							player_message:$scope.player_msg
		}).success(function (data, status, headers, config) {
			window.console.log(data);
			alert("You are successfully submitted your message");
			$location.path("challenges");
		}).error(function (data, status, headers, config) {
			window.console.log(data);
			alert("You are unable to submit your message");
		});
	}

	/*$scope.set_file = function(element){
		$scope.files = new FormData();
		$scope.file_name = '';
   		$scope.$apply(function($scope) {
      		console.log('files:', element.files[0].name);
      		//Assign the first file name
      		$scope.file_name = element.files[0].name;
      		//Take the first selected file
    		$scope.files.append("file", element.files[0]);
      	});

	}*/


	//*******************************Miscellaneous Functions*********************************

	//to retrieve windows height based on screen size
	    $scope.getHeight_challenge_feature = function() {
	        return $(window).height();
	    };
	    $scope.$watch($scope.getHeight_challenge_feature, function(newValue, oldValue) {
	        $scope.window_Height = newValue;
	        $scope.window_Height_challenge = $scope.window_Height * 0.55;
	        //$scope.window_Height_country = $scope.window_Height * 0.56;
	    });
	    window.onresize = function(){
	        $scope.$apply();
	    }

	$scope.editChallenge = function(challenge_id,sDate,eDate){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}

		var todayDate= dd+'/'+ mm +'/'+yyyy;

			//derive date difference from start date and end date
			var date1 = new Date(sDate.split("/").reverse().join("/"));
			var date2 = new Date(eDate.split("/").reverse().join("/"));

			//// The number of milliseconds in one day
			var ONE_DAY = 1000 * 60 * 60 * 24

			// Convert both dates to milliseconds
			var date1_ms = date1.getTime()
			var date2_ms = date2.getTime()

			// Calculate the difference in milliseconds
			var difference_ms = Math.abs(date1_ms - date2_ms)

			var totalNumberOfDays=Math.round(difference_ms/ONE_DAY)+1;

		if($scope.challengeToEdit.challenge.allowedCountries.length=="0" ){
			$scope.challengeToEdit.challenge.worldwide = 1;
			$scope.challengeToEdit.challenge.allowedCountries = [];
		}
		else{
			$scope.challengeToEdit.challenge.worldwide = 0;
			$scope.countryModel = $resource('/jsonapi/all_countries');
			$scope.countryModel.get({}, function(response){
				$scope.ListAllCountries = response.countries;
				$scope.player_info = $resource('/jsonapi/player');
				$scope.player_info.get({},function(response){
				$scope.player = response;
				console.log($scope.ListAllCountries + $scope.player.countryCode);
					for(var i=0;i<$scope.ListAllCountries.length;i++){
						if($scope.ListAllCountries[i].countryCode == $scope.player.countryCode)
						{
							$scope.challengeToEdit.challenge.allowedCountries[0] = $scope.ListAllCountries[i].id;
							break;
						}
					}
				});
			});

		}

		if($scope.challengeToEdit.challenge.name==""){
			alert("The challenge name cannot be empty!");
		}
		else if($scope.challengeToEdit.challenge.description==""){
			alert("The challenge description cannot be empty!");
		}
		else if($scope.challengeToEdit.challenge.publicMessage==""){
			alert("The challenge public Message cannot be empty!");
		}
		else if(sDate.split("/").reverse().join() < todayDate.split("/").reverse().join()){
			alert("The start date can not be earlier than today's date!");
		}
		else if(eDate.split("/").reverse().join() < sDate.split("/").reverse().join()){
			alert("The start date should earlier than end date!");
		}
		else{
			//validate attribute of badge challenge
			if($scope.challengeToEdit.challenge.challengeType=='Badge'){
				$scope.chaPathID = $scope.challengeToEdit.challenge.unlockRequiredPaths[0];
				if($scope.challengeToEdit.challenge.unlockRequiredBadges[0]==null){
					alert("Please choose at least one badge!");
				}
				else{
					$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
					$http.post('/jsonapi/save_edit_challenge/'+challenge_id, {
									unlockRequiredBadges:$scope.challengeToEdit.challenge.unlockRequiredBadges,
									unlockRequiredPaths:$scope.challengeToEdit.challenge.unlockRequiredPaths,
									challengeType:$scope.challengeToEdit.challenge.challengeType,
									difficulty:'Easy',
									description:$scope.challengeToEdit.challenge.description,
									publicMessage:$scope.challengeToEdit.challenge.publicMessage,
									privateMessage:$scope.challengeToEdit.challenge.privateMessage,
									worldwide:$scope.challengeToEdit.challenge.worldwide,
									allowedCountries:$scope.challengeToEdit.challenge.allowedCountries,
									startDate:sDate,
									endDate:eDate,
									name:$scope.challengeToEdit.challenge.name
					}).success(function (data, status, headers, config) {
						$scope.registration_response = data;
						$('#challengeEdited').modal('show');
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
				}
			}
			//validate attribute of habit challenge
			else if($scope.challengeToEdit.challenge.challengeType=='Habit'){
				if($scope.chaPathID==""){
					alert("Please choose the language!");
				}
				else if($scope.challengeToEdit.challenge.problemsPerDay==""){
					alert("Please choose the number of problems Per Day!");
				}
				else if($scope.challengeToEdit.challenge.totalDays==""){
					alert("Please choose the total number of days!");
				}
				else{
					$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
					$http.post('/jsonapi/save_edit_challenge/'+challenge_id, {
									totalDays:totalNumberOfDays,
									problemsPerDay:$scope.challengeToEdit.challenge.problemsPerDay,
									difficulty:$scope.challengeToEdit.challenge.difficulty,
									pathID:$scope.chaPathID,
									challengeType:$scope.challengeToEdit.challenge.challengeType,
									description:$scope.challengeToEdit.challenge.description,
									publicMessage:$scope.challengeToEdit.challenge.publicMessage,
									privateMessage:$scope.challengeToEdit.challenge.privateMessage,
									worldwide:$scope.challengeToEdit.challenge.worldwide,
									name:$scope.challengeToEdit.challenge.name,
									allowedCountries:$scope.challengeToEdit.challenge.allowedCountries,
									startDate:sDate,
									endDate:eDate
					}).success(function (data, status, headers, config) {
						$scope.registration_response = data;
						$('#challengeEdited').modal('show');
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
				}
			}
			//validate attribute of quest challenge
			else if($scope.challengeToEdit.challenge.challengeType=='Quest'){
				if($scope.challengeToEdit.challenge.pathID==""){
					alert("Please choose the Path ID!");
				}
				else if($scope.challengeToEdit.challenge.storyID==""){
				    alert("Please choose the Story ID!");
				}
				else{
					$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
					$http.post('/jsonapi/save_edit_challenge/'+challenge_id, {
									storyID:$scope.challengeToEdit.challenge.storyID,
									difficulty:$scope.challengeToEdit.challenge.difficulty,
									pathID:$scope.chaPathID,
									challengeType:$scope.challengeToEdit.challenge.challengeType,
									description:$scope.challengeToEdit.challenge.description,
									publicMessage:$scope.challengeToEdit.challenge.publicMessage,
									privateMessage:$scope.challengeToEdit.challenge.privateMessage,
									worldwide:$scope.challengeToEdit.challenge.worldwide,
									allowedCountries:$scope.challengeToEdit.challenge.allowedCountries,
									name:$scope.challengeToEdit.challenge.name,
									startDate:sDate,
									endDate:eDate
					}).success(function (data, status, headers, config) {
						$scope.registration_response = data;
						$('#challengeEdited').modal('show');
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
				}
			}
		}
	};

	$scope.hideEditSuccessModal = function(){
		$('#challengeEdited').modal('hide');
		window.location="index.html#/challenges";
	}

	$scope.goToGeneratedURL = function(single_challenge){
		$scope.challengeURL = "";
		console.log(single_challenge);
		if(single_challenge.challenge.challengeType=="Quest"){
			$scope.challengeURL = "index.html#/quests?storyID=" + single_challenge.challenge.storyID + "&difficulty="+ single_challenge.challenge.difficulty + "&path_ID=" + single_challenge.challenge.pathID;
			window.location = $scope.challengeURL;
		}
		else if(single_challenge.challenge.challengeType=="Habit"){
			$scope.challengeURL = "index.html#/practice?path_ID=" + single_challenge.challenge.pathID + "&difficulty="+ single_challenge.challenge.difficulty;
			window.location = $scope.challengeURL;
		}
		else if(single_challenge.challenge.challengeType=="Badge"){
			$scope.challengeURL = "index.html#/practice?path_ID=" + single_challenge.challenge.pathID + "&difficulty="+ single_challenge.challenge.difficulty;
			window.location = $scope.challengeURL;
		}
	}

	$scope.shareURL = function(single_challenge){
			$scope.challengeURL = "";
			console.log(single_challenge);
			if(single_challenge.challengeType=="Quest"){
				$scope.challengeURL = "http://www.singpath.com/kat/index.html#/quests?storyID=" + single_challenge.storyID + "&difficulty="+ single_challenge.difficulty + "&path_ID=" + single_challenge.pathID;
			}
			else if(single_challenge.challengeType=="Habit"){
				$scope.challengeURL = "http://www.singpath.com/kat/index.html#/practice?path_ID=" + single_challenge.pathID + "&difficulty="+ single_challenge.difficulty;
			}
			else if(single_challenge.challengeType=="Badge"){
				$scope.challengeURL = "http://www.singpath.com/kat/index.html#/practice?path_ID=" + single_challenge.pathID + "&difficulty="+ single_challenge.difficulty;
			}
			$('#shareChallenge').modal('show');
	};

	$scope.$watch('chaPathID', function() {
		$scope.pubStories = [];
		$scope.StoryModel = $resource('/jsonapi/story');
		$scope.StoryModel.query({}, function(response){
			$scope.stories = response;
			for(var i=0;i<$scope.stories.length;i++){
				if($scope.stories[i].published==true && $scope.stories[i].archived == false && $scope.stories[i].supported_paths.indexOf($scope.chaPathID) > -1){
					var aStory = {name: $scope.stories[i].name, id: $scope.stories[i].id};
					$scope.pubStories.push(aStory);
				}
				else if($scope.stories[i].published==true && $scope.stories[i].archived == false && $scope.stories[i].supported_paths.length==0){
					var aStory = {name: $scope.stories[i].name, id: $scope.stories[i].id};
					$scope.pubStories.push(aStory);
				}
			}
		});

		$scope.myStoryModel = $resource('/jsonapi/player_stories');
		$scope.myStoryModel.query({}, function(response){
			$scope.myStories = response;
			for(var i=0;i<$scope.myStories.length;i++){
				if($scope.myStories[i].published == false && $scope.myStories[i].archived == false && $scope.myStories[i].supported_paths && $scope.myStories[i].supported_paths.indexOf($scope.chaPathID) > -1){
					var aStory = {name: $scope.myStories[i].name, id: $scope.myStories[i].id};
					$scope.pubStories.push(aStory);
				}
				else if($scope.myStories[i].published == false && $scope.myStories[i].archived == false && $scope.myStories[i].supported_paths && $scope.myStories[i].supported_paths.length == 0){
					var aStory = {name: $scope.myStories[i].name, id: $scope.myStories[i].id};
					$scope.pubStories.push(aStory);
				}
			}
		});
	});
}


function NormalGameController($scope,$resource,$cookieStore,$location){
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
    $scope.codeType = null;

    if($cookieStore.get("name")){
      $scope.qid = $cookieStore.get("name").id; //retrieve quest id from Storyboard page
    }
    if($cookieStore.get("num")){
      $scope.numProblems = $cookieStore.get("num"); //retrieve quest id from Storyboard page
    }
    if($cookieStore.get("type")){
      $scope.gameType = $cookieStore.get("type"); //retrieve game type
    }
    if($cookieStore.get("practicePathName")){
      $scope.codeType = $cookieStore.get("practicePathName"); //retrieve path type for quest
      $scope.codeType = $scope.codeType.toLowerCase();
      console.log($scope.codeType + " " + $scope.qid + " " + $scope.numProblems);
    }



    var videos = 0;

    //alert($scope.qid);
    $scope.create_practice_game = function(pathID,LevelID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game');

      $scope.CreateGameModel.get({}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
      });
    };

    $scope.create_path_game = function(pathID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/pathID/:pathID/numProblems/:numProblems');
      //alert(pathID+" "+numProblems);
      $scope.CreateGameModel.get({"pathID":pathID,"numProblems":numProblems}, function(response){
        $scope.game = response;
        $scope.update_remaining_problems();
      });
    };

    $scope.create_quest_game = function(questID){
      $scope.CreateGameModel = $resource('/jsonapi/create_quest_game/:questID');
      //alert("Creating quest game for quest "+questID);

      $scope.NewQuestGame = $resource('/jsonapi/create_quest_game/:questID');
      $scope.NewQuestGame.get({'questID':questID}, function(response){
          $scope.game = response;
          $scope.fetch($scope.game.gameID);
          //$scope.update_remaining_problems();
          $scope.update_quest();
          //alert("reply for create quest game in game model");
          //Update the parent game model by calling game fetch method.
      });
      /*
      $scope.CreateGameModel.get({}, function(response){

        $scope.game = response;
        //Fetch the game from game ID.
        $scope.fetch($scope.game.gameID);
        $scope.update_remaining_problems();
      });
      */
    };

    $scope.create_problemset_game = function(problemsetID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');

      $scope.CreateGameModel.get({"problemsetID":problemsetID,"numProblems":numProblems}, function(response){
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
    /*
    Create Tournament Game.

    */

    //To retrieve story information
    $scope.$watch('quest.name', function() {

        if (!$scope.quest) {
            return;
        }

    	// to retrieve the story name
    	var sName = $scope.quest.story;
		$scope.get_Story = $resource('/jsonapi/story/:sName');
		$scope.get_Story.get({"sName":sName}, function(response){
			$scope.singleStory = response;
			$scope.singleStoryDes = $scope.singleStory.description;
		});

		// to retrieve the path name
    	var pName = $scope.quest.path;
		$scope.get_pathName = $resource('/jsonapi/get_path_progress/:pName');
		$scope.get_pathName.get({"pName":pName}, function(response){
			$scope.singlePath = response;
			$scope.singlePathName = $scope.singlePath.path.name;
			//$scope.codeType = $scope.singlePathName.toLowerCase();
			//console.log("This is " + $scope.codeType);
		});

    },true);

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
        //alert("TBD - Start another quest game automatically here for quest "+ $scope.qid);
        if($scope.quest.numSolved != $scope.quest.numProblems){
          $scope.create_quest_game($scope.qid);
        }else{
          $('#finish_all_info').modal('show');
        }
      }
      //Update the current problem index based on remaining problems and items skipped.
      $scope.move_to_next_unsolved_problem();
    };

    $scope.move_to_next_unsolved_problem = function(){
      $scope.sampleAnswers = "yes";
      if ($scope.remaining_problems.length>0){
        //Todo:If you are already on the problem, you don't need to reload it.
        $scope.current_problem = $scope.remaining_problems[$scope.skip_problem_count % $scope.remaining_problems.length];
        $scope.current_problem_index = $scope.game.problemIDs.indexOf($scope.current_problem);
        $scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
        $scope.solution_check_result = null;
        var editor = ace.edit("editor");
        editor.getSession().setMode("ace/mode/" + $scope.game.problems.problems[$scope.current_problem_index].interface.codeHighlightKey);
      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution1 = null;
        $scope.solution_check_result = null;
      }

    }
    $scope.skip_problem = function(){
      if ($scope.remaining_problems.length>1){
        $scope.skip_problem_count += 1;
        $scope.move_to_next_unsolved_problem();
      }
    }

    $scope.play_unlocked_video = function(videoID){
      //alert($scope.quest.videos[videoID]);
      document.getElementById("video_pop").href="http://www.youtube.com/embed/"+ $scope.quest.videos[videoID] +"?enablejsapi=1&wmode=opaque"
      $('#video_pop').trigger('click');
    }

    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID

      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};

      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) {
          $scope.solution_check_result = response;
          if($scope.codeType == 'html'){
              $scope.fill_iframe();
              $scope.fill_test_iframe();
            }
          if($scope.solution_check_result.last_solved){
            //If you hardcode to the game, this will automatically advance the game to the next problem.
            $scope.fetch($scope.game.gameID);
            $scope.update_quest();
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

    $scope.update_quest = function() {
      var currentNumVideos = 1;

      $resource('/jsonapi/quest/:questID').get({"questID":$scope.game.questID},
      function(response){
        $scope.quest = response;
        //alert("Retrieved quest. Could check for video unlocks here.");
      });

      $scope.$watch('quest.videos', function() {
        var numOfUnlocked = 0;

        if (!$scope.quest) {
            return;
        }

        for(var i=0;i<$scope.quest.videos.length;i++){
            if($scope.quest.videos[i] != "LOCKED"){
               numOfUnlocked++;
            }
        }
        if(numOfUnlocked > videos){
            $scope.play_unlocked_video(numOfUnlocked - 1);
        }
        videos = numOfUnlocked;
      },true);
    };

    $scope.goStoryBoard = function(){
      //window.location = "index.html#/storyboard";
      $location.path("storyboard");
    };

    $scope.create_quest_game($scope.qid);
}

function PracticeGameController($scope,$resource,$cookieStore){
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
    $scope.codeType = null;

    if($cookieStore.get("name")){
      $scope.LevelID = $cookieStore.get("name"); //retrieve level id from practice page
    }
    if($cookieStore.get("re_solve")){
      $scope.re_solve = $cookieStore.get("re_solve");
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
    if($cookieStore.get("practicePathName")){
      $scope.codeType = $cookieStore.get("practicePathName"); //retrieve name of the path
      $scope.codeType = $scope.codeType.toLowerCase();
      console.log($scope.codeType);
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

    
    $scope.create_practice_game = function(LevelID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');

      // This may only be loading the first time. 
      $scope.CreateGameModel.get({"problemsetID":LevelID,"numProblems":numProblems}, function(response){
        console.log("**Creating practice game in PracticeGameController");
        //Add error checking here.
        if('error' in response){
            console.log(response.error);
            alert(response.error);
            window.location.href="index.html#/practice";
        }
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
  
    // This needs to be modified to consider resolve
    console.log("In PracticeGameController difficulty "+$scope.gameDifficulty+" resolve "+$scope.re_solve);
	  if ($scope.re_solve==true){
      //Create a resolve game for the level
      $scope.create_resolve_problemset_game($scope.LevelID)
    }else{
      //Create a normal practice game for the level.
      $scope.create_practice_game($scope.LevelID,$scope.numProblems);
    }

    $scope.fetch = function(gameID){
		  $scope.GameModel = $resource('/jsonapi/game/:gameID');
      console.log("Fetching");
      console.log($scope.codeType);
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
        $('#t11').removeClass('active');
        $('#ta11').removeClass('active');
        $('#t21').addClass('active');
        $('#ta21').addClass('active');

        //Todo:If you are already on the problem, you don't need to reload it.
        $scope.current_problem = $scope.remaining_problems[$scope.skip_problem_count % $scope.remaining_problems.length];
        $scope.current_problem_index = $scope.game.problemIDs.indexOf($scope.current_problem);
        $scope.solution1 = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
        $scope.solution_check_result = null;
        var editor = ace.edit("editorPractice");
        editor.getSession().setMode("ace/mode/" + $scope.game.problems.problems[$scope.current_problem_index].interface.codeHighlightKey);
        //editor.getSession().removeListener('change', callback);
      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution1 = null;
        $scope.solution_check_result = null;
      }

    }
    $scope.skip_problem = function(){
        $('#t11').removeClass('active');
        $('#ta11').removeClass('active');
        $('#t21').addClass('active');
        $('#ta21').addClass('active');

      if ($scope.remaining_problems.length>1){
        $scope.skip_problem_count += 1;
        $scope.move_to_next_unsolved_problem();
      }
    }

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

      });

    };


    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID

      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};

      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) {
              $scope.solution_check_result = response;
              if($scope.codeType == 'html'){
              	$scope.fill_iframe();
              	$scope.fill_test_iframe();
           	  }
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
}
function GameController($scope,$resource,$cookieStore,$location){
    //initialization:
    $scope.autoCheck="yes"; //make autocheck available when page load
    $scope.notCompile = 'false'; //hide not compile warning before the game loaded
    if($cookieStore.get("name")){
      $scope.qid = $cookieStore.get("name").id; //retrieve quest id from Storyboard page
    }
    $scope.source = []; //initialize the solution drag and drop field

    /*
    To play a game via the SingPath API you must do the following.
    1. Create a game using create_practice_game and get the gameID in the response.
    2. Call check_solution_for_game() for a problem until the player correctly solves the problem.
    3. Call fetch(gameID) to get the updated status of the game after correct solves.
    4. Redirect the player to the proper page once the game is completed.
    */
    //$("#example").popover({
        //placement: 'bottom',
    //});
    //$('#video').trigger('click');
    $scope.solvedProblems = 0;
    $scope.skip_problem_count = 0;
    $scope.current_problem_index = 0;
    $scope.permutation = "";
    $scope.permutation_lines = {origional: []};
    $scope.line_outcome = { };

    $scope.sourceEmpty = function() {
      //$scope.source = [];
      return $scope.source.length == 0;
    }

    $scope.modelEmpty = function() {
      if($scope.line_outcome.origional){
        return $scope.line_outcome.origional.length == 0;
      }
    }

    $scope.assign_id = function() {
      $scope.permutation_lines = {origional: []};
      var contained = [];
      //Loop through the permutation and add all of the lines of code
      for (var i = 0; i < $scope.game.problems.problems[$scope.current_problem_index].lines.length; i++) {
      	var j = parseInt($scope.game.problems.problems[$scope.current_problem_index].lines.length * Math.random());
      	while(contained.indexOf(j) != -1){
      		j = parseInt($scope.game.problems.problems[$scope.current_problem_index].lines.length * Math.random());
      	}
        contained.push(j);
      	var temp = $scope.game.problems.problems[$scope.current_problem_index].lines[parseInt(j)];
        temp = temp.split(' ').join('\u00a0');
        $scope.permutation_lines.origional.push({"content": temp,"id": (j+1)});
      }
      $scope.line_outcome = $scope.permutation_lines;
    }

    $scope.create_quest_game = function(questID){
      $scope.CreateGameModel = $resource('/jsonapi/create_quest_game/:questID');
      //alert("Creating quest game for quest "+questID);

      $scope.NewQuestGame = $resource('/jsonapi/create_quest_game/:questID');
      $scope.NewQuestGame.get({'questID':questID}, function(response){
          $scope.game = response;
          $scope.fetch($scope.game.gameID);
          $scope.update_quest();
          //alert("reply for create quest game in game model");
          //Update the parent game model by calling game fetch method.
      });
      /*
      $scope.CreateGameModel.get({}, function(response){

        $scope.game = response;
        //Fetch the game from game ID.
        $scope.fetch($scope.game.gameID);
        $scope.update_remaining_problems();
      });
      */
    };

    //To retrieve story information
    $scope.$watch('quest.name', function() {

    	// to retrieve the story name
    	var sName = $scope.quest.story;
		$scope.get_Story = $resource('/jsonapi/story/:sName');
		$scope.get_Story.get({"sName":sName}, function(response){
			$scope.singleStory = response;
			$scope.singleStoryDes = $scope.singleStory.description;
		});

		// to retrieve the path name
    	var pName = $scope.quest.path;
		$scope.get_pathName = $resource('/jsonapi/get_path_progress/:pName');
		$scope.get_pathName.get({"pName":pName}, function(response){
			$scope.singlePath = response;
			$scope.singlePathName = $scope.singlePath.path.name;
		});

    },true);

    $scope.create_problemset_game = function(problemsetID,numProblems){
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');

      $scope.CreateGameModel.get({"problemsetID":problemsetID,"numProblems":numProblems}, function(response){
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
        $scope.create_quest_game($scope.qid);
      }
      //Update the current problem index based on remaining problems and items skipped.
      $scope.move_to_next_unsolved_problem();
    };

    $scope.move_to_next_unsolved_problem = function(){
      if ($scope.remaining_problems.length>0){
        //Todo:If you are already on the problem, you don't need to reload it.
        $scope.current_problem = $scope.remaining_problems[$scope.skip_problem_count % $scope.remaining_problems.length];
        $scope.current_problem_index = $scope.game.problemIDs.indexOf($scope.current_problem);
        $scope.solution = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
        $scope.solution_check_result = null;
        $scope.assign_id();
      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution = null;
        $scope.solution_check_result = null;
      }
    }

    $scope.skip_problem = function(){
      $scope.notCompile = 'false';
      if($scope.source.length != 0){
        $scope.source = [];
      }
      if ($scope.remaining_problems.length>1){
        $scope.skip_problem_count += 1;
        $scope.move_to_next_unsolved_problem();
      }
    }

    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};

      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) {
          $scope.solution_check_result = response;
          if($scope.solution_check_result.last_solved){
            //If you hardcode to the game, this will automatically advance the game to the next problem.
            $scope.fetch($scope.game.gameID);
            $scope.update_quest();
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
        $scope.notCompile = 'false';
        $scope.solution_check_result = nonErrorResult;
        $scope.ner = nonErrorResult;
        //If the solution passes, then call verify for the solution to progress in the game.
        if(nonErrorResult.solved){
          $('#pop_info_Pane').modal('show');
          $scope.source = [];
          $scope.check_solution_for_game();
        }
        else{
          $('#pop_info_Pane2').modal('show');
        }
      }
      else{
        $scope.notCompile = 'true';
      }
    };

    $scope.check_dnd_permutation = function() {
      //$scope.permutation
      //$scope.tests
      //alert("permutation="+$scope.permutation);
      //Update the solution with the permutations of lines.
      $scope.permutation = "";
      $scope.permutation_lines = "";

      for (var i = 0; i < $scope.source.length; i++) {
        //alert(parseInt($scope.permutation[i]));
        $scope.permutation += $scope.source[parseInt(i)].id.toString();
      }

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
      var autocheck = $scope.autoCheck;

      if(autocheck=="yes"){
        if(nonErrorResult){
          $scope.notCompile = 'false';
          $scope.solution_check_result = nonErrorResult;
          $scope.ner = nonErrorResult;

          //If the solution passes, then call verify for the solution to progress in the game.
          if(nonErrorResult.solved){
            //$scope.check_solution_for_game();
            $('#pop_info_Pane').modal('show');
            $scope.source = [];
            $scope.check_solution_for_game();
            //if($scope.solvedProblems == $scope.game.numProblems){
              //document.getElementById("endVideo").style.visibility="visible";
              //$('#endVideo').trigger('click');
            //}
          }
          else{
            $('#pop_info_Pane2').modal('show');
          }
        }
        else{
          $scope.notCompile = 'true';
        }
      }

    };

    $scope.goStoryBoard = function(){
      //window.location = "index.html#/storyboard";
      $location.path("storyboard");
    };

    $scope.update_quest = function() {
      var currentNumVideos = 1;
      $resource('/jsonapi/quest/:questID').get({"questID":$scope.game.questID},
      function(response){
        $scope.quest = response;
        //alert("Retrieved quest. Could check for video unlocks here.");
      });
    };

    $scope.play_unlocked_video = function(videoID){
      //alert($scope.quest.videos[videoID]);
      document.getElementById("video").href="http://www.youtube.com/embed/"+ $scope.quest.videos[videoID] +"?enablejsapi=1&wmode=opaque"
      $('#video').trigger('click');
    }

    $scope.create_quest_game($scope.qid);
    //$scope.fetch(1798);
}


function PracticeDnDController($scope,$resource,$cookieStore,$location){
    //initialization:
    $scope.autoCheck="yes"; //make autocheck available when page load
    $scope.notCompile = 'false'; //hide not compile warning before the game loaded

    if($cookieStore.get("name")){
      $scope.LevelID = $cookieStore.get("name"); //retrieve quest id from Storyboard page
    }

    if($cookieStore.get("num")){
      $scope.numProblems = $cookieStore.get("num"); //retrieve quest id from Storyboard page
    }
    if($cookieStore.get("level")){
      $scope.levelNumber = $cookieStore.get("level"); //retrieve quest id from Storyboard page
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

	$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

	$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
		$scope.problems_progress = response;
		});

    //alert($scope.qid);
    $scope.create_practice_game = function(LevelID,numProblems){
      console.log("Attempting to drag-n-drop practice game.");
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');

      $scope.CreateGameModel.get({"problemsetID":LevelID,"numProblems":numProblems}, function(response){
        //Need to add checking and popup to ensure that the player is not being blocked.
        console.log(response);
        $scope.game = response;
        $scope.update_remaining_problems();
      });
    };

    $scope.source = []; //initialize the solution drag and drop field

    /*
    To play a game via the SingPath API you must do the following.
    1. Create a game using create_practice_game and get the gameID in the response.
    2. Call check_solution_for_game() for a problem until the player correctly solves the problem.
    3. Call fetch(gameID) to get the updated status of the game after correct solves.
    4. Redirect the player to the proper page once the game is completed.
    */
    //$("#example").popover({
        //placement: 'bottom',
    //});
    //$('#video').trigger('click');
    $scope.solvedProblems = 0;
    $scope.skip_problem_count = 0;
    $scope.current_problem_index = 0;
    $scope.permutation = "";
    $scope.permutation_lines = {origional: []};
    $scope.line_outcome = { };

    $scope.sourceEmpty = function() {
      //$scope.source = [];
      return $scope.source.length == 0;
    }

    $scope.modelEmpty = function() {
      if ($scope.line_outcome.origional){
        return $scope.line_outcome.origional.length == 0;
      }
      else{
        return false;
      }
    }

    $scope.assign_id = function() {
      $scope.permutation_lines = {origional: []};
      var contained = [];
      //Loop through the permutation and add all of the lines of code
      for (var i = 0; i < $scope.game.problems.problems[$scope.current_problem_index].lines.length; i++) {
      	var j = parseInt($scope.game.problems.problems[$scope.current_problem_index].lines.length * Math.random());
      	while(contained.indexOf(j) != -1){
      		j = parseInt($scope.game.problems.problems[$scope.current_problem_index].lines.length * Math.random());
      	}
        contained.push(j);
      	var temp = $scope.game.problems.problems[$scope.current_problem_index].lines[parseInt(j)];
        temp = temp.split(' ').join('\u00a0');
        $scope.permutation_lines.origional.push({"content": temp,"id": (j+1)});
      }
      $scope.line_outcome = $scope.permutation_lines;
    }

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
      if($scope.game.problemIDs){
        //loop through problems and find unsolved. Add to remaining_problems.
        for (var i = 0; i < $scope.game.problemIDs.length; i++) {
          if($scope.game.solvedProblemIDs.indexOf($scope.game.problemIDs[i])<0){
            $scope.remaining_problems.push($scope.game.problemIDs[i]);
          }
        }
      }

			$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

			$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
			$scope.problems_progress = response;
			});

			if($scope.remaining_problems.length==0){
				alert("Current level Progress: " + ($scope.problems_progress.currentPlayerProgress) + " of " + $scope.problems_progress.problemsInProblemset);
				if($scope.problems_progress.problemsInProblemset-$scope.problems_progress.currentPlayerProgress<=1){
					alert("Congratulation! You have completed this level!");
					window.location.href="index.html#/practice";
				}
				else{
						$scope.create_practice_game($scope.LevelID,$scope.numProblems);
				}
			}
      //Update the current problem index based on remaining problems and items skipped.
      $scope.move_to_next_unsolved_problem();
    };

    $scope.move_to_next_unsolved_problem = function(){
      if ($scope.remaining_problems.length>0){
        //Todo:If you are already on the problem, you don't need to reload it.
        $scope.current_problem = $scope.remaining_problems[$scope.skip_problem_count % $scope.remaining_problems.length];
        $scope.current_problem_index = $scope.game.problemIDs.indexOf($scope.current_problem);
        $scope.solution = $scope.game.problems.problems[$scope.current_problem_index].skeleton;
        $scope.solution_check_result = null;
        $scope.assign_id();
      }else{
        $scope.current_problem=null;
        $scope.current_problem_index = null;
        $scope.solution = null;
        $scope.solution_check_result = null;
      }
    }

    $scope.skip_problem = function(){
      $scope.notCompile = 'false';
      if($scope.source.length != 0){
        $scope.source = [];
      }
      if ($scope.remaining_problems.length>1){
        $scope.skip_problem_count += 1;
        $scope.move_to_next_unsolved_problem();
      }
    }

    $scope.check_solution_for_game = function() {
      //$scope.solution
      //$scope.current_problem
      //$scope.game.gameID
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution,
                        problem_id:$scope.current_problem,
                        game_id:$scope.game.gameID};

      var item = new $scope.SaveResource($scope.theData);
      item.$save(function(response) {
          $scope.solution_check_result = response;
          if($scope.solution_check_result.last_solved){
            //If you hardcode to the game, this will automatically advance the game to the next problem.
            $scope.fetch($scope.game.gameID);

			$scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

			$scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
			$scope.problems_progress = response;
			});
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
        $scope.notCompile = 'false';
        $scope.solution_check_result = nonErrorResult;
        $scope.ner = nonErrorResult;
        //If the solution passes, then call verify for the solution to progress in the game.
        if(nonErrorResult.solved){
          $('#pop_info_Pane').modal('show');

		  $scope.problemsModel = $resource('/jsonapi/get_problemset_progress/:problemsetID');

		  $scope.problemsModel.get({"problemsetID":$scope.LevelID}, function(response){
	      $scope.problems_progress = response;
		  });

          $scope.source = [];
          $scope.check_solution_for_game();
        }
        else{
          $('#pop_info_Pane2').modal('show');
        }
      }
      else{
        $scope.notCompile = 'true';
      }
    };

    $scope.check_dnd_permutation = function() {
      //$scope.permutation
      //$scope.tests
      //alert("permutation="+$scope.permutation);
      //Update the solution with the permutations of lines.
      $scope.permutation = "";
      $scope.permutation_lines = "";

      for (var i = 0; i < $scope.source.length; i++) {
        //alert(parseInt($scope.permutation[i]));
        $scope.permutation += $scope.source[parseInt(i)].id.toString();
      }

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
      var autocheck = $scope.autoCheck;

      if(autocheck=="yes"){
        if(nonErrorResult){
          $scope.notCompile = 'false';
          $scope.solution_check_result = nonErrorResult;
          $scope.ner = nonErrorResult;

          //If the solution passes, then call verify for the solution to progress in the game.
          if(nonErrorResult.solved){
            //$scope.check_solution_for_game();
            $('#pop_info_Pane').modal('show');
            $scope.source = [];
            $scope.check_solution_for_game();
            //if($scope.solvedProblems == $scope.game.numProblems){
              //document.getElementById("endVideo").style.visibility="visible";
              //$('#endVideo').trigger('click');
            //}
          }
          else{
            $('#pop_info_Pane2').modal('show');
          }
        }
        else{
          $scope.notCompile = 'true';
        }
      }

    };

    $scope.goStoryBoard = function(){
      $location.path("storyboard");
    };

    $scope.update_quest = function() {
      var currentNumVideos = 1;
      $resource('/jsonapi/quest/:questID').get({"questID":$scope.game.questID},
      function(response){
        $scope.quest = response;
        //alert("Retrieved quest. Could check for video unlocks here.");
      });
    };

	$scope.create_practice_game($scope.LevelID,$scope.numProblems);

	//to retrieve path info to display on path play page
	$scope.$watch('game.problems.problems[current_problem_index].name', function() {
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
 	},true);
}

function JsonRecordController($scope,$resource){
    $scope.fetch = function(){
      ///jsonapi/get_dau_and_mau?daysAgo=1&days=28
      //$scope.JRModel = $resource('/jsonapi/rest/jsonrecord?limit=2');
      $scope.JRModel = $resource('/jsonapi/get_dau_and_mau');

      $scope.JRModel.get({"daysAgo":1, "days":14}, function(response){
        $scope.items = response;
      });
    };
}

//The quest controller returns a players quests or specific quest
function QuestController($scope,$resource,$location,$routeParams,$cookieStore){

	$scope.quests = "";
	$scope.createNewQuestFlag = false;

	$scope.QuestModel = $resource('/jsonapi/quest/:id');

    //A method to fetch a generic model and id.

    $scope.fetch = function(id){
      $scope.quest = $scope.QuestModel.get({'id':id});
    };

    $scope.list = function(){
      $scope.quests = $scope.QuestModel.query();
      $scope.paths = $resource('/jsonapi/get_game_paths').get();
	  $scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
	  $scope.changeRoute = 'normal_play_page.html';
	  $scope.name = $cookieStore.get("name");
	  if($cookieStore.get("name")){
	    $scope.questID = $cookieStore.get("name").id;//retrieve quest id from Storyboard page
	  }
    };

	$scope.pathSelection=function(){
	  $('#pathSel input:image').click(function() {
	    $('#pathSel input:image').removeClass('selected');
	    $(this).addClass('selected');
	  });
	}

	$scope.pathSelectionSmall=function(){
	  $('#small-pathSel input:image').click(function() {
	    $('#small-pathSel input:image').removeClass('selected');
	    $(this).addClass('selected');
	  });
	}

	$scope.resumeQuestChallengeGame = function(storyID,path_id,difficulty){
		var questCreated = true;
		for(var i=0;i<$scope.quests.length;i++){
			//adding the filter on supported path logic.
			if(storyID==$scope.quests[i].story && path_id==$scope.quests[i].path && difficulty==$scope.quests[i].difficulty){
				$cookieStore.put("type", "questGame");
				$cookieStore.put("name", $scope.quests[i]);
				$location.path('storyboard');
			}
			else{
				questCreated = false;
			}
		}

		if(questCreated==false){
			$scope.create_quest(storyID,path_id,difficulty);
		}
	}

    //Create quest
    $scope.create_quest = function(storyID,path_id,difficulty){

        $scope.$watch('location.search()', function() {
            $scope.target = ($location.search()).target;
        }, true);

        for(var i=0;i<$scope.quests.length;i++){
            //adding the filter on supported path logic.
            if(storyID==$scope.quests[i].story && path_id==$scope.quests[i].path && difficulty==$scope.quests[i].difficulty){
                $cookieStore.put("name", $scope.quests[i]);
                $cookieStore.put("type", "questGame");
                $scope.list();
                $location.search('storyID', null);
                $location.search('difficulty', null);
                $location.search('path_ID', null);
                $location.path('storyboard');
                return;
            }
        }

        $scope.newQuest = {}
        $scope.newQuest.storyID = storyID;
        $scope.newQuest.pathID = path_id;
        $scope.newQuest.difficulty = difficulty;
        $scope.NewQuest = $resource('/jsonapi/quest');
        var new_quest = new $scope.NewQuest($scope.newQuest);

        new_quest.$save(function(response){
            $scope.quest = response;
            $cookieStore.put("name", response);
            $cookieStore.put("type", "questGame");
            $scope.list();
            $location.search('storyID', null);
            $location.search('difficulty', null);
            $location.search('path_ID', null);
            $location.path('storyboard');
        });

    };

    $scope.create_quest_game_from_QuestController = function(questID){
      console.log("creating a new game for quest from quest controller "+questID);
      $scope.NewQuestGame = $resource('/jsonapi/create_quest_game/:questID');
      $scope.NewQuestGame.get({'questID':questID}, function(response){
        $scope.game = response;
        $scope.list();
        console.log("reply for create quest game in quest model");
        //Update the parent game model by calling game fetch method.
      });
    };

    $scope.create_new_quest = function(storyID,pathID,difficulty){
      $scope.newQuest = {}
      $scope.newQuest.storyID = storyID;
      $scope.newQuest.pathID = pathID;
      $scope.newQuest.difficulty = difficulty;

      $scope.NewQuest = $resource('/jsonapi/quest');
      var new_quest = new $scope.NewQuest($scope.newQuest);
      new_quest.$save(function(response){
        $scope.quest = response;
        $scope.list();
      });
    };

    $scope.loadLinks = function(videoID){
      //check if the herf is still "Locked"
      if($scope.name.videos[videoID] == "LOCKED"){
        $('#warningBoard').modal('show');
      }
    };

    $scope.loadUnfinshed = function(quest){
	  $cookieStore.put("type", "questGame");
      $cookieStore.put("name", quest);
      $location.path('storyboard');
    };

     $scope.updateQuest = function(){
       //Make sure there is a questID before fetching or
       //you will fetch the list of quests
       if($scope.questID){
         $resource('/jsonapi/quest/:questID').get({"questID":$scope.questID},
            function(response){
              $scope.name = response;
              $cookieStore.put("name", $scope.name);
              //window.location = "index.html#/storyboard";
		 });
       }
    };

    $scope.playback = function(){
		$('#video').trigger('click');
    };

    $scope.reroute = function(){
    	if($scope.name && $scope.name.difficulty == "Drag-n-Drop"){
       	 	//$scope.changeRoute = "playPage.html";
       	 	window.location = "playPage.html"
     	 }else{
     	 	$location.path("normal-play-page");
     	 }
    };

    /*$scope.$watch('name', function() {
      if($scope.name && $scope.name.difficulty == "Drag-n-Drop"){
        $scope.changeRoute = "playPage.html";
      }
    }, true);

    $scope.list();
    $scope.updateQuest();*/

}

//Test story controller. Normally use GenericController
function StoryController($scope,$resource,$cookieStore,$location,$http,$filter,$route){
	$scope.arrayVideo = [];
	$scope.Videos = [];
	$scope.newStoryID = "";
	$scope.videoURL = "";
	$scope.description = "";
	$scope.Title = "";
	$scope.stories = "";
	$scope.publishStatus = "";
	$scope.videos = "";
	$scope.myStories = "";
	$scope.myVideos = "";
	$scope.editOrCreate = "create";
	$scope.pubStories = [];
	$scope.name = $cookieStore.get("name");
	$scope.supportedPaths = [];
	$scope.supportedPathNames = [];
	$scope.story_name = "a Story";
	$scope.current_story_name = "";
	$scope.quest_path_name = "";
	$scope.currentURL = "";

	$scope.list = function(){
		$scope.paths_unfiltered = $resource('/jsonapi/get_game_paths').get();
		$scope.StoryModel = $resource('/jsonapi/story');

	    $scope.StoryModel.query({}, function(response){
	        $scope.stories = response;
			$scope.videos = $scope.stories[0].videos;
	    	setTimeout(function () {
	    	 	$scope.pubStories = [];
				for(var i=0;i<$scope.stories.length;i++){
					//adding the filter on supported path logic.
					if($scope.stories[i].published==true && $scope.stories[i].archived == false){
						$scope.pubStories.push($scope.stories[i]);
					}
				}
				if(location.href.indexOf("storyID") > -1 && location.href.indexOf("storyID=undefined") == -1){
				  	var passed_in_storyID = location.hash.split('storyID=')[1].split("&")[0];
				  	$scope.pushUnpublishedFlag = true;
				  	$scope.currentURL = location.href;
					$scope.story_filtered = $filter('filter')($scope.stories, passed_in_storyID);
					for(var j=0;j<$scope.pubStories.length;j++){
						//adding the filter on supported path logic.
						if($scope.pubStories[j]==$scope.story_filtered[0]){
							$scope.pushUnpublishedFlag = false;
							break;
						}
					}
					if($scope.pushUnpublishedFlag){
						$scope.pubStories.push($scope.story_filtered[0]);
					}
					if($scope.story_filtered[0]){
						$scope.story_name = $scope.story_filtered[0].name;
					}
			    }
				$scope.questStoryList = $filter('groupBy')($scope.pubStories, 3);
				$scope.$parent.storyid = $scope.stories[abc].id;
				$('#largeSelectPlay').click();
	        }, 1500);
	    });
	};
    //We will need a different controller or resource to fetch player stories.
    //Maybe PlayerStoryModel = $resource('/jsonapi/player_stories');
    //Not this since we still need the public stories. $scope.StoryModel = $resource('/jsonapi/player_stories');

    var abc = 0;

	$scope.myStoryModel = $resource('/jsonapi/player_stories');
	//fetch list of
	$scope.myStorylist = function(){
          $scope.myStoryModel.query({}, function(response){
              $scope.myStories = response;
              $scope.myVideos = $scope.myStories[0].videos;
			  $scope.$parent.storyid = $scope.myStories[abc].id;
              //alert("There are "+$scope.stories.length+" stories.");
          });
    };

    // this method add background color to the selected images
    $scope.addQuestColor=function(){
		$('#myCarousel input:image').click(function() {
			$('#myCarousel input:image').removeClass('selected');
			$(this).addClass('selected');
		});
    }

    // this method add background color to the selected images
    $scope.addQuestColorSmall=function(){
		$('#myCarouselSmall input:image').click(function() {
	        $('#myCarouselSmall input:image').removeClass('selected');
	        $(this).addClass('selected');
		});
    }

	//Create story

	//1. Load all stories created by user

	//2. Edit an exiting story
	$scope.goToEditStory = function(storyID){
		$('#tabCr').addClass('active');
        $('#tabCu').removeClass('active');
        $('#tab2create').addClass('active');
        $('#tab1current').removeClass('active');

		$scope.storyModel = $resource('/jsonapi/story/:storyID');

		$scope.storyModel.get({"storyID":storyID}, function(response){
			$scope.currentStory = response;
			$scope.description = response.description;
			$scope.Title = response.name;
			$scope.Videos = response.videos;
			$scope.publishStatus = response.published;
			$scope.supportedPaths = response.supported_paths;
			$scope.supportedPathNames = [];

			for(var i=0;i<response.supported_paths.length;i++){
				$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');
				//Including details=1 returns the nested problemset progress.
				$scope.PathModel.get({"pathID":response.supported_paths[i],"details":1}, function(response1){
					$scope.supportedPathNames.push(response1.path.name);
				});
			}
			$cookieStore.put("editStory", response.id);
			console.log(response.id);
			$scope.editOrCreate = "edit";
		});
	}

	//3. Playback an existing story
	$scope.playback = function(index,isAdmin){
		if(isAdmin){
			$scope.myVideos = $scope.stories[index].videos;
		}
		else{
			$scope.myVideos = $scope.myStories[index].videos;
		}
		setTimeout(function () {
			$('#video').trigger('click');
		}, 2000);
    };
	//4. View statistics on existing story

	//5. Create or edit a Story
    $scope.create_story = function(title,des){


		$scope.newStory = {};
		$scope.newStory.name = title;
		$scope.newStory.description = des;
		$scope.newStory.videos = $scope.Videos;
		$scope.newStory.published = false;
		$scope.newStory.supported_paths = $scope.supportedPaths;

			if($scope.editOrCreate == "edit"){
				$scope.currentStoryID = $cookieStore.get("editStory");
				$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
				$http.post('/jsonapi/story/'+$scope.currentStoryID, {
								name:$scope.newStory.name,
								description:$scope.newStory.description,
								videos:$scope.newStory.videos,
								published:$scope.newStory.published,
								supported_paths: $scope.supportedPaths
				}).success(function (data, status, headers, config) {
					$scope.registration_response = data;
					$route.reload('story');
				}).error(function (data, status, headers, config) {
					$scope.registration_response = data;
				});
			}
			else{
				$scope.storyNameList = [];
				$scope.chaModel = $resource('/jsonapi/story');
				$scope.chaModel.query({}, function(response){
					$scope.storieslist = response;
					for(var i=0;i<$scope.storieslist.length;i++){
						$scope.storyNameList.push($scope.storieslist[i].name);
					}
					if($scope.storyNameList.indexOf(title) > -1){
						alert("duplicate name!");
					}
					else{
						$scope.NewStory = $resource('/jsonapi/story');
						var new_story = new $scope.NewStory($scope.newStory);
						new_story.$save(function(response){
							$scope.story = response;
							$scope.newStoryID = response.id;
							$route.reload('story');
						});
					}
				});
			}
    };

	//// once video url is added, 1. add new row in the table 2. Obtain video name 3. obtain video length
	$scope.addVideo=function(videoURL){
		//get videoID
		var video_id = videoURL.substring(videoURL.length-11);

		var req = new XMLHttpRequest();
		req.open('GET', 'http://gdata.youtube.com/feeds/api/videos/'+video_id, false);
		req.send();
		if(req.status == 200 && video_id.length==11) {
			if($scope.Videos.indexOf(video_id) > -1){
				alert("The video is already in the list!");
				$scope.videoURL="";
			}
			else{
				$scope.Videos.push(video_id);
				$scope.videoURL="";
			}
		}
		else{
			alert("The video url is not valid!");
			$scope.videoURL="";
		}
	}

    ////Enable reordering of rows under sequence column, & save the order
	$scope.moveUp = function(index){
		if (index!=0){
			var tempVideos = $scope.Videos[index-1];

			$scope.Videos[index-1] = $scope.Videos[index];

			$scope.Videos[index] = tempVideos;
		}
	};

	$scope.moveDown = function(index){
		if (index!=($scope.Videos.length-1)){
			var tempVideos = $scope.Videos[index+1];

			$scope.Videos[index+1] = $scope.Videos[index];

			$scope.Videos[index] = tempVideos;
		}
	};
   ////set story image as that of the first video thumbnail

	//6. If user is admin, enable publish(yes|no)

	////if admin made saved a story/edited a story, enable the "Publish" button

	////if user clicks publish, set published value to true, disable publish button to "Pubished"
	$scope.publish_story = function(title,des){
	   $scope.newStory = {};
	   $scope.newStory.name = title;
	   $scope.newStory.description = des;
	   $scope.newStory.videos = $scope.Videos;
	   $scope.newStory.published = true;



		$scope.currentStoryID = $cookieStore.get("editStory");
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.post('/jsonapi/story/'+$scope.currentStoryID, {
						name:$scope.newStory.name,
						description:$scope.newStory.description,
						videos:$scope.newStory.videos,
						published:true,
						archived:false
		}).success(function (data, status, headers, config) {
			$scope.registration_response = data;
		}).error(function (data, status, headers, config) {
			$scope.registration_response = data;
		});

		window.location.reload();
	};

	$scope.unpublish_story = function(title,des){
	   $scope.newStory = {};
	   $scope.newStory.name = title;
	   $scope.newStory.description = des;
	   $scope.newStory.videos = $scope.Videos;
	   $scope.newStory.published = true;



		$scope.currentStoryID = $cookieStore.get("editStory");
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.post('/jsonapi/story/'+$scope.currentStoryID, {
						name:$scope.newStory.name,
						description:$scope.newStory.description,
						videos:$scope.newStory.videos,
						published:false,
						archived:false
		}).success(function (data, status, headers, config) {
			$scope.registration_response = data;
		}).error(function (data, status, headers, config) {
			$scope.registration_response = data;
		});

		window.location.reload();
	};

	$scope.deleteVideo=function(id){
		$scope.Videos.splice(id, 1);
	};

	$scope.changeToCreate=function(){
		$scope.arrayVideo = [];
		$scope.Videos = [];
		$scope.newStoryID = "";
		$scope.videoURL = "";
		$scope.description = "";
		$scope.Title = "";
		$scope.stories = "";
		$scope.publishStatus = null;
		$scope.videos = "";
		$scope.editOrCreate = "create";
		$scope.supportedPathNames = [];
		$scope.supportedPaths = [];
	};

	//delete story
	$scope.deleteStory=function(storyID,storyName,storyDescription,stories,publish){
		$scope.newStory = {};
		$scope.newStory.name = storyName;
		$scope.newStory.description = storyDescription;
		$scope.newStory.videos = stories;
		$scope.newStory.published = publish;

		$scope.currentStoryID = $cookieStore.get("editStory");
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.post('/jsonapi/story/'+storyID, {
							name:$scope.newStory.name,
							description:$scope.newStory.description,
							videos:$scope.newStory.videos,
							published:publish,
							archived:true
		}).success(function (data, status, headers, config) {
			$scope.registration_response = data;
		}).error(function (data, status, headers, config) {
			$scope.registration_response = data;
		});
		$route.reload('story');
	};

	$scope.clear_path = function(){
		$scope.quest_pathid = undefined;
		$scope.quest_path_name = "<pick a supported path>";
		$('#pathSel input:image').removeClass('selected');
		$('#small-pathSel input:image').removeClass('selected');
	};
	$scope.update_story = function(storyid){
		//unselect path if not supported by story.
		//Later you can grey out or change image to not supported.
		$scope.storyid = storyid;
		$scope.updateURL($scope.storyid,$scope.quest_difficulty, $scope.quest_pathid);

	};
	$scope.update_difficulty = function(difficulty){
		//Check to see if difficulty is chaning from drag-n-drop.
		if($scope.quest_difficulty=="Drag-n-Drop" && difficulty!="Drag-n-Drop" ){
			console.log("Switching to normal");
			$scope.clear_path();
		}
		if($scope.quest_difficulty!="Drag-n-Drop" && difficulty=="Drag-n-Drop" ){
			console.log("Switching to Drag-n-Drop");
			$scope.clear_path();
		}
		$scope.quest_difficulty = difficulty;
		$scope.updateURL($scope.storyid,$scope.quest_difficulty, $scope.quest_pathid);
	};

	$scope.update_quest_path = function(pathID, pathName){
		$scope.quest_pathid = pathID;
	    $scope.quest_path_name = pathName;
	    $cookieStore.put("practicePathName", $scope.quest_path_name);
	    console.log("Path is currently:" + $scope.quest_path_name);
	    $scope.updateURL($scope.storyid,$scope.quest_difficulty, $scope.quest_pathid);
	    //Clear story if not supported.
	    //Filter stories based on selected language. Show others as not supported for langauge or just filter out.
		//Or just always unselect story if not supported.
	};


	//Break this up.
	$scope.updateURL=function(storyID,difficulty,path_ID){
		$scope.update_path_flag = true;
		console.log("storyID "+storyID);
		console.log("difficulty "+difficulty);
		console.log("path_ID "+path_ID);

	    $scope.storyModel = $resource('/jsonapi/story/:storyID');
	    $scope.storyModel.get({"storyID":storyID}, function(response){
            $scope.current_story_name = response.name;
            $scope.supported_paths_story = response.supported_paths;
            if($scope.supported_paths_story.length == 0){
            	$scope.update_path_flag = false;
	    	}
	    	//If path is supported, make update_path_flag false.
            if($scope.update_path_flag){
              for(var i=0;i<$scope.supported_paths_story.length;i++){
				if($scope.supported_paths_story[i] == path_ID){
					$scope.update_path_flag = false;
					break;
				}
			  }
			}

			if($scope.update_path_flag && path_ID != "" && path_ID != undefined){
		    	//$scope.storyid = undefined;
		    	//$scope.current_story_name = undefined;
		    	$scope.clear_path();
		    	//$scope.updatedStoryList = [];
				//for(var i=0;i<$scope.pubStories.length;i++){
				//	$scope.stringSupportPaths = JSON.stringify($scope.pubStories[i].supported_paths);
				//	if($scope.pubStories[i].supported_paths.length == 0){
				//		$scope.updatedStoryList.push($scope.pubStories[i]);
				//	}
				//	else if($scope.stringSupportPaths.indexOf(path_ID) >= 0){
				//		$scope.updatedStoryList.push($scope.pubStories[i]);
				//	}
				//}
				//$scope.questStoryList = $filter('groupBy')($scope.updatedStoryList, 3);
		    }
	    });
		//This is called on every setting update. Why?
	    /*
	    $resource('/jsonapi/get_game_paths').get(function(response){
	    	if(difficulty != "" && path_ID != ""){
		  		if(difficulty == "Drag-n-Drop"){
		  			for(var i=0;i<response.paths.length;i++){
						if(response.paths[i].id == path_ID){
							$scope.clear_path();
			    			//$location.search({storyID: storyID,difficulty: difficulty,path_ID: undefined});
			    			break;
						}
					}
			  	}
		  	}
	    });
	    $resource('/jsonapi/mobile_paths').query(function(response){
	    	if(difficulty != "" && path_ID != ""){
		  		if(difficulty != "Drag-n-Drop"){
			  		for(var i=0;i<response.length;i++){
						if(response[i].path_id == path_ID){
							$scope.clear_path();
			    			//$location.search({storyID: storyID,difficulty: difficulty,path_ID: undefined});
			    			break;
						}
					}
			  	}
		  	}
	    });
	*/


    }//updateURL

    $scope.updateStroyList=function(storyID,difficulty,path_ID,pathCount){
		if(storyID != "" && difficulty != "" && path_ID != ""){
			$location.search({storyID: storyID,difficulty: difficulty,path_ID: path_ID});
		}
		//alert(path_ID);
		if(pathCount != 1){
			$scope.updatedStoryList = [];
			for(var i=0;i<$scope.pubStories.length;i++){
				$scope.stringSupportPaths = JSON.stringify($scope.pubStories[i].supported_paths);
				if($scope.pubStories[i].supported_paths.length == 0){
					$scope.updatedStoryList.push($scope.pubStories[i]);
				}
				else if($scope.stringSupportPaths.indexOf(path_ID) >= 0){
					$scope.updatedStoryList.push($scope.pubStories[i]);
				}
			}
			$scope.alertFlag = true;
			for(var j=0;j<$scope.updatedStoryList.length;j++){
				$scope.updated_id = $scope.updatedStoryList[j].id;
				if(storyID == $scope.updated_id){
					$scope.alertFlag = false;
					break;
				}
			}
			if($scope.alertFlag){
				$scope.questStoryList = $filter('groupBy')($scope.updatedStoryList, 3);
				$scope.storyid = undefined;
	            $scope.current_story_name = undefined;
    			$location.search({storyID: undefined,difficulty: difficulty,path_ID: path_ID});
			}
		}
		$scope.pathModel = $resource('/jsonapi/get_path_progress/:path_ID');
		$scope.pathModel.get({"path_ID":path_ID}, function(response){
	    	$scope.quest_path_name = response.path.name;
	    	$cookieStore.put("practicePathName", $scope.quest_path_name);
	    	console.log("Path is currently:" + $scope.quest_path_name);
	    });
    }

	$scope.goToStory=function()
    {
      $location.path("story");
    };

	$scope.addPath=function(supportPath){
		if($scope.supportedPaths.indexOf(supportPath) > -1){
			alert('The path is already in the list!');
		}
		else{
				$scope.supportedPaths.push(supportPath);
				$scope.pathModel = $resource('/jsonapi/get_path_progress/:pathID');
				$scope.pathModel.get({"pathID":supportPath}, function(response){
				$scope.aPath = response.path.name;
		        $scope.supportedPathNames.push($scope.aPath);
			});
		}
	};
}

function TimeAndAttemptsController($scope,$resource){
    $scope.item = $resource('/jsonapi/attempts_and_time_by_day').get();
}

function RankController($scope,$resource,$cookieStore,$location,$filter,currentUserService){
	$scope.selectedPlayer;
	//fetch list of rankers based in the path selected by user
	$scope.get_path_ranks = function(pathId){
		//ALL Languages
		if(pathId=='AllLanguages' || !pathId){

			// based on player's country
			var data = {"countryCode":$scope.player.countryCode};
			$scope.playerCountry = $resource('/jsonapi/player');
			var nation = data.countryCode;

			$scope.pathRankModelAllSg = $resource('/jsonapi/worldwide_ranking?maxRank=25&countryCode=:country');

			$scope.pathRankModel1.get({"country":nation}, function(response){
				$scope.rankingUserCountry = response;
			});

			//worldwide ranking
			$scope.pathRankModelAllGlobal = $resource('/jsonapi/worldwide_ranking?maxRank=25');

			$scope.pathRankModelAllGlobal.get(function(response){
				$scope.rankingGlobal = response;
			});

		}
		//selected individual language
		else{
			// based on player's country
			var data = {"countryCode":$scope.player.countryCode};
			$scope.playerCountry = $resource('/jsonapi/player');
			var nation = data.countryCode;

			$scope.pathRankModel1 = $resource('/jsonapi/worldwide_ranking?maxRank=25&path_id=:pathId&countryCode=:country');

			$scope.pathRankModel1.get({"pathId":pathId,"country":nation}, function(response){
				$scope.rankingUserCountry = response;
			});

			//worldwide ranking
			$scope.pathRankModel2 = $resource('/jsonapi/worldwide_ranking?maxRank=25&path_id=:pathId');

			$scope.pathRankModel2.get({"pathId":pathId}, function(response){
				$scope.rankingGlobal = response;
			});
		}
		$cookieStore.put("path_id", pathId);
    };

  //fetch countries rank based
	$scope.get_country_ranks = function(){

        $scope.countryRank = $resource('/jsonapi/country_ranking?maxRank=300').get();

    };

	$scope.get_player_details = function(playerId){

		//alert("professional":$scope.playerNo.professional);
		$scope.selectedPlayerModel = $resource('/jsonapi/player/:playerId?load_badges=1');
		$scope.selectedPlayerModel.get({"playerId":playerId}, function(response){
			$scope.selectedPlayer = response;
        	$scope.badgeLines = $filter('groupBy')($scope.selectedPlayer.badges, 5);
		});

		$('#playerDetails').modal('show');

	}

	//onclick of country flag display country's players' ranking for the selected path

	$scope.get_countrypath_ranks = function(countryCode,countryName){
		//alert(countryCode);
		var pathId = $cookieStore.get("path_id");
		//ALL Languages
		if(pathId=='AllLanguages'){

			$scope.pathRankModelAllCountry = $resource('/jsonapi/worldwide_ranking?maxRank=25&countryCode=:countryCode');
			$scope.pathRankModelAllCountry.get({"countryCode":countryCode}, function(response){
				$scope.rankingUserCountry = response;
			});

		}
		//selected individual language
		else{

			$scope.pathRankModelPathCountry = $resource('/jsonapi/worldwide_ranking?maxRank=25&path_id=:pathId&countryCode=:countryCode');
			$scope.pathRankModelPathCountry.get({"pathId":pathId,"countryCode":countryCode}, function(response){
				$scope.rankingUserCountry = response;
			});

		}
		//render new data
		$scope.current_country = countryName;

		$('#tab1world').removeClass('active');
		$('#tab2WORLD').removeClass('active');
        $('#tab2SG').addClass('active');
        $('#tab1sg').addClass('active');
    };

    //to retrieve windows height based on screen size
    $scope.getHeight = function() {
        return $(window).height();
    };
    $scope.$watch($scope.getHeight, function(newValue, oldValue) {
        $scope.window_Height = newValue;
        $scope.window_Height_table = $scope.window_Height * 0.275;
        $scope.window_Height_country = $scope.window_Height * 0.55;
    });
    window.onresize = function(){
        $scope.$apply();
    }

    // Load default country on load
    var user = currentUserService.getUser();
    if(angular.isDefined(user.country) && angular.isDefined(user.countryCode)) {
      $scope.get_countrypath_ranks(user.countryCode, user.country);
    }
}

function FeedbackController($scope,$resource,$cookieStore,$location,$http,$filter){

    $scope.categories = [{
        category: 'Idea',
        id: 'Idea',
        icon: 'icon-exclamation-sign'
    }, {
        category: 'Question',
        id: 'Question',
        icon: 'icon-question-sign'
    }, {
        category: 'Problem',
        id: 'Problem',
        icon: 'icon-warning-sign'
    }, {
        category: 'Praise',
        id: 'Praise',
        icon: 'icon-star-empty'
    }];

    $scope.feedback_sent = false;
	//$scope.title = "Some feedback on SingPath";
	//$scope.description = "I just wanted to let you know that ..";
	$scope.hideModal = function(){
      $('#thanks').modal('hide');
	  window.location.reload();
    };
    $scope.modalMessage = 'We got your feedback! Thanks!';
	$scope.create_feedback = function(title,des,type){
		// console.log(title+" "+des+" "+type);
		$scope.newFeedback = {};
		$scope.newFeedback.name = title;
		$scope.newFeedback.description = des;
		$scope.newFeedback.category = type;

		if(title != undefined && des != undefined && type != undefined){
			$scope.NewFeedback = $resource('/jsonapi/feedback');
			var new_feedback = new $scope.NewFeedback($scope.newFeedback);
			new_feedback.$save(function(response){
				$scope.feedback = response;
				//Hide the form
                $scope.modalMessage = 'We got your feedback! Thanks!';
				$('#thanks').modal('show');
			}, function(error){
                $scope.modalMessage = 'Sorry, our feedback system is temporarily down. Please try again later.';
                $('#thanks').modal('show');
            });
		}
		else if (title == undefined && des != undefined && type != undefined){
			alert("Please enter your feedback title!");
		}
		else if(title != undefined && des == undefined && type != undefined){
			alert("Please enter your comment!");
		}
		else if(title != undefined && des != undefined && type == undefined){
			alert("Please select a feedback category!");
		}
		else if (title == undefined && des == undefined && type != undefined){
			alert("Please enter your feedback title & comment!");
		}
		else if(title == undefined && des != undefined && type == undefined){
			alert("Please select a feedback category & enter feedback title!");
		}
		else if(title != undefined && des == undefined && type == undefined){
			alert("Please select a feedback category & enter your comment!");
		}
		else{
			alert("Please fill all options!");
		}
	};
}

function CountdownController($scope,$timeout) {
    $scope.counter = -1;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
        	$scope.counter = 0;
            //alert("Time is up!");
        }
    }
    $scope.start_timer = function(countdown){
    	//Only start the timer if coundown >=0
    	if (countdown >= 0){
			$scope.counter = countdown;//countdown;
			mytimeout = $timeout($scope.onTimeout,1000);
		}
		else{
			//console.log("Timer reset");
		}
    }

	var mytimeout = null;//$timeout($scope.onTimeout,1000);
    //$scope.start_timer(5);

}

function EventController($scope, $resource, $location, $http, $route){
        $scope.event = {"name":"Default name",
                            "description": "Default description",
                            "venue": "Default venue"};
        $scope.events = [];
  		$scope.location = $location;
  		$scope.currentUrl = $location.absUrl();
		$scope.eventID = ($location.search()).eventID;
		$scope.noEventID = false;
		$scope.player = $resource('/jsonapi/player').get();
		$scope.allSchoolTypes = [{name:'University'},{name:'Secondary'},{name:'Tertiary'}];
		$scope.allSubTypes = [{name:'JC'},{name:'Poly'},{name:'Highschool'}];
		$scope.gamePaths = [];
		$scope.quests = [];
		$scope.questID = 0;
		$scope.pathID = [];
		$scope.needSubType = false;

  		//default variables for event creation
  		$scope.defaultName = 'SMU Coding Tournament';
  		$scope.defaultDescription = 'For all SMU Coders';
  		$scope.defaultCutoff = 40;
  		$scope.defaultPathID = [10030]; //Python Path ID
  		$scope.defaultSchooltypes = ["University"];
  		$scope.defaultSubtypes = [];
  		$scope.defaultVenue = 'SMU';
  		$scope.defaultStoryID = 14611860; //The Spy Who Coded Story ID
  		$scope.defaultAlertMsg = 'The following variables will be set to default: ';


        var Event = $resource('/jsonapi/event/:eventId', {eventId:'@id'});

        $scope.isNumberInteger = function(int){
        	var n = Number(int);
        	//console.log('Integer Test');
        	//console.log(/^\+?(0|[1-9]\d*)$/.test(int));
        	return /^\+?(0|[1-9]\d*)$/.test(int);

        }

        $scope.create_new_event = function(eventTitle, eventDescription, eventVenue, cutoff, eventSubType, eventSchoolType){
			console.log("Create_new_event executing..")
			if(eventTitle!=''){
				$scope.defaultName = eventTitle;
				//console.log("Event Title is " + $scope.defaultName);
			}else{
				$scope.defaultAlertMsg += '\nevent title ';
				alert($scope.defaultAlertMsg);
			}
			if(eventDescription!=''){
				$scope.defaultDescription = eventDescription;
				//console.log("Event Description is " + $scope.defaultDescription);
			}else{
				$scope.defaultAlertMsg += '\nevent description ';
			}
			if(eventVenue!=''){
				$scope.eventVenue = eventVenue;
				//console.log("Event Venue is " + $scope.eventVenue);
			}else{
				$scope.defaultAlertMsg += '\nevent venue ';
			}
			if($scope.isNumberInteger(cutoff)){
				$scope.cutoff = cutoff;
				//console.log("Event Cutoff is " + $scope.cutoff);
			}else{
				$scope.defaultAlertMsg += '\nevent cutoff ';
			}
			if(eventSubType==null){
					$scope.defaultSubtypes = [];
					//console.log("subtype null");
			}else{
					$scope.defaultSubtypes = [];
					$scope.defaultSubtypes.push(eventSubType.name);
			}
			if(eventSchoolType==null){
					$scope.defaultSchooltypes = ["University"];
					$scope.defaultSubtypes = ["None"];
			}else{
					$scope.defaultSchooltypes = [];
					$scope.defaultSchooltypes.push(eventSchoolType.name);
					//console.log($scope.defaultSchooltypes[0]==='Tertiary');
					if(eventSchoolType.name!='Tertiary'){
						$scope.defaultSubtypes = ["None"];
					}else if($scope.defaultSchooltypes[0]==='Tertiary' && $scope.defaultSubtypes[0]==null){
						$scope.defaultSubtypes = [];
						$scope.defaultSubtypes.push("Poly");
					}
			}
			console.log($scope.defaultSubtypes);
			var data = {"name":$scope.defaultName,
				"description":$scope.defaultDescription,
				"venue":$scope.defaultVenue,
				"cutoff":$scope.defaultCutoff,
				"schooltypes":$scope.defaultSchooltypes,
				"subtypes":$scope.defaultSubtypes
			}
			$scope.newEvent = $resource('/jsonapi/event');
			var new_event = new $scope.newEvent(data);
			new_event.$save(function(response){
				if(response.error) {
					console.log(response.error);
				}
				else{
					//console.log("Save New event into DB")
					//console.log(response);
					$location.path("eventsManage");
				}
			});

		};

		$scope.selectPath = function(selectedPath){
  			if($scope.pathID.length===0){
				$scope.pathID.push(selectedPath);
			}else{
				$scope.pathID=[];
				$scope.pathID.push(selectedPath);
			}
			//console.log("Selected path: " + $scope.pathID);
		}

		$scope.selectSchoolType = function(selectedSchoolType){
			//console.log(selectedSchoolType.name);
			//console.log("Default school: " + $scope.defaultSchooltypes.name);
  			if(selectedSchoolType!=null){
				$scope.defaultSchooltypes=[];
				if(selectedSchoolType.name==="Tertiary"){
					$scope.needSubType = true;
				}else{
					$scope.needSubType = false;
				}
				$scope.defaultSchooltypes.push(selectedSchoolType.name);
			}
			//console.log("Selected school: " + $scope.defaultSchooltypes.name);
			//console.log($scope.needSubType);
		}

		$scope.selectSubType = function(selectedSubType){
			if(selectedSubType!=null && $scope.needSubType){
				//console.log("Default school: " + $scope.defaultSubtypes.name);

				$scope.defaultSubtypes=[];
				$scope.defaultSubtypes.push(selectedSubType.name);

				//console.log("Selected subtype: " + $scope.defaultSubtypes.name);
			}
		}

		$scope.selectQuest = function(selectedQuest){
			$scope.questID = selectedQuest;
			//console.log("Selected quest: " + $scope.questID);
		}

		$scope.getPathNameFromPathID = function(pathID){
			$scope.populatePaths();
			for(var i=0;i<$scope.gamePaths.length;i++){
				/**
				console.log($scope.gamePaths[i].id);
				console.log(pathID);
				console.log($scope.gamePaths[i].id==pathID);
				console.log($scope.gamePaths[i].name);
				**/
				if($scope.gamePaths[i].id==pathID){
					return $scope.gamePaths[i].name;
				}
			}
		}

		// Loads all the different possible paths into the paths droplist
		$scope.populatePaths = function(){
			if($scope.gamePaths.length!=0){

			}else{
				$resource('/jsonapi/get_game_and_my_paths').get({},function(response){
				//console.log("Retrieving game paths from DB");
				$scope.gamePaths = response.paths;
				//console.log("Printing response for game paths: \n\n" + JSON.stringify($scope.gamePaths));
				});

				$resource('/jsonapi/story').query({},function(response){
				//console.log("Retrieving quests/stories from DB");
				$scope.questResponse = response;

				for(var i =0; i < $scope.questResponse.length; i++){
					$scope.quests.push($scope.questResponse[i].id);
				}
				//console.log($scope.quests);
				//console.log("Printing response for game paths: \n\n" + JSON.stringify($scope.gamePaths));
				});
			}
		}

        $scope.lock_ranking = function(id){
        	var response = $http.get('/jsonapi/lock_event_ranking/' + id);
        	//console.log("Lock Ranking - " + id + " " + response);
        	$route.reload();
        }

        $scope.get_eventID = function(){
    		$scope.eventID = ($location.search()).eventID;
    		//console.log($scope.eventID + "here3");
    		if($scope.eventID==null){
    			$scope.noEventID=true;
    		}
    	},

    	$scope.get_currentUrl = function(){
    		$scope.currentUrl =$location.absUrl();
    		//console.log($scope.currentUrl);
    	},

        // posting without and id should result in creating an object.
        $scope.fetch_event = function(id){
          var event = Event.get({eventId:id}, function() {
            $scope.last_result = event;
            //If id return event

            if(id){
                $scope.event = event;
                //console.log(event);

            }else{
            	$scope.events = event.events;
            	//console.log(event.events);
            }
          	$('#postModal').modal('hide');
          	$('#watchModal').modal('hide');

          });
        },

        $scope.create_edit_event = function(id){
          var event = Event.save({eventId:id},$scope.event, function() {
                 $scope.event = event;
            });
        },

		$scope.delete_event = function(id){
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
				$scope.current_event = response;
				var eventDetails = $scope.current_event;
				//console.log("delete_event executed here");

				var data = {"archived":true
							}
				//console.log(eventDetails.name);
				//console.log(eventDetails.description);
				//console.log(eventDetails.venue);
				//console.log(eventDetails.cutoff);
				//console.log(eventDetails.path);

				$scope.deleteEvent = $resource('/jsonapi/event/:eventId', {eventId:'@id'});
				var delete_event = new $scope.deleteEvent(data);
				delete_event.$save({eventId:id}, function(response){
					if(response.error) {
						console.log(response.error);
					}
					else{
						//console.log("Delete event in DB")
						//console.log(response);
						$route.reload();
					}
				});
			});
		};

        $scope.register_for_event = function(id,action){
          var EventRegistration = $resource('/jsonapi/eventregistration/:eventId', {eventId:'@id'});
          var thedata = {"status":action};

          var registration = EventRegistration.save({eventId:id}, thedata, function() {
          	$scope.registration = registration;
            $scope.fetch_event();
           });
        }

        $scope.go_to_eventsRanking = function(eventID){
          $location.search({"eventID":eventID}).path("eventsTable");
          //console.log(eventID);
        }

        $scope.go_to_eventsEdit = function(eventID){
          $location.search({"eventID":eventID}).path("eventsEdit");
          //console.log(eventID);
        }

        $scope.reload_eventsManage = function(eventID){
          $location.search({"eventID":eventID}).path("eventsManage");
          //console.log(eventID);
        }

        $scope.returnToPreviousPage = function() {
  			window.history.back();
		};

}

function EventTableController($scope, $resource, $route, $location, $filter, $http){
		$scope.currentUrl = $location.absUrl();
		$scope.eventID = ($location.search()).eventID;
		$scope.eventIDs = ($location.search()).eventIDs;
		$scope.noEventID = false;
    	$scope.eventTitle="";
  		$scope.eventDescription="";
  		$scope.cutoff="";
  		$scope.progLang="";
  		$scope.firstButton=false;
  		$scope.secondButton=false;
  		$scope.isEventIDs=false;
  		$scope.player = $resource('/jsonapi/player').get();
  		$scope.gamePaths = [];
  		$scope.eventcreatorCC = false; //prepare boolean value to include in send_rsvp api
  		$scope.eventMiscCC=false;
  		$scope.pathID = [];
  		$scope.rsvpResult="";
  		$scope.rsvpList = [];
  		$scope.rsvpResponse=false;
  		$scope.questResponse=[];
  		$scope.quests=[];
  		$scope.questID = 0;
		$scope.allSchoolTypes = [{name:'University'},{name:'Secondary'},{name:'Tertiary'}];
		$scope.allSubTypes = [{name:'JC'},{name:'Poly'},{name:'Highschool'}];
		$scope.schoolType = [];
		$scope.subType = [];
		$scope.selectedPathArray = [];

  		$scope.selectPath = function(selectedPath){
  			if($scope.pathID.length===0){
				$scope.pathID.push(selectedPath);
			}else{
				$scope.pathID=[];
				$scope.pathID.push(selectedPath);
			}
			//console.log("Selected path: " + $scope.pathID);
		}

		$scope.selectQuest = function(selectedQuest){
			$scope.questID = selectedQuest;
			//console.log("Selected quest: " + $scope.questID);
		}

  		  // Loads all the different possible paths into the paths droplist
		$scope.populatePaths = function(){
			if($scope.gamePaths.length!=0){

			}else{
				$resource('/jsonapi/get_game_and_my_paths').get({},function(response){
				//console.log("Retrieving game paths from DB");
				$scope.gamePaths = response.paths;
				//console.log("Printing response for game paths: \n\n" + JSON.stringify($scope.gamePaths));
				});

				$resource('/jsonapi/story').query({},function(response){
				//console.log("Retrieving quests/stories from DB");
				$scope.questResponse = response;

				for(var i =0; i < $scope.questResponse.length; i++){
					$scope.quests.push($scope.questResponse[i].id);
				}
				//console.log($scope.quests);
				//console.log("Printing response for game paths: \n\n" + JSON.stringify($scope.gamePaths));
				});
			}
		}

		$scope.getPathNameFromPathID = function(pathID){
			$scope.populatePaths();
			for(var i=0;i<$scope.gamePaths.length;i++){
				/**
				console.log($scope.gamePaths[i].id);
				console.log(pathID);
				console.log($scope.gamePaths[i].id==pathID);
				console.log($scope.gamePaths[i].name);
				**/
				if($scope.gamePaths[i].id==pathID){
					return $scope.gamePaths[i].name;
				}
			}
		}

  		$scope.get_eventIDs = function(){
    		$scope.eventIDs = ($location.search()).eventIDs;
    		//console.log("EventIDs: " + $scope.eventIDs);
    		if($scope.eventIDs!=null){
    			$scope.isEventIDs=true;
    		}
    	},

  		$scope.rsvpButton = function(eventid, decisionNum){
        	var response = $http.get('/jsonapi/eventrsvp/' + eventid + '/' + decisionNum);
        	//console.log(response);
        	//console.log('/jsonapi/eventrsvp/' + eventid + '/' + decisionNum);
        	$route.reload();
        }

  		$scope.uninvite = function(eventid, playerid){
        	var response = $http.get('/jsonapi/uninvite_for_event/' + eventid + '/' + playerid);
        	//console.log("Uninvite - " + eventid + " " + playerid + " " + response);
        }

	    //Countdown til cutoff
	    $scope.countdown = function(element,days,seconds) {
		    var time = days*24*3600 + seconds;
		    var interval = setInterval(function() {
		        var el = document.getElementById(element);
		        if(time == 0) {
		            el.innerHTML = "Ranking is locked.";
		            clearInterval(interval);
		            return;
		        }
		      //var minutes = Number.floor( time / 60 );
		        var minutes = Math.floor( time / 60 );
		        var hours = Math.floor(time/3600);
		        var days = Math.floor(time/(3600*24));

		        if (minutes < 10) minutes = "0" + minutes;
		        var seconds = time % 60;
		        if (seconds < 10) seconds = "0" + seconds;
		        var text = days +" Days "+hours%24+ " Hours "+ minutes%60 + " Minutes " + seconds+" Seconds ";
		        el.innerHTML = text;
		        time--;
		    }, 1000);
		}


		$scope.edit_event = function(id, eventTitle, eventDescription, eventVenue, cutoff, schoolTypes, subTypes, selectedPath, selectedQuest){
			//console.log("New param" + schoolTypes.name + subTypes.name + selectedQuest + selectedPath);
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
		        $scope.current_event = response;

				console.log("edit_event executed here");
				if(eventTitle==""){
					$scope.eventTitle = $scope.current_event.name;
					//console.log($scope.eventTitle);
				}else{
					$scope.eventTitle = eventTitle;
					//console.log(eventTitle);
				}
				if(eventVenue==""){
					$scope.eventVenue = $scope.current_event.venue;
				}else{
					$scope.eventVenue = eventVenue;
				}
				if(eventDescription==""){
					$scope.eventDescription = $scope.current_event.description;
				}else{
					$scope.eventDescription = eventDescription;
				}
				if(cutoff==""){
					$scope.cutoff = $scope.current_event.cutoff;
				}else{
					$scope.cutoff = cutoff;
				}
				if(subTypes==null){
					$scope.subType = $scope.current_event.subtypes;
				}else{
					$scope.subType.push(subTypes.name);
				}
				if(schoolTypes==null){
					$scope.schoolType = $scope.current_event.schooltypes;
				}else{
					$scope.schoolType.push(schoolTypes.name);
					if(schoolTypes.name!='Tertiary'){
						$scope.subType = [];
					}
				}
				/**
				if(selectedQuest==null){
					$scope.selectedQuest = $scope.current_event.story;
				}
				**/

				var data = {"name":$scope.eventTitle,
					"description":$scope.eventDescription,
					"venue":$scope.eventVenue,
					"cutoff": $scope.cutoff,
					"schooltypes": $scope.schoolType,
					"subtypes": $scope.subType
				}
				if(selectedPath!=null){
					$scope.selectedPathArray.push(selectedPath);
					var data = {"name":$scope.eventTitle,
								"description":$scope.eventDescription,
								"venue":$scope.eventVenue,
								"cutoff": $scope.cutoff,
								"schooltypes": $scope.schoolType,
								"subtypes": $scope.subType,
								"pathID": selectedPathArray
								}

				}
				$scope.editEvent = $resource('/jsonapi/event/:eventId', {eventId:'@id'});
				var edit_event = new $scope.editEvent(data);
				edit_event.$save({eventId:id}, function(response){
					if(response.error) {
						console.log(response.error);
					}
					else{
						//console.log("Edit event in DB")
						//console.log(response);
						$location.path("eventsManage");
					}
				});

			});

		};

		$scope.send_rsvp = function(messageDescription, messageTitle, includeRSVP){
			console.log("rsvp executed here")
			//console.log("RSVP List= " + $scope.rsvpList);
			if(includeRSVP==null){
				includeRSVP = false;
			}else{
				includeRSVP = true;
			}
			//console.log("rsvp value" + " " + includeRSVP);
			if(messageDescription==null){
				messageDescription = "Default Message";
			}
			if(messageTitle==null){
				messageTitle = "Default Title";
			}
			//revert if not updated
			var data = {"eventID":$scope.eventID,
						"playerIDs":$scope.rsvpList,
						"messageTitle":messageTitle,
						"messageBody":messageDescription,
						"includeRSVP": includeRSVP,
						"eventcreatorCC": $scope.eventcreatorCC,
						"eventMiscCC": $scope.eventMiscCC
						}
			/**
			var data = {"eventID":$scope.eventID,
						"playerIDs":$scope.rsvpList,
						"messageTitle":messageTitle,
						"messageBody":messageDescription,
						"includeRSVP": includeRSVP

						}
			**/
			$scope.send_rsvp = $resource('/jsonapi/send_event_message');
			var new_rsvp = new $scope.send_rsvp(data);
			new_rsvp.$save(function(response){
				if(response.error) {
					console.log(response.error);
				}
				else{
					//console.log("rsvp sent");
					//console.log($scope.rsvpList + " " + messageDescription + " " + includeRSVP);
					//console.log("RSVP response: " + response);
					/** When response is ready, then uncomment
					if(response.status==="success"){
						$scope.rsvpResponse=true;
						$scope.rsvpResult=response;
						alert("Email was sent successfully to " + response.to + "\nfrom: " + response.from + "\ncc: " + response.cc + "\nbcc: " + response.bcc + "\nsubject: " + response.subject + "\nmessage body: " + response.messageBody);
					}else{
						alert("Email was not sent successfully, please check with site administrator for more information")
					}
					**/
					$route.reload();
				}
			});

		}

		//Add/remove selected participants in an array
		$scope.addRemoveRSVPList = function(participantID){
	        if ($scope.rsvpList.indexOf(participantID) === -1) {
            	$scope.rsvpList.push(participantID);
         	}
         	else {
            	$scope.rsvpList.splice($scope.rsvpList.indexOf(participantID), 1);
         	}
		    //console.log("pushed" + participantID);
		    //console.log($scope.rsvpList);
		    //console.log($scope.rsvpList.length);
		}

		//check if rsvpList contains everyone within cutoff, if it doesn't, fill it with those within
		//cutoff, if it does, remove all within cutoff
		$scope.addCutoffToRSVPList = function(){
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
				$scope.current_event = response;
				var tempCutoffArray = [];
				var containsEveryone = false;
				for(var i =0; i < $scope.current_event.ranking.length; i++){
					if($scope.current_event.ranking[i].rank<=$scope.current_event.cutoff){
						//collect all the cutoff's playerids
						tempCutoffArray.push($scope.current_event.ranking[i].playerid);
					}
				}
				//iterate though the whole existing rsvpList, remove ids from tempCutoffArray if
				//ids can be found. the entire tempCutoffArray should be empty if rsvpList contains
				//everyone within cutoff
				for(var i =0; i < $scope.rsvpList.length; i++){
					$scope.tempCutoffArray.splice($scope.tempCutoffArray.indexOf($scope.rsvpList[i]), 1);
				}

				if(tempCutoffArray==0){
					containsEveryone = true;
				}

				for(var i = 0; i < $scope.tempCutoffArray.length; i++){
					$scope.rsvpList.splice($scope.rsvpList.indexOf($scope.tempCutoffArray[i]), 1);
				}

				/**
				for(var i =0;i< $scope.current_event.ranking.length;i++){
					if($scope.current_event.ranking[i].rank<=$scope.current_event.cutoff){
						$scope.rsvpList.splice($scope.rsvpList.indexOf($scope.current_event.ranking[i].playerid));
					}
	          		if(i<=$scope.current_event.cutoff-1){
	          			$scope.rsvpList.push($scope.current_event.ranking[i].playerid);
	          		}
	        	}
	        	**/
	        	//console.log($scope.rsvpList);
	        	//console.log($scope.rsvpList.length);
			});


		}

		$scope.addSelectedFewToRSVPList = function(){
			if($scope.secondButton){
				$scope.secondButton = false;
			}else{
				$scope.secondButton = true;
			}
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
				$scope.current_event = response;
				if($scope.rsvpList.length!=$scope.current_event.cutoff){
					for(var i =0;i< $scope.current_event.ranking.length;i++){
						if($scope.current_event.ranking[i].rank<=$scope.current_event.cutoff){
		          			$scope.rsvpList.push($scope.current_event.ranking[i].playerid);
		          		}
		        	}
		        }else{
		        	$scope.rsvpList = [];
		        }
	        	//console.log($scope.rsvpList);
	        	//console.log($scope.rsvpList.length);
			});

		}


		$scope.getRankFromID = function(playerid){
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
				$scope.current_event = response;
				for(var i = 0; i < $scope.current_event.ranking.length-1; i++){
					if($scope.current_event.ranking[i].playerid = playerid){
						return $scope.current_event.ranking[i].rank;
					}
				}
			});

		}

		//checks if rsvpList contains everyone, if it doesn't, fill it up with everyone's name
		//if it does, clear all
		$scope.addAllToRSVPList = function(){
			if($scope.firstButton){
				$scope.firstButton = false;
			}else{
				$scope.firstButton = true;
			}
			$resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
				$scope.current_event = response;
				if($scope.current_event.ranking.length!=$scope.rsvpList.length){
					$scope.rsvpList = [];
					for(var i =0;i< $scope.current_event.ranking.length;i++){
	          			$scope.rsvpList.push($scope.current_event.ranking[i].playerid);
	          		}
	        	}else{
	        		$scope.rsvpList = [];
	        	}
	        	//console.log($scope.rsvpList);
	        	//console.log($scope.rsvpList.length);
			});


		}

		$scope.addToCCList = function(partyToCC){
			if(partyToCC===("eventCreator")){
				//console.log($scope.player.player_id);
				if(!$scope.eventcreatorCC){
					$scope.eventcreatorCC=true;
					//console.log($scope.eventcreatorCC);
				}else{
					$scope.eventcreatorCC=false;
					//console.log($scope.eventcreatorCC);
				}
			}else{
				//console.log($scope.player.player_id);
				if(!$scope.eventMiscCC){
					$scope.eventMiscCC=true;
					//console.log("Misc: " + $scope.eventMiscCC);
				}else{
					$scope.eventMiscCC=false;
					//console.log($scope.eventMiscCC);
				}
			}
		}



    	$scope.get_eventID = function(){
    		$scope.eventID = ($location.search()).eventID;
    		//console.log($scope.eventID + "-> eventID");
    		if($scope.eventID==null){
    			$scope.noEventID=true;
    			//console.log($scope.noEventID + "-> noEventID");
    		}
    	}

    	$scope.get_currentUrl = function(){
    		$scope.currentUrl =$location.absUrl();
    		//console.log($scope.currentUrl);
    	}

		$scope.get_participants = function(){
	    //console.log("get_mytournaments");
	    	if($scope.eventID!=null){
		    	$resource("/jsonapi/event/" + $scope.eventID).get({},function(response){
	            	$scope.eventsData = response;

	            	//$scope.predicate = '-solvedproblems';

	            	//console.log($scope.eventsData);
        	 	})
			}

	  	};

	    $scope.get_currentPlayerRanking = function(){
	      $resource("/jsonapi/event/" + $scope.eventID).get({}, function(response){
	        $scope.current_event = response;
	        //console.log("refer here");
	        //console.log($scope.current_event);
	        $scope.total_registered = $scope.current_event.ranking.length;

          if($scope.current_event.time_to_cutoff && $scope.current_event.time_to_cutoff.days>=0){
            $scope.countdown('countdown',$scope.current_event.time_to_cutoff.days , $scope.current_event.time_to_cutoff.seconds);
          }

	        for(var i =0;i< $scope.current_event.ranking.length;i++){
	          if($scope.current_event.ranking[i].isCurrentPlayer){
	            $scope.currentPlayerRanking = i+1;
	            $scope.currentPlayerSolvedProblems = $scope.current_event.ranking[i].solvedproblems;
	            //console.log($scope.currentPlayerRanking);
	            break;
	          }
	        }

	        for(var i =0;i< $scope.current_event.ranking.length;i++){
	          if($scope.current_event.cutoff === i){
	            $scope.cutOffPlayer = $scope.current_event.ranking[i-1].nickname;
	            $scope.cutOffPlayerProblems = $scope.current_event.ranking[i-1].solvedproblems;
	            //console.log($scope.cutOffPlayer);
	            //console.log($scope.cutOffPlayerProblems);

	            break;
	          }
	        }
	        $scope.isPlayerBelowCutoff = $scope.currentPlayerRanking > $scope.current_event.cutoff;
	        //console.log($scope.isPlayerBelowCutoff);
	        $scope.hasRegisteredSchool = false;
	        if($scope.currentPlayerSolvedProblems>=0){
	        	$scope.hasRegisteredSchool = true;
	        }
	        $scope.timeToQualify = 2 * ($scope.cutOffPlayerProblems - $scope.currentPlayerSolvedProblems);
	      });
	      //console.log("getCurrentPlayerRanking" + "");
	    };

        $scope.returnToPreviousPage = function() {
  			window.history.back();
		};




}

function EZWebGameController($scope,$resource,$cookieStore,$timeout,$http,$route,$location){

	$scope.ezwebdevQns = [];
	$scope.totalQns = 0;
	$scope.qnIndex = 0;

	$scope.getEZWebDevQuestions = function(){
		$resource('/jsonapi/ezwebdevquestions').get({},function(response){
			$scope.ezwebdevcall = response;

			$scope.ezwebdevquestions = $scope.ezwebdevcall.problems.problems;
			$scope.currEZWebDevQn = $scope.ezwebdevquestions[$scope.qnIndex];

			$scope.current_level_progress = $scope.ezwebdevcall.numSolvedProblems;
			$scope.total_level_progress = $scope.ezwebdevcall.numProblems;
			$scope.nameToProblem = $scope.currEZWebDevQn.name;
			$scope.descriptionToProblem = $scope.currEZWebDevQn.description;
			$scope.skeleton = $scope.currEZWebDevQn.skeleton;
			//$scope.examples = $scope.currEZWebDevQn.examples;
			$scope.problemId = $scope.currEZWebDevQn.id;
			$scope.gameID = $scope.ezwebdevcall.gameID;
			$scope.codeType = $scope.currEZWebDevQn.interface.codeHighlightKey;
			$scope.testURL = "html/get_tests_for_last_problem.html";
			console.log($scope.codeType);
		})

	};

	$scope.renderHTML = function(){
		//console.log($scope.skeleton);
		$scope.SaveResource = $resource('/jsonapi/render_ezwebdev');
		$scope.dataToRender = {user_code:$scope.skeleton,
								problem_id:$scope.problemId,
								game_id:$scope.gameID};
		console.log($scope.dataToRender);

		var item = new $scope.SaveResource($scope.dataToRender);
		item.$save(function(response){
			$scope.renderData = response;
			$scope.examples = $scope.renderData.renderReturn;

		});
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

            //console.log("This is urlToPass " + $scope.urlToPass);

      		$scope.fill_test_iframe();
            if($scope.solution_check_result.last_solved){
                $scope.fetch($scope.game.gameID);
            }
      });



    };

	$scope.fill_iframe = function() {
      console.log("filling solution iFrame");
      var iFrame = angular.element( document.querySelector( '#anIframe' ) );
      iFrame.attr("src",'data:text/html;charset=utf-8,' +encodeURI($scope.skeleton));
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
      iframe.attr("src", $scope.testURL);//'data:text/html;charset=utf-8,' +encodeURI($scope.game.problems.problems[$scope.current_problem_index].examples));
      var scopeToShare = angular.element(document.querySelector('[ng-controller="EZWebGameController"]')).scope().urlToPass;
      console.log(scopeToShare + " from fill");
      //document.getElementById("testIframe").contentWindow.angular.element();
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



}

function EZWebDevController($scope,$resource,$cookieStore,$timeout,$http,$route,$location){

	$scope.ezwebdevQns = [];
	$scope.totalQns = 0;
	$scope.qnIndex = 0;

	$scope.getEZWebDevQuestions = function(){
		$resource('/jsonapi/ezwebdevquestions').get({},function(response){
			$scope.ezwebdevcall = response;

			$scope.ezwebdevquestions = $scope.ezwebdevcall.problems.problems;
			$scope.currEZWebDevQn = $scope.ezwebdevquestions[$scope.qnIndex];

			$scope.current_level_progress = $scope.ezwebdevcall.numSolvedProblems;
			$scope.total_level_progress = $scope.ezwebdevcall.numProblems;
			$scope.nameToProblem = $scope.currEZWebDevQn.name;
			$scope.descriptionToProblem = $scope.currEZWebDevQn.description;
			$scope.skeleton = $scope.currEZWebDevQn.skeleton;
			//$scope.examples = $scope.currEZWebDevQn.examples;
			$scope.problemId = $scope.currEZWebDevQn.id;
			$scope.gameID = $scope.ezwebdevcall.gameID;
			//console.log($scope.currEZWebDevQn);
		})

	};

	$scope.renderHTML = function(){
		//console.log($scope.skeleton);
		$scope.SaveResource = $resource('/jsonapi/render_ezwebdev');
		$scope.dataToRender = {user_code:$scope.skeleton,
								problem_id:$scope.problemId,
								game_id:$scope.gameID};
		console.log($scope.dataToRender);

		var item = new $scope.SaveResource($scope.dataToRender);
		item.$save(function(response){
			$scope.renderData = response;
			$scope.examples = $scope.renderData.renderReturn;

		});
	};

}

/**
 * Should fetch:
 *
 * - the list of language (aka interfaces) availables
 * - the list of path avialable for a language once one is selected
 * - the list of levels (aka problemSets) for a path once a path is selected
 * - the list of problems for a level once one is selected.
 * - the details of a problem once a problem is selected
 *
 * The controller should be able to test a solution against private
 * and public tests and to save any changes.
 *
 * Intead of using an existing path, level or problem, the controller should
 * be able the create new ones.
 *
 * Paths and levels require a name and a description to be create. A path
 * requires an interface_id. A level requires path_id
 *
 * A problem require an interface_id, a name, some details (aka descriptions),
 * a solution_code and a publicTests. It may also have a path_id and
 * a level_id (default ones will be used otherwise), privatesTest,
 * a skeleton and some examples.
 *
 * If a problem is being edited it should have a problem_id.
 *
 * TODO: allow to edit names of existing problem.
 * TODO: handle success and error message.
 *
 */
function EditProblemController($scope, $http, $q, $routeParams, $window, permutations, Timer) {
    var postConfig = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            if (!data) {
                return;
            }

            return $window.jQuery.param(data);
        }
    };

    /**
     * Get the list of interface
     */
    $scope.getInterfaces = function() {
        $scope.loadingInterfaces = true;
        return $http.get('/jsonapi/interfaces').then(function(resp) {

            if (!resp.data.interfaces) {
                $window.alert('error: Could not fetch the interface');
                return $q.reject(resp.data);
            }

            $scope.interfaces = resp.data.interfaces;

            return $scope.interfaces;
        }).always(function(){
            $scope.loadingInterfaces = false;
        });
    }


    /**
     * Reset the list of paths (`$scope.paths`).
     *
     * Reset, no path can be selected and the list of levels should be reset
     * as a result.
     *
     */
    $scope.resetPaths = function() {
        $scope.paths = [];
        $scope.path = null;
        $scope.resetLevels();
    };

    /**
     * Fetch the list of path available for language (that the editor can edit)
     *
     * The result will be saved into `$scope.paths` .
     *
     */
    $scope.getPaths = function(language) {

        $scope.resetPaths();

        if (!language || !language.id) {
            return $q.reject('language is not set or has no id');
        }

        $scope.loadingPaths = true;
        return $http.get('/jsonapi/get_my_paths?interface_id=' + language.id).then(function(resp){
            if (!resp.data.paths) {
                $window.alert('error: could not fetch paths.');
                return $q.reject(resp.data);
            }
            $scope.paths = resp.data.paths;
            return $scope.paths;
        }).always(function(){
            $scope.loadingPaths = false;
        });
    };

    /**
     * Initiate a new path (`$scope.newPath`)
     *
     */
    $scope.createNewPath = function(language) {
        $scope.newPath = {
            interface_id: language.id
        };
    };

    /**
     * Save a new path
     *
     * newPath should have an interface_id, a name and a description.
     *
     * If a new path is successfully created the path should be added to the
     * list of path and the list of levels should be reset.
     *
     */
    $scope.saveNewPath = function(newPath) {
        $scope.creatingPath = true;
        $http.post('/jsonapi/new_path', newPath, postConfig).then(function(resp){
            if (!resp.data.path_id) {
                $window.alert('error: could not not save the new path');
                return $q.reject(resp.data);
            }

            newPath.id = resp.data.path_id;
            $scope.paths.push(newPath);
            $scope.path = newPath;
            $scope.cancelNewPath();
            $scope.resetLevels();
        }).always(function(){
            $scope.creatingPath = false;
        });
    };

    /**
     * reset `$scope.newPath`
     *
     */
    $scope.cancelNewPath = function() {
        $scope.newPath = null;
    };


    /**
     * Reset the list of levels (`$scope.problemSets`)
     *
     * Reset, no level can be selected and the list of problems should be reset
     * as a result.
     */
    $scope.resetLevels = function() {
        $scope.problemSets = [];
        $scope.problemSet = null;
        $scope.problemSetEdit = null;
        $scope.resetProblems();
    };

    /**
     * Fetch the list of level available for a path.
     *
     * The list will be saved in `$scope.problemSets`.
     *
     */
    $scope.getLevels = function (path) {

        $scope.resetLevels();

        if (!path || !path.id) {
            return $q.reject('path is not set or has no id');
        }

        $scope.loadingLevels = true;
        return $http.get('/jsonapi/problemsets/' + path.id).then(function(resp){
            if (!resp.data.problemsets) {
                $window.alert('error: could not get the levels.');
                return $q.reject(resp.data);
            }

            $scope.problemSets = resp.data.problemsets;
            return $scope.problemSets;
        }).always(function(){
            $scope.loadingLevels = false;
        });
    };

    /**
     * Initiate new level for a path (`$scope.newLevel`).
     *
     */
    $scope.createNewLevel = function(path) {
        $scope.newLevel = {
            path_id: path.id
        };
    };

    /**
     * Save the new level
     *
     * a level should have a path_id, a name and a description.
     *
     * If the level is create, it should be added to level list and the list
     * of problems should be reset.
     *
     */
    $scope.saveNewLevel = function(newLevel) {

        $scope.creatingLevel = true;
        $http.post('/jsonapi/new_problemset', newLevel, postConfig).then(function(resp) {
            if (!resp.data.problemset_id) {
                $window.alert('error: could not save the new level.');
                return $q.reject(resp.data);
            }

            newLevel.id = resp.data.problemset_id;
            $scope.problemSets.push(newLevel);
            $scope.problemSet = newLevel;
            $scope.cancelLevelEdit();
            $scope.resetProblems();
        }).always(function(){
            $scope.creatingLevel = false;
        });
    };

    /**
     * Reset `$scope.newLevel`.
     */
    $scope.cancelLevelEdit = function() {
        $scope.newLevel = null;
        $scope.problemSetEdit = null;
    };

    /**
     * Start renaming the selected level
     */
    $scope.editLevel = function(problemSet) {
      $scope.problemSetEdit = {
        problemset_id: problemSet.id,
        name: problemSet.name,
        description: problemSet.description
      };
    };

    /**
     * Save new name for problem set
     */
    $scope.saveLevel = function(problemSetEdit) {
      $http.post('/jsonapi/edit_problemset', problemSetEdit, postConfig).then(function(resp) {
        if (resp.data.successful || resp.data.success) {
          $scope.problemSet.name = problemSetEdit.name;
          $scope.problemSet.description = problemSetEdit.description;
          $scope.cancelLevelEdit();
        } else {
          $window.alert('Failed to rename the problem set.');
        }

        return resp;
      });
    };


    /**
     * Reset the list of problem (`$scope.problems`)
     *
     * Since no problem can be selected at that point, the problem details
     * should be reset.
     *
     */
    $scope.resetProblems = function() {
        $scope.problems = [];
        $scope.problem = null;
        $scope.resetProblemDetails();
    };

    /**
     * Fetch the list of problems for the a level.
     *
     * The problems will be saved into `$scope.problems`
     *
     */
    $scope.getProblems = function(problemSet) {
        $scope.resetProblems();

        if (!problemSet || !problemSet.id) {
            return $q.reject('problemSet is not set or has no id');
        }

        $scope.loadingProblems = true;
        return $http.get('/jsonapi/problems/' + problemSet.id).then(function(resp){
            if (!resp.data.problems) {
                $window.alert('error: could not get the new level.');
                return $q.reject(resp.data);
            }

            $scope.problems = resp.data.problems;
            return $scope.problems;
        }).always(function(){
            $scope.loadingProblems = false;
        });
    };

    /**
     * Initiate a new problem (`$scope.newProblem`) for a level.
     *
     */
    $scope.createNewProblem = function(problemSet) {
        $scope.newProblem = {
            problemset_id: problemSet.id
        };
    };

    /**
     * Add the new problem to the list of problems.
     *
     * It should have a name.
     *
     * TODO: set problemorder attribute
     */
    $scope.StartNewProblem = function(newProblem){
        $scope.problem = newProblem;
        $scope.problems.push(newProblem);
        $scope.cancelNewProblem();
        $scope.resetProblemDetails();
    };

    /**
     * Reset `$scope.newProblem`.
     */
    $scope.cancelNewProblem = function() {
        $scope.newProblem = null;
    };

    /**
     * Move up problem in the level and decrease its problemsetorder
     * property (position 1 being the top position).
     *
     * Should update the problem list order after a successful change.
     *
     * TODO: fix, shouldn't assume consecutive positions.
     *
     */
    $scope.moveUp = function(problem) {
        var data = {
            problem_id: problem.id,
        };

        $scope.movingProblem = true;
        $http.post('/jsonapi/move_problem_up', data, postConfig). then(function(resp) {
            var next, target = problem.problemsetorder - 1;

            if (!resp.data.success) {
                $window.alert('error: could not move problem up.');
                return $q.reject(resp.data);
            }

            next = $scope.findProblem(target);
            problem.problemsetorder = target;

            if (!next) {
                return;
            }
            next.problemsetorder += 1;
            $scope.sortProblems();
        }).always(function(){
            $scope.movingProblem = false;
        });
    };

    /**
     * Move down the problem in the level and increase its problemsetorder
     * property (position 1 being the top position).
     *
     * Should update the problem list order after a successful change.
     *
     * TODO: fix, shouldn't assume consecutive positions.
     *
     */
    $scope.moveDown = function (problem) {
        var data = {
            problem_id: problem.id,
        };

        $scope.movingProblem = true;
        $http.post('/jsonapi/move_problem_down', data, postConfig). then(function(resp) {
            var prev, target = problem.problemsetorder + 1;

            if (!resp.data.success) {
                $window.alert('error: could not move problem down.');
                return $q.reject(resp.data);
            }

            prev = $scope.findProblem(target);
            problem.problemsetorder = target;

            if (!prev) {
                return;
            }
            prev.problemsetorder -= 1;
            $scope.sortProblems();
        }).always(function(){
            $scope.movingProblem = false;
        });
    }

    /**
     * Sort problems by their position
     *
     * TODO: handle problem without order.
     */
    $scope.sortProblems = function() {
        $scope.problems.sort(function(a, b) {
            return a.problemsetorder - b.problemsetorder;
        });
    };

    /**
     * Find a problem by its position.
     *
     */
    $scope.findProblem = function(position) {
        if ($scope.problems[position-1] && $scope.problems[position-1].problemsetorder === position) {
            return $scope.problems[position-1];
        }

        for (var i = 0; i < $scope.problems.length; i++) {
            if ($scope.problems[i].problemsetorder === position) {
                return $scope.problems[i];
            }
        };
    };


    /**
     * Reset the problem details
     * (`$scope.problemDetails` and `$scope.problemMobile`)
     *
     */
    $scope.resetProblemDetails = function() {
        $scope.problemDetails = {};
        $scope.problemMobile = null;

        if ($scope.problem && $scope.problem.name) {
          $scope.problemDetails.name = $scope.problem.name;
        }
    };

    /**
     * Fetch the details of a problem
     *
     */
    $scope.getProblemDetails = function(problem) {
        var details, mobile;

        $scope.resetProblemDetails();

        if (!problem || !problem.id) {
            return $q.reject('problem is not set or has no id');
        }

        details = $http.get('/jsonapi/get_problem?problem_id=' + problem.id).then(function(resp){
            if (!resp.data.problem) {
                return {};
            }

            $scope.problemDetails = resp.data.problem;
            return $scope.problemDetails;
        });

        mobile = $http.get('/jsonapi/mobile_problem/' + problem.id).then(function(resp) {
            if (resp.data.error) {
                return {};
            }

            $scope.problemMobile = resp.data;
            return $scope.problemMobile;
        });

        return $q.all({
            'problemDetails': details,
            'problemMobile': mobile
        });
    };

    $scope.deleteProblem = function(problem) {
      if ($window.confirm("Are you sure you want to delete that problem?")) {
        $http.get('/jsonapi/delete_problem?problem_id=' + problem.id).then(function() {
          for (var i = 0; i < $scope.problems.length; i++) {
            if ($scope.problems[i].id == problem.id) {
              $scope.problems.splice(i, 1);
              $scope.problem = null;
              $scope.resetProblemDetails();
              return;
            }
          }
        });
      }
    };

    /**
     * Test problem solution against its public and private tests.
     *
     * The test result will saved into $scope.testRun.
     *
     * $scope.testRun.solved will indicate if the solution successfully run.
     *
     */
    $scope.runTests = function () {
        var publicData = {
                interface_id: $scope.interface.id,
                source_code: $scope.problemDetails.solution,
                examples: $scope.problemDetails.examples,
                tests: $scope.problemDetails.tests || ""
            },
            privateData = {
                interface_id: $scope.interface.id,
                source_code: $scope.problemDetails.solution,
                examples: $scope.problemDetails.examples,
                tests: $scope.problemDetails.other_tests || ""
            };

        $scope.resetTestRun();
        $http.post('/jsonapi/check_code_with_interface', publicData, postConfig).then(function(resp) {
            $scope.testRun = resp.data;
            $scope.testRun.testType = "public";

            if (!resp.data.solved) {
                return $q.reject(resp);
            }

            return $http.post('/jsonapi/check_code_with_interface', privateData, postConfig);
        }).then(function(resp) {
            $scope.testRun = resp.data;
            if(!$scope.testRun.testType) {
                $scope.testRun.testType = "private"
            }

            if (resp.data.error) {
                return $q.reject(resp);
            }
        });
    }

    /**
     * reset `$scope.resetTestRun`
     *
     */
    $scope.resetTestRun = function() {
        $scope.testRun = {};
        $scope.build.reset();
    };

    // The tests need to be run again if those expressions change.
    $scope.$watch('interface', $scope.resetTestRun);
    $scope.$watch('problemDetails.solution', $scope.resetTestRun);
    $scope.$watch('problemDetails.examples', $scope.resetTestRun);
    $scope.$watch('problemDetails.tests', $scope.resetTestRun);
    $scope.$watch('problemDetails.privateTests', $scope.resetTestRun);


    $scope.build = {
        rate: 200,
        maxToken: 5,
        maxRetries: 50,
        permutations: {
            remaining: [],
            passing: 0,
            failing: 0,
            errors: 0,
            total: 0,
            retries: 0,

            reset: function (argument) {
                this.remaining = [];
                this.passing = 0;
                this.failing = 0;
                this.errors = 0;
                this.total = 0;
                this.retries = 0;
            },

            checked: function() {
                return this.passing + this.failing + this.errors;
            },

            progress: function() {
                if (!this.total) {
                    return 100;
                }

                return (this.checked() * 100 / this.total);
            }
        },

        required: function () {
            return $scope.problemMobile && !$scope.build.built();
        },

        reset: function() {
            $scope.timer = null;
            $scope.build.stop();
            $scope.build.token = $scope.build.maxToken;
            $scope.build.started = false;
            $scope.build.permutations.reset();

            if (!$scope.build.verificationUrls) {
                $scope.build.verificationUrls = [];
            }
        },

        sync: function (problemDetails) {
            $scope.problemMobile.tests = problemDetails.tests;
            $scope.problemMobile.current_solution = problemDetails.solution;
            $scope.problemMobile.solution = problemDetails.solution;
            $scope.problemMobile.lines = problemDetails.solution.match(/[^\r\n]+/g);
            $scope.problemMobile.examples = problemDetails.examples;
            $scope.problemMobile.name = problemDetails.name;
            $scope.problemMobile.nonErrorResults = {};
            // TODO: what is depth?
            $scope.problemMobile.depth = $scope.problemMobile.lines.length;
        },

        start: function (problemDetails, verificationUrls) {
            $scope.build.reset();
            $scope.build.sync(problemDetails);

            $scope.build.started = true;
            $scope.build.permutations.remaining = permutations($scope.problemMobile.depth);
            $scope.build.permutations.total = $scope.build.permutations.remaining.length;

            $scope.build.timer = new Timer();
            $scope.build.run(verificationUrls);
        },

        stop: function (argument) {
            if (!$scope.build.runInterval) {
                return;
            }
            $window.clearInterval($scope.build.runInterval);
            $scope.build.timer.stop();
            $scope.build.runInterval = null;
        },

        sortResults: function (resp) {
            var permKey;

            if (resp.errors) {
                $scope.build.permutations.errors +=1;
                return;
            }

            permKey = resp.permutation.join('');
            delete resp.permutation;

            $scope.problemMobile.nonErrorResults[permKey] = resp;
            if (resp.solved === true) {
                $scope.build.permutations.passing +=1;
            } else {
                $scope.build.permutations.failing +=1;
            }
        },

        retry: function (perm) {
            $scope.build.permutations.retries += 1;
            $scope.build.permutations.remaining.push(perm);
        },

        run: function (verificationUrls) {
            var i = 0;

            $scope.build.runInterval = $window.setInterval(function () {
                var perm,
                    url = verificationUrls[i++ % verificationUrls.length];

                if ($scope.build.token === 0) {
                    $scope.$digest();
                    return;
                }

                perm = $scope.build.permutations.remaining.pop();
                if (!perm) {
                    if (!$scope.build.pending()) {
                        $scope.build.stop();
                        $scope.$digest();
                    }
                    return;
                }
                if($scope.build.permutations.retries >= $scope.build.maxRetries) {

                    if (!$scope.build.pending()) {
                        $window.alert("Too many failed request. There might be problem the verification server");
                        $scope.build.retry(perm);
                        $scope.build.stop();
                        $scope.$digest();
                    }
                    return;
                }

                $scope.build.token -= 1;
                $scope.build.verify(
                    perm,
                    $scope.problemMobile.lines,
                    $scope.problemMobile.tests,
                    url
                ).then(
                    $scope.build.sortResults,
                    $scope.build.retry
                ).always(function () {
                    $scope.build.token += 1;
                });

                $scope.$digest();
            }, $scope.build.rate);
        },

        running: function () {
            return (
                angular.isDefined($scope.build.runInterval) &&
                $scope.build.runInterval !== null
            );
        },

        built: function () {
            var permLeft = (
                    $scope.build.permutations.remaining &&
                    $scope.build.permutations.remaining.length > 0
                );

            return $scope.build.started && !permLeft && !$scope.build.pending();
        },

        pending: function() {
            return $scope.build.token < $scope.build.maxToken;
        },

        verify: function (perm, lines, tests, url) {
            var solution, jsonRequest;

            try {
                solution = perm.map(function(lineNumber) {
                    return lines[lineNumber-1];
                }).join('\n');

                jsonRequest={
                    'solution': solution,
                    'tests': tests
                };

                url += url.indexOf('?') > -1 ? '&vcallback=JSON_CALLBACK' : '?vcallback=JSON_CALLBACK';
            } catch(e) {
                // TODO: reject instead
                return $q.when('Something went very wrong...');
            }

            return $http.jsonp(
                url,
                {
                    params: {
                        'jsonrequest': btoa(JSON.stringify(jsonRequest)),
                        'key': perm.join('')
                    }
                }
            ).then(function(resp) {
                    var result = {
                        permutation: perm
                    };

                    if (resp.data.errors) {
                        result.errors = resp.data.errors;
                    } else if ('solved' in resp.data) {
                        result.solved = resp.data.solved;
                        result.results = resp.data.results;
                    } else {
                        return $q.reject(perm);
                    }

                    return result;

                },
                function(resp) {
                    return $q.reject(perm);
                }
            );
        },

        save: function () {
            var data = {
                'problem_id': $scope.problemMobile.problem_id,
                'nonErrorResults': $scope.problemMobile.nonErrorResults
            };

            return $http.post('/jsonapi/update_mobile_problem', data).then(function(resp) {
                if ('error' in resp.data) {
                    $window.alert('error saving mobile problem');
                    return $q.reject(resp.data);
                }

                $scope.problemMobile = resp.data;
                return $scope.problemMobile;
            });
        }
    };

    /**
     * Save changes or create a problem
     *
     */
    $scope.save = function() {
        var url,
            data = {
                path_id: $scope.path.id,
                interface_id: $scope.interface.id,
                level_id: $scope.problemSet.id,
                name: $scope.problemDetails.name,
                details: $scope.problemDetails.description,
                solution_code: $scope.problemDetails.solution,
                skeleton_code: $scope.problemDetails.skeleton,
                examples: $scope.problemDetails.examples,
                publicTests: $scope.problemDetails.tests,
                privateTests:$scope.problemDetails.other_tests
            };

        if ($scope.problemDetails.problem_id) {
            data.problem_id = $scope.problemDetails.problem_id;
            url = '/jsonapi/edit_problem';
        } else {
            url = '/jsonapi/new_problem';
        }

        // Mobile problem cannot have private test.
        if ($scope.problemMobile) {
            data.privateTests = "";
        }

        $scope.savingProblem = true;
        $http.post(url, data, postConfig).then(function(resp){
            $scope.resetTestRun();

            if (!resp.data.problem_id) {
                $window.alert('error: could not save problem.');
                return $q.reject(resp);
            }

            $scope.problemDetails.problem_id = resp.data.problem_id;
            $scope.problem.id = resp.data.problem_id;
            $window.alert('problem saved');

            if ($scope.problemMobile) {
                return $scope.build.save();
            }
        }).then(function (problemMobile) {
            if (problemMobile) {
                $window.alert('mobile problem saved');
            }
        }).always(function(){
            $scope.savingProblem = false;
        });
    };

    /** init **/

    var interfacePromise = $scope.getInterfaces();

    if ($routeParams.problemId) {
        var problem;

        $q.all({
            interfaces: interfacePromise,
            problem: $scope.getProblemDetails({'id': $routeParams.problemId})
        }).then(function(results) {
            problem = results.problem;

            for (var i = 0; i < results.interfaces.length; i++) {
                if (results.interfaces[i].id === problem.problemDetails.interface_id) {
                    $scope.interface = results.interfaces[i];
                    return $scope.getPaths(results.interfaces[i]);
                }
            }

            var msg = 'Interface not found. It does not exist or you cannot edit it';
            $window.alert(msg);
            return $q.reject(msg);
        }).then(function(paths) {
            for (var i = 0; i < paths.length; i++) {
                if (paths[i].id === problem.problemDetails.path_id) {
                    $scope.path = paths[i];
                    return $scope.getLevels(paths[i]);
                }
            }

            var msg = 'Path not found. It does not exist or you cannot edit it';
            $window.alert(msg);
            return $q.reject(msg);
        }).then(function(levels) {
            for (var i = 0; i < levels.length; i++) {
                if (levels[i].id === problem.problemDetails.problemset_id) {
                    $scope.problemSet = levels[i];
                    return $scope.getProblems(levels[i]);
                }
            }

            var msg = 'Level not found. It does not exist or you cannot edit it';
            $window.alert(msg);
            return $q.reject(msg);
        }).then(function(problems) {
            for (var i = 0; i < problems.length; i++) {
                if (problems[i].id === problem.problemDetails.problem_id) {
                    $scope.problem = problems[i];
                    return problems[i]
                }
            }
            var msg = 'Problem not found. It does not exist or you cannot edit it';
            $window.alert(msg);
            return $q.reject(msg);
        }).then(
            function() {
                $scope.problemDetails = problem.problemDetails;
                $scope.problemMobile = problem.problemMobile;
            },
            function() {
                $window.alert('failed to found the problem.');
            }
        );
    }

    if ($scope.interface) {
        return;
    }

    interfacePromise.then(function(interfaces) {
        $scope.interface = interfaces[0];
        $scope.getPaths($scope.interface);
    });

}
