(function() {
    'use strict';

    describe('EditProblemController', function() {

        var ctrl, scope, httpBackend, levels, problems, problemDetails, problemMobile, interval, interfaces, paths;

        beforeEach(angular.mock.module('myApp'));

        beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $window) {
            interval = {
                cbs: [],
                setInterval: function(cb, rate) {
                    interval.cbs.push({cb: cb, rate: rate});
                    return interval.cbs.length;
                },
                clearInterval: function(intervalId) {
                    interval.cbs[intervalId - 1] = null;
                }
            };
            interval.cb = [];
            scope = $rootScope.$new();
            httpBackend = _$httpBackend_;

            ctrl = $controller('EditProblemController', {
                $scope: scope,
                '$window': {
                    'setInterval': interval.setInterval,
                    'clearInterval': interval.clearInterval,
                    '$': $window['$'],
                    'jQuery': $window['jQuery'],
                    'Date': $window.Date,
                    'alert': function() {
                        return true;
                    }
                }
            });

            interfaces = {
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
            };

            paths = {
                "paths": [{
                    "description": "Chris' new problems",
                    "isGamePath": false,
                    "interface_id": 11020,
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "PRIVATE"
                    },
                    "id": 10030,
                    "name": "Default Path for Chris"
                }, ],
                "type": "my_paths",
                "interface_id": 11020
            };

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

            problems = {
                "problems": [{
                    "skeleton": "# This is where you will actually  be typing and testing your code. Click \"Run Code\".",
                    "description": "Welcome to SingPath!  The first few questions will introduce you to the interface.  You do not need to type anything in the solution box below.  Just read the examples and the solution given.  When you are ready to go to the next question, click the \"Run\" button.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": "This section will give you examples of code that SingPath will use to test your program solutions.  \r\n\r\n",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 1,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 37043,
                    "name": "Welcome"
                }, {
                    "skeleton": "greeting = 'hello world'",
                    "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> greeting\r\n'hello world'",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 2,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 17191,
                    "name": "Your First Program"
                }, {
                    "skeleton": "bob='Thanks for the ",
                    "description": "Many of the questions will include starter code.  It helps you as you solve the problem.  For this problem create a variable named 'bob' that contains the text 'Thanks for the help'",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> bob\r\n'Thanks for the help'",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 3,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 36066,
                    "name": "Starter Code"
                }, {
                    "skeleton": "oops=317",
                    "description": "When you run your code, SingPath has certain tests that it checks to see if you did what you were supposed to do.  If incorrect you'll see a table with the results of the tests.  \r\n\r\nNotice that the starter code has the wrong value. Go ahead and run the code now so you can see the results (you can finish reading this after you run it).\r\n\r\nThe results tell you that SingPath looked at the variable named 'oops' expecting to find 713, but found 317 instead. Fix the error now and run it to advance to the next problem.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> oops\r\n 713",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 4,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 10033,
                    "name": "Expected Results"
                }, {
                    "skeleton": "age = ",
                    "description": "Variables are an important part of programming; they allow the you to store a value and reuse it later.  You are allowed to use just about anything you like as your variable name.\r\n\r\nFor this problem, create a variable named 'age' with the value 7.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> age\r\n7",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 5,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 17155,
                    "name": "Variables"
                }, {
                    "skeleton": "spam='",
                    "description": "Variables can hold many different types of information.  Create a variable spam containing the word 'anxious'.  When you store words or phrases into a variable, you must enclose the text in quotation marks.  You can use single quotes or double quotes, either will work.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> spam\r\n'anxious'",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 6,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 18156,
                    "name": "Another Variable"
                }, {
                    "skeleton": "name=\r\npigs=",
                    "description": "You can create as many variables as you like.  For this problem create two different variables: name which contains 4.27 and pigs which contains the phrase 'can fly'.\r\n\r\nNotice that the variable called name contains a number and not a name at all. Variable names DON'T have to describe their contents, but it is best to choose variable names that describe the contents.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> name\r\n4.27\r\n>>> pigs\r\n'can fly'",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 7,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 10119,
                    "name": "Still more variables"
                }, {
                    "skeleton": "alpha=\r\npi=",
                    "description": "Remember that the examples will show you the tests that will be run on your code to make sure you have accomplished the task.  If you are unsure exactly what you need to do, look at the examples.  For this problem create a variable named alpha that contains the alphabet, and a variable named pi that contains the value of pi, correct to 8 decimal places.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> alpha\r\n 'abcdefghijklmnopqrstuvwxyz'\r\n>>> pi\r\n 3.14159265",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 8,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 10032,
                    "name": "More Fun with Variables"
                }, {
                    "skeleton": null,
                    "description": "For this task you need to create two variables containing the values listed.  Check the examples to see what values they should have.  This time you don't get any help.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> quest\r\n'To seek the Holy Grail.'\r\n>>> airspeed\r\n43",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 9,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 10115,
                    "name": "Many Variables"
                }, {
                    "skeleton": "perfect = (4+3",
                    "description": "An essential skill of programming is finding and fixing errors.  Here is a simple example of a syntax error.  Look at the code that is given and fix the error. Syntax errors occur when you type something that python can't recognize.  \r\n\r\nIt could be a symbol that is in a weird place: \r\n  4+$ (You can't add 4 plus $)\r\n\r\nCorrect the code so that it no longer contains a syntax error",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> perfect\r\n7",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 10,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 18170,
                    "name": "Syntax error"
                }, {
                    "skeleton": "#wizard = ",
                    "description": "Make the variable wizard = &quot;Oz&quot;.",
                    "path_id": 10030,
                    "solved": true,
                    "problemset_id": 11021,
                    "examples": ">>> wizard\n \"Oz\"\n",
                    "interface": {
                        "codeHighlightKey": "python",
                        "name": "Python",
                        "description": "Python 2.5"
                    },
                    "problemsetorder": 11,
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "PRIVATE"
                    },
                    "id": 18880568,
                    "name": "Wizard"
                }],
                "type": "problems",
                "required_badges": [],
                "problemset": {
                    "pathorder": 1,
                    "editor": {
                        "player_id": 58546,
                        "nickname": "Danny",
                        "email": "PRIVATE"
                    },
                    "id": 11021,
                    "name": "Python Level 1",
                    "description": "The way of SingPath"
                }
            };

            problemDetails = {
                "problem": {
                    "tests": ">>> greeting\r\n'hello world'",
                    "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
                    "other_tests": null,
                    "modified": "2010-12-13 01:10:53.287641",
                    "problemset_id": 11021,
                    "examples": ">>> greeting\r\n'hello world'",
                    "problemsetorder": 2,
                    "problem_id": 37043,
                    "skeleton": "greeting = 'hello world'",
                    "name": "Welcome",
                    "created": "2009-12-15 18:57:09.124678",
                    "solution": "greeting='hello world'",
                    "interface_id": 11020,
                    "path_id": 10030,
                    "editor": {
                        "player_id": 57754,
                        "nickname": "Chris",
                        "email": "PRIVATE"
                    }
                },
                "type": "problem"
            };

            problemMobile = {
                "tests": ">>> greeting\r\n'hello world'",
                "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
                "current_solution": "greeting='hello world'",
                "lines": ["greeting='hello world'"],
                "solution": "greeting='hello world'",
                "path_id": 10030,
                "depth": 1,
                "problemset_id": 11021,
                "examples": ">>> greeting\r\n'hello world'",
                "current_tests": ">>> greeting\r\n'hello world'",
                "problemsetorder": 2,
                "id": 37043,
                "nonErrorResults": {
                    "1": {
                        "solved": "true",
                        "results": [{
                            "expected": "Not built yet",
                            "received": "Not built yet",
                            "call": "Not built yet",
                            "correct": true
                        }]
                    }
                },
                "name": "Welcome"
            };

            httpBackend.expectGET('/jsonapi/interfaces').respond(interfaces);
            httpBackend.expectGET('/jsonapi/get_my_paths?interface_id=11020').respond(paths);
            httpBackend.flush();
        }));

        it('should fetch the list of interfaces and the paths of the 1st interface', function() {
            expect(scope.interfaces.length).toBe(2);
            expect(scope.interface.id).toBe(11020);
            expect(scope.paths.length).toBe(1);
            expect(scope.paths[0].id).toBe(10030);
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
            httpBackend.expectGET('/jsonapi/problemsets/10030').respond(levels);
            httpBackend.flush();

            expect(scope.problemSets).toEqual(levels.problemsets);
        });

        it('should create new levels', function() {
            var data;

            scope.path = scope.paths[0];
            scope.getLevels(scope.path);
            httpBackend.whenGET('/jsonapi/problemsets/10030').respond(levels);

            scope.createNewLevel(scope.path);
            expect(scope.newLevel.path_id).toBe(scope.path.id);

            scope.newLevel.name = 'foo';
            scope.newLevel.description = 'bar';

            scope.saveNewLevel(scope.newLevel);
            httpBackend.expectPOST('/jsonapi/new_problemset').respond(function(method, url, strData) {
                data = parseParam(strData);
                return [200, {
                    'problemset_id': 12345
                }];
            });

            httpBackend.flush();
            expect(data.path_id).toBe(scope.path.id.toString());
            expect(data.name).toBe('foo');
            expect(data.description).toBe('bar');

            expect(scope.newLevel).toBe(null);
            expect(scope.problemSets.slice(-1)[0].id).toBe(12345);
            expect(scope.problemSets.slice(-1)[0].name).toBe('foo');
        });

        it('should update the list of problems when the selected level changes', function() {
            scope.path = scope.paths[0];
            scope.getLevels(scope.path);

            httpBackend.whenGET('/jsonapi/problemsets/10030').respond(levels);
            httpBackend.flush();

            scope.problemSet = scope.problemSets[0];
            scope.getProblems(scope.problemSet);

            expect(scope.problems).toEqual([]);

            httpBackend.expectGET('/jsonapi/problems/11021').respond(problems);
            httpBackend.flush();

            expect(scope.problems).toEqual(problems.problems);
        });

        it('should move problems up', function() {
            var last, params;

            scope.path = scope.paths[0];
            scope.getLevels(scope.path);
            httpBackend.whenGET('/jsonapi/problemsets/10030').respond(levels);
            httpBackend.flush();

            scope.problemSet = scope.problemSets[0];
            scope.getProblems(scope.problemSet);
            httpBackend.whenGET('/jsonapi/problems/11021').respond(problems);
            httpBackend.flush();

            last = scope.problems.slice(-1)[0];
            scope.moveUp(last);
            httpBackend.expectPOST('/jsonapi/move_problem_up').respond(function(method, url, strData) {
                params = strData;
                return [200, {'success': true}];
            });
            httpBackend.flush();

            expect(params).toBe('problem_id=18880568');
            expect(last.problemsetorder).toBe(10);
            expect(scope.problems.slice(-1)[0].problemsetorder).toBe(11);
            expect(scope.problems.slice(-1)[0].id).toBe(18170);
        });

        it('should move problems down', function() {
            var first, params;

            scope.path = scope.paths[0];
            scope.getLevels(scope.path);
            httpBackend.whenGET('/jsonapi/problemsets/10030').respond(levels);
            httpBackend.flush();

            scope.problemSet = scope.problemSets[0];
            scope.getProblems(scope.problemSet);
            httpBackend.whenGET('/jsonapi/problems/11021').respond(problems);
            httpBackend.flush();

            first = scope.problems[0];
            scope.moveDown(first);
            httpBackend.expectPOST('/jsonapi/move_problem_down').respond(function(method, url, strData) {
                params = strData;
                return [200, {'success': true}];
            });
            httpBackend.flush();

            expect(params).toBe('problem_id=37043');
            expect(first.problemsetorder).toBe(2);
            expect(scope.problems[0].problemsetorder).toBe(1);
            expect(scope.problems[0].id).toBe(17191);
        });

        it('should get a problem details', function() {
            scope.getProblemDetails(problems.problems[0]);
            httpBackend.expectGET('/jsonapi/get_problem?problem_id=37043').respond(problemDetails);
            httpBackend.expectGET('/jsonapi/mobile_problem/37043').respond(problemMobile);

            httpBackend.flush();
            expect(scope.problemDetails.problem_id).toBe(37043);
            expect(scope.problemMobile.id).toBe(37043);
        });

        it('should select the problem from $routeParams', inject(function($controller, $window) {
            ctrl = $controller('EditProblemController', {
                '$scope': scope,
                '$window': {
                    'setInterval': interval.setInterval,
                    'clearInterval': interval.clearInterval,
                    '$': $window['$'],
                    'jQuery': $window['jQuery'],
                    'Date': $window.Date
                },
                '$routeParams': {'problemId': '37043'}
            });

            httpBackend.expectGET('/jsonapi/interfaces').respond(interfaces);
            httpBackend.expectGET('/jsonapi/get_problem?problem_id=37043').respond(problemDetails);
            httpBackend.expectGET('/jsonapi/mobile_problem/37043').respond(problemMobile);
            httpBackend.expectGET('/jsonapi/get_my_paths?interface_id=11020').respond(paths);
            httpBackend.expectGET('/jsonapi/problemsets/10030').respond(levels);
            httpBackend.expectGET('/jsonapi/problems/11021').respond(problems);
            httpBackend.flush();
            
            expect(scope.interface.id).toBe(11020);
            expect(scope.path.id).toBe(10030);
            expect(scope.problemSet.id).toBe(11021);
            expect(scope.problem.id).toBe(37043);
            expect(scope.problemDetails.problem_id).toBe(37043);
            expect(scope.problemMobile.id).toBe(37043);
        }));

        it('should run private and public test against the solution', function() {
            var data = [];

            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.other_tests = "assert greeting == 'hello world'";
            scope.runTests();

            expect(scope.testRun).toEqual({});

            httpBackend.whenPOST('/jsonapi/check_code_with_interface').respond(function(method, url, strData) {
                data.push(parseParam(strData));
                return [200, {'solved': true}];
            });

            httpBackend.flush();
            expect(data.length).toBe(2);
            expect(data[0].interface_id).toBe('11020');
            expect(data[0].source_code).toBe("greeting='hello world'");
            expect(data[0].examples).toBe(">>> greeting\r\n'hello world'");
            expect(data[0].tests).toBe(">>> greeting\r\n'hello world'");
            expect(data[1].interface_id).toBe('11020');
            expect(data[1].source_code).toBe("greeting='hello world'");
            expect(data[1].examples).toBe(">>> greeting\r\n'hello world'");
            expect(data[1].tests).toBe("assert greeting == 'hello world'");
        });

        it('should create a new problem.', function() {
            var data;

            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = {
                problemset_id: scope.problemSet.id
            };
            scope.problemDetails = {
                name: 'foo',
                description: 'bar',
                solution: 'a=1',
                tests: '>>> a\r\n1'
            };

            scope.save();
            httpBackend.expectPOST('/jsonapi/new_problem').respond(function(method, url, strData) {
                data = parseParam(strData);

                return [200, {problem_id: 1234}];
            });
            httpBackend.flush();

            expect(data.interface_id).toBe('11020');
            expect(data.path_id).toBe('10030');
            expect(data.level_id).toBe('11021');
            expect(data.name).toBe('foo');
            expect(data.solution_code).toBe('a=1');
            expect(data.publicTests).toBe('>>> a\r\n1');

            expect(scope.problem.id).toBe(1234);
            expect(scope.problemDetails.problem_id).toBe(1234);
        });

        it('should save changes to problems', function() {
            var data;

            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = problems.problems[0];
            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.other_tests = ">>> greeting + '!'\r\n'hello world!'";

            scope.save();
            httpBackend.expectPOST('/jsonapi/edit_problem').respond(function(method, url, strData) {
                data = parseParam(strData);
                
                return [200, {problem_id: 37043}];
            });
            httpBackend.flush();

            expect(data.interface_id).toBe('11020');
            expect(data.path_id).toBe('10030');
            expect(data.level_id).toBe('11021');
            expect(data.name).toBe('Welcome');
            expect(data.solution_code).toBe("greeting='hello world'");
            expect(data.publicTests).toBe(">>> greeting\r\n'hello world'");
            expect(data.privateTests).toBe(">>> greeting + '!'\r\n'hello world!'");

            expect(scope.problem.id).toBe(37043);
            expect(scope.problemDetails.problem_id).toBe(37043);
        });

        it('should save changes to mobile problems', function() {
            var data = [];

            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = problems.problems[0];
            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.other_tests = ">>> greeting + '!'\r\n'hello world!'";
            scope.problemMobile = problemMobile;

            scope.save();
            httpBackend.whenPOST('/jsonapi/edit_problem').respond(function(method, url, strData) {
                data.push(parseParam(strData));
                
                return [200, {problem_id: 37043}];
            });

            httpBackend.expectPOST('/jsonapi/update_mobile_problem').respond(function(method, url, strData) {
                data.push(JSON.parse(strData));
                return [200, problemMobile];
            });

            httpBackend.flush();
            expect(data[0].privateTests).toBe("");

            expect(data[1]).toEqual({
                problem_id: problemMobile.problem_id,
                nonErrorResults: problemMobile.nonErrorResults
            });

        });

        it('should build mobile problems solutions', function() {
            var data = [], url;

            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = problems.problems[0];
            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.solution = "greeting='Hello Jasmine'";
            scope.problemDetails.tests = ">>> greeting\n'Hello Jasmine'";
            scope.problemMobile = problemMobile;

            scope.build.start(scope.problemDetails, ['http://example.com/verify']);

            expect(scope.build.running()).toBe(true);
            expect(scope.build.timer.running()).toBe(true);
            expect(scope.build.token).toBe(scope.build.maxToken);
            expect(scope.build.token).toBeGreaterThan(0);
            expect(scope.build.permutations.remaining).toEqual([[1]]);
            expect(scope.build.permutations.total).toBe(1);
            expect(scope.build.permutations.checked()).toBe(0);
            expect(scope.build.permutations.progress()).toBe(0);

            expect(interval.cbs.length).toBe(1);
            expect(scope.build.runInterval).toBe(1);
            expect(interval.cbs[0].rate).toBe(scope.build.rate);

            httpBackend.expectJSONP(/http:\/\/example.com\/verify\?vcallback=JSON_CALLBACK/).respond(function(method, url) {
                var search = url.split('?')[1],
                    params = parseParam(search),
                    jsonrequest = JSON.parse(atob(params['jsonrequest']));

                data.push(jsonrequest);

                return [200, {
                    'solved': true,
                    'results': [
                        {
                            'correct': true,
                            'call': 'greeting',
                            'expected': 'Hello Jasmine',
                            'received': 'Hello Jasmine'
                        }
                    ]
                }];
            });
            interval.cbs[0].cb();
            httpBackend.flush();

            expect(data.length).toBe(1);
            expect(data[0]['solution']).toBe("greeting='Hello Jasmine'");
            expect(data[0]['tests']).toBe(">>> greeting\n'Hello Jasmine'");

            expect(scope.build.running()).toBe(false);
            expect(scope.build.timer.running()).toBe(false);

            expect(scope.problemMobile.nonErrorResults).toEqual({
                '1': {
                    'solved': true,
                    'results': [
                        {
                            'correct': true,
                            'call': 'greeting',
                            'expected': 'Hello Jasmine',
                            'received': 'Hello Jasmine'
                        }
                    ]
                }
            });
        });

        it('should filter error built result', function() {

            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = problems.problems[0];
            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.solution = "greeting='Hello Jasmine'";
            scope.problemDetails.tests = ">>> greeting\n'Hello Jasmine'";
            scope.problemMobile = problemMobile;

            scope.build.start(scope.problemDetails, ['http://example.com/verify']);

            httpBackend.expectJSONP(/http:\/\/example.com\/verify\?vcallback=JSON_CALLBACK/).respond(function(method, url) {
                return [200, {
                    'errors': 'bad request',
                }];
            });
            interval.cbs[0].cb();
            httpBackend.flush();

            expect(scope.problemMobile.nonErrorResults).toEqual({});

        });

        it('should stop build after 50 failed verify http request', function() {
            scope.path = scope.paths[0];
            scope.problemSet = levels.problemsets[0];
            scope.problem = problems.problems[0];
            scope.problemDetails = problemDetails.problem;
            scope.problemDetails.solution = "greeting='Hello Jasmine'";
            scope.problemDetails.tests = ">>> greeting\n'Hello Jasmine'";
            scope.problemMobile = problemMobile;

            scope.build.start(scope.problemDetails, ['http://example.com/verify']);
            scope.build.permutations.retries = 50;

            interval.cbs[0].cb();

            expect(scope.build.running()).toBe(false);
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