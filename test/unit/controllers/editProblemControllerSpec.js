(function() {
    'use strict';

    describe('EditProblemController', function() {

        var ctrl, scope, httpBackend, levels;

        beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
            scope = $rootScope.$new();
            httpBackend = _$httpBackend_;
            ctrl = $controller('EditProblemController', {
                $scope: scope
            });
            levels = {
                "type": "problemsets",
                "problemsets": [{
                    "id": 11021,
                    "numProblems": 10,
                    "name": "Python Level 1",
                    "description": "The way of SingPath"
                }, {
                    "id": 10034,
                    "numProblems": 13,
                    "name": "Python Level 2",
                    "description": "Variables, keywords, and statements"
                }, {
                    "id": 11023,
                    "numProblems": 24,
                    "name": "Python Level 3",
                    "description": "Functions"
                }, {
                    "id": 11026,
                    "numProblems": 28,
                    "name": "Python Level 4",
                    "description": "Conditionals"
                }, {
                    "id": 11029,
                    "numProblems": 23,
                    "name": "Python Level 5",
                    "description": "Iteration"
                }, {
                    "id": 10040,
                    "numProblems": 33,
                    "name": "Python Level 6",
                    "description": "Strings"
                }, {
                    "id": 11031,
                    "numProblems": 36,
                    "name": "Python Level 7",
                    "description": "Lists"
                }, {
                    "id": 10041,
                    "numProblems": 13,
                    "name": "Python Level 8",
                    "description": "Dictionaries"
                }, {
                    "id": 11032,
                    "numProblems": 16,
                    "name": "Python Level 9",
                    "description": "Tuples"
                }, {
                    "id": 38394,
                    "numProblems": 19,
                    "name": "Python Level 10",
                    "description": "Classes & Objects"
                }, {
                    "id": 11028,
                    "numProblems": 17,
                    "name": "Python Level 11",
                    "description": "Recursion"
                }, {
                    "id": 41101,
                    "numProblems": 2,
                    "name": "Python Level 12",
                    "description": "Games & Puzzles"
                }, {
                    "id": 6603407,
                    "numProblems": 9,
                    "name": "Python Level 13",
                    "description": "List Comprehensions"
                }, {
                    "id": 6598750,
                    "numProblems": 6,
                    "name": "Python Level 14",
                    "description": "Python Built-In Library"
                }, {
                    "id": 6771183,
                    "numProblems": 5,
                    "name": "Python Level 15",
                    "description": "Exceptions"
                }, {
                    "id": 11155,
                    "numProblems": 2,
                    "name": "New Problem Storage",
                    "description": "Miscellaneous Problems"
                }]
            };

            httpBackend.expectGET('/jsonapi/interfaces').respond({
                "interfaces": [{
                    "singpathSupported": true,
                    "description": "Python 2.5",
                    "codeHighlightKey": "python",
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "removed"
                    },
                    "urls": ["http://python-gae-verifier.appspot.com/verify", "http://ideone-verifier.appspot.com/verify"],
                    "exampleSolution": "spam=2\r\ndef addOne(x): \r\n  return x+1",
                    "exampleTests": ">>> spam \r\n 2\r\n>>> addOne(2)\r\n 3\r\n>>> spam\r\n 3\r\n>>> addOne(2)\r\n 2\r\n",
                    "id": 11020,
                    "name": "Python"
                }, {
                    "singpathSupported": true,
                    "description": "Java Interface",
                    "codeHighlightKey": "Java",
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "Removed"
                    },
                    "urls": ["http://parserplayground-staging.appspot.com/java", "http://parserplayground.appspot.com/java", "http://java-gae-verifier.appspot.com/java"],
                    "exampleSolution": "int add(int x)\r\n{\r\n    return x+1;\r\n}\r\nString foo = \"foo\"; \r\nint b=1;\r\nchar[] charArray ={ 'a', 'b'};",
                    "exampleTests": "assertEquals(add(0), 1); \r\nassertEquals(add(b), 2);\r\nassertTrue(true);\r\nassertFalse(false);\r\nassertEquals(foo, \"foo\");\r\nchar[] newArray ={ 'a', 'b'};\r\nassertArrayEquals(charArray, newArray);\r\nassertTrue(false);\r\nassertFalse(true);\r\nassertEquals(3.4, 3.4, 0.001); //Need a delta for floats.\r\n\r\n",
                    "id": 2276166,
                    "name": "Java"
                }]
            });

            httpBackend.expectGET('/jsonapi/get_my_paths?interface_id=11020').respond({
                "paths": [{
                    "description": "Chris' new problems",
                    "isGamePath": false,
                    "interface_id": 11020,
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "PRIVATE"
                    },
                    "id": 302013,
                    "name": "Default Path for Chris"
                }, ],
                "type": "my_paths",
                "interface_id": 11020
            });
            httpBackend.flush();
        }));

        it('should fetch the list of interfaces and the paths of the 1st interface', function() {
            expect(scope.interfaces.length).toBe(2);
            expect(scope.interface.id).toBe(11020);
            expect(scope.paths.length).toBe(1);
            expect(scope.paths[0].id).toBe(302013);
        });

        it('should update the list of path when the selected interface changes', function() {
            scope.interface = scope.interfaces[1];
            scope.getPaths(scope.interface);

            httpBackend.expectGET('/jsonapi/get_my_paths?interface_id=2276166').respond({
                "paths": [{
                    "description": "Chris' new Java problems",
                    "isGamePath": false,
                    "interface_id": 2276166,
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "PRIVATE"
                    },
                    "id": 302014,
                    "name": "Default Path for Chris"
                }, ],
                "type": "my_paths",
                "interface_id": 2276166
            });
            scope.$apply();
            httpBackend.flush();
            expect(scope.paths.length).toBe(1);
            expect(scope.paths[0].id).toBe(302014);
        });

        it('should create new paths', function() {
            var data;

            scope.createNewPath(scope.interface);
            expect(scope.newPath.interface_id).toBe(11020);

            scope.newPath.name = 'foo';
            scope.newPath.description = 'bar';
            scope.saveNewPath(scope.newPath);
            httpBackend.expectPOST('/jsonapi/new_path').respond(function(method, url, strData) {
                data = parseParam(strData);
                return [200, {
                    'path_id': 1234
                }];
            });

            httpBackend.flush();
            expect(data).toEqual({
                interface_id: '11020',
                name: 'foo',
                description: 'bar'
            });
            expect(scope.paths.length).toBe(2);
            expect(scope.path.id).toBe(1234);
            expect(scope.newPath).toBe(null);
        });

        it('should update the list of level when the selected path changes', function() {
            scope.path = scope.paths[0];
            scope.getLevels(scope.path);

            expect(scope.problemSets).toEqual([]);
            httpBackend.expectGET('/jsonapi/problemsets/302013').respond(levels);
            httpBackend.flush();

            expect(scope.problemSets).toEqual(levels.problemsets);
        });

        it('should create new levels', function() {
            var data;

            scope.path = scope.paths[0];
            scope.getLevels(scope.path);
            httpBackend.whenGET('/jsonapi/problemsets/302013').respond(levels);

            scope.createNewLevel(scope.path);
            expect(scope.newLevel.path_id).toBe(scope.path.id);

            scope.newLevel.name = 'foo';
            scope.newLevel.description = 'bar';

            scope.saveNewLevel(scope.newLevel);
            httpBackend.expectPOST('/jsonapi/new_problemset').respond(function(method, url, strData) {
                data = parseParam(strData);
                return [200, {'problemset_id': 12345}];
            });

            httpBackend.flush();
            expect(data.path_id).toBe(scope.path.id.toString());
            expect(data.name).toBe('foo');
            expect(data.description).toBe('bar');

            expect(scope.newLevel).toBe(null);
            expect(scope.problemSets.slice(-1)[0].id).toBe(12345);
            expect(scope.problemSets.slice(-1)[0].name).toBe('foo');
        });

    });

    function parseParam(params) {
        var result = {};

        params.split('&').forEach(function(pair) {
            var kv = pair.split('=');

            if (kv.length !== 2) {
                return;
            }

            result[kv[0]] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
        });

        return result;
    }

})();