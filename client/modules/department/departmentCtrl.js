angular.module('app').controller('departmentCtrl', function ($scope, $http, departmentList) {

    $scope.departmentList = [];
    if (!_.isEmpty(departmentList)) {
        $scope.departmentList = angular.copy(departmentList);
    }

    let backUpData = {};

    $scope.setEmpty = function () {
        $scope.department.depNum = null;
        $scope.department.name = null;
        $scope.department.description = null;
    };

    let getDepartmentList = function () {
        $http.get('/department/list').then(function (d) {
            $scope.departmentList = d.data.departmentList;
        });
    };

    let validationCheck = function (department) {
        let result = true;
        if (department) {
            if (!department.depNum) {
                result = false;
            } else if (!department.name) {
                result = false;
            } else {
                result = true;
            }
        } else {
            result = false;
        }
        return result;
    };

    $scope.addDepartment = function () {
        if (validationCheck($scope.department)) {
            let params = {
                depNum: $scope.department.depNum,
                name: $scope.department.name,
                description: $scope.department.description
            };

            $http.post('/department', params).then(function (d) {
                $scope.setEmpty();
                getDepartmentList();
            });
        } else {
            return;
        }
    };

    $scope.updateDepartment = function (department) {
        if (validationCheck(department)) {
            let params = {
                id: department._id,
                depNum: department.depNum,
                name: department.name,
                description: department.description
            };

            $http.put('/department?id' + department._id, params).then(function (d) {
                $scope.backUpData = {};
                getDepartmentList();
            });
        } else {
            return;
        }
    };

    $scope.removeDepartment = function (department) {
        $http.delete('/department?id=' + department._id).then(function (d) {
            getDepartmentList();
        });
    };

    let editingIndex = '';
    $scope.editDepartment = function (index) {
        let department = $scope.departmentList[index];
        $scope.cancelEditDepartment(editingIndex);
        editingIndex = index;
        backUpData = {
            depNum: department.depNum,
            name: department.name,
            description: department.description
        };
        department.editable = true;
    };

    $scope.cancelEditDepartment = function (index) {
        let department = $scope.departmentList[index];
        if (!department) {
            return;
        }
        department.depNum = backUpData.depNum;
        department.name = backUpData.name;
        department.description = backUpData.description;
        department.editable = false;
        backUpData = {};
        editingIndex = '';
    };
});