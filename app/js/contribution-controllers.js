/* Controllers */

function NewProblemController($scope,$resource,$cookieStore){
  $scope.InterfaceID = null;

  $scope.interfaces = null;

  $scope.d = {"scipy":{"solution":"import scipy.interpolate\nx = numpy.arange(10,dtype='float32') * 0.3\ny = numpy.cos(x)\nrep = scipy.interpolate.splrep(x,y)\nsol =  scipy.interpolate.splev(0.5,rep)",
                             "tests":">>> assert_almost_equal(sol, 0.87752449938946964)\nTrue"},
                    "oc":{"solution":"int b=2;\nfloat f = 123.45;\ndouble inches = 3*2;\nNSString *string1 = @\"This string is immutable\";",
                          "tests":"AssertEquals(2, b);\nint expected_b = 2;\nAssertEquals(expected_b, b);\nAssertEquals((float)123.45, f);\nAssertEquals([NSString stringWithString:@\"This string is immutable\"], string1);"},
                    "c":{ "solution":"int sum(int a, int b){return a+b;}\nchar *message = \"Hello world!!!\";\nconst char *testStrings[] = { \"foo\", \"boo\", \"woo\", \"zoo\" };",
                          "tests" :  "void test_sum(void){TEST_ASSERT(5==sum(2,3));}\nvoid test_hello_world(void){TEST_ASSERT_EQUAL_STRING(message, \"Hello world!!!\");}\nvoid testNotEqualStringArray1(void){ const char *expStrings[] = { \"foo\", \"boo\", \"woo\", \"zoo\" };\nTEST_ASSERT_EQUAL_STRING_ARRAY(expStrings, testStrings, 4);}" },      
                     "r":{"solution":"factorial <- function(n){\n if (n == 0) {return(1)}\n else {  return(n * factorial(n - 1)) }\n}",
                          "tests":">>> checkEquals(6, factorial(3))\nTrue"},
                     "python":{"solution":"number = 2\nwizard = 'Oz'\ndef addOne(x):\n return x+1",
                          "tests":">>> number\n 2\n>>> wizard\n 'Oz'\n>>> addOne(2)\n  3"},
                     "java":{"solution":"int a = 2;\nint b = 5;\nint c=a+1;\na=8+b-c;",
                          "tests":"assertEquals(10,a);\nassertEquals(3,c)"},
                     "oldjsp":{"solution":"<%@ page import=\"java.util.*, java.text.*\" %><HTML><HEAD><TITLE>Hello Pineapples</TITLE></HEAD>\n<BODY><H1>Hello World</H1>\n<TABLE><TR><TD><P>This is an <B>embedded</B> table</P></TD></TR>\n<TR><TD>    The request parameter 'fruit' has a value of <%= request.getParameter(\"fruit\") %>\n</TD></TR></TABLE>\nToday is: <%= new SimpleDateFormat(\"dd/MM/yyyy\").format(new Date()) %>\n </BODY></HTML>",
                          "tests":"String expectedDate = new SimpleDateFormat(\"dd/MM/yyyy\").format(new Date());\npage().shouldHaveTitle(\"Hello Pineapples\");\npage().shouldContain(\"Today is: \"+expectedDate);\nonRequest(\"fruit\", \"guava\").page().shouldContain(\"The request parameter 'fruit' has a value of guava\");\npage().shouldContainElement(\"//TABLE/TR/TD/P/B\");\nelement(\"//TABLE/TR/TD/P/B\").shouldContain(\"embedded\");"},
                     "ruby":{"solution":"a = 1\nb = 2",
                          "tests":"assert_equal(1,a)\nassert_equal(2,b)",
                          "hosts":["parserplayground-staging.appspot.com/ruby?id=1","parserplayground-staging.appspot.com/ruby?id=2"]
                          },
                     "js":{"solution":"a=1;b=7;",
                          "tests":"assert_equal(1,a);\nassert_equal(2,b);"},
                    }
  
  $scope.load_defaults = function(problem){
    
    problem.skeleton = "";
    problem.examples = $scope.d[$scope.language]["tests"];
    problem.solution = $scope.d[$scope.language]["solution"];
    problem.tests = $scope.d[$scope.language]["tests"];
    problem.privatetests = $scope.d[$scope.language]["tests"];
    problem.pathID = $scope.pathID;
    problem.problemsetID = $scope.problemsetID;
    
  }
  $scope.supported_langugages = [
          {language : 'python', urlName : 'python' },       
          {language : 'scipy', urlName : 'scipy' },
          {language : 'java', urlName : 'java' },
          {language : 'r', urlName : 'r' },
          {language : 'oc', urlName : 'oc' },
          {language : 'c', urlName : 'c' },
          {language : 'ruby', urlName : 'ruby' },
          {language : 'js', urlName : 'js' },
          ];

    $scope.language = 'python';

    $scope.status = "Ready"
        //Load some good code


    $scope.VerifierModel = $resource('http://ap-2-1055555424.ap-southeast-1.elb.amazonaws.com/:language',
                                {},{'get': {method: 'JSONP', isArray: false, params:{vcallback: 'JSON_CALLBACK'}}
                                   }
                            );

    $scope.verify = function(){
          data = {solution: $scope.problem.solution, tests: $scope.problem.tests}
          //jsonrequest = JSON.stringify(data) 
          jsonrequest = btoa(JSON.stringify(data));

          $scope.status = "Verifying"
          //$scope.solution = "y=5"
          $scope.VerifierModel.get({'language':$scope.language,
                                    'jsonrequest':jsonrequest},
                function(response) { 
                  $scope.result = response;
                   $scope.status = "Ready"
                });  
    };
    $scope.verify_private = function(){
          data = {solution: $scope.problem.solution, tests: $scope.problem.privatetests}
          //jsonrequest = JSON.stringify(data) 
          jsonrequest = btoa(JSON.stringify(data));

          $scope.status = "Verifying"
          //$scope.solution = "y=5"
          $scope.VerifierModel.get({'language':$scope.language,
                                    'jsonrequest':jsonrequest},
                function(response) { 
                  $scope.privateresult = response;
                   $scope.status = "Ready"
                });  
    };

    $scope.accept_contribution = function(){
          $scope.AcceptContribution = $resource('/jsonapi/accept_contribution');
          
          var data = {"name":$scope.problem.name,
                      "problemsetID": $scope.problem.problemsetID};

          var theContribution = new $scope.AcceptContribution(data);
          
          theContribution.$save(
                function(response){
                    $scope.contribution_result = response;
                    $scope.$parent.get_contributed_problems();
                    $scope.$parent.get_problems();
                }); 
    };

    $scope.submit_contribution = function(){
          
          $scope.status = "Submitting new problem.";

          $scope.Contribution = $resource('/jsonapi/new_problem_contribution');
          
          var contribution = new $scope.Contribution($scope.problem);
          contribution.$save(
                function(response){
                    $scope.contribution = response;
                    $scope.$parent.get_contributed_problems();
                    $scope.$parent.get_problems();
                }); 
 
    };
    
}
function ContributionController($scope,$resource,$cookieStore){
    
    $scope.needed = [];

    var new_need = {'language':'Python', 
                    'description':'More problems needed',
                    'pathID':10030,
                    'problemsetID':11021,
                    'level':1}

    $scope.needed.push(new_need);
    $scope.needed.push(new_need);
    $scope.needed.push(new_need);
    
    /*
    $parent.$parent.$parent.pathID=need.pathID;
    $parent.$parent.problemsetID=11021;
    $parent.get_problemsets($parent.$parent.pathID);
    $parent.problemsetID=11021;
    $parent.get_problems();
    target=5;
    $parent.problems.problems.splice(5, 0, 'testing');

    */
    
    
    $scope.list_problems = function(need){
        $scope.$parent.$parent.$parent.pathID=need.pathID;
        $scope.$parent.$parent.problemsetID=need.problemsetID;
        $scope.$parent.get_problemsets(need.pathID);
        $scope.$parent.problemsetID=need.problemsetID;
        $scope.$parent.get_problems();
    }


    $scope.get_needed_problems = function(gameID){
        $scope.NeededModel = $resource('/jsonapi/needed_problems');
          
          $scope.NeededModel.get({}, function(response){
            $scope.needed = response;
          });
    }
    

		//$scope.get_needed_problems();
}
