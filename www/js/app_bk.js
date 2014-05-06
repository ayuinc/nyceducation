var app = angular.module("nyce", ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete"]);

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

    $routeProvider.when("/school/:schoolId/menu", {
        templateUrl: "templates/SchoolMenu.html",
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

    $routeProvider.when("/school/glossary", {
        templateUrl: "templates/SchoolGlossary.html",
        controller: "SchoolController"
    });

    $routeProvider.otherwise({ redirect_to: "/" });
});

app.factory('DatosSchool',function($rootScope){
      

    return {
        datos: {ind: 3} ,obtenerCampos: function() {
            var campos = $rootScope.evaluation_ela;
            var camposLlenos = [];
            var camposValores = [];
            var scopeCampos = "{";

            for ( var i in campos) {
                if (campos[i] != 0){

                    camposLlenos.push( i ); 
                    camposValores.push( campos[i] ); 
                }
            }

            for ( var i in camposLlenos) {

                //    $rootScope.testScore.camposLlenos[i]=camposValores[i];
               //     console.log(i);
               //     console.log(camposLlenos[i]+" "+camposValores[i]);
                    scopeCampos = scopeCampos.concat('"'+camposLlenos[i]+'":"'+camposValores[i]+'" , ');

            }
            scopeCampos = scopeCampos.substring(0, scopeCampos.length-2);
            scopeCampos = scopeCampos.concat("}");

           // $scope.itemsYears = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
           $rootScope.testScore = JSON.parse(scopeCampos);

            console.log("------------");
            console.log($rootScope.testScore);
            console.log($rootScope.testScore.length);
        }  
    };
});

app.controller("MainController", ['$scope', '$rootScope', '$window', '$location', '$http', function($scope, $rootScope, $window, $location, $http) {
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
            $scope.schools = data.schools.slice(0, 150);
        })

}]);


app.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
    $http.get('http://162.243.110.154/api/v1/school/' + $routeParams.schoolId)
        .success(function(data){


            //$scope.enrollments = data.enrollment;
            //$scope.demographic = data.demographic[3];
            //$scope.school = data.profile[3];
            //$scope.school.name = data.schools[0].name;
            //$scope.school.id = data.schools[0].id;

            DatosSchool.datos.school = data.schools[0];
            $scope.school=DatosSchool.datos.school;
            $rootScope.school=DatosSchool.datos.school;

            DatosSchool.datos.profiles = data.profile;
            $rootScope.profile=DatosSchool.datos.profiles[3];

            DatosSchool.datos.demographics = data.demographic;
            $rootScope.demographic=DatosSchool.datos.demographics[3];
            
            DatosSchool.datos.enrollments = data.enrollment;
            $rootScope.enrollment=DatosSchool.datos.enrollments[3];

            DatosSchool.datos.evaluations_ela = data.evaluation_ela;
            $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[3];            

            


        });;
}]);


// controles y frabrica---

app.controller("EnrollmentDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.selectedyearEnrollment= "2014";
  $scope.itemsddEnrollment = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {$scope.selectedyearEnrollment = $scope.itemsddEnrollment[indice].texto;  $rootScope.enrollment=DatosSchool.datos.enrollments[indice]; };


}]);

app.controller("DemographicsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.selectedyearDemographics= "2014";
  $scope.itemsddDemographics = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {$scope.selectedyearDemographics = $scope.itemsddDemographics[indice].texto;  $rootScope.demographic=DatosSchool.datos.demographics[indice]; };

}]);

//  CONTROLES TEST SCORE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.controller("TestScoreYearddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedyear= "2014";
    $scope.itemsYears = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
    $scope.changeyear = function(indice) {$scope.selectedyear = $scope.itemsYears[indice].texto; $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice]; DatosSchool.obtenerCampos();};



}]);

app.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "1th";
    $scope.itemsGrades = [{texto:"1th",indice:"0"},{texto:"2th",indice:"1"},{texto:"3th",indice:"2"},{texto:"4th",indice:"3"}];
    $scope.changegrade = function(indice) {$scope.selectedgrade = $scope.itemsGrades[indice].texto;  };





//console.log($rootScope.evaluation_ela.school_id);
/*
function obtenerCampos() {
    var campos = $rootScope.evaluation_ela;
    var camposLlenos = [];

    for ( var i in campos) {
        if (campos[i] != 0){

            camposLlenos.push( i ); 
        }
    }

    console.log(camposLlenos);
}

obtenerCampos();

*/
//console.log(names); 
/*
for (i=0;i<jsonobj.length;i++)
{

  names.push( jsonobj[i] );

}*/
//var variable = names[1];


//console.log(variable.substring(0, variable.length-1));
//console.log(variable.length);

//var valor= $rootScope.evaluation_ela+variable;

//console.log(valor);




}]);

function AccordionDemoCtrl($scope) {
  $scope.oneAtATime = true;
}



//--