if (!myApp) {
    console.log("mocked app not set");
}

myApp.run(function($httpBackend) {
    $httpBackend.whenGET('/jsonapi/interfaces').respond({
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
            "singpathSupported": false,
            "description": "Experimental Python Interface",
            "codeHighlightKey": "python",
            "editor": {
                "player_id": 57754,
                "nickname": "Chris",
                "email": "Removed"
            },
            "urls": ["http://pivotalapp.appspot.com/verify"],
            "exampleSolution": "b=2",
            "exampleTests": ">>> b \r\n 2",
            "id": 2254148,
            "name": "Development Python"
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
        }, {
            "singpathSupported": false,
            "description": "Experimental Closure",
            "codeHighlightKey": "python",
            "editor": {
                "player_id": 57733,
                "nickname": "Mark Zuckerberg",
                "email": "Removed"
            },
            "urls": ["http://pivotalapp.appspot.com/verify"],
            "exampleSolution": "b=2",
            "exampleTests": ">>> b \r\n 2",
            "id": 2292151,
            "name": "Closure"
        }, {
            "singpathSupported": true,
            "description": "Javascript Verifier",
            "codeHighlightKey": "Java",
            "editor": {
                "player_id": 57754,
                "nickname": "Chris",
                "email": "Removed"
            },
            "urls": ["http://javascriptverifier.appspot.com/javascript?id=1", "http://javascriptverifier.appspot.com/javascript?id=2"],
            "exampleSolution": "bar = \"Foo\";\r\nb=2;",
            "exampleTests": "assert_equal('This is a test', 'This is not a test');\r\nassert_equal(\"Foo\", bar);\r\nassert_equal(2,3);\r\nassert_equal(3,3);\r\nassert_equal(2,b);\r\nassert_equal(3.0001, 3.0002);",
            "id": 2293311,
            "name": "Javascript"
        }, {
            "singpathSupported": true,
            "description": "Ruby Verifier",
            "codeHighlightKey": "ruby",
            "editor": {
                "player_id": 57754,
                "nickname": "Chris",
                "email": "Removed"
            },
            "urls": ["http://rubyverifier.appspot.com/ruby?id=1", "http://rubyverifier.appspot.com/ruby?id=2"],
            "exampleSolution": "bar = \"foo\"\r\nisCool = true\r\ndef say_hello(name)\r\n  var = \"Hello, \" + name\r\n  return var\r\nend\r\n\r\naddResult = 2+3\r\n\r\nclass Person\r\n  attr_accessor :fname, :lname\r\nend",
            "exampleTests": "assert_equal(5,3)\r\nassert_equal(\"foo\", bar)\r\nassert_equal(true, isCool)\r\nassert_equal(\"Hello, John\",say_hello(\"John\"))\r\nassert_equal(5, addResult)",
            "id": 2447229,
            "name": "Ruby"
        }, {
            "singpathSupported": false,
            "description": "This is a Javascript based on Java GAE",
            "codeHighlightKey": "javascript",
            "editor": {
                "player_id": 1456051,
                "nickname": "wgx731",
                "email": "Removed"
            },
            "urls": ["http://wgx731lotrepls.appspot.com/javascript"],
            "exampleSolution": "bar = \"Foo\";\r\nb=2;",
            "exampleTests": "assert_equal('This is a test', 'This is not a test');\r\nassert_equal(\"Foo\", bar);\r\nassert_equal(2,3);\r\nassert_equal(3,3);\r\nassert_equal(2,b);\r\nassert_equal(3.0001, 3.0002);",
            "id": 6023053,
            "name": "Experimental Javascript"
        }, {
            "singpathSupported": false,
            "description": "This is a Ruby interface based on Java GAE",
            "codeHighlightKey": "ruby",
            "editor": {
                "player_id": 1456051,
                "nickname": "wgx731",
                "email": "Removed"
            },
            "urls": ["http://wgx731lotrepls.appspot.com/ruby"],
            "exampleSolution": "bar = \"foo\"\r\nisCool = true\r\ndef say_hello(name)\r\n  var = \"Hello, \" + name\r\nend\r\naddResult = 8\r\n",
            "exampleTests": "assert_equal(5,3)\r\nassert_equal(\"foo\", bar)\r\nassert_equal(true, isCool)\r\nassert_equal(\"Hello, John\",say_hello(\"John\"))\r\nassert_equal(5, addResult)",
            "id": 6032049,
            "name": "Experimental Ruby"
        }, {
            "singpathSupported": true,
            "description": "Python with db support",
            "codeHighlightKey": "python",
            "editor": {
                "player_id": 57754,
                "nickname": "Chris",
                "email": "removed"
            },
            "urls": ["http://python-gae-verifier.appspot.com/verify"],
            "exampleSolution": "b=2\r\nclass Story(db.Model):\r\n    title = db.StringProperty()\r\n    body = db.TextProperty()\r\n    created = db.DateTimeProperty(auto_now_add=True)\r\n\r\nStory(title='Peter Pan').put()",
            "exampleTests": ">>> b \r\n 2\r\n>>> Story.all().count()\r\n 1\r\n>>> Story.all().filter('title = ', 'Peter Pan').count()\r\n  1\r\n>>> Story.all().filter('title = ', 'Barbie').count()\r\n  1",
            "id": 6326415,
            "name": "App Engine"
        }, {
            "singpathSupported": true,
            "description": "Objective-C Interface",
            "codeHighlightKey": "C",
            "editor": {
                "player_id": 57754,
                "nickname": "Chris",
                "email": "removed"
            },
            "urls": ["http://184.73.56.51/cgi-bin/webserver.py"],
            "exampleSolution": "int b=2;\r\nfloat f = 123.45;\r\ndouble inches = 69.0/12;\r\nNSString *string1 = @\"This string is immutable\";\r\n\r\n//test function\r\nint addOne(int x) {\r\n  return x + 1;\r\n}\r\n\r\n//test macro\r\n#define mul(a,b) ((a)*(b))\r\n\r\n//test class\r\n@interface Rectangle: NSObject {\r\n    int width;\r\n    int height;\r\n}\r\n-(int) area;\r\n-(void) setWidth: (int) w;\r\n-(void) setHeight: (int) h;\r\n-(int) width;\r\n-(int) height;\r\n@end\r\n\r\n@implementation Rectangle\r\n-(int) area {\r\n    return width * height;\r\n}\r\n-(void) setWidth: (int) w {\r\n    width = w;\r\n}\r\n-(void) setHeight: (int) h {\r\n    height = h;\r\n}\r\n-(int) width {\r\n    return width;\r\n}\r\n-(int) height {\r\n    return height;\r\n}\r\n@end\r\n",
            "exampleTests": "AssertEquals(2, b);\r\nint expected_b = 2;\r\nAssertEquals(expected_b, b);\r\nAssertEquals((float)123.45, f);\r\nAssertEquals(69.0/12.0, inches);\r\nAssertEquals([NSString stringWithString:@\"This string is immutable\"], string1);\r\n\r\nAssertEquals(4, addOne(3));\r\nAssertEquals(42, mul(6, 7));\r\n\r\nRectangle *r = [[Rectangle alloc] init];\r\n[r setWidth: 11];\r\n[r setHeight: 18];\r\nAssertEquals(198, [r area]);\r\n",
            "id": 6569721,
            "name": "Objective-C"
        }, {
            "singpathSupported": true,
            "description": "PHP verifier test",
            "codeHighlightKey": "PHP",
            "editor": {
                "player_id": 1456051,
                "nickname": "wgx731",
                "email": "Removed"
            },
            "urls": ["http://wgx731lotrepls.appspot.com/script.php"],
            "exampleSolution": "$b = 2;\r\n$s = \"Hello World\";\r\n$s = str_replace('o','1',$s);\r\nfunction addOne($m){\r\n   return $m + 1;\r\n}",
            "exampleTests": "assert_equal(1,true);\r\nassert_equal($b,'d');\r\nassert_equal($b,2);\r\nassert_equal($s,'Hello World');\r\nassert_equal($s,'Hell1 W1rld');\r\nassert_equal(addOne($b),3);\r\n",
            "id": 6842348,
            "name": "PHP"
        }, {
            "singpathSupported": true,
            "description": "JSP Verifier",
            "codeHighlightKey": "java",
            "editor": {
                "player_id": 930010,
                "nickname": "masotime",
                "email": "Removed@gmail.com"
            },
            "urls": ["http://jsp-verifier.dyndns.org/cgi-bin/verifier.py"],
            "exampleSolution": "<%@ page import=\"java.util.*, java.text.*\" %>\r\n<HTML>\r\n<HEAD>\r\n<TITLE>Hello Pineapples</TITLE>\r\n</HEAD>\r\n<BODY>\r\n\t<H1>Hello World</H1>\r\n\t<TABLE>\r\n\t\t<TR>\r\n\t\t\t<TD>\r\n\t\t\t\t<P>\r\n\t\t\t\t\tThis is an <B>embedded</B> table\r\n\t\t\t\t</P>\r\n\t\t\t</TD>\r\n\t\t</TR>\r\n\t\t<TR>\r\n\t\t\t<TD>\r\n\t\t\t\tThe request parameter 'fruit' has a value of <%= request.getParameter(\"fruit\") %>\r\n\t\t\t</TD>\r\n\t\t</TR>\r\n\t</TABLE>\r\n\tToday is: <%= new SimpleDateFormat(\"dd/MM/yyyy\").format(new Date()) %>\r\n</BODY>\r\n</HTML>",
            "exampleTests": "page().shouldHaveTitle(\"Hello Pineapples\"); \r\nonRequest(\"fruit\", \"guava\").page().shouldContain(\"The request parameter 'fruit' has a value of guava\");\r\npage().shouldContainElement(\"//TABLE/TR/TD/P/B\");\r\n",
            "id": 8680122,
            "name": "Java Server Pages"
        }],
        "type": "interfaces"
    });

    $httpBackend.whenGET('/jsonapi/get_my_paths?interface_id=11020').respond({
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
    });

    $httpBackend.whenGET('/jsonapi/problemsets/10030').respond({
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
    });

    $httpBackend.whenGET(/^\/jsonapi\/problems/).respond({
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
    });

    $httpBackend.whenGET(/^\/jsonapi\/get_problem/).respond({
        "problem": {
            "tests": ">>> greeting\r\n'hello world'",
            "description": "In keeping with tradition, the first program you will create is a greeting to the world.  Create a variable named 'greeting' that contains the string 'hello world'.  The code is given already, you just need to hit 'Run' again.",
            "other_tests": null,
            "modified": "2010-12-13 01:10:53.287641",
            "problemset_id": 11021,
            "examples": ">>> greeting\r\n'hello world'",
            "problemsetorder": 2,
            "problem_id": 17191,
            "skeleton": "greeting = 'hello world'",
            "name": "Your First Program",
            "created": "2009-12-15 18:57:09.124678",
            "solution": "greeting='hello world'",
            "interface_id": 11020,
            "path_id": 10030,
            "editor": {
                "player_id": 58546,
                "nickname": "Danny",
                "email": "PRIVATE"
            }
        },
        "type": "problem"
    });

    $httpBackend.whenGET(/\/jsonapi\/mobile_problem/).respond({
        'error': 'No mobile problem for problem with that id'
    });

    $httpBackend.whenPOST('/jsonapi/check_code_with_interface').respond({
        "solved": true,
        "verification_message": "Your solution passes all tests.",
        "printed": ""
    });

    $httpBackend.whenPOST('/jsonapi/edit_problem').respond({
        "path_id": 10030,
        "problemset_id": 11021,
        "type": "edit_problem",
        "problem_id": 17191,
        "interface_id": 11020
    });
});