/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').controller('accountCtrl', function ($scope, $http, $sessionStorage, $state, routeName) {
	console.log('accountCtrl');

	$scope.isLogin = true;

	$scope.doLogin = function (user) {
		let params = {
			email: user.email,
			password: user.password
		};
		$http.post('/account/signin', params).then(function (d) {
			$sessionStorage['token'] = d.data.token;
            $sessionStorage['user'] = d.data.user;
			$state.go(routeName.INDEX);
		}, function (err) {
			console.error(err);
		});
	};

	$scope.createAccount = function (user) {
		let params = {
			eNumber: user.eNumber,
			name: user.name,
			email: user.email,
			password: user.password
		};

		$http.post('/account/signup', params).then(function (d) {
			// popup with info
            $scope.isLogin = true;
		}, function (err) {
			console.error(err);
		});
	};

	$scope.changeState = function () {
		$scope.isLogin = !$scope.isLogin;
	};

});