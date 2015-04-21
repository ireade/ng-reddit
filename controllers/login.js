app.controller('LoginController', function(FIREBASE_URL, $scope, $firebase, $firebaseAuth) {

	var ref = new Firebase(FIREBASE_URL);


	$scope.authData;



	// $scope.ref.$onAuth(function(authData) {
	//   if (authData) {
	//     console.log("Logged in as:", authData.uid);
	//   } else {
	//     console.log("Logged out");
	//   }
	// });

	console.log($scope.authData)


	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
		}
		$scope.authData = authData;
	}


	$scope.loginWithTwitter = function() {
		ref.authWithOAuthPopup('twitter', authHandler);
	} 


	$scope.logout = function() {
		ref.unauth();
	}



})