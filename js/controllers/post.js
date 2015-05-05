app.controller('PostController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject, Authentication, $routeParams) {

	$scope.postId = $routeParams.postId;

	var ref = new Firebase(FIREBASE_URL + '/' + $scope.postId);
	var thisPost = $firebaseObject(ref);

	$scope.thisPost = thisPost;


	// Tab and Message
	//
	$scope.tab = 1;

	$scope.updateMessage = '';
	$scope.votedWarning = '';

	$scope.clearMessage = function() {
		$scope.updateMessage = '';
		$scope.votedWarning = '';
		return false;
	}
	

	// Edit/Delete Settings 
	//
	$scope.updatePost = function(thisPost) {
		thisPost.$save(thisPost);
		$scope.updateMessage = 'The post was successfully updated.';
	}
	$scope.deletePost = function(thisPost) {

		thisPost.$remove(thisPost);
		$location.path('/');
	};




	// Voting System
	//
	$scope.addVote = function(direction, thisPost) {

		var votingRef = new Firebase(FIREBASE_URL + '/' + thisPost.$id + '/voters');
		var voters = $firebaseArray(votingRef);
		$scope.voters = voters;

		var hasVoted = false;

		angular.forEach(thisPost.voters, function(object, id) {

			if ( object.name == $rootScope.currentUser.twitter.username ) {
				hasVoted = true;
			}
		});


		if (hasVoted) {
			
			$scope.votedWarning = 'Sorry, you have already voted on this post. You cannot vote again';

		} else {
			// User has not previously voted

			if (direction == 'up') {

				console.log("Voted up!")

				thisPost.votes++;
				thisPost.$save(thisPost);

				voters.$add({
					name: $rootScope.currentUser.twitter.username,
					voted: 'up'
				});

			} if (direction == 'down') {

				console.log("Voted down!")

				thisPost.votes--;
				thisPost.$save(thisPost);

				voters.$add({
					name: $rootScope.currentUser.twitter.username,
					voted: 'down'
				});
			}

		}	
	} 





	// Comments

	var commentsRef = new Firebase(FIREBASE_URL + '/' + $scope.postId + '/comments');
	var comments = $firebaseArray(commentsRef);

	$scope.comments = comments;

	$scope.addComment = function(comment) {

		comments.$add({
			user: $rootScope.currentUser.twitter.username,
			text: $scope.comment.text,
			date: Firebase.ServerValue.TIMESTAMP,
		}).then(function() {
			comment.text = '';
			thisPost.commentCount++;
			thisPost.$save(thisPost);
		});
	};

	$scope.deleteComment = function(comment) {

		comments.$remove(comment).then(function() {
			thisPost.commentCount--;
			thisPost.$save(thisPost);
		});
	};



});