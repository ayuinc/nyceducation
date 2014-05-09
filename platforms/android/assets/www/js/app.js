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
        controller: "SelectSchoolController"
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
            var campos_evaluation_ela = $rootScope.evaluation_ela;
            var campos_evaluation_math = $rootScope.evaluation_math;

            var camposLlenos_evaluation_ela  = [];
            var camposValores_evaluation_ela  = [];

            var camposLlenos_evaluation_math = [];
            var camposValores_evaluation_math = [];



            // ELA

            var scopeCampos_evaluation_ela = "{";

            for ( var i in campos_evaluation_ela) {
                if (campos_evaluation_ela[i] != 0){

                    camposLlenos_evaluation_ela.push( i ); 
                    camposValores_evaluation_ela.push( campos_evaluation_ela[i] ); 
                }
            }

            for ( var i in camposLlenos_evaluation_ela) {


                switch($rootScope.testScore_grade) {
                    case 3:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "3" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;
                    case 4:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "4" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;
                    case 5:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "5" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;
                    case 6:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "6" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;
                    case 7:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "7" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;
                    case 8:

                        if ( (camposLlenos_evaluation_ela[i].substring(0,1)) == "8" ){
                        scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');
                        }
                        break;


                    }

                   // scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat('"'+camposLlenos_evaluation_ela[i]+'":"'+camposValores_evaluation_ela[i]+'" , ');

            }

            scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.substring(0, scopeCampos_evaluation_ela.length-2);
            scopeCampos_evaluation_ela = scopeCampos_evaluation_ela.concat("}");

            if (scopeCampos_evaluation_ela=="}"){scopeCampos_evaluation_ela='{"123456789nulooo":"No Hay valores"}';}


            // MATH

            var scopeCampos_evaluation_math = "{";

           // var scopeCampos_evaluation_math = "";

            for ( var i in campos_evaluation_math) {
                if (campos_evaluation_math[i] != 0){

                    camposLlenos_evaluation_math.push( i ); 
                    camposValores_evaluation_math.push( campos_evaluation_math[i] ); 
                }
            }

            for ( var i in camposLlenos_evaluation_math) {


                    

                    //console.log($rootScope.testScore_grade);
                    //console.log(camposLlenos_evaluation_math[i].substring(camposLlenos_evaluation_math[i].length-6, camposLlenos_evaluation_math[i].length-5) ); 

                    
                    switch($rootScope.testScore_grade) {
                    case 3:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "3" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    case 4:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "4" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    case 5:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "5" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    case 6:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "6" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    case 7:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "7" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    case 8:

                        if ( (camposLlenos_evaluation_math[i].substring(0,1)) == "8" ){
                        scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');
                        }
                        break;
                    
                    }   


                   // scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat('"'+camposLlenos_evaluation_math[i]+'":"'+camposValores_evaluation_math[i]+'" , ');

            }

            scopeCampos_evaluation_math = scopeCampos_evaluation_math.substring(0, scopeCampos_evaluation_math.length-2);
            scopeCampos_evaluation_math = scopeCampos_evaluation_math.concat("}");

            if (scopeCampos_evaluation_math=="}"){scopeCampos_evaluation_math='{"123456789nulooo":"No Hay valores"}';}

            // FIN MATH

            //var scopeCampos ="";

            //scopeCampos = scopeCampos_evaluation_ela.concat(scopeCampos_evaluation_math);

            $rootScope.testScore_ela = JSON.parse(scopeCampos_evaluation_ela);
            $rootScope.testScore_math = JSON.parse(scopeCampos_evaluation_math);

           // $scope.itemsYears = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
           //$rootScope.testScore = JSON.parse(scopeCampos);

            console.log($rootScope.testScore_ela);
            console.log($rootScope.testScore_math);
            //console.log($rootScope.testScore);
            //console.log($rootScope.testScore.length);
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

    //$http.get('http://localhost/nyeducation_api/public/index.php/api/v1/school/')
    $http.get('http://162.243.110.154/api/v1/schools')
        .success(function(data){
            $scope.schools = data.schools.slice(0, 150);
        })

}]);



app.controller('SelectSchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
    //$http.get('http://localhost/nyeducation_api/public/index.php/api/v1/school/' + $routeParams.schoolId)
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

            DatosSchool.datos.evaluations = data.evaluation;
            $rootScope.evaluation=DatosSchool.datos.evaluations[3];

            DatosSchool.datos.evaluations_ela = data.evaluation_ela;
            $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[0];   

            DatosSchool.datos.evaluations_math = data.evaluation_math;
            $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[0];

            DatosSchool.datos.evaluations_average_score = data.evaluation_average_score;
            $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[3];

            DatosSchool.datos.evaluations_regents = data.evaluation_regents;
            $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[3];

            DatosSchool.datos.college_careers = data.college_career;
            $rootScope.college_career=DatosSchool.datos.college_careers[3];

            DatosSchool.datos.survey_result = data.survey_results;
            $rootScope.survey_results=DatosSchool.datos.survey_result[3];

            DatosSchool.datos.evaluation_rating = data.evaluation_ratings;
            $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[3];

            DatosSchool.datos.proficiency_rating = data.proficiency_ratings;
            $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[3];

            $rootScope.testScore_grade = 3;

            
        });;
}]);


app.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
    /* $http.get('http://162.243.110.154/api/v1/school/' + $routeParams.schoolId)
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

            DatosSchool.datos.evaluations = data.evaluation;
            $rootScope.evaluation=DatosSchool.datos.evaluations[3];

            DatosSchool.datos.evaluations_ela = data.evaluation_ela;
            $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[3];   

            DatosSchool.datos.evaluations_math = data.evaluation_math;
            $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[3];

            DatosSchool.datos.evaluations_average_score = data.evaluation_average_score;
            $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[3];

            DatosSchool.datos.evaluations_regents = data.evaluation_regents;
            $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[3];

            DatosSchool.datos.college_careers = data.college_career;
            $rootScope.college_career=DatosSchool.datos.college_careers[3];

            DatosSchool.datos.survey_result = data.survey_results;
            $rootScope.survey_results=DatosSchool.datos.survey_result[3];

            DatosSchool.datos.evaluation_rating = data.evaluation_ratings;
            $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[3];

            DatosSchool.datos.proficiency_rating = data.proficiency_ratings;
            $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[3];

            
        });; */
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

    $scope.selectedyear= "2011";
    $scope.itemsYears = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
    $scope.changeyear = function(indice_year) {$scope.selectedyear = $scope.itemsYears[indice_year].texto; $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year]; $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year]; DatosSchool.obtenerCampos();};
    DatosSchool.obtenerCampos();


}]);

app.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "3th";
    $scope.itemsGrades = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
    $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  $rootScope.testScore_grade=parseInt(indice_grade)+3; /* console.log(parseInt(indice)+3)  ;*/  DatosSchool.obtenerCampos(); };





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



app.filter("GeneraNombreTestScore", function(){
    return function(text) {

        var valor = text.substring(9,15);

        switch(valor) {
        case "level1":
            return "Level 1";
        break;
        case "level2":
            return "Level 2";
        break;
        case "level3":
            return "Level 3";
        break;
        case "level4":
            return "Level 4";
        break;
        case "_math":
            return "Average Profieciency Score Math";
        break;
        case "_ela":
            return "Average Profieciency Score ELA";
        break;
        case "nulooo":
            return "No hay!";
        break;
        }

    }
})



//--