//Starter Project for the Reddit Clone
var app = angular.module('ng-reddit', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URL', 'https://ireade-ng-reddit.firebaseio.com');


app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			controller: 'PostsController',
			templateUrl: 'views/posts.html'
		})
		.when('/new', {
			controller: 'NewPostController',
			templateUrl: 'views/new.html'
		})
		.when('/posts/:postId', {
			controller: 'PostController',
			templateUrl: 'views/post.html'
		})
		.otherwise({
			redirectTo: '/'
		});

});

app.filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  }
});