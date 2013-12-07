'use strict';

/* Admin Controllers */

function VerifyRequestController($scope,$resource){
        
        $scope.analyze = function(){
          var byurl = {}
          for (var i = 0; i < $scope.items.length; i++) {
            try{
              $scope.items[i].response = JSON.parse($scope.items[i].responseJSONText);
            }
            catch(err) {
              $scope.items[i].response = "Could not parse response.";//$scope.items[i].responseJSONText;
            }
            if($scope.items[i].url in byurl){
              byurl[$scope.items[i].url].vrs.push($scope.items[i]);
              byurl[$scope.items[i].url][$scope.items[i].result] += 1;
            }
            else {
              byurl[$scope.items[i].url] = {'vrs':[],'TIMEOUT':0,'ERROR':0,'PASS':0,'FAIL':0,'PRIVATE_FAIL':0};
              byurl[$scope.items[i].url].vrs.push($scope.items[i]);
              byurl[$scope.items[i].url][$scope.items[i].result] += 1;
            }
            
          }         
          //for entry in items, add to some counter and return
          $scope.result = byurl;
        };
}

//Change this to IPAccessPoints
function IPAccessController($scope,$resource){
        //$scope.model = null;
        //$scope.item = null;
        $scope.items = [];
        $scope.points = {};
        $scope.offset = 0;
        $scope.model = 'ipuser';
        $scope.Model = $resource('/jsonapi/rest/:model/:id');
        
        $scope.list = function(){
          var data = {'model':$scope.model}
          $scope.Model.query(data,
                function(response) { 
                  $scope.items = response;
                  $scope.offset = $scope.items.length;
                });  
        };

        $scope.append_list = function(){

          var data = {'model':$scope.model, 'offset':$scope.offset}
          $scope.Model.query(data,
                function(response) { 
                  var temp = response;
                  $scope.items = $scope.items.concat(temp);
                  $scope.offset += temp.length;
                  $scope.look_up_ips();
                  //alert("items "+$scope.items.length+" offset "+$scope.offset+" length "+$scope.items.length)
                });  
        };

        $scope.look_up_ips = function(){
            //alert("looking up ips");
            for (var i = 0; i < $scope.items.length; i++) {

              if($scope.items[i].ip in $scope.points){

              }
              else{
                //alert("point not in list "+$scope.items[i].ip);
                try{
                  var point = $resource('/jsonapi/rest/ipaddress/'+$scope.items[i].ip).get();
                  $scope.points[$scope.items[i].ip] = point;

                }
                catch(err){
                //Handle errors here
                }
                              }
              //$scope.permutation_lines += $scope.game.problems.problems[$scope.current_problem_index].lines[parseInt($scope.permutation[i])-1]+"\n";
            }
            
            //for key in points, put them in the items array to plot. 
            //for (var i = 0; i < $scope.items.length; i++) {
            $scope.point_list = [];
            for (var key in $scope.points) {
              if ($scope.points.hasOwnProperty(key)) {
                $scope.point_list.push($scope.points[key]);
              }
            }
         
            //alert("there were "+Object.keys($scope.points).length+" keys and point_list length is "+$scope.point_list.length);

        };       
                
        $scope.load = function(id){
          var data = {'model':$scope.model, 
                      'id': id
                     }
          $scope.waiting = "Loading";
          $scope.Model.get(data, 
              function(response){   
                  $scope.item = response; 
              });        
        };
}

