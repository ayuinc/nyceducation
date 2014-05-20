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

    $routeProvider.when("/school/:schoolId/surveyDetail", {
        templateUrl: "templates/SchoolSurveyDetail.html",
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
        datos: {ind: 3} ,

        obtenerCampos: function() {
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

app.controller("MainController", ['$scope', '$rootScope', '$window', '$location', '$http', 'SchoolRetriever', function($scope, $rootScope, $window, $location, $http, SchoolRetriever) {
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
    /*$http.get('http://162.243.110.154/api/v1/schools')
        .success(function(data){
            $scope.schools = data.schools.slice(0, 150);
        })*/
    $scope.schools = SchoolRetriever.getSchools();
    $scope.schools.then(function(data){
        $scope.schools = data.profiles;
    });

    $scope.getSchools = function() {
        return $scope.schools;
    }

    $scope.updateSchools = function(typed) {
        $scope.newSchools = SchoolRetriever.getSchools(typed);
        $scope.newSchools.then(function(data) {
            $scope.schools = data.profiles;
        });
    }



/*app.controller('MyCtrl', function($scope, MovieRetriever){

  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

  $scope.getmovies = function(){
    return $scope.movies;
  }

  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data.profiles;
    });
  }

});*/

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
            $rootScope.enrollment=DatosSchool.datos.enrollments[1];

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

            DatosSchool.datos.es_admission = data.es_admissions;
            $rootScope.es_admissions=DatosSchool.datos.es_admission[0];

            DatosSchool.datos.ms_admission = data.ms_admissions;
            $rootScope.ms_admissions=DatosSchool.datos.ms_admission[0];

            DatosSchool.datos.hs_admission = data.hs_admissions;
            $rootScope.hs_admissions=DatosSchool.datos.hs_admission[0];

            DatosSchool.datos.city_averages = data.city_average;
            $rootScope.city_average=DatosSchool.datos.city_averages[3];

            $rootScope.testScore_grade = 3;

            $rootScope.survey_var = 0;

            
        });;
}]);


app.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
   /*  $http.get('http://162.243.110.154/api/v1/school/' + $routeParams.schoolId)
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
            $rootScope.enrollment=DatosSchool.datos.enrollments[1];

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

            
        });; */
}]);


// controles y frabrica---

app.controller("EnrollmentDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.enrollment=DatosSchool.datos.enrollments[3]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[3];


  $scope.selectedyearEnrollment= "2014";
  $scope.itemsddEnrollment = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {$scope.selectedyearEnrollment = $scope.itemsddEnrollment[indice].texto;  $rootScope.enrollment=DatosSchool.datos.enrollments[indice]; $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] };


}]);

app.controller("DemographicsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.selectedyearDemographics= "2014";
  $scope.itemsddDemographics = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {$scope.selectedyearDemographics = $scope.itemsddDemographics[indice].texto;  $rootScope.demographic=DatosSchool.datos.demographics[indice]; };

}]);

app.controller("CollegeCarrerDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[0];
    $rootScope.college_career=DatosSchool.datos.college_careers[0];
    $rootScope.city_average=DatosSchool.datos.city_averages[0];

  $scope.selectedyearCollegeCarrer= "2011";
  $scope.itemsddCollegeCarrer = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear = function(indice) {$scope.selectedyearCollegeCarrer = $scope.itemsddCollegeCarrer[indice].texto;  $rootScope.college_career=DatosSchool.datos.college_careers[indice]; $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; $rootScope.city_average=DatosSchool.datos.city_averages[indice]; };


}]);


app.controller("EvaluationsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[0];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[0];


    //console.log($rootScope.evaluation_ratings.ri_11);

  $scope.selectedyearEvaluations= "2011";
  $scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear = function(indice) {$scope.selectedyearEvaluations = $scope.itemsddEvaluations[indice].texto;     $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] };


}]);



//  CONTROLES TEST SCORE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*
app.controller("TestScoreYearddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    

    $rootScope.testScore_grade = 3;
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[0];   
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[0];


    $scope.selectedyear= "2011";
    $scope.itemsYears = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
    $scope.changeyear = function(indice_year) {$scope.selectedyear = $scope.itemsYears[indice_year].texto; $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year]; $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year]; DatosSchool.obtenerCampos();};
    DatosSchool.obtenerCampos();


}]);

app.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "3th";
    $scope.itemsGrades = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
    $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  $rootScope.testScore_grade=parseInt(indice_grade)+3;  DatosSchool.obtenerCampos(); };


}]);

