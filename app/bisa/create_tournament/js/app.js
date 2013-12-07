var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function($scope, $timeout) {
	$scope.list1 = [];
	$scope.list2 = [];
	$scope.list3 = [];
	$scope.list4 = [];
	$scope.list5 = [];
	$scope.list6 = [];
	$scope.list7 = [];
	
	$scope.list8 = [
		{ 'title': 'Individual', 'image':'Individual.png', 'drag': true },
		{ 'title': 'Pair', 'image':'Pair.PNG', 'drag': true },
		{ 'title': 'Group', 'image':'Group.png', 'drag': true }
	];
	
	$scope.list9 = [
		{ 'title': 'Java', 'image':'java.jpg', 'drag': true },
		{ 'title': 'Python', 'image':'python.jpg', 'drag': true },
		{ 'title': 'HTML', 'image':'html.png', 'drag': true },
		{ 'title': 'C#', 'image':'csharp.png', 'drag': true },
		{ 'title': 'Ruby', 'image':'ruby.png', 'drag': true },
		{ 'title': 'JavaScript', 'image':'javascript.png', 'drag': true }
	];
	
	$scope.list10 = [
		{ 'title': 'Pre-assigned', 'image':'Individual.png', 'drag': true },
		{ 'title': 'Free', 'image':'Group.png', 'drag': true }
	];
	
	$scope.list11 = [
		{ 'names': 'add', 'description':'Addition question', 'drag': true },
		{ 'names': 'substract', 'description':'Substraction question', 'drag': true },
		{ 'names': 'concat', 'description':'Concatenation question', 'drag': true },
		{ 'names': 'divide', 'description':'Division question', 'drag': true },
	];

	// Limit items to be dropped in list1
	$scope.optionsList1 = {
		accept: function(dragE1) {
			if ($scope.list1.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList2 = {
		accept: function(dragE1) {
			if ($scope.list2.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList3 = {
		accept: function(dragEl) {
			if ($scope.list3.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList4 = {
		accept: function(dragEl) {
			if ($scope.list4.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList5 = {
		accept: function(dragEl) {
			if ($scope.list5.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList6 = {
		accept: function(dragEl) {
			if ($scope.list6.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
	$scope.optionsList7 = {
		accept: function(dragEl) {
			if ($scope.list7.length >= 1) {
				return false;
			} else {
				return true;
			}
		}
	};
});

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#img')
				.attr('src', e.target.result)
				.width(100)
				.height(100);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

$(function() {
	$( "#slider-student" ).slider({
		range: "min",
		value: 5,
		min: 1,
		max: 20,
		slide: function( event, ui ) {
			$( "#text-student" ).val( ui.value );
		}
	});
	$( "#text-student" ).val( $( "#slider-student" ).slider( "value" ) );
	
	$( "#slider-time" ).slider({
		range: "min",
		value: 30,
		min: 10,
		max: 240,
		slide: function( event, ui ) {
			$( "#text-time" ).val( ui.value );
		}
	});
	$( "#text-time" ).val( $( "#slider-time" ).slider( "value" ) );
});