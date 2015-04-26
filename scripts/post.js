app.controller('PostController', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject, Authentication, $routeParams) {

	$scope.postId = $routeParams.postId;



	var ref = new Firebase(FIREBASE_URL + '/' + $scope.postId);
	var thisPost = $firebaseObject(ref);

	$scope.thisPost = thisPost;

	//console.log(thisPost)


	$scope.tab = 1;
	$scope.updateMessage = '';

	$scope.clearupdateMessage = function() {
		$scope.updateMessage = '';
		return false;
	}
	

	// Edit/Delete Settings 
	$scope.updatePost = function(thisPost) {
		thisPost.$save(thisPost);
		$scope.updateMessage = 'The post was successfully updated.';
	}

	$scope.deletePost = function(post) {
		thisPost.$remove(thisPost);
	};


	//Voting System
	// //$rootScope.currentUser.userVote = 1;
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




	// // Comments

	// $scope.addComment = function(post, comment) {

	// 	var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
	// 	var comments = $firebaseArray(ref);

	// 	comments.$add({
	// 		user: $rootScope.currentUser.twitter.username,
	// 		text: comment.text,
	// 		date: Firebase.ServerValue.TIMESTAMP,
	// 	});

	// 	comment.text = '';
	// };

	// $scope.deleteComment = function(post, comment) {

	// 	var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
	// 	var comments = $firebaseArray(ref);


	// 	//comments.$remove();



	// 	console.log(comment);

	// 	//console.log(posts);

	// };


});