

function PurposeDrivenController($scope,$resource,$location,$cookieStore,$http,$route){


    // this method gets the parameter , variables are declared as youtube and vno
    $scope.location = $location;
	$scope.tempimage = "img//purposedrivenPlaceholder//wait.png"; 

    $scope.$watch('location.search()', function() {
        $scope.you = ($location.search()).youtube;
		
		if($scope.you != null){
			$scope.tube = $scope.you.split("watch?v=");
			$scope.youtube = $scope.tube[1].split("&list=");
		   // $scope.youtube = $scope.tube.split("list=");
			console.log($scope.youtube);
		}
    }, true);


    $scope.$watch('location.search()', function() {
        $scope.vno = ($location.search()).vno;
		
    }, true);


	
	
	
	
	// retrieve All purpose driven video available in databank.
	$scope.get_videos = function(){
          console.log("get_videos is being executed");
          $resource("/jsonapi/purposeVideos/ALL").get({},function(response){
              $scope.purposeVideos = response; // purposeVideos stores the Json files
			  $scope.videoArray = $scope.purposeVideos.Videos[0].title;
               console.log($scope.purposeVideos);
        	 })
        }

	// retrieve All purpose driven videos that user has unlocked. 
	$scope.get_videos_unlocked = function(){
	console.log("get_video_unlock is being executed");
          console.log("get_purpose driven videos unlocked");
          $resource("/jsonapi/purposeVideos/CURRENT").get({},function(response){
              $scope.purposeVideosUnlocked = response;
			  
			  if($scope.vno != null){
				$scope.radioAns = $scope.purposeVideosUnlocked.Unlocked[$scope.vno].answer;
			  }
			  else{
				$scope.radioAns = $scope.purposeVideosUnlocked.Unlocked[0].answer;
			  }
			  	
               console.log($scope.purposeVideosUnlocked);
        	 })
        }      

	// hands over the youtube link and video number for next page viewing.
    $scope.view_video = function(address,no){
	console.log("view_video is being executed");
        	$scope.videotoWatch = address;
        	//window.location.replace('#/purposedriven-play?v=' +value);
        	//$location.path('purposedriven-play')
  			//alert(document.URL);
  			//alert(value);
  			 $location.search({'youtube':address,'vno':no}).path('purposedriven-play')
        }  


        $scope.nextVideo = function (vno,purposeVideo,videosUnlock){
			var vnoNumber = parseInt(vno);
			console.log("nextVideo is being executed");
             if(purposeVideo.length-1 > vnoNumber)
              {
                if(videosUnlock[(vnoNumber+1)].status == "false"){
                  alert ("You have unlock a new video!" );						 
                }
		
               
				$scope.saveNewUnlock(vnoNumber,$scope.radioAns); // unlock , resave answer into datastore.
                $location.search({'youtube':purposeVideo[(vnoNumber+1)].vlink, 'vno':(vnoNumber+1)}).path('purposedriven-play') 
				
              }
              else{
                alert (" Oops , no more");
              }
             
        }



		$scope.saveNewUnlock = function(videoNumber,radioAns){
		console.log("saveNewUnlock is being executed");
		
		$scope.userCurrentVideo = $resource("/jsonapi/purposeVideos/CURRENT");
			
		var data = {"no": videoNumber,
						  "status": "true",
						  "answer": radioAns};
						  
           var item = new $scope.userCurrentVideo(data);
           item.$save(function(response) { 
                  $scope.response = response;
                  //Handle any errors
                  console.log(response);
					
			})
		
	}


























  



	};