'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).

    directive('datepicker', function() {
        return {
            restrict: 'A',
            require : 'ngModel',
            link : function (scope, element, attrs, ngModelCtrl) {
                $(function(){
                    element.datepicker({
                        dateFormat:'dd/mm/yy',
                         changeMonth: true,
                         changeYear: true,
                        onSelect:function (date) {
                            ngModelCtrl.$setViewValue(date);
                            scope.$apply();
                        }
                    });
                });
            }
        };
    }).

    // directive for a single list
    directive('dndList', function($parse) {

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
            });
        };
    }).

    // directive for dnd between lists
    directive('dndBetweenList', function($parse) {

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
            });
        };
    }).

    /**
     * Switch the a tab when the element is clicked
     *
     * Usage:
     *
     *     <ul class="nav nav-tabs">
     *         <li class="tabspacing active"><a data-target="#pane1" data-toggle="tab">Tests</a></li>
     *         <li class="tabspacing"><a id="result-tab" data-target="#pane2" data-toggle="tab">results</a></li>
     *     </ul>
     *     [...]
     *     <button ng-click="runTests()" gen-switch-tab="#result-tab">Run test</button>
     */
    directive('genSwitchTab', ['$window', function(window) {
        var $ = window.jQuery;
        return {
            link: function(_, element, attr) {
                var doSwitch = function(){
                    $(attr.genSwitchTab).tab('show');
                };

                $(element).on('click', doSwitch);

                element.on('$destroy', function() {
                    $(element).off('click', doSwitch);
                });

            }
        };
    }]).

    /**
     * Set the first tab as active if none is active
     *
     * Usage:
     *
     *     <ul class="nav nav-tabs" gen-init-tab="true">
     *         <li class="tabspacing active"><a data-target="#pane1" data-toggle="tab">Tests</a></li>
     *         <li class="tabspacing"><a id="result-tab" data-target="#pane2" data-toggle="tab">results</a></li>
     *     </ul>
     */
    directive('genInitTab', function() {
        return {
            link: function(_, element) {
                if (element.find('li.active').length > 0) {
                    return;
                }
                
                element.find('li:eq(0)').addClass('active');
            }
        };
    }).

    /**
     * Create a ace editor
     *
     * Usage:
     *
     *     <div ng-model="code" gen-ace="codeSyntax"></div>
     *
     * where $scope.code should be a string and $scope.codeLanguage should be
     * the syntax mode use to highlight the code (edito mode).
     *
     * unlike the uiAce directive, this directive can dynamically change the 
     * editor mode.
     * 
     */
    directive('genAce', ['ace', function(ace) {
        return {
            require: '?ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var editor = window.ace.edit(elm[0]),
                    session = editor.getSession();

                scope.$watch(attrs.genAce, function(newVal) {
                    if (newVal) {
                        session.setMode('ace/mode/' + newVal);
                    }
                });

                elm.on('$destroy', function() {
                  editor.session.$stopWorker();
                  editor.destroy();
                });

                if (!ngModel) {
                    return;
                }

                session.on('change', function (callback) {
                    var newValue = session.getValue();

                    if (newValue === scope.$eval(attrs.value) ||
                        scope.$$phase  ||
                        scope.$root.$$phase
                    ) {
                        return;
                    }

                    scope.$apply(function () {
                        ngModel.$setViewValue(newValue);
                    });
                });

                ngModel.$render = function () {
                    session.setValue(ngModel.$viewValue);
                };

                ngModel.$formatters.push(function (value) {
                    if (!value) {
                        return '';
                    }

                    return value.toString();
                });

                scope.$watch(
                    function() {
                        return [elm[0].offsetWidth, elm[0].offsetHeight];
                    },
                    function() {
                        editor.resize();
                        editor.renderer.updateFull();
                    },
                    true
                );
            }
        };
    }])

    .directive('bsButtonsRadio', function ($timeout) {

        var type = 'button',
            dataPrefix = !!$.fn.emulateTransitionEnd ? 'bs.' : '',
            evSuffix = dataPrefix ? '.' + dataPrefix + type : '';

        var evName = 'click' + evSuffix + '.data-api';

        return {
            restrict: 'A',
            require: '?ngModel',
            compile: function compile(tElement, tAttrs, transclude) {

                tElement.attr('data-toggle', 'buttons-radio');

                // Delegate to children ngModel
                if (!tAttrs.ngModel) {
                    tElement.find('a, button').each(function (k, v) {
                        $(v).attr('bs-button', '');
                    });
                }

                return function postLink(scope, iElement, iAttrs, controller) {

                    // If we have a controller (i.e. ngModelController) then wire it up
                    if (controller) {

                        $timeout(function () {
                            iElement
                                .find('[value]')
                                .filter('[value="' + controller.$viewValue + '"]')
                                .addClass('active');
                        }, 0, false);

                        iElement.on(evName, function (ev) {
                            scope.$apply(function () {
                                controller.$setViewValue($(ev.target).closest('button').attr('value'));
                            });
                        });

                        // Watch model for changes
                        scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                var $btn = iElement.find('[value="' + scope.$eval(iAttrs.ngModel) + '"]');
                                if ($btn.length) {
                                    $btn.toggleClass('active');
                                }
                            }
                        });

                    }

                };
            }
        };

    });