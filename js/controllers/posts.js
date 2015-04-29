app.controller('PostsController', function(FIREBASE_URL, $scope, $rootScope, $firebaseArray, Authentication) {

	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref);

	$scope.posts = posts;


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



	$scope.addVote = function(direction, thisPost) {

		var votingRef = new Firebase(FIREBASE_URL + '/' + thisPost.$id + '/voters');
		var voters = $firebaseArray(votingRef);
		$scope.voters = voters;

		var hasVoted = false;

		console.log(thisPost)

		angular.forEach(thisPost.voters, function(object, id) {

			if ( object.name == $rootScope.currentUser.twitter.username ) {
				hasVoted = true;
			}
		});


		if (hasVoted) {
			console.log("you have already voted");

		} else {
			// User has not previously voted

			if (direction == 'up') {

				console.log("Voted up nigga!")

				thisPost.votes++;
				thisPost.$save(thisPost);

				voters.$add({
					name: $rootScope.currentUser.twitter.username,
					voted: 'up'
				});

			} if (direction == 'down') {

				console.log("Voted down nigga!")

				thisPost.votes--;
				thisPost.$save(thisPost);

				voters.$add({
					name: $rootScope.currentUser.twitter.username,
					voted: 'down'
				});
			}

		}	
	} 

});