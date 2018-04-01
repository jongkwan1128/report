angular.module('app').controller('departmentListCtrl', function ($scope, departmentList) {
    $scope.noData = true;
    if (departmentList && departmentList.length > 0) {
        $scope.departmentList = departmentList;
        $scope.noData = false;
    }


    console.log('dl ctrl')
});