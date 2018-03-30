/**
 * Created by 김종관 on 2018-03-28.
 */
angular.module('app').controller('indexCtrl', function ($scope, $state, $http, routeName, $sessionStorage) {
    $scope.routeName = routeName;

	if ($sessionStorage.user) {
		$scope.user = $sessionStorage.user;
	}

	$scope.doLogout = function (user) {
		let token;
		if ($sessionStorage.token) {
			token = $sessionStorage.token;
            $http.get('/account/logout?token='+ token).then(function (d) {
            	console.log(d);
            	delete $sessionStorage.token;
                delete $sessionStorage.user;
            	$state.go(routeName.SIGNIN);
			});
		}
	};


});