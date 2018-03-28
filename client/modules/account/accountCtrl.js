/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').controller('accountCtrl', function ($scope, $http) {
	console.log('accountCtrl');

	$scope.isLogin = true;

	$scope.doLogin = function (user) {
		console.log(user)
		let params = {
			email: user.email,
			password: user.password
		};
		$http.post('/account/signin', params).then(function (d) {
			console.log(d)
		});
		// $http.post()
		// restApi.login.post(user).then(function (d) {
		// 	console.log(d);
		// })
	};

	$scope.createAccount = function (user) {
		console.log(user);
		let params = {
			eNumber: user.eNumber,
			name: user.name,
			email: user.email,
			password: user.password
		};


		$http.post('/account/signup', params).then(function (d) {
			console.log(d);
		});
		// restApi.user.post(user).then(function (d) {
		// 	console.log(d)
		// });
	};

	$scope.changeState = function () {
		$scope.isLogin = !$scope.isLogin;
	};

});