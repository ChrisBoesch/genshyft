'use strict';

function yMBCoachingController($scope,$resource,$cookieStore,$location,$filter){
	//check if the user had select a mentor before.
	$scope.currentCoach = "";
	$scope.tempimage = "img//purposedrivenPlaceholder//wait.png"; 
	$scope.player_progress ="";
	$scope.currentPathId="";
	$scope.currentPathName ="";
	$scope.allCoachesData="";
	
	/* $resource('/jsonapi/get_player_progress').get({},function(response){
		$scope.player_progress = response;
		$scope.currentPathName = $scope.player_progress.paths[0].name;	
		$scope.currentPathId = $scope.player_progress.paths[0].id;
	   	
	 });	
	*/
	
		$scope.get_player_progress = function(){
          
          $resource("/jsonapi/get_player_progress").get({},function(response){
			$scope.player_progress = response;
			$scope.currentPathId = $scope.player_progress.paths[0].id;
			$scope.currentPathName = $scope.player_progress.paths[0].name;
        	 })
        }
	

		$scope.getCoaches = function(){

		  $resource('/jsonapi/coach').get({},function(response){
			  $scope.allCoachesData = response;
			  
			   console.log( "The first value of allCoachesData : " +$scope.allCoachesData.coachesData[0].name);
			   });	   			   
		}	
		
		
		$scope.filterGetCoaches = function(name){
			$scope.getCoaches();
			$scope.filteredCoach;
			
			try{
					for(var i=0; i<$scope.allCoachesData.coachesData.length;i++){
							
							if($scope.allCoachesData.coachesData[i].name === name){
								$scope.filteredCoach = $scope.allCoachesData.coachesData[i];
								$scope.currentCoach =  $scope.filteredCoach;
								console.log($scope.allCoachesData.coachesData[i]);
								break;
							}
							
					}
				}
		   catch(err){
				console.log("We are attempting to retrieve your data. Refreshing.");
				$route.reload();
		   }				
		}
	
  /*  $scope.get_player_progress = function(){			
			$scope.player_progress = $resource('/jsonapi/get_player_progress').get();
			$scope.currentPathId = $scope.player_progress.paths[0].id;
			$scope.currentPathName = $scope.player_progress.paths[0].name;	
    };
    //$scope.get_player_progress();	
*/
		
	
	$scope.getCurrentMastery = function(){

          $resource('/jsonapi/current_coaching_status').get({},function(response){
			  $scope.mastery = response;
			   console.log("Calling current coaching status  for first time : " + JSON.stringify($scope.mastery.coach) );


				//console.log("will forward to cache page");
				$scope.mastercache = "true";
				$scope.masterselect ="false";
			
				   if($scope.mastery.coach == null){
						console.log(" The value current_coaching_status.coach is null");
						$scope.filterGetCoaches($scope.allCoachesData.coachesData[0].name);
						$scope.currentCoach = $scope.filteredCoach;
						console.log("Set default Coach #1");
						if($scope.player_progress.paths.length > 0){		   
						   console.log("User has at least 1 path.");
						   
							// to update the new path/mentor user has selected
							$scope.masteryUpdate = $resource("/jsonapi/update_current_coaching_status");
							console.log("Committing update_current_coaching_status");
							
							var data = 	{"pathID":$scope.currentPathId,
										"coachID":$scope.allCoachesData.coachesData[0].coachID
										}
							console.log("Storing pathID and coachID into data");	
								
										
							  var item = new $scope.masteryUpdate(data);
							  item.$save(function(response) { 
								  $scope.response = response;
								  //Handle any errors
								  console.log("Successful call update_current_coaching_status: "  + $scope.currentPathId + ". " +$scope.currentPathName +  "." +  $scope.currentCoach);
								  console.log(response);
									
								});  
						}					
				   }
				   else{
						console.log("mastery.coach is not null");
						$scope.filterGetCoaches($scope.mastery.coach);
						$scope.currentCoach = $scope.filteredCoach;
							console.log($scope.currentCoach + " <- current coach in system");
					    $scope.currentPathId = $scope.mastery.pathID;
						console.log("currentpathId value is" + $scope.currentPathId);
					    $scope.currentPathName = $scope.mastery.pathName;	
						console.log("currentpathName value is" + $scope.currentPathName);
					}
  		


		});	   
    } 
	
	 
	
	$scope.resetMentor=function(){
				$scope.mastercache = "true";
				$scope.masterselect ="true";
				$scope.masterpath ="false"
	}
	$scope.resetPath=function(){
				$scope.mastercache = "true";
				$scope.masterselect ="false";
				$scope.masterpath ="true";
	}
	$scope.resetLanguage=function(id,name){
		$scope.currentPathId = id;
	   $scope.currentPathName = name;
	
	}
	

	
	
	
	//Assuming this is what you wanted by calling list in ng-init
    $scope.fetch_game_paths = function(){
		$scope.game_paths = $resource('/jsonapi/get_game_paths').get();		
    };


	




	
	
	//resume game from profile page
    $scope.resumePracticeGame=function(pathID,pathName,num,coachID){
		$scope.path_progress = null;
		$cookieStore.put("pid", pathID);
		$cookieStore.put("coach",coachID);
		
		// to update the new path/mentor user has selected
        $scope.masteryUpdate = $resource("/jsonapi/update_current_coaching_status");
		var data = 	{"pathID":pathID,
					"coachID":coachID
					}
          var item = new $scope.masteryUpdate(data);
          item.$save(function(response) { 
                  $scope.response = response;
                  //Handle any errors
				  console.log("storing data before resume :"  + pathID + " :" +pathName+  " :" +  coachID);
                  console.log(response);
				 

				 
                  
          });	
		
		$scope.PathModel = $resource('/jsonapi/get_path_progress/:pathID');
        //Including details=1 returns the nested problemset progress.
        $scope.PathModel.get({"pathID":pathID,"details":1}, function(response){
            $scope.path_progress = response;
			
			if(pathName.substring(0,5).trim() == "Begin"){
				$scope.difficulty = "Drag-n-Drop";
				console.log("Difficulty : " + $scope.difficulty );
			}
			else{
				$scope.difficulty = "Easy";
				console.log("Difficulty : Easy" );
			}
			for (var i=0;i<$scope.path_progress.details.length-1;i++)
			{ 
				if($scope.path_progress.details[i].problemsInProblemset <= $scope.path_progress.details[i].currentPlayerProgress){ // means has completed a set
					console.log("level "+$scope.path_progress.details[i].pathorder);
				
					$scope.create_prac($scope.path_progress.details[i].id,num,$scope.path_progress.details[i].pathorder);
					console.log("USER HAS COMPLETED AT LEAST 1 FULL STAGE ");
					console.log("SCOPE.PATH_PROGRESS_DETAILS_ID IS "+$scope.path_progress.details[i].id);
					break;
				}
				else{
					alert("Please complete at least 1 level of Practice session first");
				}
				
			}
        });

	};
	

	
	$scope.create_prac = function(level,numProblems,lvlnum){
	
	//level = problemsetID, 5, levelnumber = path number
	/*	for (var i=0;i<$scope.path_progress.details.length;i++)
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
			$cookieStore.put("problemsetid", level);
			$cookieStore.put("num", numProblems);
			$cookieStore.put("type", "practiceGame");
			$cookieStore.put("pathorder", lvlnum);		
			$cookieStore.put("gameDifficulty", $scope.difficulty);			
			$cookieStore.put("nameOfPath", $scope.path_progress.path.name);
			$cookieStore.put("path_ID", $scope.path_progress.path.id);
	*/	
			if($scope.difficulty == "Drag-n-Drop"){
				//window.location.href = "practice_play_page.html";
				alert("Sorry, this function isn't supported for Beginner (Drag - n -Drop) Gameplay yet");
			}
			else{
				//Hi RJ. Here is the change that I made to help simplify things.
				//The goal is to simplify every game play page to just use one controller. 
				//window.location.href = "ymbcoaching-play";
				$location.path('ymbcoaching-play')
				//window.location.href = "normal_play_page.html";
			}
		}
/*		else{
			alert("Please unlock previous level first!");
		}
	}; */
	
	$scope.hideModal = function(){
		$('#levelBlock').modal('hide');
	};
			


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