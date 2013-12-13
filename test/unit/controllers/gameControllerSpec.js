'use strict';

describe('Unit: Testing Game Controller', function () {
    var scope, ctrl, $httpBackend,
        qId = 7,
        gameId = 11,
        stroy = 'epic_story',
        path = 101;

    beforeEach(module('myApp', function ($provide) {
        // Mocking the Browser & setting a default cookie
        $provide.factory('$browser', function () {
            return angular.extend(new angular.mock.$Browser(), {
                cookieHash: {
                    name: {
                        id: qId
                    }
                }
            });
        });
    }));

    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/jsonapi/create_quest_game/' + qId).respond({
            gameID: gameId
        });
        $httpBackend.whenGET('/jsonapi/game/' + gameId).respond({
            problemIDs: [1],
            solvedProblemIDs: [],
            problems: {
                problems: [
                    {
                        skeleton: 'test',
                        lines: 'test line'
                    }
                ]
            }
        });
        $httpBackend.whenGET('/jsonapi/quest').respond({});
        $httpBackend.whenGET('/jsonapi/story/epic_story').respond({
            description: 'Epic Story'
        });
        $httpBackend.whenGET('/jsonapi/get_path_progress/101').respond({
            path: {
                name: 'Critical Path'
            }
        });

        scope = $rootScope.$new();
        ctrl = $controller('GameController', {
            $scope: scope
        });
    }));

    describe('Initialization', function () {
        it('should instantiate autoCheck to yes', function () {
            expect(scope.autoCheck).toEqual('yes');
        });

        it('should instantiate notCompile to false', function () {
            expect(scope.notCompile).toEqual('false');
        });

        it('should instantiate qid to 7', function () {
            expect(scope.qid).toEqual(qId);
        });

        it('should instantiate source to empty array', function () {
            expect(scope.source.length).toEqual(0);
        });

        // Skipping the rest because they are same
    });

    describe('Action Handlers', function () {

        describe('sourceEmpty', function () {
            it('should return true if the source is empty', function () {
                expect(scope.sourceEmpty()).toBeTruthy();
            });

            it('should return false if the source is not empty', function () {
                scope.source.push(1);
                expect(scope.sourceEmpty()).toBeFalsy();
            });
        });

        // Skipping modelEmpty because it is same
        // Skipping assign_id because I have to understand what is going on

        describe('create_quest_game', function () {
            beforeEach(inject(function () {
                // Disable Watchers
                scope.$$watchers = [];

                spyOn(scope, 'fetch').andCallThrough();
                spyOn(scope, 'update_quest').andCallThrough();

                scope.create_quest_game(qId);
                $httpBackend.flush();
            }));

            it('should set game with the response of the http call', inject(function () {
                expect(scope.game.problemIDs.length).toEqual(1);
            }));

            it('should call $scope.fetch', function () {
                expect(scope.fetch).toHaveBeenCalledWith(gameId);
            });

            it('should call $scope.update_quest', function () {
                expect(scope.update_quest).toHaveBeenCalled();
            });
        });
    });

    describe('Watchers', function () {
        describe('quest.name', function () {
            beforeEach(function () {
                scope.quest = {};
                scope.quest.story = stroy;
                scope.quest.path = path;
                $httpBackend.flush();
            });

            it('should set some value to $scope.singleStory', function () {
                expect(scope.singleStory).toBeDefined();
            });

            it('should set the $scope.singleStoryDes correctly', function () {
                expect(scope.singleStoryDes).toEqual('Epic Story');
            });

            it('should set some value to $scope.singlePath', function () {
                expect(scope.singlePath).toBeDefined();
            });

            it('should set the $scope.singlePathName correctly', function () {
                expect(scope.singlePathName).toEqual('Critical Path');
            });
        });
    });

});