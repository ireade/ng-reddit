app.controller('PostsController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, Authentication) {

	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref);

	$scope.posts = posts;


	$scope.tab = 1;
	$scope.updateMessage = '';

	$scope.clearupdateMessage = function() {
		$scope.updateMessage = '';
		return false;
	}

	

	// CRUD 
	$scope.addPost = function(post) {

		posts.$add({
			user: $rootScope.currentUser.twitter.username,
			date: Firebase.ServerValue.TIMESTAMP,
			name: post.name,
			description: post.description,
			url: post.url,
			votes: 0,
		}).then(function() {

			post.name = '';
			post.description = '';
			post.url = '';

			$location.path('/');

		});
	};

	$scope.updatePost = function(post) {
		posts.$save(post);
		$scope.updateMessage = 'The post was successfully updated.';
	}

	$scope.deletePost = function(post) {
		posts.$remove(post);
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




	// Comments

	$scope.addComment = function(post, comment) {

		var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
		var comments = $firebaseArray(ref);

		comments.$add({
			user: $rootScope.currentUser.twitter.username,
			text: comment.text,
			date: Firebase.ServerValue.TIMESTAMP,
		});

		comment.text = '';
	};

	$scope.deleteComment = function(post, comment) {

		var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
		var comments = $firebaseArray(ref);


		//comments.$remove();



		console.log(comment);

		//console.log(posts);

	};


});