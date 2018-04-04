angular.module('app').controller('loginCtrl', function ($scope, $http, $sessionStorage, $state, routeName) {

    $scope.doLogin = function (user) {
        let params = {
            email: user.email,
            password: user.password
        };
        $http.post('/login', params).then(function (d) {
            if (d.data.success === true) {
                $sessionStorage['token'] = d.data.token;
                $sessionStorage['user'] = d.data.user;
                $state.go(routeName.INDEX);
            } else {
                console.log()
            }
        }, function (err) {
            console.error(err);
        });
    };

});