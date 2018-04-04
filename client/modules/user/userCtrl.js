angular.module('app').controller('userCtrl', function ($scope, $http) {

    $scope.creatUser = function (user) {
        console.log(user)
        let params = {
            eNum: user.eNum,
            email: user.email,
            password: user.password,
            name: user.name,
            team: user.team,
            projects: user.projects
        };

        $http.post('/user', params).then(function (d) {
            console.log(d)
        }, function (e) {
            console.error(e);
        })
    }
});