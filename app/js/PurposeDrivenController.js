

function PurposeDrivenController($scope,$resource,$location,$cookieStore,$http,$route){

	$scope.videoArray ="Select";
	$scope.purposeVideos= "";
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
          $resource("/jsonapi/purposevideos").get({},function(response){
              $scope.purposeVideos = response; // purposeVideos stores the Json files
			  $scope.videoArray = $scope.purposeVideos.Videos[0].title;
               console.log($scope.purposeVideos);
        	 })
        }
		
		
	$scope.last_watched = function(){
          console.log("get_videos is being executed");
          $resource("/jsonapi/purposevideos").get({},function(response){
              $scope.purposeVideos = response; // purposeVideos stores the Json files
			  $scope.videoArray = $scope.purposeVideos.Videos[0].title;
               console.log($scope.purposeVideos);
			   
			   
			for(var i = 0; i < $scope.purposeVideos.Videos.length-1; i++){
				if($scope.purposeVideos.Videos[i].unlocked ==false){
					 $location.search({'youtube':$scope.purposeVideos.Videos[i].vlink,'vno':i}).path('purposedriven-play') ;
					 break;
				}
				if( i== $scope.purposeVideos.Videos.length){
					$location.search({'youtube':$scope.purposeVideos.Videos[0].vlink,'vno':0}).path('purposedriven-play') ;
				}
				
			}			   
        })
     }


	
		/*
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
*/

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


        $scope.nextVideo = function (vno,feedback){
			var vnoNumber = parseInt(vno);
			console.log("nextVideo is being executed");
             if($scope.purposeVideos.Videos.length-1 > vnoNumber){
                if($scope.purposeVideos.Videos[(vnoNumber+1)].unlocked == false){
			     $scope.saveNewUnlock(vnoNumber+1);
                  alert ("You have unlock a new video!" );		
					
                }
		
               
				$scope.saveNewFeedback(vnoNumber,feedback); // unlock , resave answer into datastore.
                $location.search({'youtube':$scope.purposeVideos.Videos[(vnoNumber+1)].vlink,'vno':(vnoNumber+1)}).path('purposedriven-play') 
				
              }
              else{
                alert (" Oops , no more");
              }
             
        }



		$scope.saveNewUnlock = function(videoNumber){
			console.log("saveNewUnlock is being executed");
			
			$scope.userCurrentVideo = $resource("/jsonapi/record_purpose_video_unlock/" + videoNumber);
				
			var data = {"no": videoNumber,
						"unlocked":true
						};
							  
			   var item = new $scope.userCurrentVideo(data);
			   item.$save(function(response) { 
					  $scope.response = response;
					  //Handle any errors
					  console.log(response);
						
				})
		
	}


		$scope.saveNewFeedback = function(videoNumber,feedback){
			console.log("saveNewFeedback is being executed");
			
			$scope.userCurrentVideo = $resource("/jsonapi/record_purpose_video_feedback/" + videoNumber);
				
			var data = {"no": videoNumber,
							"feedback":feedback, 
						};
							  
			   var item = new $scope.userCurrentVideo(data);
			   item.$save(function(response) { 
					  $scope.response = response;
					  //Handle any errors
					  console.log(response);
					  console.log("Feedback : " + feedback);
						
				})
		
	}























  



	};