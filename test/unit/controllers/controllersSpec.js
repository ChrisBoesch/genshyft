//
// test/unit/controllers/controllersSpec.js
// console.log(chai.stub)
// var sinonChai = require("sinon-chai");
// chai.use(sinonChai);
// var assert = chai.assert;
describe("Unit: Testing Controllers", function() {

  //beforeEach(angular.mock.module('App'));

  it('should have a VideosCtrl controller', function() {
    //expect(App.VideosCtrl).not.to.equal(null);
  });

  it('should have a VideoCtrl controller', function() {
    //expect(App.VideoCtrl).not.to.equal(null);
  });
  
  //My test
  it('should have a dummy test for autotext demonstration', function() {
    expect(5).not.toEqual(4);
  });
  it('should have a WatchedVideosCtrl controller', function() {
    //expect(App.WatchedVideosCtrl).not.to.equal(null);
  });

  it('should have a properly working VideosCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    //var searchTestAtr = 'cars';
    //var response = $httpBackend.expectJSONP('https://gdata.youtube.com/feeds/api/videos?q=' + searchTestAtr + '&v=2&alt=json&callback=JSON_CALLBACK');
    //response.respond(null);
  
    /*
    var $scope = $rootScope.$new();
    var ctrl = $controller('VideosCtrl', {
      $scope : $scope,
      $routeParams : {
        q : searchTestAtr
      }
    });
    */
  }));
  describe('test PlayerController', function(){
    var app,
        controller,
        scope,
        httpBackend,
        mobile_paths,
        player,
        tags
        ;
var localContext = {
    "window":{
        location:{
            href: "testURL"
        }
    }
};
    beforeEach(function(){
        module('myAppConfig');

      // IndexController();
        inject(function($controller, $rootScope,$httpBackend,$cookieStore)
            {
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                scope.path = {};
                scope.search = {
                    key: '',
                  };
                scope.cookieStore = {};


                controller = $controller('PlayerController',{
                  $scope:scope,
                  $location: {
                              path:function(val){
                                  scope.path = val;
                                },
                              search: function(key,val){
                                scope.search[key] = val;
                              },
                              absUrl: function() {
                                return "http://localhost:8888/app/index.html#/home";
                              }
                            },
                  $cookieStore: {
                              put: function(key,val) {
                                  scope.cookieStore[key] = val;
                              }
                            }
                });

            });
    });


    // it('should define IndexController',function(){
    //     expect(scope.test).to.equal('test');
    // });

    it('should define function list',function(){
        // assert.typeOf(scope.list,'function');
        expect('function').toEqual(typeof scope.list);
    });

    function rightHttpResponse() {
        httpBackend.whenGET('/jsonapi/mobile_paths').respond([{"pathModified": "2011-05-18 08:40:46.845609", "name": "Beginner Obj-C", "price": 0.0, "free": true, "number_of_problemsets": 6, "path_id": 7520056, "purchased": false, "number_of_problems": 4, "number_of_solved_problems": 3, "description": "Beginner Path for Objective-C"}, {"pathModified": "2012-05-22 03:51:12.291919", "name": "Beginner Python", "price": 0.0, "free": true, "number_of_problemsets": 9, "path_id": 6920762, "purchased": false, "number_of_problems": 101, "number_of_solved_problems": 101, "description": "Beginner Python"}, {"pathModified": "2012-08-29 02:45:43.079114", "name": "Beginner Javascript", "price": 0.0, "free": true, "number_of_problemsets": 6, "path_id": 12605566, "purchased": false, "number_of_problems": 58, "number_of_solved_problems": 0, "description": "Beginner Javascript Path"}, {"pathModified": "2012-08-29 07:40:01.039161", "name": "Beginner Ruby", "price": 0.0, "free": true, "number_of_problemsets": 6, "path_id": 8277128, "purchased": false, "number_of_problems": 73, "number_of_solved_problems": 1, "description": "Beginner Ruby Path"}, {"pathModified": "2012-08-29 02:53:32.616533", "name": "Beginner Java", "price": 0.0, "free": true, "number_of_problemsets": 6, "path_id": 8113761, "purchased": false, "number_of_problems": 65, "number_of_solved_problems": 22, "description": "Beginner Java Path"}]);
        var player = { countryFlagURL: "http://www.singpath.com/static/flags/sg_on.png",gender: "male",isoYear: 2010,countryCode: "SG",tags: ["SMU","hackerspacesg"],country: "Singapore",yearOfBirth: 1985,about: "I love Scifi",isoDay: 5,isoWeek: 6,isAdmin: true,gravatar: "http://www.gravatar.com/avatar/6e64bb2cab5367fd6e201df2aa722512/?default=&amp;s=80",location: "Singapore",rankings: [ ],player_id: 57754,professional: "1",nickname: "Ruijun",badges: [ ]}
        httpBackend.whenGET('/jsonapi/player').respond(player); 
        httpBackend.whenGET('/jsonapi/tags').respond();
    }

    function wrongHttpResponse() {
        httpBackend.whenGET('/jsonapi/player').respond({});
        httpBackend.whenGET('/jsonapi/tags').respond({});
        httpBackend.whenGET('/jsonapi/mobile_paths').respond({});
    }

    it('should test function list and response true',function(){
        rightHttpResponse();

        scope.list();
        httpBackend.flush();
        expect(scope.player.country).toEqual('Singapore');
    });

    it('should test function addTag true',function(){
      var tags = "SMU,hackerspacesg";
      scope.addTag(tags);
      // assert.lengthOf(scope.player.tags,2);
      expect(scope.player.tags.length).toEqual(2);
    });

    it('should test function addTag duplicate',function(){
      var tags = "SMU,hackerspacesg,SMU";
      scope.addTag(tags);
      // assert.lengthOf(scope.player.tags,2);
      expect(scope.player.tags.length).toEqual(2);
    });

    it('should test  function firstLoad return true', function(){
        rightHttpResponse();
        scope.list();
        httpBackend.flush();
        var paid = '3312';
        scope.firstLoad(paid);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(scope.cookieStore.pid).toEqual(paid);
        expect(scope.path).toEqual('practice');
    });

    it('should test  function firstLoad return false', function(){
        wrongHttpResponse();
        var paid = 'paid';
        scope.list();
        scope.firstLoad(paid);
        httpBackend.flush();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkQuestLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkQuestLogin();
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(scope.path).toEqual('quests');
    });

    it('should test function checkQuestLogin return false',function(){
        scope.checkQuestLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkPracticeLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkPracticeLogin();
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('practice');
    });

    it('should test function checkPracticeLogin return false',function(){
        scope.checkPracticeLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkStoryLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkStoryLogin();
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('story');
    });

    it('should test function checkStoryLogin return false',function(){
        scope.checkStoryLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkChallengesLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkChallengesLogin();
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('challenges');
    });

    it('should test function checkChallengesLogin return false',function(){
        scope.checkChallengesLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkRankingLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkRankingLogin();
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('ranking');
    });

    it('should test function checkRankingLogin return false',function(){
        scope.checkRankingLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkFeedbackLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkFeedbackLogin();
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('feedback');
    });

    it('should test function checkFeedbackLogin return false',function(){
        scope.checkFeedbackLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function checkProfileLogin return true',function(){
        scope.player.nickname = 'nick';
        scope.checkProfileLogin();
        expect(scope.search.storyID).toEqual(null);
        expect(scope.search.difficulty).toEqual(null);
        expect(scope.search.path_ID).toEqual(null);
        expect(typeof scope.player.nickname).not.toEqual('undefined');
        expect(scope.path).toEqual('profile');
    });

    it('should test function checkProfileLogin return false',function(){
        scope.checkProfileLogin();
        expect(typeof scope.player.nickname).toEqual('undefined');
    });

    it('should test function update_player_profile true',function(){
        httpBackend.whenPOST('/jsonapi/update_player_profile').respond(200,{data:'test', status:404, headers:{}, config:{}});
        $event = {};
        scope.player = {
          nickname : {},
          professional : {},
          about : {},
          location : {},
          tags : {},
          gender : {}
        };
        var testReload;
        window.location.reload = function(val){testReload = val;};
        scope.update_player_profile($event);
        httpBackend.flush();
        expect(testReload).toEqual('profile');
    });

    it('should test function update_player_profile fail',function(){
        httpBackend.whenPOST('/jsonapi/update_player_profile').respond(404,{data:'test', status:404, headers:{}, config:{}});
        $event = {};
        scope.player = {
          nickname : {},
          professional : {},
          about : {},
          location : {},
          tags : {},
          gender : {}
        };
        var testReload;
        window.location.reload = function(val){testReload = val;};
        scope.update_player_profile($event);
        httpBackend.flush();
        expect(testReload).toEqual('profile');
    });

    it('should test log_event',function(){
        httpBackend.whenPOST('/jsonapi/log_event').respond({"message":"testing logging"});
        var $event = {};
        $event.target = {};
        $event.target.name = 'element';
        scope.log_event($event);
        httpBackend.flush();
    });

    it('shoult test logout',function(){
        httpBackend.whenGET('/sign_out').respond({data:'somedata'});
        httpBackend.whenGET('/jsonapi/player').respond({});


          var location = spyOn(window, 'changeLocation').andReturn('index.html');
            scope.logout();
            expect(location()).toEqual('index.html');
            httpBackend.flush();

    });

  });

  /*
  it('should have a properly working VideoCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    var searchID = 'cars';
    var response = $httpBackend.expectJSONP('https://gdata.youtube.com/feeds/api/videos/' + searchID + '?v=2&alt=json&callback=JSON_CALLBACK');
    response.respond(null);

    var $scope = $rootScope.$new();
    var ctrl = $controller('VideoCtrl', {
      $scope : $scope,
      $routeParams : {
        id : searchID
      }
    });
  }));

  it('should have a properly working WatchedVideosCtrl controller', inject(function($rootScope, $controller, $httpBackend) {
    var $scope = $rootScope.$new();

    //we're stubbing the onReady event
    $scope.onReady = function() { };
    var ctrl = $controller('WatchedVideosCtrl', {
      $scope : $scope
    });
  }));
 */
});
