app.controller('LoginController', function(FIREBASE_URL, Authentication, $scope, $rootScope, $firebase, $firebaseAuth, $location) {

	var ref = new Firebase(FIREBASE_URL);

	$scope.auth = $firebaseAuth(ref);

	var auth = $scope.auth;


	$scope.login = function() {
		Authentication.loginWithTwitter();
	}

	$scope.logout = function() {
		Authentication.logout().then(function() {
			$location.path('/');
		});
		return false;
	}

	Authentication.checkAuth();

})