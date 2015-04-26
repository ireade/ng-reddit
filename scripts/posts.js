app.controller('PostsController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, Authentication) {

	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref);

	$scope.posts = posts;


	
	$scope.test = function(post) {
		console.log(post);
	}

	

	// CRUD 
	$scope.addPost = function(post) {

		if (post.url && post.description) {

			alert("only one");

		} else {
			posts.$add({
				user: $rootScope.currentUser.twitter.username,
				date: Firebase.ServerValue.TIMESTAMP,
				name: post.name,
				description: post.description,
				url: post.url,
				comments: [],
				votes: 0,
			}).then(function() {

				post.name = '';
				post.description = '';
				post.url = '';

				$location.path('/');

			});
		}

		
	};

	


	// Voting System


	//$rootScope.currentUser.userVote = 1;


	$scope.upVote = function(post) {

		if ($rootScope.currentUser) {

			post.votes++;
			posts.$save(post);

		} else {
			$scope.userVoteAlert = true;
		}
		
	};

	$scope.downVote = function(post) {

		if ($rootScope.currentUser) {
			post.votes--;
			posts.$save(post);

		} else {
			$scope.userVoteAlert = true;
		}
		
	};




});