function GameResultController($scope,$resource){
        $scope.items = [];
        //$scope.analysis = {};
        $scope.offset = 0;
        $scope.model = 'gameresult';
        $scope.Model = $resource('/jsonapi/rest/:model/:id');
        
        $scope.list = function(){
          var data = {'model':$scope.model}
          $scope.Model.query(data,
                function(response) { 
                  $scope.items = response;
                  $scope.offset = $scope.items.length;
                });  
        };

        $scope.append_list = function(){

          var data = {'model':$scope.model, 'offset':$scope.offset}
          $scope.Model.query(data,
                function(response) { 
                  var temp = response;
                  $scope.items = $scope.items.concat(temp);
                  $scope.offset += temp.length;
                  $scope.analyze();
                  //alert("items "+$scope.items.length+" offset "+$scope.offset+" length "+$scope.items.length)
                });  
        };

        $scope.analyze = function(){
            $scope.analysis = {};
            for (var i = 0; i < $scope.items.length; i++) {
              var day = $scope.items[i].game_start.split('T')[0];
              //time = $scope.items[i].game_start.split('T')[1];
              //if ($scope.points.hasOwnProperty(key))
              if(day in $scope.analysis){
                //alert("Found key");
                $scope.analysis[day].attempts += $scope.items[i].attempts;
                $scope.analysis[day].solve_time += $scope.items[i].solve_time;
                $scope.analysis[day].thePlayers[$scope.items[i].player] = 1;
              }
              else{
                //alert("Did not find key");
                $scope.analysis[day] = {"attempts": $scope.items[i].attempts, 
                                        "solve_time":$scope.items[i].solve_time,
                                        "thePlayers": {}};
              }
              //Count the number of players
              var keys = [];
              for(var key in $scope.analysis[day].thePlayers){
                keys.push(key);
              }
              $scope.analysis[day].players = keys;
            }
         
        };       
}

