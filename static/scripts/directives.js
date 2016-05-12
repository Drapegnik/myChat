'use strict';

/* Directives */

var chatDirectives = angular.module('chatDirectives', []);

chatDirectives.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

chatDirectives.directive('myEsc', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 27) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEsc);
                });

                event.preventDefault();
            }
        });
    };
});