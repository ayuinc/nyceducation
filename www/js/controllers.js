
var nyc_controllers = angular.module('controllers_nyce', ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","filters_nyce"]);


nyc_controllers.controller("MainController", ['$scope', '$rootScope', '$window', '$location', '$http', 'SchoolRetriever', function($scope, $rootScope, $window, $location, $http, SchoolRetriever) {
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


nyc_controllers.controller("SchoolListController", ['$scope', '$http', '$routeParams', function($scope, $http ,$routeParams) {

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



nyc_controllers.controller('SelectSchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
    $http.get('http://162.243.110.154/api/v1/school/' + $routeParams.schoolId)
        .success(function(data){

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

            $rootScope.survey_var = 0;

            var tipoEscuela = [];

            tipoEscuela.push(DatosSchool.datos.evaluations[0]['es_ms_k8_ecpr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[1]['es_ms_k8_ecpr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[2]['es_ms_k8_ecpr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[3]['es_ms_k8_ecpr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[0]['hs_t_hs_o_pr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[1]['hs_t_hs_o_pr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[2]['hs_t_hs_o_pr_s_type']);
            tipoEscuela.push(DatosSchool.datos.evaluations[3]['hs_t_hs_o_pr_s_type']);

            console.log(GetUniqueElementsArray(tipoEscuela));
            $rootScope.tipoDeEscuela = GetUniqueElementsArray(tipoEscuela);
            
        });;
}]);


nyc_controllers.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {

}]);


nyc_controllers.controller("EnrollmentCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

	var indice = 3
  $rootScope.enrollment=DatosSchool.datos.enrollments[indice];
  $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];

  $rootScope.NAStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(indice); 
  $rootScope.valuesAttendance = DatosSchool.SearchValuesAttendance(indice);
  
  $scope.selectedyearEnrollment= "2014";
  $scope.itemsddEnrollment = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];

  $scope.changeyear = function(indice) {
    $scope.selectedyearEnrollment = $scope.itemsddEnrollment[indice].texto;  
    $rootScope.enrollment=DatosSchool.datos.enrollments[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; 
    
    $rootScope.valuesAttendance = DatosSchool.SearchValuesAttendance(indice);
    $rootScope.NAStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(indice);    
	};


}]);

nyc_controllers.controller("DemographicsCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  var indice = 3
  $rootScope.demographic=DatosSchool.datos.demographics[indice];    
  $scope.selectedyearDemographics= "2014";
  $scope.itemsddDemographics = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $scope.changeyear = function(indice) {
    $scope.selectedyearDemographics = $scope.itemsddDemographics[indice].texto;  
    $rootScope.demographic=DatosSchool.datos.demographics[indice]; 
  };
}]);

nyc_controllers.controller("CollegeCarrerCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
  var indice = 2
  $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
  $rootScope.college_career=DatosSchool.datos.college_careers[indice];
  $rootScope.city_average=DatosSchool.datos.city_averages[indice];

  $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);

  $scope.selectedyearCollegeCarrer= "2013";
  $scope.itemsddCollegeCarrer = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];

  $scope.changeyear = function(indice) {
    $scope.selectedyearCollegeCarrer = $scope.itemsddCollegeCarrer[indice].texto;  
    $rootScope.college_career=DatosSchool.datos.college_careers[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; 
    $rootScope.city_average=DatosSchool.datos.city_averages[indice]; 

    $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);

  };
}]);

nyc_controllers.controller("SelectEvaluations" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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


nyc_controllers.controller("EvaluationsDropdownCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[2];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];
    $rootScope.evaluation=DatosSchool.datos.evaluations[2];



  $scope.selectedyearEvaluations= "2013";
  $scope.itemsddEvaluations = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear = function(indice) {$scope.selectedyearEvaluations = $scope.itemsddEvaluations[indice].texto;     
    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice] };


}]);


nyc_controllers.controller("EvaluationsDropdownCtrl_hs" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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



nyc_controllers.controller("TestScoreCtrlYearHs" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
    
    var indice = 2;
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice];
    $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
  
    var vSat,vRegentsPassRate,vRegentsAverageScore,vRegentsRegentsCollegeReady;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vSat = DatosSchool.SearchValuesSat(i);
    vRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(i);
    vRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(i);
    vRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(i);
      if ( vSat || vRegentsPassRate || vRegentsAverageScore || vRegentsRegentsCollegeReady ){
        availableYears.push(i);
      }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: (2011+availableYears[i]).toString(),    
        indice: availableYears[i],
        index: i
      };
    arrayAvailableYears.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYears = JSON.parse(jsonAvaylableYears);

    // $scope.itemsYearsss = [{texto:"2012",indice:1},{texto:"2013",indice:2}];
    // console.log($scope.itemsYearsss);

    // console.log($scope.itemsYears);

    $rootScope.selectedyear_testScore_year_hs= "2013";
    $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice);
    $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice);
    $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice);
    $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice);

    $scope.changeyear = function(indice_year) {
        $rootScope.selectedyear_testScore_year_hs = $scope.itemsYears[indice_year-(3-($scope.itemsYears.length))].texto;

        $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
        $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice_year];
        $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice_year];
        $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

        $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice_year);
        $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice_year);
        $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice_year);
        $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice_year);

    };
    


}]);

// ELEMENTARY


