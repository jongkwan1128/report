angular.module('app').controller('teamCtrl', function ($scope, $http, departmentList, teamList) {

    $scope.departmentList = [];
    if (!_.isEmpty(departmentList)) {
        $scope.departmentList = angular.copy(departmentList);
    }

    $scope.teamList = [];
    if (!_.isEmpty(teamList)) {
        $scope.teamList = angular.copy(teamList);
    }

    let backUpData = {};

    $scope.setEmpty = function () {
        $scope.team.department = departmentList[0]._id;
        $scope.team.teamNum = null;
        $scope.team.name = null;
        $scope.team.description = null;
    };

    let getTeamList = function () {
        $http.get('/team/list').then(function (d) {
            $scope.teamList = d.data.teamList;
        });
    };

    let validationCheck = function (team) {
        let result = true;
        if (team) {
            if (!team.department) {
                result = false;
            } else if (!team.teamNum) {
                result = false;
            } else if (!team.name) {
                result = false;
            } else {
                result = true;
            }
        } else {
            result = false;
        }
        return result;
    };

    $scope.addTeam = function () {
        if (validationCheck($scope.team)) {
            let params = {
                department: $scope.team.department,
                teamNum: $scope.team.teamNum,
                name: $scope.team.name,
                description: $scope.team.description
            };
console.log(params)
            $http.post('/team', params).then(function (d) {
                $scope.setEmpty();
                getTeamList();
            });
        } else {
            return;
        }
    };

    $scope.updateTeam = function (team) {
        if (validationCheck(team)) {
            let params = {
                id: team._id,
                department: team.department,
                teamNum: team.teamNum,
                name: team.name,
                description: team.description
            };

            $http.put('/team?id' + team._id, params).then(function (d) {
                $scope.backUpData = {};
                getTeamList();
            });
        } else {
            return;
        }
    };

    $scope.removeTeam = function (team) {
        $http.delete('/team?id=' + team._id).then(function (d) {
            getTeamList();
        });
    };

    let editingIndex = '';
    $scope.editTeam = function (index) {
        let team = $scope.teamList[index];
        $scope.cancelEditTeam(editingIndex);
        editingIndex = index;
        backUpData = {
            department: team.department,
            teamNum: team.teamNum,
            name: team.name,
            description: team.description
        };
        team.editable = true;
    };

    $scope.cancelEditTeam = function (index) {
        let team = $scope.teamList[index];
        if (!team) {
            return;
        }
        team.department = backUpData.department;
        team.teamNum = backUpData.teamNum;
        team.name = backUpData.name;
        team.description = backUpData.description;
        team.editable = false;
        backUpData = {};
        editingIndex = '';
    };
});