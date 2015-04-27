app.factory('Authentication', function($firebase, $firebaseAuth, $rootScope, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	return {
		loginWithTwitter: function() {
			ref.authWithOAuthPopup('twitter', function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			});
		},
		logout: function() {
			ref.unauth();
		},
		checkAuth: function() {
			auth.$onAuth(function(authUser) {
				if (authUser) {
					$rootScope.currentUser = authUser;
				} 
			})
		}
	}

});