*/

// FIN CONTROLES TEST SCORE --------------------------------------------------------------------------------------------------


app.controller("TestScoreYearddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    

    $rootScope.testScore_grade = 3;
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[0];   
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[0];
    $rootScope.city_average=DatosSchool.datos.city_averages[0];
    $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[0];
    $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[0];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[0];


    $scope.selectedyear= "2011";
    $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {$scope.selectedyear = $scope.itemsYears[indice_year].texto; 
        $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year]; 
        $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year]; 
        $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
        $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice_year];
        $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice_year];
        $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];
        console.log(indice_year);

        /*$rootScope.oneAtATime = true;

        $rootScope.oneAtATime = false;*/
    };
    


}]);

app.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "3th";
    $scope.itemsGrades = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
    $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  $rootScope.testScore_grade=parseInt(indice_grade)+3;};


}]);


// CONTROLADORES ADMISSIONS


app.controller("AdmissionsMSctrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    middle = DatosSchool.datos.ms_admission;

    if ((middle.length != 0) ){

        var cods =[];

    for (var i = 0; i < middle.length; i++) {
    cods.push(DatosSchool.datos.ms_admission[i].program_code);
    }

        var items = "[";
    for (var i = 0; i < cods.length; i++){

        items = items.concat('{"texto":"'+cods[i]+'","indice":"'+i+'"},');

    }
    items = items.substring(0,items.length-1);
    items = items.concat("]");
    var todos = JSON.parse(items);

    $rootScope.itemsaddMS = todos;
   
//$rootScope.itemsaddMS
//$scope.itemsAddMs = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];    
    $scope.progSelected= $rootScope.itemsaddMS[0].texto;
    }

    //console.log($rootScope.evaluation_ratings.ri_11);

  
  //$scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeprog = function(indice) {$scope.progSelected = $rootScope.itemsaddMS[indice].texto; 
      $rootScope.ms_admissions=DatosSchool.datos.ms_admission[indice];
      //$rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] 
  };


}]);

app.controller("AdmissionsHSctrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    high = DatosSchool.datos.hs_admission;

    if ((high.length != 0) ){

        var cods_hs =[];

    for (var i = 0; i < high.length; i++) {
    cods_hs.push(DatosSchool.datos.hs_admission[i].program_name);
    }

        var items = "[";
    for (var i = 0; i < cods_hs.length; i++){

        items = items.concat('{"texto":"'+cods_hs[i]+'","indice":"'+i+'"},');

    }
    items = items.substring(0,items.length-1);
    items = items.concat("]");
    var todos = JSON.parse(items);

    $rootScope.itemsaddHS = todos;
   
//$rootScope.itemsaddMS
//$scope.itemsAddMs = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];    
    $scope.progSelected_hs= $rootScope.itemsaddHS[0].texto;
    }

    //console.log($rootScope.evaluation_ratings.ri_11);

  
  //$scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeprog_hs = function(indice_hs) {$scope.progSelected_hs = $rootScope.itemsaddHS[indice_hs].texto; 
      $rootScope.hs_admissions=DatosSchool.datos.hs_admission[indice_hs];
      //$rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] 
  };


}]);


// CONTROLADORES SURVEY SCHOOL


app.controller("SurveyYearCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    

    //$rootScope.testScore_grade = 3;

    $rootScope.survey_results=DatosSchool.datos.survey_result[0];
    $rootScope.city_average=DatosSchool.datos.city_averages[0];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[0];


    $scope.selectedyear= "2011";
    $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {
    $scope.selectedyear = $scope.itemsYears[indice_year].texto; 
    $rootScope.survey_results=DatosSchool.datos.survey_result[indice_year];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];
        //console.log(indice_year);

        /*$rootScope.oneAtATime = true;

        $rootScope.oneAtATime = false;*/
    };
    


}]);

app.controller("SurveyRespCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "Parents";
    $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"},{texto:"Students",indice:"2"}];
    $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
        $rootScope.survey_var=parseInt(indice_grade);};


}]);

// FIN CONTROLADORES SURVEY


