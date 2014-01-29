function PurposeDrivenAdminController($scope,$resource,$location,$cookieStore,$http,currentUserService){

	$scope.checkAdmin=function(){
	  $scope.player = $resource('/jsonapi/player').get();
	  $scope.isAdmn = $scope.player.isAdmin;
	  
	  if($scope.isAdmin == false){
		$location.path('home');
	  }
	  
	};
	
	
	
	
	$scope.get_videos = function(){
          console.log("get_videos is being executed");
          $resource("/jsonapi/purposeVideos/ALL").get({},function(response){
              $scope.purposeVideos = response; // purposeVideos stores the Json files
               console.log($scope.purposeVideos);
        	 })
       }

	$scope.update_videos =function(title,image,thumbnail,vlink,description,question,option1,option2,option3,option4,option5,videoNo){
	
	$scope.allVideo = $resource("/jsonapi/purposeVideos/ALL");
		
	var data = {
		"title":title,
		"image": image,
		"thumbnail" : thumbnail,
		"vlink": vlink,
		"description": description,
		"question": question,
		"options":[
		{"choice": option1},
		{"choice": option2},
		{"choice": option3},
		{"choice": option4},
		{"choice": option5}]
		};
						  
          var item = new $scope.allVideo(data);
          item.$save(function(response) { 
                  $scope.response = response;
                  //Handle any errors
                  console.log(response);
                  
          });	
	
	}
	

	
	



	
}