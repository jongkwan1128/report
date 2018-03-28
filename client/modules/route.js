/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').constant('routeName', {
	BASE: 'base',
	INDEX: 'index',
	SIGNIN: 'singin',
	LOGOUT: 'logout',
	ACCOUNT: 'account'
});

angular.module('app').config(function ($stateProvider, $urlRouterProvider, routeName) {
	$stateProvider.state({
		name: routeName.BASE,
		abstract: true,
		template: '<div ui-view=""></div>',
	});

	$stateProvider.state({
		name: routeName.SIGNIN,
		url: '/login',
		parent: routeName.BASE,
		templateUrl: 'modules/account/account.html',
		controller: 'accountCtrl'
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



	$urlRouterProvider.otherwise('/');
});