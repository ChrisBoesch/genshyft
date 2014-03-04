// directive for a single list
myApp.directive('dndList', function($parse) {

    return function(scope, element, attrs) {

        // variables used for dnd
        var toUpdate;
        var startIndex = -1;

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dndList, function(value) {
            toUpdate = value;
            angular.element("#dndGame").scope().check_permutation();
        },true);
        
        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
            },
            stop:function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex,1);
                toUpdate.splice(newIndex,0,toMove);

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(attrs.dndList);
            },
            axis:'y'
        })
    }
});

// directive for dnd between lists
myApp.directive('dndBetweenList', function($parse) {

    return function(scope, element, attrs) {

        // contains the args for this component
        var args = attrs.dndBetweenList.split(',');
        // contains the args for the target
        var targetArgs = $('#'+args[1]).attr('dnd-between-list').split(',');

        // variables used for dnd
        var toUpdate;
        var target;
        var startIndex = -1;
        var videos = 0;

        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(args[0], function(value) {
            toUpdate = value;
        },true);

        // also watch for changes in the target list
        scope.$watch(targetArgs[0], function(value) {
            target = value;
        },true);

        scope.$watch('source', function() {
            if(args[0] == 'source' && scope.source.length != 0){
                angular.element("#dndGame").scope().check_dnd_permutation();
            }
        },true);

        scope.$watch('source + line_outcome.origional', function() {
            if(scope.line_outcome.origional.length != 0){
                $('#content').show();
                $('#loading').hide();
            };
            if(scope.source.length == 0 && scope.line_outcome.origional.length == 0){
                $('#content').hide();
                $('#loading').show();
            };
        },true);

        scope.$watch('quest.videos', function() {
            if(scope.quest){
                var numOfUnlocked = 0;
                for(var i=0;i<scope.quest.videos.length;i++){
                    if(scope.quest.videos[i] != "LOCKED"){
                       numOfUnlocked++;
                    }
                }
                if(numOfUnlocked > videos && args[0] == 'source'){
                    angular.element("#dndGame").scope().play_unlocked_video(numOfUnlocked - 1);
                }
                videos = numOfUnlocked;
            }
        },true);

        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            
            change: function(event, ui) {
                ui.placeholder.css({visibility: 'visible', background : 'yellow'});
            },

            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
                startIndex = ($(ui.item).index());
            },
            stop:function (event, ui) {
                var newParent = ui.item[0].parentNode.id;

                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];

                // we need to remove him from the configured model
                toUpdate.splice(startIndex,1);

                if (newParent == args[1]) {
                    // and add it to the linked list
                    target.splice(newIndex,0,toMove);
                }  else {
                    toUpdate.splice(newIndex,0,toMove);
                }

                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(targetArgs[0]);
                scope.$apply(args[0]);
            },
            connectWith:'#'+args[1]
        })
    }
});