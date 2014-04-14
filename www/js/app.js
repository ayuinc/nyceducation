var app = angular.module("nyce", ["ngRoute", "ngAnimate", "ngTouch", "nyce.memoryServices"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/main.html",
        controller: "MainController"
    });

    $routeProvider.when("/school/:schoolId", {
        templateUrl: "templates/SchoolDetail.html",
        controller: "SchoolDetailController"
    });

    $routeProvider.otherwise({ redirect_to: "/" });
});

app.controller("MainController", ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location) {
    $scope.header = { title: "Welcome"};
    $scope.slide = '';
    $rootScope.back = function() {
        $scope.slide = 'slide-right';
        $window.history.back();
    };

    $rootScope.go = function(path) {
        $scope.slide = 'slide-left';
        $location.url(path);
    };
}]);

app.controller('SchoolDetailController', ['$scope', '$routeParams', 'School', function ($scope, $routeParams, School) {
    $scope.school = School.get({schoolId: $routeParams.schoolId});
}]);