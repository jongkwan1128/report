angular.module('app').controller('projectListCtrl', function ($scope, projectList) {
    console.log('pl ctrl')

    $scope.noData = true;
    if (projectList && projectList.length > 0) {
        $scope.projectList = projectList;
        $scope.noData = false;
    }

    // $scope.projectList = [
    //     {
    //         name: 'aaa1',
    //         descript: 'bbb1',
    //         period: 'ccc1'
    //     },
    //     {
    //         name: 'aaa1',
    //         descript: 'bbb1',
    //         period: 'ccc1'
    //     },
    //     {
    //         name: 'aaa1',
    //         descript: 'bbb1',
    //         period: 'ccc1'
    //     },
    //     {
    //         name: 'aaa1',
    //         descript: 'bbb1',
    //         period: 'ccc1'
    //     },
    //     {
    //         name: 'aaa1',
    //         descript: 'bbb1',
    //         period: 'ccc1'
    //     },
    // ];

    $scope.moveDetail = function (project) {
        console.log(project)
    }
});