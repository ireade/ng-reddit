app.controller('PostsController', function(FIREBASE_URL, $scope, $rootScope, $firebaseArray, $firebaseObject, Authentication) {

	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref);

	$scope.posts = posts;


	// Voting System
	//$rootScope.currentUser.userVote = 1;
	// $scope.upVote = function(post) {

	// 	if ($rootScope.currentUser) {

	// 		post.votes++;
	// 		posts.$save(post);

	// 	} else {
	// 		$scope.userVoteAlert = true;
	// 	}
		
	// };

	// $scope.downVote = function(post) {

	// 	if ($rootScope.currentUser) {
	// 		post.votes--;
	// 		posts.$save(post);

	// 	} else {
	// 		$scope.userVoteAlert = true;
	// 	}
		
	// };








});