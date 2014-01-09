'use strict';

function MBCoachingController($scope,$resource){
	
	//$scope.coaches = [];
	//$scope.progLanguage = [];
	//$scope.userID = {};
	$scope.selectedPath = {};

	//retrieves the user's paths
	$scope.user_game_badges=function(){
		$resource('/jsonapi/get_my_paths').get({},function(response){
			$scope.selectedPath = response;
			console.log($scope.selectedPath);
		});	
	}

	$scope.get_skipped_qns=function(){
		$resource('/jsonapi/skippedQns').get({},function(response){
			$scope.testing = response;
			console.log($scope.testing);
		})

	}

	/*$scope.get_poorly_attempted=function(){
		$resource('/jsonapi/poorly_attempted').get({},function(response){
			$scope.attemptedQns = response;
			console.log($scope.attemptedQns);
		})
	}/
	/*$scope.saveFields=function($userID, $selectedCoach, $selectedLanguage){
		var selectedFields = {"userID" : userID,
					"selectedCoach" : selectedCoach,
					"selectedLanguage" : selectedLanguage
					}
		selectedFields.$save(function(response){
			$scope.response = response;
			console.log(response);
			$scope.get_levels_toImprove();
		})
	};

	$scope.get_levels_toImprove=function(){

		
	}

	*/

	//retrieve stored levels to improve
	/*if($cookieStore.get("type")){
		$scope.improveLevel = $cookieStore.get("type");
	}*/
	
	



}