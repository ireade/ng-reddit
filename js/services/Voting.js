app.factory('Voting', function($firebaseArray, $rootScope, $scope, FIREBASE_URL) {

	return {
		vote: function(direction, thisPost) {

			var votingRef = new Firebase(FIREBASE_URL + '/' + thisPost.$id + '/voters');
			var voters = $firebaseArray(votingRef);
			$scope.voters = voters;


			var hasVoted = false;
			// var hasVoted_nowVotingSame = false;
			// var hasVotedUp_nowVotingDown = false;
			// var hasVotedDown_nowVotingUp = false;
			// var votedUser;

			angular.forEach(thisPost.voters, function(object, id) {

				if ( object.name == $rootScope.currentUser.twitter.username ) {

					hasVoted = true;

					// votedUser = object;


					// if (object.voted == direction) {
					// 	hasVoted_nowVotingSame = true;
					// }

					// if (object.voted == 'up' && direction == 'down') {
					// 	hasVotedUp_nowVotingDown = true;
					// }

					// if (object.voted == 'down' && direction == 'up') {
					// 	hasVotedDown_nowVotingUp = true;
					// }
				}
			});


			if (hasVoted) {

				console.log("you have already voted");

				// if (hasVoted_nowVotingSame) {

				// 	console.log("same!");

				// } else {

				// 	if (hasVotedUp_nowVotingDown) {
				// 		console.log("you can now vote down");

				// 		thisPost.votes = thisPost.votes - 2;
				// 		thisPost.$save(thisPost);

				// 		votedUser.voted = 'down';
				// 		voters.$save(votedUser);

				// 		console.log(votedUser);

				// 	}

				// 	if (hasVotedDown_nowVotingUp) {
				// 		console.log("you can now vote up");
				// 	}

				// }


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
	}

});