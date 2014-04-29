var app = angular.module("nyce", ["ngRoute", "ngAnimate", "ngTouch", "autocomplete"]);

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

app.controller("MainController", ['$scope', '$rootScope', '$window', '$location', '$http', 'MovieRetriever', function($scope, $rootScope, $window, $location, $http, MovieRetriever) {
    $scope.header = { title: "Welcome"};
    $scope.slide = '';
    $scope.schools = [];

    $rootScope.back = function() {
        $scope.slide = 'slide-right';
        $window.history.back();
    };

    $rootScope.go = function(path) {
        $scope.slide = 'slide-left';
        console.log('path ' + path);
        $location.url(path);
    };

    $http.get('http://162.243.110.154/api/v1/school')
        .success(function(data){
            /*data.schools.forEach(function(elem) {
                if(elem.id < 100)
                    $scope.schools.push(elem.dbn+' '+elem.name);
            });*/
            $scope.schools = data.schools.slice(0, 150);
        })

    $scope.movies = ["Lord of the Rings",
                    "Drive",
                    "Science of Sleep",
                    "Back to the Future",
                    "Oldboy"];

    // gives another movie array on change
    $scope.updateMovies = function(typed){
        // MovieRetriever could be some service returning a promise
        $scope.newmovies = MovieRetriever.getmovies(typed);
        $scope.newmovies.then(function(data){
          $scope.movies = data;
        });

    }
}]);

app.controller('SchoolController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get('http://162.243.110.154/api/v1/school/' + $routeParams.schoolId)
        .success(function(data){
            console.log(data);
            $scope.school = data.profile[3];
            $scope.school.name = data.schools[0].name;
        });;
}]);




/*app.controller("SchoolController", function ($scope, $http, $routeParams) {
    var urlBase = 'http://162.243.110.154/api/v1/school';

    $http.get(urlBase+'/'+ $routeParams.schoolId).
    success(function (data) {
        $scope.school = data.profile[3];
    });

   // console.log($scope.school);
});*/




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

app.factory('MovieRetriever', function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies;

    var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

    var moreMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]
    
    console.log('i ----> ' + i.indexOf('T'));
    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});