function ChurnDataController($scope,$resource){
        $scope.churn_data = $resource('/jsonapi/churn_data').get();
}
function CohortAnalysisController($scope,$resource){
        //$scope.items = [];
        //$scope.analysis = {};
        //$scope.offset = 0;
        $scope.event = "ALL";
        $scope.countryCodes = {"SG":"Singapore", "ALL":null};
        $scope.countryCode = "SG";
        $scope.cohort_events = {};
        $scope.cohort_event_count = {};
        $scope.players_by_join_day = {}; //lists of players
        $scope.player_events = {}; //list of events
        $scope.event_count = {};
        $scope.players_event_count = {};
        
        //$scope.Player = $resource('/jsonapi/rest/player/:id');
        $scope.Player = $resource('/jsonapi/players');
        
        $scope.IPUser = $resource('/jsonapi/ipuser/:id');
           
        $scope.players = [];     
        $scope.player_offset = 0;

        $scope.get_players = function(){
          //Can change url away from rest default and pass in countryCode to just
          //Look at Singapore players. 
          //var data = {'limit':limit, 'offset':0};
          var data = {};
          $scope.Player.query(data,
                function(response) { 
                  var temp = response;
                  $scope.players = $scope.players.concat(temp);
                  $scope.player_offset = $scope.players.length;
                  
                  //$scope.players = response;
                  //$scope.player_offset = $scope.players.length;
                  $scope.get_player_events();
                });  
        };

        $scope.keys = function(obj){
          var keys = [];
          for(var key in obj){
            if(key=="$$hashKey"){
              //alert(key);
            }
            else{
              keys.push(key);
            }
          }
          return keys;
        };
        
        $scope.get_player_events = function(){

          for (var i = 0; i < $scope.players.length; i++) {
              var d = new Date($scope.players[i].created);
              //alert("Date "+d);
              var join_day = $scope.players[i].created.split('T')[0];
              //var join_day = d.toDateString();
              
              if(join_day in $scope.players_by_join_day){
                //alert("Found key");
                $scope.players_by_join_day[join_day].push($scope.players[i].id);
              }
              else{
                $scope.players_by_join_day[join_day] = [];
                $scope.players_by_join_day[join_day].push($scope.players[i].id);
               }
              
              //Fetch the last 100 events for every player
              //$scope.player_events[$scope.players[i].id] = $scope.IPUser.query({'player': $scope.players[i].id});
              //$scope.fetch_events_for_player($scope.players[i].id);

              $scope.fetch_events_for_player($scope.players[i],0);                 
          }
          //$scope.analyze_player_events();

        };



        $scope.analyze_player_events = function(){
          $scope.event_list = {"ALL":0};

          $scope.cohort_event_count = {}; //[event][join_day][days_later][playerID]=count
          $scope.cohort_event_count["ALL"] = {}; //[event][join_day][days_later][playerID]=count
          $scope.return_vist_count = {}; //returns per cohort after day 0

          for (var i = 0; i < $scope.players.length; i++) {
              //Look by join day first
              
              var player_join_date = new Date($scope.players[i].created);
              //var join_day = player_join_date.toDateString();
              var temp = player_join_date.toISOString();//.split('T')[0];
              var join_day = temp.split('T')[0];
              //var join_day = $scope.players[i].created.split('T')[0];

              var playerID = $scope.players[i].id;

            
            for (var j = 0; j < $scope.player_events[playerID].length; j++) {
              //Then look through players
              var theEvent = $scope.player_events[playerID][j]
              var event_date = new Date(theEvent.access_time);
              var timedelta = event_date - player_join_date
              var days_later = parseInt( timedelta/(3600000*24) );
              //alert(event_date+" for join day "+player_join_date+" and days_later "+days_later+" timedelta "+timedelta);
              //Then add events to that player day.
              

              //$scope.cohort_event_count["ALL"] = {}; //[event][join_day][days_later][playerID]=count
              if(!$scope.cohort_event_count[theEvent.page_accessed]){
                  $scope.cohort_event_count[theEvent.page_accessed] = {};
                  $scope.event_list[theEvent.page_accessed] =0;
              }

              if(!$scope.cohort_event_count["ALL"][join_day]){              
                $scope.cohort_event_count["ALL"][join_day] = {};
                $scope.return_vist_count[join_day] = 0;  
              }
              if(!$scope.cohort_event_count[theEvent.page_accessed][join_day]){              
                $scope.cohort_event_count[theEvent.page_accessed][join_day] = {};
              }
              //Add for new events

              if(!$scope.cohort_event_count["ALL"][join_day][days_later]){
                $scope.cohort_event_count["ALL"][join_day][days_later] = {}; 
              }
              if(!$scope.cohort_event_count[theEvent.page_accessed][join_day][days_later]){
                $scope.cohort_event_count[theEvent.page_accessed][join_day][days_later] = {};  
              }
              
              if(!$scope.cohort_event_count["ALL"][join_day][days_later][playerID]){
                $scope.cohort_event_count["ALL"][join_day][days_later][playerID] = 0;
                if(days_later > 0){
                  //alert("Return visit sighting for "+playerID+" join_day "+join_day+" days_later "+days_later);
                  $scope.return_vist_count[join_day]+=1;
                }
              } 
              if(!$scope.cohort_event_count[theEvent.page_accessed][join_day][days_later][playerID]){
                $scope.cohort_event_count[theEvent.page_accessed][join_day][days_later][playerID] = 0;

              } 
              
              $scope.cohort_event_count["ALL"][join_day][days_later][playerID] += 1;
              $scope.cohort_event_count[theEvent.page_accessed][join_day][days_later][playerID] += 1;
              
              $scope.event_list["ALL"] +=1;
              $scope.event_list[theEvent.page_accessed] +=1;
              
            }
            
          }
            //Find the average return rate for all cohorts. 
            var total_percent = 0;
            var total_returns = 0;
            for (var cohort = 0; cohort < $scope.keys($scope.return_vist_count).length; cohort++){
              var key = $scope.keys($scope.return_vist_count)[cohort];
              var percent = $scope.return_vist_count[key]/$scope.players_by_join_day[key].length
              total_percent += percent
              total_returns += $scope.return_vist_count[key];
              //alert("cohort "+key+" count "+$scope.return_vist_count[key]+" percent "+percent);
            }
            //alert("Average % ="+total_percent/$scope.keys($scope.return_vist_count).length*100);
            $scope.average_return_rate = total_percent/$scope.keys($scope.return_vist_count).length*100;
            $scope.total_returns_percentage = total_returns/$scope.keys($scope.players).length*100;

        };  

        //Pass in offset to handel recursion and appending. 
        $scope.fetch_events_for_player = function(player,offset){
          var playerID = player.id;

          $scope.IPUser.query({'player': playerID, 'offset':offset},
                function(response) { 
                  if (offset == 0){
                    $scope.player_events[playerID] = response;
                  }else{
                    //alert(response.length);
                    $scope.player_events[playerID] = $scope.player_events[playerID].concat(response);
                    //alert("Offset "+offset+" for player ID "+playerID);
                  }
                  //else append

                  if(response.length > 99){
                    var event_date = new Date(response[99].access_time);
                    var player_join_date = new Date(player.created);
                    var timedelta = event_date - player_join_date
                    var days_later = parseInt( timedelta/(3600000*24) );
                    //alert("There were more than 99 events for player "+playerID+" and offset "+offset+" and last event is days_later="+days_later);  
                    if (days_later<14){
                      //alert("Since days_later < 14, calling recursively with offset "+(parseInt(offset)+100));
                      $scope.fetch_events_for_player(player, parseInt(offset)+100);

                    }
                    //recursive call offset + 100; 
                    
                    // if last date < player created +14 recursive. 
                    //var month_ago = new Date($scope.players[i].created);
                    //month_ago.setDate(month_ago.getDate() - 30);
                    //alert("There were more than 99 for "+playerID+" and the time was "+lastDate);
                    //Recursively call the next offset until date is before 30 days. 
                  }
                });  
        };

        
      
}

