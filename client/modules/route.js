/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').constant('routeName', {
    BASE: 'base',
    INDEX: 'index',
    SIGNIN: 'singin',
    LOGOUT: 'logout',
    DEPARTMENT: 'department',
    DEPARTMENT_LIST: 'department_list',
    DEPARTMENT_DETAIL: 'department_detail',
    PROJECT: 'project',
    PROJECT_LIST: 'project_list',
    PROJECT_DETAIL: 'project_detail'
});

angular.module('app').config(function ($stateProvider, $urlRouterProvider, routeName) {
    $stateProvider.state({
        name: routeName.BASE,
        abstract: true,
        template: '<div ui-view=""></div>',
        controller: function ($state, $sessionStorage) {
            if ($sessionStorage.token) {
                $state.go(routeName.INDEX);
            } else {
                $state.go(routeName.SIGNIN);
            }
        }
    });

    $stateProvider.state({
        name: routeName.SIGNIN,
        url: '/login',
        parent: routeName.BASE,
        templateUrl: 'modules/account/account.html',
        controller: 'accountCtrl',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        }
    });

    $stateProvider.state({
        name: routeName.LOGOUT,
        url: '/logout',
        parent: routeName.BASE,
        template: '<div>logout</div>',
        controller: function () {

        }
    });

    $stateProvider.state({
        name: routeName.INDEX,
        url: '/',
        parent: routeName.BASE,
        templateUrl: 'modules/index/index.html',
        resovle: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'indexCtrl'
    });

    $stateProvider
        .state({
            name: routeName.DEPARTMENT,
            url: 'department',
            abstract: true,
            parent: routeName.INDEX,
            template: '<div ui-view></div>'
        })
        .state({
            name: routeName.DEPARTMENT_LIST,
            url: '/list',
            parent: routeName.DEPARTMENT,
            templateUrl: 'modules/department/departmentList.html',
            controller: 'departmentListCtrl',
            resolve: {
                departmentList: function ($http) {
                    $http.get('/department/list').then(function(d) {
                        return d;
                    })
                }
            }
        })
        .state({
            name: routeName.DEPARTMENT_DETAIL,
            url: '/detail',
            parent: routeName.DEPARTMENT,
            templateUrl: 'modules/department/departmentDetail.html',
            controller: 'departmentDetailCtrl'
        });

    $stateProvider
        .state({
            name: routeName.PROJECT,
            url: 'project',
            abstract: true,
            parent: routeName.INDEX,
            template: '<div ui-view></div>'
        })
        .state({
            name: routeName.PROJECT_LIST,
            url: '/list',
            parent: routeName.PROJECT,
            templateUrl: 'modules/project/projectList.html',
			controller: 'projectListCtrl',
            resolve: {
                projectList: function ($http) {
                    $http.get('/project/list').then(function (d) {
                        return d;
                    });
                }
            }
        })
        .state({
            name: routeName.PROJECT_DETAIL,
            url: '/detail',
            parent: routeName.PROJECT,
            templateUrl: 'modules/project/projectDetail.html',
            controller: 'projectDetailCtrl'
        });



    $urlRouterProvider.otherwise('/');
});