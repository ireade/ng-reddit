app.controller('PostController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject, Authentication, $routeParams) {

	$scope.postId = $routeParams.postId;

	var ref = new Firebase(FIREBASE_URL + '/' + $scope.postId);
	var thisPost = $firebaseObject(ref);

	$scope.thisPost = thisPost;


	// Tab and Message
	//
	$scope.tab = 1;

	$scope.updateMessage = '';

	$scope.clearupdateMessage = function() {
		$scope.updateMessage = '';
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


	//Voting System
	// 
	$scope.upVote = function(thisPost) {

		if ($rootScope.currentUser) {

			thisPost.votes++;
			thisPost.$save(thisPost);

		} else {
			$scope.userVoteAlert = true;
		}
	};

	$scope.downVote = function(thisPost) {

		if ($rootScope.currentUser) {
			thisPost.votes--;
			thisPost.$save(thisPost);

		} else {
			$scope.userVoteAlert = true;
		}
	};




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