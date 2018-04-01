angular.module('app').controller('projectDetailCtrl', function ($scope) {
    console.log('pd ctrl')
    $scope.project;

    $scope.createProject = function (project) {
        console.log(project)
    }

});