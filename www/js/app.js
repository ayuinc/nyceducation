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

    $routeProvider.when("/school/:schoolId/glossary", {
        templateUrl: "templates/SchoolGlossary.html",
        controller: "SchoolController"
    });

    $routeProvider.when("/school/query/:query", {
        templateUrl: "templates/SchoolList.html",
        controller: "SchoolListController"
    });

    $routeProvider.otherwise({ redirect_to: "/" });
});

app.factory('DatosSchool',function($rootScope){
      

    return {
        datos: {ind: 3}       
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


}]);


app.controller("SchoolListController", ['$scope', '$http', '$routeParams', function($scope, $http ,$routeParams) {

    $http.get('http://162.243.110.154/api/v1/schools/findByDistrict/' + encodeURI($routeParams.query))
        .success(function(data) {
            if(data.error) {
                $scope.err = "Schools not found."
                $scope.schools = null;
            }
            else {
                $scope.schools = data.schools;
            }
        });

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
            $rootScope.demographic=DatosSchool.datos.demographics[0];
            
            DatosSchool.datos.enrollments = data.enrollment;
            $rootScope.enrollment=DatosSchool.datos.enrollments[0];

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

            // $rootScope.testScore_grade = 3;

            $rootScope.survey_var = 0;


            
        });;
}]);


app.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {

}]);


// controles y frabrica---

app.controller("EnrollmentDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.enrollment=DatosSchool.datos.enrollments[3];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[3];

    var Datos2011 = DatosSchool.datos.enrollments[0]["grade1"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade2"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade3"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade4"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade5"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade6"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade7"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade8"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade9"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade10"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade11"].substring(0,1)+DatosSchool.datos.enrollments[0]["grade12"].substring(0,1)+DatosSchool.datos.enrollments[0]["pre_kinder"].substring(0,1)+DatosSchool.datos.enrollments[0]["kinder"].substring(0,1);
    console.log(Datos2011); 
    // $rootScope.dat=Datos2011;
    $rootScope.dat="borrar";
     // console.log($rootScope.enrollment); 
    // console.log($rootScope.enrollment["grade1"]); 
    // console.log($rootScope.enrollment["grade2"]); 

  $scope.selectedyearEnrollment= "2014";
  $scope.itemsddEnrollment = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {
    $scope.selectedyearEnrollment = $scope.itemsddEnrollment[indice].texto;  
    $rootScope.enrollment=DatosSchool.datos.enrollments[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; 
    $rootScope.dat="borrar";
    if(((indice=="0")||(indice=="1")) && (Datos2011=="00000000000000")){$rootScope.dat="mostrar";}

};


}]);

app.controller("DemographicsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.demographic=DatosSchool.datos.demographics[3];    
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

app.controller("SelectEvaluations" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectEvaluations_is = "Select";
  $scope.itemsEvaluations = [{texto:"Elementary",indice:"0"},{texto:"High",indice:"1"}];
  $scope.changeEvaluations = function(indice) {

    if (indice==0){

        $rootScope.filtroHighSE = "borrar";
        $rootScope.filtroElementarySE = "mostrar";
        $rootScope.filtroAllSE ="mostrar"
    }

    if (indice==1){

        $rootScope.filtroElementarySE = "borrar";
        $rootScope.filtroHighSE = "mostrar";
        $rootScope.filtroAllSE ="mostrar"
    }  

    $scope.SelectEvaluations_is = $scope.itemsEvaluations[indice].texto;  

  };


}]);


app.controller("EvaluationsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[2];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];
    $rootScope.evaluation=DatosSchool.datos.evaluations[2];


    //console.log($rootScope.evaluation_ratings.ri_11);

  $scope.selectedyearEvaluations= "2013";
  $scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear = function(indice) {$scope.selectedyearEvaluations = $scope.itemsddEvaluations[indice].texto;     
    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice] };


}]);


app.controller("EvaluationsDropdownCtrl_hs" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[2];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];
    $rootScope.evaluation=DatosSchool.datos.evaluations[2];


    //console.log($rootScope.evaluation_ratings.ri_11);

  $scope.selectedyearEvaluations_hs= "2013";
  $scope.itemsddEvaluations_hs = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear_hs = function(indice) {$scope.selectedyearEvaluations_hs = $scope.itemsddEvaluations_hs[indice].texto;     
    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice] };


}]);