function AccordionDemoCtrl($scope , $rootScope) {
  $rootScope.oneAtATime = true;
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



app.filter("filtraCeros", function(){
    return function(text) { 

        if (text == "0.00" || text == "0" || text == ""){ return "borrar";}

    } 
})


app.filter("filtraGrado", function( $rootScope ){

    return function(text) {

        if ( text != $rootScope.testScore_grade){ return "borrar";}



    }
})

//-----------------------------------------

app.factory('SchoolRetriever', function($http, $q, $timeout) {
    var getSchools = function(query) {
        var deferred = $q.defer();

        $http.get('http://162.243.110.154/api/v1/schools/' + query)
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(reason) {
            deferred.reject(reason);
        });

        return deferred.promise;
    }

    return {
        getSchools: getSchools
    };
});

app.filter("filtraTestScore", function( $rootScope, DatosSchool ){


    return function(text) {


    var elementaryS = "";
    var highS = "";

    elementaryS = elementaryS.concat(DatosSchool.datos.evaluations[0].es_ms_k8_ecpr_s_type);
    elementaryS = elementaryS.concat(DatosSchool.datos.evaluations[1].es_ms_k8_ecpr_s_type);
    elementaryS = elementaryS.concat(DatosSchool.datos.evaluations[2].es_ms_k8_ecpr_s_type);
    elementaryS = elementaryS.concat(DatosSchool.datos.evaluations[3].es_ms_k8_ecpr_s_type);

    highS = highS.concat(DatosSchool.datos.evaluations[0].hs_t_hs_o_pr_s_type);
    highS = highS.concat(DatosSchool.datos.evaluations[1].hs_t_hs_o_pr_s_type);
    highS = highS.concat(DatosSchool.datos.evaluations[2].hs_t_hs_o_pr_s_type);
    highS = highS.concat(DatosSchool.datos.evaluations[3].hs_t_hs_o_pr_s_type);


    //$rootScope.evaluation=DatosSchool.datos.evaluations[3];


        if ( (elementaryS == "") && (text == "elementary")){ return "borrar";}
        if ( (highS == "") && (text == "high")){ return "borrar";}

    }
});


app.filter("filtraRank", function( $rootScope, DatosSchool ){


    return function(text) {


        if ( (text > 1) && (text < 25 )){ return '25';}
        else if ( (text >= 25) && (text < 50 )){ return '50';}
        else if ( (text >= 50) && (text < 75 )){ return '75';}
        else if ( (text >= 75) && (text <= 100 )){ return "100";}
        else { return "n";}

        //console.log( text);

        //if ( (highS == "") && (text == "high")){ return "borrar";}

    }
});

app.filter("filtraAdmissions", function( $rootScope, DatosSchool ){
    return function(text) {

    elementary = DatosSchool.datos.es_admission.length;
    middle = DatosSchool.datos.ms_admission.length;
    high = DatosSchool.datos.hs_admission.length;

console.log(elementary+" "+middle+" "+high);

    switch (text) {

    case "ms":

    if ((middle == 0) ){ return "borrar";}
    break;

    case "hs":

    if ((high == 0)){ return "borrar";}
    break;

    case "es":

    if ((elementary == 0) ){ return "borrar";}
    break;

} 

/*
if ((elementary == 0) && (text == 'es')){ return "borrar";}
else if ((middle == 0) && (text == 'ms')){ return "borrar";}
else if ((high == 0) && (text == 'hs')){ return "borrar"; }
*/

    }
});


app.filter("filtraSurvey", function( $rootScope, DatosSchool ){


    return function(text) {

    var who = $rootScope.survey_var


    if ( (text == "parents") && (who != 0) ){ return "borrar";}
    else if ( (text == "teachers") && (who != 1)){ return "borrar";} 
    else if ( (text == "students") && (who != 2)){ return "borrar";}        
/*
        if ( (text > 1) && (text < 25 )){ return '25';}
        else if ( (text >= 25) && (text < 50 )){ return '50';}
        else if ( (text >= 50) && (text < 75 )){ return '75';}
        else if ( (text >= 75) && (text <= 100 )){ return "100";}
        else { return "";}

        console.log( text); */

        //if ( (highS == "") && (text == "high")){ return "borrar";}

    }
});


app.filter("filtraOverallEvaluations", function(){
    return function(text) {

var num = parseInt(text);

if ((num > 0) && (num <= 49)){ return "F";}
else if ((num > 50) && (num <= 59)){ return "E";}
else if ((num > 60) && (num <= 69)){ return "D";}
else if ((num > 70) && (num <= 79)){ return "C";}
else if ((num > 80) && (num <= 89)){ return "B";}
else if ((num > 90) && (num <= 100)){ return "A";}
else {return "C";}

    }
});