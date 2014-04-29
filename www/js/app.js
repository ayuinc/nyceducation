var app = angular.module("nyce", ["ngRoute", "ngAnimate", "ngTouch"]);

//angular.module('nyce', ['mm.foundation']);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/main.html",
        controller: "MainController"
    });

    $routeProvider.when("/school/:schoolId", {
        templateUrl: "templates/SchoolDetail.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/enrollments", {
        templateUrl: "templates/SchoolEnrollments.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/demographics", {
        templateUrl: "templates/SchoolDemographics.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/admissions", {
        templateUrl: "templates/SchoolAdmissions.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/testScores", {
        templateUrl: "templates/SchoolTestScores.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/evaluations", {
        templateUrl: "templates/SchoolEvaluations.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/surveyResults", {
        templateUrl: "templates/SchoolSurveyResults.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/college", {
        templateUrl: "templates/SchoolCollegeCareer.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/:schoolId/glossary", {
        templateUrl: "templates/SchoolGlossary.html",
        controller: "SchoolController"
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
        console.log('path ' + path);
        $location.url(path);
    };
}]);

/*app.controller('SchoolController', ['$scope', '$routeParams', 'School', function ($scope, $routeParams, School) {
   $scope.school = School.get({schoolId: $routeParams.schoolId});
}]);*/




app.controller("SchoolController", function ($scope, $http, $routeParams) {
    var urlBase = 'http://162.243.110.154/api/v1/school';

    $http.get(urlBase+'/'+ $routeParams.schoolId).
    success(function (data) {
        $scope.school = data.profile[3];
    });

   // console.log($scope.school);
});




/*app.controller('SchoolEnrollmentController', ['$scope', '$routeParams', 'School', function ($scope, $routeParams, School) {
    $scope.school = School.get({schoolId: $routeParams.schoolId});
    angular.element('a[ng-model="school.enrollmentYear"]').click(function {
        console.log(this.text);
    });
}]);*/

/*
myevents.controller("EventsController", function ($scope, $http) {
    $http.get('http://162.243.110.154/api/v1/schools/').
    success(function (data) {
        $scope.events = data;
    });
});*/