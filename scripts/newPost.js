app.controller('NewPostController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, Authentication) {

	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref);

	$scope.posts = posts;


	// Error Messages
	$scope.errorMessage = '';

	if ( !$rootScope.currentUser) {
		$scope.errorMessage = 'You must be signed in to submit a new post. Sign in with Twitter using the link above.';
	}

	$scope.clearErrorMessage = function() {
		$scope.errorMessage = '';
		return false;
	}

	

	// Add post
	$scope.addPost = function(post) {

		if (post.url && post.description) {
			$scope.errorMessage = 'You can post either a URL or a description, not both!';

		} else {

			if (post.url) {

				posts.$add({
					user: $rootScope.currentUser.twitter.username,
					date: Firebase.ServerValue.TIMESTAMP,
					name: post.name,
					description: null,
					url: post.url,
					comments: [],
					commentCount: 0,
					votes: 0,
				}).then(function() {

					post.name = '';
					post.description = '';
					post.url = '';

					$location.path('/');

				});


			} else if (post.description) {

				posts.$add({
					user: $rootScope.currentUser.twitter.username,
					date: Firebase.ServerValue.TIMESTAMP,
					name: post.name,
					description: post.description,
					url: null,
					comments: [],
					commentCount: 0,
					votes: 0,
				}).then(function() {

					post.name = '';
					post.description = '';
					post.url = '';

					$location.path('/');

				});



			} else {
				$scope.errorMessage = 'You must submit either a URL or a description';
			}

			
		} // end valid (i.e. post or url)

		
	};



});