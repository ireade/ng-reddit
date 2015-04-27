app.controller('LoginController', function(FIREBASE_URL, Authentication, $scope, $rootScope, $firebase, $firebaseAuth, $location) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	$scope.auth = auth;

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

});