nyc_controllers.controller("TestScoreCtrlYearEl" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
    
    var indice = 2;
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];   
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
  

    var vElaScores,vMathScores,vAverageProficiencyScoreELA,vAverageProficiencyScoreMath;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vElaScores = DatosSchool.SearchValuesElaScores(i);
    vMathScores = DatosSchool.SearchValuesMathScores(i);
    vAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(i);
    vAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(i);
      if ( vElaScores || vMathScores || vAverageProficiencyScoreELA || vAverageProficiencyScoreMath ){
        availableYears.push(i);
      }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: (2011+availableYears[i]).toString(),    
        indice: availableYears[i],
        index: i
      };
    arrayAvailableYears.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYears = JSON.parse(jsonAvaylableYears);


    $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);
    $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);
    $rootScope.valuesAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(indice);
    $rootScope.valuesAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(indice);

    $rootScope.selectedyear_testScore_year_el= "2013";
    // $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];


    $scope.changeyear = function(indice_year) {

        // $rootScope.selectedyear_testScore_year_el = $scope.itemsYears[indice_year].texto;
        $rootScope.selectedyear_testScore_year_el = $scope.itemsYears[indice_year-(3-($scope.itemsYears.length))].texto;

        $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year]; 
        $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year]; 
        $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
        $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

        $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice_year);
        $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice_year);
        $rootScope.valuesAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(indice_year);
        $rootScope.valuesAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(indice_year);

    };
    


}]);

nyc_controllers.controller("SelectTestScores" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectTestScores_si= "Select";
  $scope.items_selec_testScore = [{texto:"K-8",indice:"0"},{texto:"9-12",indice:"1"}];
  $scope.change_selec_testScore = function(indice) {

    if (indice==0){

        $rootScope.filtroTSelement = "mostrar";
        $rootScope.filtroTShigh = "borrar";
        $rootScope.filtroTSAllS ="mostrar";

    var indice = 2;
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];   
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.selectedyear_testScore_year_el= "2013";

    }

    if (indice==1){

        $rootScope.filtroTSelement = "borrar";
        $rootScope.filtroTShigh = "mostrar";
        $rootScope.filtroTSAllS ="mostrar";

    var indice = 2;
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice];
    $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];

    $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice);
    $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice);
    $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice);
    $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice);

    $rootScope.selectedyear_testScore_year_hs= "2013";


    }

    $scope.SelectTestScores_si = $scope.items_selec_testScore[indice].texto;    

  };


}]);

nyc_controllers.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    var tipoEscuela = $rootScope.tipoDeEscuela;        
    // console.log(tipoEscuela.indexOf("High School"));
    if ((tipoEscuela.indexOf("Elementary") != -1) || (tipoEscuela.indexOf("K-2") != -1) ){
      $rootScope.testScore_grade = 3;           
      $scope.selectedgrade= "3rd";
      $scope.itemsGrades = [{texto:"3rd",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"}];

      $scope.changegrade = function(indice_grade) {
        $rootScope.testScore_grade=parseInt(indice_grade)+3;
        $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
      };       
    }else if ((tipoEscuela.indexOf("Middle") != -1)) {
      $rootScope.testScore_grade = 6;
      $scope.selectedgrade= "6th";
      $scope.itemsGrades = [{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
     
      $scope.changegrade = function(indice_grade) {
        $rootScope.testScore_grade=parseInt(indice_grade)+3;
        $scope.selectedgrade = $scope.itemsGrades[indice_grade-3].texto;  
      };           

    }else if ((tipoEscuela.indexOf("K-3") != -1)) {
      // console.log("es kkkkkk3");
      $rootScope.testScore_grade = 3;
      $scope.selectedgrade= "3rd";
      $scope.itemsGrades = [{texto:"3rd",indice:"3"}];      

    }else if ((tipoEscuela.indexOf("K-8") != -1)) {
      // console.log("es kkkkkk8");
      $rootScope.testScore_grade = 3;
      $scope.selectedgrade= "3rd";
      $scope.itemsGrades = [{texto:"3rd",indice:"0"},{texto:"4th",indice:"1"},{texto:"5th",indice:"2"},{texto:"6th",indice:"3"},{texto:"7th",indice:"4"},{texto:"8th",indice:"5"}];
     
      $scope.changegrade = function(indice_grade) {
        $rootScope.testScore_grade=parseInt(indice_grade)+3;
        $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
      };           

    };

}]);




// CONTROLADORES ADMISSIONS
nyc_controllers.controller("SelectAdmission" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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

  };


}]);


nyc_controllers.controller("SelectAdmission_mh" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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

  };


}]);


nyc_controllers.controller("AdmissionsMSctrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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
   

    $scope.progSelected= "Program";
    }

  $scope.changeprog = function(indice) {
      $rootScope.ms_admissions=DatosSchool.datos.ms_admission[indice];
  };


}]);

nyc_controllers.controller("AdmissionsHSctrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

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
   

    $scope.progSelected_hs= "Program";
    }


  $scope.changeprog_hs = function(indice_hs) {
      $rootScope.hs_admissions=DatosSchool.datos.hs_admission[indice_hs];
  };


}]);


// CONTROLADORES SURVEY SCHOOL


nyc_controllers.controller("SurveyYearCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    


    $rootScope.survey_results=DatosSchool.datos.survey_result[2];
    $rootScope.city_average=DatosSchool.datos.city_averages[2];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];


    $rootScope.selectedyear_sd= "2013";
    $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {
    $rootScope.selectedyear_sd = $scope.itemsYears[indice_year].texto; 
    $rootScope.survey_results=DatosSchool.datos.survey_result[indice_year];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

    };
    


}]);

nyc_controllers.controller("SurveyRespCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    $scope.selectedgrade= "Parents";
    $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"},{texto:"Students",indice:"2"}];
    $scope.changegrade = function(indice_grade) {$scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
        $rootScope.survey_var=parseInt(indice_grade);};


}]);