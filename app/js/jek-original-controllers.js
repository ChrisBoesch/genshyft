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

function PlayerController($scope,$resource,$location,$cookieStore,$http){
	$scope.list=function(){
		$scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
	    $scope.player = $resource('/jsonapi/player').get();
		$scope.tags = $resource('/jsonapi/tags').get();
	    $scope.$watch('player', function() {
	    	$scope.current_country = $scope.player.country;
	    },true);
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
   			$location.search('storyID', null);
   			$location.search('difficulty', null);
   			$location.search('path_ID', null);
			$cookieStore.put("pid", paid);
			$location.path("practice");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
    $scope.login=function(){
  
    }; 
	
	$scope.checkQuestLogin = function(){
		if($scope.player.nickname){
			$location.search('storyID', null);
   			$location.search('difficulty', null);
   			$location.search('path_ID', null);
			$location.path("quests");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkPracticeLogin = function(){
		if($scope.player.nickname){
			$location.path("practice");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkStoryLogin = function(){
		$location.search('storyID', null);
		$location.search('difficulty', null);
		$location.search('path_ID', null);
		if($scope.player.nickname){
			$location.path("story");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkChallengesLogin = function(){
		$location.search('storyID', null);
		$location.search('difficulty', null);
		$location.search('path_ID', null);
		if($scope.player.nickname){
			$location.path("challenges");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkRankingLogin = function(){
		$location.search('storyID', null);
		$location.search('difficulty', null);
		$location.search('path_ID', null);
		if($scope.player.nickname){
			$location.path("ranking");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkFeedbackLogin = function(){
		$location.search('storyID', null);
		$location.search('difficulty', null);
		$location.search('path_ID', null);
		if($scope.player.nickname){
			$location.path("feedback");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	$scope.checkProfileLogin = function(){
		$location.search('storyID', null);
		$location.search('difficulty', null);
		$location.search('path_ID', null);
		if($scope.player.nickname){
			$location.path("profile");
		}
		else{
			alert("Please login with FaceBook or Google Account first!");
		}
	};
	
	
    $scope.update_player_profile = function($event){  
  
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

function InterfaceController($scope,$resource){
    $scope.interfaces = $resource('/jsonapi/interfaces').get();
}

function PathController($scope,$resource,$cookieStore,$location,$filter){
	//Assuming this is what you wanted by calling list in ng-init
    $scope.fetch_game_paths = function(){
		$scope.game_paths = $resource('/jsonapi/get_game_paths').get();		
    };

    $scope.list = function(){
    	$scope.paths_unfiltered = $resource('/jsonapi/get_game_paths').get();
		$scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
		$scope.abc = $cookieStore.get("pid");
		$scope.player_progress = $resource('/jsonapi/get_all_path_progress').query();
		$scope.lvlName = 1;
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

	if(location.href.indexOf("path_ID") > -1){
		var passed_in_path_ID = location.hash.split('path_ID=')[1].split("&")[0];
		setTimeout(function () {
			$scope.path_filtered = $filter('filter')($scope.paths_unfiltered.paths,passed_in_path_ID);
			if($scope.path_filtered[0]){
				$scope.path_name = $scope.path_filtered[0].name;
			} else {
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

	}
	
	$scope.changePath = function (pathid){
		$scope.path_ID = pathid;
		$scope.update_path_progress(pathid);
		if(pathid != "" && $scope.difficulty != ""){
			$location.search({path_ID: pathid, difficulty: $scope.difficulty});
		}
		$scope.pathModel = $resource('/jsonapi/get_path_progress/:path_ID');
		$scope.pathModel.get({"path_ID":pathid}, function(response){
	    	$scope.practice_path_name = response.path.name;
	    });
	};
	
	//change the difficulty level as well as the path level detail table
	$scope.changeDifficulty = function(difficulty){
		$scope.difficulty = difficulty;
		if(difficulty != "" && $scope.path_ID != ""){
			$location.search({path_ID: $scope.path_ID, difficulty: difficulty});
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
			if($scope.difficulty == "Drag-n-Drop"){
				window.location.href = "practice_play_page.html";
			}
			else{
				window.location.href = "normal_play_page.html";
			}
		}
		else{
			$('#levelBlock').modal('show');
			//console.log("Please clear previous level problems to unlock this level!");
		}
	};
	
	$scope.hideModal = function(){
		$('#levelBlock').modal('hide');
	};
			
    $scope.get_player_progress = function(){
        $scope.player_progress = $resource('/jsonapi/get_player_progress').get();
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
		}, 2000);
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

function ProblemController($scope,$resource){
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
    }

}


function BadgeController($scope,$resource){
	$scope.loadAllBadges = function(){
		$scope.badgepathNames = [];
		$scope.badgepathIDs = [];
		$resource('/jsonapi/badges_for_current_player').get({},function(response){
			$scope.playerBadges = response.badges;
			for( var i=0; i<$scope.playerBadges.length; i++){
				if($scope.badgepathIDs.indexOf($scope.playerBadges[i].pathID) <= -1 && $scope.playerBadges[i].pathID != null){
					$scope.badgepathIDs.push($scope.playerBadges[i].pathID);
					
					$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');

					//Including details=1 returns the nested problemset progress.
					$scope.PathModel.get({"pathID":$scope.playerBadges[i].pathID}, function(response1){
					$scope.badgepathNames.push(response1.path.name);
					});					
				}
			}	
			$scope.list_paths= function(){
				$scope.pathModel = $resource('/jsonapi/get_game_paths');		
				$scope.pathModel.get({}, function(response){
					$scope.ListAllPaths = response.paths;			
				});		
			};
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
		$scope.difficulty="";
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
		$scope.newChallenge.totalDays=$scope.totalDays;
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
		else if($scope.newChallenge.description==""){
			alert("The challenge description cannot be empty!");
		}
		else if($scope.newChallenge.publicMessage==""){
			alert("The challenge public Message cannot be empty!");
		}
		else if($scope.newChallenge.privateMessage==""){
			alert("The challenge private Message cannot be empty!");
		}
		else if($scope.newChallenge.endDate <= $scope.newChallenge.startDate && $scope.newChallenge.startDate >= $scope.todayDate){
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
					$('#challengeCreated').modal('show');
				}
			}
		}
		
		//setTimeout('window.location="index.html#/challenges"',1000);
		
    };
	
	$scope.hideSuccessModal = function(){
		$scope.NewChallenge = $resource('/jsonapi/save_edit_challenge');
		var new_challenge = new $scope.NewChallenge($scope.newChallenge);
		new_challenge.$save(function(response){
			$scope.challenge = response;
			console.log("new badge "+response);
			$scope.newChallengeID = response.id;
		});
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

    	});
    	//$route.reload('registration');
    	window.location = "index.html#/registration";
    	


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
		
		$scope.archieveChallenge = function(challenge_id,sDate,eDate){
			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			$http.post('/jsonapi/save_edit_challenge/'+challenge_id, {
							description:"archived",
							startDate:sDate,
							endDate:eDate
			}).success(function (data, status, headers, config) {
				$scope.registration_response = data;
			}).error(function (data, status, headers, config) {
				$scope.registration_response = data;
			});
			
			window.location.reload();
		};
		
	$scope.editChallenge = function(challenge_id,sDate,eDate){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} 

		var todayDate= dd+'/'+ mm +'/'+yyyy;
		
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
		else if(sDate <= eDate && sDate >= todayDate){
			alert("Please select a valid date!");
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
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
					window.location="index.html#/challenges";
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
									totalDays:$scope.challengeToEdit.challenge.totalDays,
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
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
					window.location="index.html#/challenges";
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
					}).error(function (data, status, headers, config) {
						$scope.registration_response = data;
					});
					window.location="index.html#/challenges";
				}
			}
		}
	};
		
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
	$scope.$watch('chaPathID', function() {
		$scope.pubStories = [];
		$scope.StoryModel = $resource('/jsonapi/story');
		$scope.StoryModel.query({}, function(response){
			$scope.stories = response;
			for(var i=0;i<$scope.stories.length;i++){
				if($scope.stories[i].published==true && $scope.stories[i].archived == false && $scope.stories[i].supported_paths.indexOf($scope.chaPathID) <= -1){
					var aStory = {name: $scope.stories[i].name, id: $scope.stories[i].id};
					$scope.pubStories.push(aStory);
				}				
			}
		}); 
		
		$scope.myStoryModel = $resource('/jsonapi/player_stories');
		$scope.myStoryModel.query({}, function(response){
			$scope.myStories = response;
			for(var i=0;i<$scope.myStories.length;i++){
				if($scope.myStories[i].published == false && $scope.myStories[i].archived == false && $scope.stories[i].supported_paths.indexOf($scope.chaPathID) <= -1){
					var aStory = {name: $scope.myStories[i].name, id: $scope.myStories[i].id};						
					$scope.pubStories.push(aStory);
				}				
			}	
		});	
	});
}


function NormalGameController($scope,$resource,$cookieStore){
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
      $scope.qid = $cookieStore.get("name").id; //retrieve quest id from Storyboard page
    }
    if($cookieStore.get("num")){
      $scope.numProblems = $cookieStore.get("num"); //retrieve quest id from Storyboard page
    }
    if($cookieStore.get("type")){
      $scope.gameType = $cookieStore.get("type"); //retrieve quest id from Storyboard page
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
    /*
    Create Tournament Game.
    
    */

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
        $('#t1').addClass('active');
        $('#t2').removeClass('active');
        $('#ta1').addClass('active');
        $('#ta2').removeClass('active');
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
      $('#t1').addClass('active');
      $('#t2').removeClass('active');
      $('#ta1').addClass('active');
      $('#ta2').removeClass('active');
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
      $('#t1').removeClass('active');
      $('#t2').addClass('active');
      $('#ta1').removeClass('active');
      $('#ta2').addClass('active');
      $scope.SaveResource = $resource('/jsonapi/verify_for_game');
      //alert($scope.game.gameID);
      $scope.theData = {user_code:$scope.solution1,
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
      window.location = "index.html#/storyboard";
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
			
			if($scope.problems_progress.problemsInProblemset<=$scope.problems_progress.currentPlayerProgress){
				alert("congrats!");
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
				});
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
      window.location = "index.html#/storyboard";
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
      $scope.CreateGameModel = $resource('/jsonapi/create_game/problemsetID/:problemsetID/numProblems/:numProblems');
      
      $scope.CreateGameModel.get({"problemsetID":LevelID,"numProblems":numProblems}, function(response){
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
      return $scope.line_outcome.origional.length == 0;
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
      //loop through problems and find unsolved. Add to remaining_problems.
      for (var i = 0; i < $scope.game.problemIDs.length; i++) {
        if($scope.game.solvedProblemIDs.indexOf($scope.game.problemIDs[i])<0){
          $scope.remaining_problems.push($scope.game.problemIDs[i]);
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
      window.location = "index.html#/storyboard";
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
    //Create quest
    $scope.create_quest = function(storyID,path_id,difficulty){
/*       //alert("storyID "+storyID+" pathID "+ pathID+" difficult "+difficulty);
      $scope.SaveResource = $resource('/jsonapi/rest/quest', 
                    {}, 
                    {'save': { method: 'POST',    params: {} }});
      
      var newQuest = {"name":"New Quest",
                      "storyID": storyID,
                      "pathID":pathID,
                      "difficulty":difficulty};
      $scope.$watch('location.search()', function() {
        $scope.target = ($location.search()).target;
      }, true);
      var item = new $scope.SaveResource(newQuest);
      item.$save(function(response) {
        $scope.quest = response;
        //alert("Should redirect to next page with quest ID="+response.id);
        $scope.$parent.flash = response.id;
        $cookieStore.put("name", response.storyID);
        $location.search('questID',response.id).path('storyboard')
        $scope.list();
      }); */
	  
      $scope.$watch('location.search()', function() {
        $scope.target = ($location.search()).target;
      }, true);
	  
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

    $scope.$watch('name', function() {
      if($scope.name && $scope.name.difficulty == "Drag-n-Drop"){
        $scope.changeRoute = "playPage.html";
      }
    }, true);

    $scope.list();
    $scope.updateQuest();

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
	$scope.initialShow = "";
	
	$scope.list = function(){
		$scope.paths_unfiltered = $resource('/jsonapi/get_game_paths').get();
		$scope.StoryModel = $resource('/jsonapi/story');

	    $scope.StoryModel.query({}, function(response){
	        $scope.stories = response;
	    	setTimeout(function () {
	    	 	$scope.pubStories = [];
				for(var i=0;i<$scope.stories.length;i++){
					//adding the filter on supported path logic. 
					if($scope.stories[i].published==true && $scope.stories[i].archived == false){
						$scope.pubStories.push($scope.stories[i]);
					}				
				}		
				$scope.questStoryList = $filter('groupBy')($scope.pubStories, 3);

			    $scope.videos = $scope.stories[0].videos;
				$scope.$parent.storyid = $scope.stories[abc].id;
				$('#largeSelectPlay').click();
	        }, 1500);    
	    });
	};
    //We will need a different controller or resource to fetch player stories. 
    //Maybe PlayerStoryModel = $resource('/jsonapi/player_stories');
    //Not this since we still need the public stories. $scope.StoryModel = $resource('/jsonapi/player_stories');

    if(location.href.indexOf("storyID") > -1){
	  	var passed_in_storyID = location.hash.split('storyID=')[1].split("&")[0];
	  	$scope.currentURL = location.href;
		setTimeout(function () {
			$scope.story_filtered = $filter('filter')($scope.stories, passed_in_storyID);
			$scope.story_name = $scope.story_filtered[0].name;
	    }, 2000);
    }

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
			}).error(function (data, status, headers, config) {
				$scope.registration_response = data;
			});
		}
		else{
			$scope.NewStory = $resource('/jsonapi/story');
			var new_story = new $scope.NewStory($scope.newStory);
			new_story.$save(function(response){
				$scope.story = response;
				$scope.newStoryID = response.id;
			});
		}
		$route.reload('story');
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
			alert("success");
			$scope.registration_response = data;
		}).error(function (data, status, headers, config) {
			$scope.registration_response = data;
		});	
		$route.reload('story');
	}

	$scope.updateURL=function(storyID,difficulty,path_ID){
		if(storyID != "" && difficulty != "" && path_ID != ""){
			$location.search({storyID: storyID,difficulty: difficulty,path_ID: path_ID});
		}
		$scope.storyModel = $resource('/jsonapi/story/:storyID');
	    $scope.storyModel.get({"storyID":storyID}, function(response){
            $scope.current_story_name = response.name;
	    });
    }

    $scope.updateStroyList=function(storyID,difficulty,path_ID,pathCount){
    	$scope.initialShow = true;
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
				alert("Selected path does not support your previous selection of story, please reselect a story");
				$scope.initialShow = false;
			}
		}
		$scope.questStoryList = $filter('groupBy')($scope.updatedStoryList, 3);
		$scope.pathModel = $resource('/jsonapi/get_path_progress/:path_ID');
		$scope.pathModel.get({"path_ID":path_ID}, function(response){
	    	$scope.quest_path_name = response.path.name;
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

function TournamentController($scope,$resource,$http){
    $scope.TournamentModel = $resource('/jsonapi/list_open_tournaments');
    $scope.TournamentHeatGameModel = $resource('/jsonapi/create_game/heatID/:heatID');
    
    $scope.TournamentHeatModel = $resource('/jsonapi/get_heat_ranking');
    //$scope.Tournament = $resource('/jsonapi/tournament/tournamentID');
    $scope.tournamentID = null;
    //$scope.heatID = 12883052;
    $scope.heat = null;
    $scope.round = null;
    $scope.roundDirty = false;

    //A method to fetch a generic model and id. 
    //Pass in ID
    $scope.fetch_heat = function(heatID){
          $scope.TournamentHeatModel.get({"heatID":heatID}, function(response){
              $scope.heat = response;
          });
    };

	$scope.fetch_heat_with_time = function(heatID,time){
          $scope.TournamentHeatModel.get({"heatID":heatID, "time":time}, function(response){
              $scope.heat = response;
          });
	}
    $scope.create_heat_game = function(){
          $scope.TournamentHeatGameModel.get({"heatID":$scope.heat.heatID}, function(response){
              $scope.game = response;
          });
    };

    $scope.fetch_tournaments = function(){
          $scope.TournamentModel.query({}, function(response){
              $scope.tournaments = response;
          });
    };

    $scope.register_for_tournament = function(){
        //Use a normal form post for this legacy API.
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.post("/jsonapi/verify_tournament_password", {
            tournamentID: $scope.tournamentID,
            password: $scope.tournamentPassword
        }).success(function (data, status, headers, config) {
            $scope.registration_response = data;
        }).error(function (data, status, headers, config) {
            $scope.registration_response = data;
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
          });

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

	$scope.set_round_countdown = function(roundID,seconds){
          console.log("Start round not implemented yet.");
    };
	
    $scope.reset_round = function(roundID){
        console.log("Reset round not implemented yet.");
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

}


function RankController($scope,$resource,$cookieStore,$location,$filter){
	$scope.selectedPlayer;
	//fetch list of rankers based in the path selected by user
	$scope.get_path_ranks = function(pathId){
		//ALL Languages
		if(pathId=='AllLanguages'){
			
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
	
}

function FeedbackController($scope,$resource,$cookieStore,$location,$http,$filter){
	$scope.feedback_sent = false;
	//$scope.title = "Some feedback on SingPath";
	//$scope.description = "I just wanted to let you know that ..";	
	$scope.hideModal = function(){
      $('#thanks').modal('hide');
	  window.location.reload();
    };
	$scope.create_feedback = function(title,des,type){
		console.log(title+" "+des+" "+type);
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
				$('#thanks').modal('show');
				//$('#thanks').modal('show');
				//window.location.reload();				
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
<<<<<<< HEAD

function ProblemContributionAdminController($scope,$resource,$cookieStore,$location,$http,$filter){
	$scope.contentShownCollapsed = false;
	$scope.contentShownValue = "Click above buttons to start";
	 $scope.contributions = [
    {
      name: "Jekanath",
      date: "3rd September 2013",
      language: "Python",
      path: "4",
      level: "2",
      difficulty: "Easy",
      problemname: "Problem Name!",
      text: "Problem Description Text"
    },
    {
      name: "Sherlyn",
      date: "5th September 2013"
    },
    {
      name: "Jerald",
      date: "25th September 2013"
    },
    {
      name: "Hwan Heo",
      date: "13th September 2013"
    },
    {
      name: "William",
      date: "8th October 2013"
    },
    {
      name: "Tony",
      date: "5th August 2013"
    }
  ];

 $scope.alerts = [
    
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type : "success" , msg: "Contribution accepted!"});
  };

$scope.rejectAlert = function() {
    $scope.alerts.push({type : "danger" , msg: "Contribution rejected!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

 $scope.modal = {content: 'Hello Modal', saved: false};
  $scope.viaService = function() {
    // do something
    var modal = $modal({
      template: 'modal.html',
      show: true,
      backdrop: 'static',
      scope: $scope
    });
  }
  $scope.parentController = function(dismiss) {
    console.warn(arguments);
    // do something
    dismiss();
  }

$scope.showSolution = function() {
    $scope.contentShownValue = "Solution";
    
  };

  $scope.showSkeleton = function() {
    $scope.contentShownValue = "Skeleton";
  };
  $scope.showExample = function() {
    $scope.contentShownValue = "Example";
  };
  $scope.showPublicTests = function() {
    $scope.contentShownValue = "Public Test";
  };
  $scope.showPrivateTests = function() {
    $scope.contentShownValue = "Private Test";
  };

}

function ProblemContributionEditController($scope,$resource,$cookieStore,$location,$http,$filter){
	$scope.openStatus = true;

	$scope.flipStatus = function() {
    $scope.openStatus.push = false;
    $scope.addAlert();
  };

  $scope.alerts = [
    
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type : "success" , msg: "Your details have been successfully saved!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };


  
	
}

function MasteryCoachingQuizController($scope,$resource,$cookieStore,$location,$http,$filter,$timeout){

	$scope.countUpTimer = 0;
	$scope.currentLevel = 3;
	$scope.percent = $scope.currentLevel / 15 * 100;

	$scope.problemName = "Problem Name";
	$scope.problemDescription = "Problem Description";

	$scope.textcaptions = "Test Text captions for user!";
	$scope.sampleanswer = "<!--Given Example-->";
	$scope.outcome = "<!--Sample Outcome-->";

	$scope.selectedAudioFile = "bisa/lib/sound/test.mp3";
	$scope.playAudio = function () {
    var audio = document.getElementById("speechAudio");
    audio.load();
    audio.play();
    var mytimeout = $timeout($scope.onTimeout,1000);
	}

	$scope.onTimeout = function(){
        $scope.countUpTimer++;
        mytimeout = $timeout($scope.onTimeout,1000);
    }

    

	$scope.stopAudio = function () {
    var audio = document.getElementById("speechAudio");
    audio.pause();
    $timeout.cancel(mytimeout);
	}



}

=======
>>>>>>> upstream/master
