angular.module('app').controller('departmentDetailCtrl', function ($scope, $http) {

    $scope.createDepartment = function (department) {
        console.log(department);
        let params = department;
        $http.post('/department', params).then(function (d) {
            console.log(d)
        })
    };
    console.log('dd ctrl')
});