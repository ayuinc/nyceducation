var app = angular.module("nyce", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/main.html",
        controller: "mainController"
    })
    .otherwise({ redirect_to: "/" });
});

app.controller("mainController", function($scope) {
    $scope.header = { title: "Welcome"};
});