app.controller("TestScoreYearddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
    


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
        //$route.reload();

        /*$rootScope.oneAtATime = true;

        $rootScope.oneAtATime = false;*/
    };
    


}]);

app.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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

    console.log(elementaryS);

    // switch(elementaryS){

    // case "ElementaryElementaryElementary":

    // $rootScope.testScore_grade = 3;           
    // $scope.selectedgrade= "3rd";
    // $scope.itemsGrades = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"}];    

    // $scope.changegrade = function(indice_grade) {
    //     $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
    //     $rootScope.testScore_grade=parseInt(indice_grade)+3;}; 

    // break;

    // case "MiddleMiddleMiddle":

    // $rootScope.testScore_grade = 7;
    // $scope.selectedgrade= "7th";
    // $scope.itemsGrades = [{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];    

    //     $scope.changegrade = function(indice_grade) {
    //     $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
    //     $rootScope.testScore_grade=parseInt(indice_grade)+3;}; 

    // break;

    // }



    if (elementaryS == "ElementaryElementaryElementary"){
    $rootScope.testScore_grade = 3;           
    $scope.selectedgrade= "3rd";
    $scope.itemsGrades = [{texto:"3rd",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"}];

         $scope.changegrade = function(indice_grade) {
        $rootScope.testScore_grade=parseInt(indice_grade)+3;
        $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
        };  
   
    }

    if (elementaryS == "MiddleMiddleMiddle"){
    $rootScope.testScore_grade = 6;
    $scope.selectedgrade= "6th";
    $scope.itemsGrades = [{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
       
         $scope.changegrade = function(indice_grade) {
        $rootScope.testScore_grade=parseInt(indice_grade)+3;
        $scope.selectedgrade = $scope.itemsGrades[indice_grade-3].texto;  
        };        
              
    }

    // $scope.changegrade = function(indice_grade) {
    //     $rootScope.testScore_grade=parseInt(indice_grade)+3;
    //     $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
    //     }; 

    // $scope.selectedgrade= "3th";
    // $scope.itemsGrades = [{texto:"3th",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
    // $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  $rootScope.testScore_grade=parseInt(indice_grade)+3;};


}]);

app.controller("SelectTestScores" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.SelectTestScores_si= "Select";
  $scope.items_selec_testScore = [{texto:"K-8",indice:"0"},{texto:"9-12",indice:"1"}];
  $scope.change_selec_testScore = function(indice) {

    if (indice==0){

        $rootScope.filtroTSelement = "mostrar";
        $rootScope.filtroTShigh = "borrar";
        $rootScope.filtroTSAllS ="mostrar"
    }

    if (indice==1){

        $rootScope.filtroTSelement = "borrar";
        $rootScope.filtroTShigh = "mostrar";
        $rootScope.filtroTSAllS ="mostrar"
    }

    $scope.SelectTestScores_si = $scope.items_selec_testScore[indice].texto;    

/*
    $rootScope.progSelected = $rootScope.itemsaddMS[indice].texto; 
      $rootScope.ms_admissions=DatosSchool.datos.ms_admission[indice];*/
      //$rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] 
  };


}]);



// CONTROLADORES ADMISSIONS
app.controller("SelectAdmission" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.SelectAdmission_si="Select";
  $scope.itemsAdmission = [{texto:"Elementary",indice:"0"},{texto:"Middle",indice:"1"}];
  $scope.changeadmission = function(indice) {

    if (indice==0){

        $rootScope.filtroMiddleS = "borrar";
        $rootScope.filtroElementaryS = "mostrar";
        $rootScope.filtroAllS ="mostrar"
    }

    if (indice==1){

        $rootScope.filtroElementaryS = "borrar";
        $rootScope.filtroMiddleS = "mostrar";
        $rootScope.filtroAllS ="mostrar"
    }    

 $scope.SelectAdmission_si = $scope.itemsAdmission[indice].texto;
/*
    $rootScope.progSelected = $rootScope.itemsaddMS[indice].texto; 
      $rootScope.ms_admissions=DatosSchool.datos.ms_admission[indice];*/
      //$rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] 
  };


}]);


