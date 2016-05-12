'use strict';

/* Controllers */

var chatControllers = angular.module('chatControllers', []);

chatControllers.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

chatControllers.controller('MessagesController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    $scope.initChat = function () {
        console.log('init');
        $scope.text = '';
        $scope.editMes = '';
        $scope.connectionLost = false;
        $scope.editId = '';
        $scope.token = 'TN11EN';
        $scope.messages = [];
        $scope.isBlank = true;
        $scope.isScroll = true;
        $scope.loadMessages();
    };

    $scope.loadMessages = function () {
        $http.get('chat/' + $scope.token).success(function (data) {
            $scope.token = data.token;

            angular.forEach(data.messages, function (mes) {
                if (mes.status != 'default')
                    $scope.messages[mes.order_id] = mes;
                else {
                    $scope.messages.push(mes);
                    $scope.isScroll = true;
                }
            });
        });

        if ($scope.isScroll) {
            console.log("scrol", $scope.messages.length - 1);
            document.location.href = '#id' + ($scope.messages.length - 1);
            $scope.isScroll = false;
        }
    };

    $interval($scope.loadMessages, 500);

    $scope.sendMessage = function () {
        var data = {
            'order_id': $scope.messages.length,
            'text': $scope.text,
            'status': 'default'
        };
        $http.post('chat', data).success(function () {
            $scope.text = '';
        });
    };

    function isInputEmpty(value) {
        return $.trim(value).length == 0
    }

    $scope.inputChange = function (id) {
        var input = angular.element(id);
        if (isInputEmpty($scope.text)) {
            input.val('');
            input.attr('placeholder', "Message can't be empty");
            input.addClass('holdcol');
            $scope.isBlank = true;
        }
        else
            $scope.isBlank = false;
    };

    $scope.deleteMessage = function (mes_id, order_id) {
        var data = $.param(
            {
                'mes_id': mes_id,
                'order_id': order_id
            });
        $http.delete('chat?' + data);
    };

    $scope.editMessage = function (order_id) {
        this.editMes = $scope.messages[order_id].text;
        $scope.editId = $scope.messages[order_id].mes_id;
    };

    $scope.cancelEditMessage = function () {
        $scope.editId = '';
        $scope.editMes = '';
    };

    $scope.confirmEditMessage = function (mes_id, order_id) {
        console.log('save', this.editMes);
        if (isInputEmpty(this.editMes)) {
            $scope.cancelEditMessage();
            $scope.deleteMessage(mes_id, order_id)
        } else if (this.editMes != $scope.messages[order_id].text) {
            var data = {
                'mes_id': mes_id,
                'order_id': order_id,
                'text': this.editMes,
                'status': 'edit'
            };
            $http.put('chat', data).success($scope.cancelEditMessage());
        } else
            $scope.cancelEditMessage();

    }
}]);