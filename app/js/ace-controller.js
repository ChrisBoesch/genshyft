'use strict';

function AceController($scope,$resource){

	var editor = null;
	var myEditor = null;
	var friendEditor = null;


	//initialize question set
	var questions = null;

	var sessionListRef = new Firebase("https://wahchun927.firebaseio.com/");

	//Generate a new session and join as player 0
	$scope.getSession = function(){

		$scope.result = "";
		$scope.status = "";
		$scope.friendResult = "";
		$('#result').removeClass(cssClass);
		$('#compiledResult').removeClass(cssClass);
		$('#friendResult').removeClass(cssClass);
		myEditor.getSession().setValue("");
		friendEditor.getSession().setValue("");

		var sessionRef = sessionListRef.push();

		$scope.session = sessionRef.name();
		player = "player0";

		//get question from question set here

		//render ace editor
		myEditor = ace.edit("my_editor");
		myEditor.setTheme("ace/theme/merbivore");
		myEditor.setReadOnly(false);
		editor = myEditor;

		friendEditor = ace.edit("friend_editor");
		friendEditor.setTheme("ace/theme/merbivore");
		friendEditor.setReadOnly(true);

		//set language
		myEditor.getSession()setMode("ace/mode/javascript");
		friendEditor.getSession()setMode("ace/mode/javascript");

		sessionRef.set({question: "test", language: "javascript", test: "assertEquals(Hello() + \" \" + World(), \"Hello World\");"});

		var player0Ref = new Firebase(sessionRef.toString() + "/player0");
		player0Ref.set({user: "", task: })

	}
}