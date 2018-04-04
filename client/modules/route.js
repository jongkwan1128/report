/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').constant('routeName', {
    BASE: 'base',
    INDEX: 'index',
    LOGIN: 'login',
    LOGOUT: 'logout',
    USER: 'user',
    DEPARTMENT: 'department',
    TEAM: 'team'
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
                $state.go(routeName.LOGIN);
            }
        }
    });

    $stateProvider.state({
        name: routeName.LOGIN,
        url: '/login',
        parent: routeName.BASE,
        templateUrl: 'modules/login/login.html',
        controller: 'loginCtrl',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
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

    $stateProvider.state({
        name: routeName.USER,
        url: 'user',
        parent: routeName.INDEX,
        templateUrl: 'modules/user/user.html',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'userCtrl'
    });

    $stateProvider.state({
        name: routeName.DEPARTMENT,
        url: 'department',
        parent: routeName.INDEX,
        templateUrl: 'modules/department/department.html',
        resolve: {
            departmentList: function ($q, $http) {
                let defer = $q.defer();
                $http.get('/department/list').then(function (d) {
                    defer.resolve(d.data.departmentList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'departmentCtrl'
    });

    $stateProvider.state({
        name: routeName.TEAM,
        url: 'team',
        parent: routeName.INDEX,
        templateUrl: 'modules/team/team.html',
        resolve: {
            departmentList: function ($q, $http) {
                let defer = $q.defer();
                $http.get('/department/list').then(function (d) {
                    defer.resolve(d.data.departmentList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            },
            teamList: function ($q, $http) {
                let defer = $q.defer();
                $http.get('/team/list').then(function (d) {
                    defer.resolve(d.data.teamList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'teamCtrl'
    });



    $urlRouterProvider.otherwise('/');
});