function GenericRestController($scope,$resource){
        //$scope.model = null;
        //$scope.item = null;
        //$scope.headers = null;
        $scope.items = [];
        $scope.offset = 0;
        $scope.Model = $resource('/jsonapi/rest/:model/:id');

        $scope.update_headers = function(){
          var keys = [];
          for(var key in $scope.items[0]){
            keys.push(key);
          }
          $scope.headers = keys;
        };

        $scope.update = function(id){
          $scope.UpdateResource = $resource('/jsonapi/rest/:model/:id', 
                        {"model":$scope.model, "id":id }, 
                        {'update': { method: 'PUT',    params: {} }});
          
          var item = new $scope.UpdateResource($scope.item);
          item.$update(function(response) { 
                  $scope.item = response;
                  $scope.list();
                });
        };
        
        $scope.add = function(){
          $scope.SaveResource = $resource('/jsonapi/rest/:model', 
                        {"model":$scope.model}, 
                        {'save': { method: 'POST',    params: {} }});
          var item = new $scope.SaveResource($scope.item);
          item.$save(function(response) { 
                  $scope.item = response;
                  $scope.list();
                }); 
          
        };
        
        $scope.list = function(){
		$scope.quests = $scope.QuestModel.query();
		$scope.$watch('quests', function() {
			if($scope.quests[$scope.quests.length - 1] != undefined){
			  if($scope.quests[$scope.quests.length - 1].difficulty == "Beginner"){
				$scope.changeRoute = "playPage.html";
			  }
			}
		  }, true);
		  //}
		  //$scope.QuestModel.query({}, function(response){
		  //    $scope.quests = response;
		  //});
		};
        $scope.append_list = function(){

          var data = {'model':$scope.model, 'offset':$scope.offset}
          $scope.Model.query(data,
                function(response) { 
                  var temp = response;
                  $scope.items = $scope.items.concat(temp);
                  $scope.offset += temp.length;
                  $scope.update_headers();
                  //alert("items "+$scope.items.length+" offset "+$scope.offset+" length "+$scope.items.length)
                });  
        };        
                
        $scope.load = function(id){
          var data = {'model':$scope.model, 
                      'id': id
                     }
          $scope.waiting = "Loading";
          $scope.Model.get(data, 
              function(response){   
                  $scope.item = response; 
              });        
        };
        
        $scope.delete = function(id){
          var data = {'model':$scope.model,
                  'id': id
                }
          $scope.Model.remove(data, 
              function(response){
                  $scope.list();
              });
        };
        
        $scope.get_metadata = function(){
          var data = {'model':"metadata",
                 }
          $scope.Model.get(data,
                function(response) { 
                  $scope.metadata = response;
                });  
        };
}