app.controller("SelectAdmission_mh" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectAdmission_mh_si = "Select"
  $scope.itemsAdmission_mh = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];
  $scope.changeadmission_mh = function(indice) {

    if (indice==0){

        $rootScope.filtroHighS = "borrar";
        $rootScope.filtroMiddleS = "mostrar";
        $rootScope.filtroAllS ="mostrar";
    }

    if (indice==1){

        $rootScope.filtroMiddleS = "borrar";
        $rootScope.filtroHighS = "mostrar";
        $rootScope.filtroAllS ="mostrar";
    }    

    $scope.SelectAdmission_mh_si = $scope.itemsAdmission_mh[indice].texto;
/*
    $rootScope.progSelected = $rootScope.itemsaddMS[indice].texto; 
      $rootScope.ms_admissions=DatosSchool.datos.ms_admission[indice];*/
      //$rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice] 
  };


}]);


app.controller("AdmissionsMSctrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    middle = DatosSchool.datos.ms_admission;

    if ((middle.length != 0) ){

        var cods =[];

    for (var i = 0; i < middle.length; i++) {
    cods.push(DatosSchool.datos.ms_admission[i].program_name);
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
    //$scope.progSelected= $rootScope.itemsaddMS[0].texto;
    $scope.progSelected= "Program";
    }

    //console.log($rootScope.evaluation_ratings.ri_11);

  
  //$scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeprog = function(indice) {
    //$scope.progSelected = $rootScope.itemsaddMS[indice].texto; 
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
    //$scope.progSelected_hs= $rootScope.itemsaddHS[0].texto;
    $scope.progSelected_hs= "Program";
    }

    //console.log($rootScope.evaluation_ratings.ri_11);

  
  //$scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeprog_hs = function(indice_hs) {
    //$scope.progSelected_hs = $rootScope.itemsaddHS[indice_hs].texto; 
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


    $rootScope.selectedyear_sd= "2011";
    $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {
    $rootScope.selectedyear_sd = $scope.itemsYears[indice_year].texto; 
    $rootScope.survey_results=DatosSchool.datos.survey_result[indice_year];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

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
  $rootScope.oneAtATime = false;
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


app.filter("filtraCC", function( DatosSchool ){
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

    console.log(elementaryS);
    console.log(highS);

    switch (text) {

    case 'k-8':
    if (elementaryS == "")
        { return "borrar";
        }
         else if ((elementaryS != "") && (highS != "")) { return "borrar";} 
    break;  

    case '9-12':
    if (highS == "")
        { return "borrar";
        }
        else{return "mostrar";}
    break;  }

    }
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

    switch (text) {

    case "elementary":

    if ((elementaryS == "")){ return "borrar";}
    break;  

    case "high":

    if ( (highS == "") ){ return "borrar";}
    break;       

    case "nd":

    if ( ((highS != "")  || (elementaryS != "")) ){ return "borrar";}
    break;  

    case "selectTestScore":

    if ( ((highS == "")  || (elementaryS == "")) ){ return "borrar";}
    break; 

    case "all":

    if ( (elementaryS != "") && (highS != "") ){ return "borrar";}
    break;   

        }
        
    }
});


