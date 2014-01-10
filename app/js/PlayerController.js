'use strict';
function PlayerController($scope,$resource,$location,$cookieStore,$http,currentUserService){
    $scope.player = {};
    $scope.player.tags = [];
    $scope.list=function(){
        $scope.mobile_paths = $resource('/jsonapi/mobile_paths').query();
        $scope.player = $resource('/jsonapi/player').get();
        $scope.tags = $resource('/jsonapi/tags').get();
        $scope.$watch('player', function() {
            $scope.current_country = $scope.player.country;
            currentUserService.setUser($scope.player);
        },true);
    };

    $scope.addTag = function(addedTag){
        $scope.taglist = addedTag.split(",");
        for(var i=0;i<$scope.taglist.length;i++){
            if($scope.player.tags.indexOf($scope.taglist[i]) > -1){
                alert("Duplicate tag is not allowed!");
            } else {
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
        } else{
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
        } else {
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

    /*GENShyFT Methods*/
    
    $scope.checkCreateTournLogin = function(){
        if($scope.player.nickname){
            $location.path("mytournaments");
        }
        else{
            alert("Please login with FaceBook or Google Account first!");
        }
    };

    $scope.checkJoinTournLogin = function(){
        if($scope.player.nickname){
            $location.path("tournament-grpjoin");
        }
        else{
            alert("Please login with FaceBook or Google Account first!");
        }
    };// GENShYFT Methods End
    
    $scope.update_player_profile = function($event){  
  
        var data = {"nickname":$scope.player.nickname,
                    "professional":$scope.player.professional,
                    "about":$scope.player.about,
                    "location":$scope.player.location,
                    "tags":$scope.player.tags,
                    "gender":$scope.player.gender};

        $http.post("/jsonapi/update_player_profile", data)
            .success(function (data, status, headers, config) {
                if(console) {window.console.log(data);}
                $scope.player = data;

            }).error(function (data, status, headers, config) {
                $scope.status = status;
            }); 
            
        //$route.reload('profile');
        // window.location.reload('profile')
        window.location.reload('profile');

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
      $('#loginAlert').modal('hide');
    };
    
    $scope.show_panel = function(){
      $('#edit_profile').modal('show');
    };
    

        window.changeLocation = function(url){
          window.location.href = url;
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
            window.changeLocation("index.html");
        });
    };
}