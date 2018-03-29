angular.module('app').controller('projectListCtrl', function ($scope) {
    console.log('pl ctrl')

    $scope.projectList = [
        {
            name: 'aaa1',
            descript: 'bbb1',
            period: 'ccc1'
        },
        {
            name: 'aaa1',
            descript: 'bbb1',
            period: 'ccc1'
        },
        {
            name: 'aaa1',
            descript: 'bbb1',
            period: 'ccc1'
        },
        {
            name: 'aaa1',
            descript: 'bbb1',
            period: 'ccc1'
        },
        {
            name: 'aaa1',
            descript: 'bbb1',
            period: 'ccc1'
        },
    ];

    $scope.moveDetail = function (project) {
        console.log(project)
    }
});