app.filter("filtraEvaluation", function( $rootScope, DatosSchool ){

    return function(text) {

    var elementarySE;
    var highSE;

    elementarySE =  DatosSchool.datos.proficiency_rating[0].es_ms_k8_ec_student_progress_pr_score_pr;
     + DatosSchool.datos.proficiency_rating[1].es_ms_k8_ec_student_progress_pr_score_pr;
     + DatosSchool.datos.proficiency_rating[2].es_ms_k8_ec_student_progress_pr_score_pr;
     + DatosSchool.datos.proficiency_rating[3].es_ms_k8_ec_student_progress_pr_score_pr;

//console.log(elementarySE);

    highSE =  DatosSchool.datos.proficiency_rating[0].hs_t_hs_student_progress_pr_pr;
     + DatosSchool.datos.proficiency_rating[1].hs_t_hs_student_progress_pr_pr;
     + DatosSchool.datos.proficiency_rating[2].hs_t_hs_student_progress_pr_pr;
     + DatosSchool.datos.proficiency_rating[3].hs_t_hs_student_progress_pr_pr;

    //$rootScope.evaluation=DatosSchool.datos.evaluations[3];
  // console.log(elementarySE + "///"+ highSE);

    switch (text) {

    case "elementary_eva":

    if ((elementarySE == 0)){ return "borrar";}
    break;  

    case "high_eva":

    if ( (highSE == 0) ){ return "borrar";}
    break;       

    case "nd_eva":

    if ( ((highSE != 0)  || (elementarySE != 0)) ){ return "borrar";}
    break;  

    case "selectEvaluation_eva":

    if ( ((highSE == 0)  || (elementarySE == 0)) ){ return "borrar";}
    break; 

    case "all_eva":

    if ( (elementarySE != 0) && (highSE != 0) ){ return "borrar";}
    break;   

        }
        
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

//console.log(elementary+" "+middle+" "+high);

    switch (text) {

    case "nd":

    if ((elementary != 0) || (middle != 0) || (high != 0)){ return "borrar";}
    break;  

    case "all":

    if ( ((elementary != 0) && (middle != 0)) || ((middle != 0) &&(high != 0)) ){ return "borrar";}
    break;      

    case "ms":

    if ((middle == 0) ){ return "borrar";}
    break;

    case "hs":

    if ((high == 0)){ return "borrar";}
    break;

    case "es":

    if ((elementary == 0) ){ return "borrar";}
    break;

    case "selectShoolEM":

    if ((elementary == 0) || (middle == 0)){ return "borrar";}
    break;

    case "selectShoolMH":

    if ((middle == 0) || (high == 0)){ return "borrar";}
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


app.filter("filtraqr", function(){
    return function(text) {

    switch (text) {

    case "Proficient":
    return "75";
    break;  

    case "Developing":
    return "50";
    break;      

    case "Well Developed":
    return "100";
    break;

    case "Underdevelop":
    return "25";
    break;    

    }}
});

app.filter("filtroDivMil", function(){
    return function(text) {

var num = parseInt(text);
var valval = (1000*num)/100;

return valval;
    }
});

/*
app.filter("filtraND", function(){
    return function(text) {

        if (text == "0.00" || text == "0" || text == ""){ return "No Data";}

    }
}); */

app.filter("redondea", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(1)+"%";
}

    }
});


app.filter("redondea_sp", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return text;
}

    }
});

app.filter("redondea_sp_1", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(1);
}

    }
});

app.filter("redondea_entero", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(0);
}

    }
});



var PopoverDemoCtrl = function ($scope) {
  $scope.dynamicPopover = "Hello, World!";
  $scope.dynamicPopoverTitle = "Title";
};


app.filter("fitrar_srd_11_12", function(){
    return function(text) {

if (text == "2011" || text == "2012"){
    return "borrar";
}

    }
});

app.filter("fitrar_srd_11", function(){
    return function(text) {

if (text == "2011"){
    return "borrar";
}

    }
});

app.filter("EscalaAverageTestScore", function(){
    return function(text) {

        var num = parseFloat(text);

        var val = (num*100)/(4.5);
        console.log(val);
        return val;
    }
});

app.filter("escala10", function(){
    return function(text) {

        var num = parseFloat(text);

        var val = (num*100)/(10);
        console.log(val);
        return val;
    }
});

app.filter("filtraweb", function(){
    return function(text) {

        var str = text.substring(0,7);
        console.log(str);

        if (str != "http://") {

            return "http://"+text;
        }
        else{
            return text;
        }
    }
});


app.filter("admission_e", function(){
    return function(text) {

        if ((text.length == 1) || (text.length == 2)){
            return text+".";    
        }else{
            if (text.substring(text.length-2,text.length-1)=="0"){
            prioridad = text.substring(0,text.length-2);
            return prioridad;                
            }else{
            prioridad = text.substring(0,text.length-1);
            return prioridad;    
            }

            
        }


    }
});


// app.filter("filtraDat2011", function(){
//     return function(text) {

//         if ( text !="00000000000000"){
//             return "borrar";  }
            
//         }

// });

