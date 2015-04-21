app.controller('PostsController', function(FIREBASE_URL, $scope, $location, $firebaseArray, Posts) {

	$scope.posts = Posts;


	// $scope.tab = 1;

	// $scope.tab.isSet = function(n) {
	// 	$scope.tab = n;
	// }

	// $scope.tab = 1;

 //  this.isSet = function(checkTab) {
 //    return this.tab === checkTab;
 //  };

 //  this.setTab = function(activeTab) {
 //    this.tab = activeTab;
 //  };




	// CRUD 
	$scope.addPost = function(post) {

		Posts.$add({
			name: post.name,
			description: post.description,
			url: post.url,
			votes: 0

		}).then(function() {

			post.name = '';
			post.description = '';
			post.url = '';

			$location.path('/');

		});
	};

	$scope.deletePost = function(post) {
		Posts.$remove(post);
	};


	// Voting System
	$scope.upVote = function(post) {
		post.votes++;
		Posts.$save(post);
	};

	$scope.downVote = function(post) {
		post.votes--;
		Posts.$save(post);
	};




	// Comments



	$scope.addComment = function(post, comment) {

		var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
		var comments = $firebaseArray(ref);

		$scope.comments = comments;

		$scope.comments.$add({
			text: comment.text
		});

		comment.text = '';

	}

	$scope.deleteComment = function(post, comment) {

		var ref = new Firebase(FIREBASE_URL + '/'+ post.$id + '/comments');
		var comments = $firebaseArray(ref);

		comments.$remove(comment);

	}


});