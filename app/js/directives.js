'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
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