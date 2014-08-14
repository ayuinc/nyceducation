
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
        // $scope.schools = data;
    });

    $scope.getSchools = function() {
        return $scope.schools;
    }

    $scope.updateSchools = function(typed) {
        $scope.newSchools = SchoolRetriever.getSchools(typed);
        $scope.newSchools.then(function(data) {
            $scope.schools = data.profiles;
            // $scope.schools = data;
            // console.log(data);
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
            var arrayts = GetUniqueElementsArray(tipoEscuela);
            

            if (((arrayts.indexOf("Elementary") != -1) || (arrayts.indexOf("Middle") != -1) || (arrayts.indexOf("K-8") != -1)|| (arrayts.indexOf("K-3") != -1)|| (arrayts.indexOf("K-2") != -1)) && (arrayts.length == 1) ){
              $rootScope.filtroCCmenu = true;
              $rootScope.classGT = "switch1";
            }else if ( (arrayts.indexOf("K-3") !== -1) && (arrayts.indexOf("Elementary") !== -1) ){
              $rootScope.filtroCCmenu = true;
              $rootScope.classGT = "switch1";
            }else if (arrayts.length == 0) {
              $rootScope.filtroCCmenu = true;
              $rootScope.classGT = "switch1";
            }else{
              $rootScope.filtroCCmenu = false;
              $rootScope.classGT = "switch2";
            };

        });
    }]);


nyc_controllers.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {

}]);


nyc_controllers.controller("EnrollmentCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

	var indice = 3
  $rootScope.enrollment=DatosSchool.datos.enrollments[indice];
  $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
  $rootScope.city_average=DatosSchool.datos.city_averages[indice];

    var vStudentsEnrolledGrade,vAttendance;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 4; i++) { 
    vStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(i);
    vAttendance = DatosSchool.SearchValuesAttendance(i);
      if ( vStudentsEnrolledGrade || vAttendance ){
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
    $scope.itemsYearEnrollment = JSON.parse(jsonAvaylableYears);

  $rootScope.NAStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(indice); 
  // $rootScope.valuesAttendance = DatosSchool.SearchValuesAttendance(indice);
  var dataAttendanceAvailable = DatosSchool.SearchValuesAttendance(indice);

  if (!(dataAttendanceAvailable)) {
    $rootScope.valuesAttendanceND = true;    
  }else{
    $rootScope.valuesAttendanceND = false;    
  };
  
  $scope.selectedyearEnrollment= "2014";

  $scope.changeyear = function(indice) {

    var ind;
    $.each($scope.itemsYearEnrollment, function(i, v) {
      if (v.indice == indice) {
        ind = i;
      };
    });

    $scope.selectedyearEnrollment = $scope.itemsYearEnrollment[ind].texto;  
    $rootScope.enrollment=DatosSchool.datos.enrollments[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; 
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    
    // $rootScope.valuesAttendance = DatosSchool.SearchValuesAttendance(indice);
    $rootScope.NAStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(indice);    
    var dataAttendanceAvailable = DatosSchool.SearchValuesAttendance(indice);
  
    if (!(dataAttendanceAvailable)) {
      $rootScope.valuesAttendanceND = true;    
    }else{
      $rootScope.valuesAttendanceND = false;    
    };

	};


}]);

nyc_controllers.controller("DemographicsCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  var indice = 3;
  $rootScope.demographic=DatosSchool.datos.demographics[indice];    

    var vGender,vEthnicity,vStatus;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 4; i++) { 
      vGender = DatosSchool.SearchValuesGender(i);
      vEthnicity = DatosSchool.SearchValuesEthnicity(i);
      vStatus = DatosSchool.SearchValuesStatus(i);
      if ( vGender || vEthnicity || vStatus ){
        availableYears.push(i);
      };
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
    $scope.itemsYearsDemographic = JSON.parse(jsonAvaylableYears);

  $rootScope.selectedyearDemographics= "2014";
  // $scope.itemsddDemographics = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"},{texto:"2014",indice:"3"}];
  $rootScope.valuesGender = DatosSchool.SearchValuesGender(indice);
  $rootScope.valuesEthnicity = DatosSchool.SearchValuesEthnicity(indice);
  $rootScope.valuesStatus = DatosSchool.SearchValuesStatus(indice);
  $scope.changeyear = function(indice) {

    var ind;
    $.each($scope.itemsYearsDemographic, function(i, v) {
      if (v.indice == indice) {
        ind = i;
      };
    });  

    $rootScope.selectedyearDemographics = $scope.itemsYearsDemographic[ind].texto;

    $rootScope.demographic=DatosSchool.datos.demographics[indice]; 
    
    $rootScope.valuesGender = DatosSchool.SearchValuesGender(indice);
    $rootScope.valuesEthnicity = DatosSchool.SearchValuesEthnicity(indice);
    $rootScope.valuesStatus = DatosSchool.SearchValuesStatus(indice);

  };
}]);

nyc_controllers.controller("CollegeCarrerCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
  var indice = 2;
  $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
  $rootScope.college_career=DatosSchool.datos.college_careers[indice];
  $rootScope.city_average=DatosSchool.datos.city_averages[indice];

    var tipoEscuela = $rootScope.tipoDeEscuela; 

    if ((tipoEscuela.indexOf("Elementary") != -1) && (tipoEscuela.length == 1) ){
      $('#CC_K_8').removeClass('borrar');
      $('#CC_K_8').addClass('mostrar');
    }else if ((tipoEscuela.indexOf("Middle") != -1) && (tipoEscuela.length == 1) ){
      $('#CC_K_8').removeClass('borrar');
      $('#CC_K_8').addClass('mostrar');
    }else if (((tipoEscuela.indexOf("High School Transfer") != -1) || (tipoEscuela.indexOf("High School") != -1)) && (tipoEscuela.length == 1) ){
      $('#CC_9_12').removeClass('borrar');
      $('#CC_9_12').addClass('mostrar');
    }else if ((tipoEscuela.indexOf("High School") != -1) && (tipoEscuela.indexOf("Middle") !== -1)){
      $('#CC_9_12').removeClass('borrar');
      $('#CC_9_12').addClass('mostrar');
   }else if ((tipoEscuela.indexOf("High School") != -1) && (tipoEscuela.indexOf("K-8") !== -1)){
      $('#CC_9_12').removeClass('borrar');
      $('#CC_9_12').addClass('mostrar');
   };

    var vGraduation,vCollegeCareerReadiness;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vGraduation = DatosSchool.SearchValuesGraduation(i);
    vCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(i);
      if ( vGraduation || vCollegeCareerReadiness ){
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
    $scope.itemsYearsCollegeCarrer = JSON.parse(jsonAvaylableYears);

   
  $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);
  $rootScope.valuesCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(indice);
  

  $scope.selectedyearCollegeCarrer= "2013";
  // $scope.itemsddCollegeCarrer = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];

  $scope.changeyear = function(indice) {

    var ind;
    $.each($scope.itemsYearsCollegeCarrer, function(i, v) {
      if (v.indice == indice) {
        ind = i;
      };
    });  

    $scope.selectedyearCollegeCarrer = $scope.itemsYearsCollegeCarrer[ind].texto;  

    $rootScope.college_career=DatosSchool.datos.college_careers[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice]; 
    $rootScope.city_average=DatosSchool.datos.city_averages[indice]; 

    $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);
    $rootScope.valuesCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(indice);

  };
}]);

nyc_controllers.controller("SelectEvaluations" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectEvaluations_is = "Select";
  $scope.itemsEvaluations = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];
  $scope.changeEvaluations = function(indice) {

  $scope.SelectEvaluations_is = $scope.itemsEvaluations[indice].texto;
  if (indice==0){

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[2]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];
    $rootScope.evaluation=DatosSchool.datos.evaluations[2];
    $rootScope.valuesProgressReportElem = DatosSchool.SearchValuesProgressReportElem(2);
    $rootScope.valuesQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(2);

      if (DatosSchool.SearchValuesQualityReviewElem(2)) {
        $rootScope.valuesQualityReviewElemND = false;
        $rootScope.valuesQualityReviewElem = true;
      }else{
        $rootScope.valuesQualityReviewElemND = true;
        $rootScope.valuesQualityReviewElem = false;
      };

    $rootScope.selectedyearEvaluationsElem= "2013"; 

      $('#elementary_eva').removeClass('borrar');
      $('#elementary_eva').addClass('mostrar');
      $('#all_eva').removeClass('borrar');
      $('#all_eva').addClass('mostrar');

      $('#high_eva').removeClass('mostrar');
      $('#high_eva').addClass('borrar');    

  }else if (indice==1){

      $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[2]; 
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[2];
      $rootScope.evaluation=DatosSchool.datos.evaluations[2];
      $rootScope.valuesProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(2);
      $rootScope.valuesQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(2);

      if (DatosSchool.SearchValuesQualityReviewHigh(2)) {
        $rootScope.valuesQualityReviewHighND = false;
        $rootScope.valuesQualityReviewHigh = true;
      }else{
        $rootScope.valuesQualityReviewHighND = true;
        $rootScope.valuesQualityReviewHigh = false;
      };  

      $rootScope.selectedyearEvaluationsHigh= "2013"; 

      $('#high_eva').removeClass('borrar');
      $('#high_eva').addClass('mostrar');
      $('#all_eva').removeClass('borrar');
      $('#all_eva').addClass('mostrar');

      $('#elementary_eva').removeClass('mostrar');
      $('#elementary_eva').addClass('borrar');
    }

  };


}]);


nyc_controllers.controller("EvaluationsCtrlYearElem" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {


    var vProgressReportElem_calc;
    var availableYears_calc = [];
    for (i = 0; i < 3; i++) {
    vProgressReportElem_calc = DatosSchool.SearchValuesProgressReportElem(i);
      if ( vProgressReportElem_calc ){
        availableYears_calc.push(i);
      }
    };

    $rootScope.arrayAvailableYearsEvaluationsEs = availableYears_calc;
  
    var vProgressReportElem,vQualityReviewElem;
    var availableYears = [];
    var arrayAvailableYearsEs = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) {
    vProgressReportElem = DatosSchool.SearchValuesProgressReportElem(i);
    vQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(i);
      if ( vProgressReportElem || vQualityReviewElem ){
        availableYears.push(i);
      }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: (2011+availableYears[i]).toString(),    
        indice: availableYears[i],
        index: i
      };
    arrayAvailableYearsEs.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYearsEs);
    $scope.itemsYearsEvaluationsElem = JSON.parse(jsonAvaylableYears);


    if ($rootScope.arrayAvailableYearsEvaluationsEs.length > 0) {
      var indice = $scope.itemsYearsEvaluationsElem[arrayAvailableYearsEs.length-1].indice;
      $rootScope.selectedyearEvaluationsElem= $scope.itemsYearsEvaluationsElem[arrayAvailableYearsEs.length-1].texto;

      $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      $rootScope.evaluation=DatosSchool.datos.evaluations[indice];
      // Validación de pestañas de acordion
      $rootScope.valuesProgressReportElem = DatosSchool.SearchValuesProgressReportElem(indice);

      if (DatosSchool.SearchValuesQualityReviewElem(indice)) {
        $rootScope.valuesQualityReviewElemND = false;
        $rootScope.valuesQualityReviewElem = true;
      }else{
        $rootScope.valuesQualityReviewElemND = true;
        $rootScope.valuesQualityReviewElem = false;
      };

    // $rootScope.valuesQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(indice);
    };


  $scope.changeyear = function(indice) {

    var ind;
    $.each($scope.itemsYearsEvaluationsElem, function(i, v) {
      if (v.indice == indice) {
        ind = i;
      };
    }); 

    $rootScope.selectedyearEvaluationsElem = $scope.itemsYearsEvaluationsElem[ind].texto;

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice] 

    $rootScope.valuesProgressReportElem = DatosSchool.SearchValuesProgressReportElem(indice);
    // $rootScope.valuesQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(indice);

      if (DatosSchool.SearchValuesQualityReviewElem(indice)) {
        $rootScope.valuesQualityReviewElemND = false;
        $rootScope.valuesQualityReviewElem = true;
      }else{
        $rootScope.valuesQualityReviewElemND = true;
        $rootScope.valuesQualityReviewElem = false;
      };


    };


}]);


nyc_controllers.controller("EvaluationsCtrlYearHigh" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {



    var vProgressReportHigh_calc;
    var availableYears_calc = [];
    for (i = 0; i < 3; i++) { 
    vProgressReportHigh_calc = DatosSchool.SearchValuesProgressReportHigh(i);
      if ( vProgressReportHigh_calc ){
        availableYears_calc.push(i);
      }
    };
    $rootScope.arrayAvailableYearsEvaluationsHs = availableYears_calc;


    var vQualityReview_calc;
    var availableYearsQR_calc = [];
    for (i = 0; i < 3; i++) { 
    vQualityReview_calc = DatosSchool.SearchValuesQualityReviewHigh(i);
      if ( vQualityReview_calc ){
        availableYearsQR_calc.push(i);
      }
    };
    $rootScope.arrayAvailableYearsQualityReview = availableYearsQR_calc;


    var vProgressReportHigh,vQualityReviewHigh;
    var availableYears = [];
    var arrayAvailableYearsHs = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(i);
    vQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(i);
      if ( vProgressReportHigh || vQualityReviewHigh ){
        availableYears.push(i);
      }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: (2011+availableYears[i]).toString(),    
        indice: availableYears[i],
        index: i
      };
    arrayAvailableYearsHs.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYearsHs);
    $scope.itemsYearsEvaluationsHigh = JSON.parse(jsonAvaylableYears);


     if(($rootScope.arrayAvailableYearsEvaluationsEs.length > 0) && ($rootScope.arrayAvailableYearsEvaluationsHs.length == 0)){
      $('#elementary_eva').removeClass('borrar');
      $('#elementary_eva').addClass('mostrar');
      $('#all_eva').removeClass('borrar');
      $('#all_eva').addClass('mostrar');
     }else if (($rootScope.arrayAvailableYearsEvaluationsEs.length == 0) && ($rootScope.arrayAvailableYearsEvaluationsHs.length > 0)){
      $('#high_eva').removeClass('borrar');
      $('#high_eva').addClass('mostrar');
      $('#all_eva').removeClass('borrar');
      $('#all_eva').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsEvaluationsEs.length > 0) && ($rootScope.arrayAvailableYearsEvaluationsHs.length > 0)) {
      $('#selectEvaluation_eva').removeClass('borrar');
      $('#selectEvaluation_eva').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsQualityReview.length > 0) && (($rootScope.arrayAvailableYearsEvaluationsEs.length == 0) && ($rootScope.arrayAvailableYearsEvaluationsHs.length == 0)) ) {
      $('#high_eva').removeClass('borrar');
      $('#high_eva').addClass('mostrar');
      $('#all_eva').removeClass('borrar');
      $('#all_eva').addClass('mostrar');
    }else{
      $('#nd_eva').removeClass('borrar');
      $('#nd_eva').addClass('mostrar');
    };


    if ((($rootScope.arrayAvailableYearsEvaluationsHs.length > 0) || ($rootScope.arrayAvailableYearsQualityReview.length > 0)) && ($rootScope.arrayAvailableYearsEvaluationsEs.length == 0)) {
      var indice = $scope.itemsYearsEvaluationsHigh[arrayAvailableYearsHs.length-1].indice;
      $rootScope.selectedyearEvaluationsHigh= $scope.itemsYearsEvaluationsHigh[arrayAvailableYearsHs.length-1].texto;

      $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      $rootScope.evaluation=DatosSchool.datos.evaluations[indice];
      // validación de secciones acordion
      $rootScope.valuesProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(indice);
      console.log(DatosSchool.SearchValuesQualityReviewHigh);
      $rootScope.valuesQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(indice);


    };

    console.log("indice: "+indice);

    if ($rootScope.arrayAvailableYearsEvaluationsHs.length > 0) {
      var indice = $scope.itemsYearsEvaluationsHigh[arrayAvailableYearsHs.length-1].indice;
      if (DatosSchool.SearchValuesQualityReviewHigh(indice)) {
        $rootScope.valuesQualityReviewHighND = false;
        $rootScope.valuesQualityReviewHigh = true;
      }else{
        $rootScope.valuesQualityReviewHighND = true;
        $rootScope.valuesQualityReviewHigh = false;
      };  
    };


  // $scope.itemsddEvaluations_hs = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];
  $scope.changeyear_hs = function(indice) {

    var ind;
    $.each($scope.itemsYearsEvaluationsHigh, function(i, v) {
      if (v.indice == indice) {
        ind = i;
      };
    }); 

    $rootScope.selectedyearEvaluationsHigh = $scope.itemsYearsEvaluationsHigh[ind].texto;

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice]; 
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice];

    $rootScope.valuesProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(indice);
    // $rootScope.valuesQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(indice);

      if (DatosSchool.SearchValuesQualityReviewHigh(indice)) {
        $rootScope.valuesQualityReviewHighND = false;
        $rootScope.valuesQualityReviewHigh = true;
      }else{
        $rootScope.valuesQualityReviewHighND = true;
        $rootScope.valuesQualityReviewHigh = false;
      };    

    };


}]);


nyc_controllers.controller("TestScoreCtrlYearHs" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
    
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
    $rootScope.arrayAvailableYearsTestScoreHs = arrayAvailableYears;
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYears = JSON.parse(jsonAvaylableYears);

     var tipoEscuela = $rootScope.tipoDeEscuela; 

    if(($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && ($rootScope.arrayAvailableYearsTestScoreHs.length == 0)){
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-elementary').removeClass('borrar');
      $('#testScore-elementary').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsTestScoreEs.length == 0) && ($rootScope.arrayAvailableYearsTestScoreHs.length > 0)){
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-high').removeClass('borrar');
      $('#testScore-high').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && ($rootScope.arrayAvailableYearsTestScoreHs.length > 0)) {
      $('#selectTestScore').removeClass('borrar');
      $('#selectTestScore').addClass('mostrar');
    }else{
      $('#testScore-nd').removeClass('borrar');
      $('#testScore-nd').addClass('mostrar');
    };
    

    // var indice = 2;
    if ($rootScope.arrayAvailableYearsTestScoreHs.length > 0) {
      var indice = $scope.itemsYears[arrayAvailableYears.length-1].indice;
      $rootScope.selectedyear_testScore_year_hs= $scope.itemsYears[arrayAvailableYears.length-1].texto;

      $rootScope.city_average=DatosSchool.datos.city_averages[indice];
      $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice];
      $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      //Validación pestañas acordion
      $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice);
      // $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice);
      if (DatosSchool.SearchValuesRegentsPassRate(indice)) {
        $rootScope.valuesRegentsPassRate = true;
        $rootScope.valuesRegentsPassRateND = false;
      }else{
        $rootScope.valuesRegentsPassRateND = true;
        $rootScope.valuesRegentsPassRate = false;
      };

      // $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice);
      if (DatosSchool.SearchValuesRegentsAverageScore(indice)) {
        $rootScope.valuesRegentsAverageScore = true;
        $rootScope.valuesRegentsAverageScoreND = false;
      }else{
        $rootScope.valuesRegentsAverageScoreND = true;
        $rootScope.valuesRegentsAverageScore = false;
      };

      // $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice);
      if (DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice)) {
        $rootScope.valuesRegentsRegentsCollegeReady = true;
        $rootScope.valuesRegentsRegentsCollegeReadyND = false;
      }else{
        $rootScope.valuesRegentsRegentsCollegeReadyND = true;
        $rootScope.valuesRegentsRegentsCollegeReady = false;
      };      
    };


    $scope.changeyear = function(indice_year) {

    var ind;
    $.each($scope.itemsYears, function(i, v) {
      if (v.indice == indice_year) {
        ind = i;
      };
    });       

      $rootScope.selectedyear_testScore_year_hs = $scope.itemsYears[ind].texto;

      $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
      $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice_year];
      $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice_year];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

      $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice_year);
      // $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice_year);
      if (DatosSchool.SearchValuesRegentsPassRate(indice_year)) {
        $rootScope.valuesRegentsPassRate = true;
        $rootScope.valuesRegentsPassRateND = false;
      }else{
        $rootScope.valuesRegentsPassRateND = true;
        $rootScope.valuesRegentsPassRate = false;
      };      
      // $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice_year);
      if (DatosSchool.SearchValuesRegentsAverageScore(indice_year)) {
        $rootScope.valuesRegentsAverageScore = true;
        $rootScope.valuesRegentsAverageScoreND = false;
      }else{
        $rootScope.valuesRegentsAverageScoreND = true;
        $rootScope.valuesRegentsAverageScore = false;
      };      
      // $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice_year);
      if (DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice_year)) {
        $rootScope.valuesRegentsRegentsCollegeReady = true;
        $rootScope.valuesRegentsRegentsCollegeReadyND = false;
      }else{
        $rootScope.valuesRegentsRegentsCollegeReadyND = true;
        $rootScope.valuesRegentsRegentsCollegeReady = false;
      };          

    };
}]);

// ELEMENTARY

nyc_controllers.controller("TestScoreCtrlYearEl" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
  
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

    $rootScope.arrayAvailableYearsTestScoreEs = arrayAvailableYears;
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $rootScope.itemsYearsTestScoreEl = JSON.parse(jsonAvaylableYears);

    
    // var indice = 2;
    if ($rootScope.arrayAvailableYearsTestScoreEs.length > 0) {
      var indice = $rootScope.itemsYearsTestScoreEl[arrayAvailableYears.length-1].indice;
      $rootScope.selectedyear_testScore_year_el= $rootScope.itemsYearsTestScoreEl[arrayAvailableYears.length-1].texto;

      $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];   
      $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
      $rootScope.city_average=DatosSchool.datos.city_averages[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      //Validación de pestañas de acordión
      $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);
      $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);


      if ((DatosSchool.SearchValuesAverageProficiencyScoreELA(indice)) && (DatosSchool.SearchValuesAverageProficiencyScoreMath(indice))) {
        $rootScope.valuesAverageProficiencyScore = true;        
      }else{
        $rootScope.valuesAverageProficiencyScore = false;        
      };

    };

    // $rootScope.selectedyear_testScore_year_el= "2013";
    // $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2013",indice:2}];


    $scope.changeyear = function(indice_year) {

    var ind;
    $.each($rootScope.itemsYearsTestScoreEl, function(i, v) {
      if (v.indice == indice_year) {
        ind = i;
      };
    });

        $rootScope.selectedyear_testScore_year_el = $rootScope.itemsYearsTestScoreEl[ind].texto;

        $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year]; 
        $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year]; 
        $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
        $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

        $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice_year);
        $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice_year);

        if ((DatosSchool.SearchValuesAverageProficiencyScoreELA(indice_year)) && (DatosSchool.SearchValuesAverageProficiencyScoreMath(indice_year))) {
          $rootScope.valuesAverageProficiencyScore = true;        
        }else{
          $rootScope.valuesAverageProficiencyScore = false;        
        };

    };
    

}]);

nyc_controllers.controller("SelectTestScores" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectTestScores_si= "Select";
  $scope.items_selec_testScore = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];
  $scope.change_selec_testScore = function(indice) {

  if (indice==0){

    var indice = 2;
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];   
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];    

    $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);
    $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);
    $rootScope.valuesAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(indice);
    $rootScope.valuesAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(indice);
    $rootScope.selectedyear_testScore_year_el= "2013";

      $('#testScore-elementary').removeClass('borrar');
      $('#testScore-elementary').addClass('mostrar');
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-high').removeClass('mostrar');
      $('#testScore-high').addClass('borrar');    

  }else if (indice==1){

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

      $('#testScore-high').removeClass('borrar');
      $('#testScore-high').addClass('mostrar');
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-elementary').removeClass('mostrar');
      $('#testScore-elementary').addClass('borrar');
  }

    $scope.SelectTestScores_si = $scope.items_selec_testScore[indice].texto;    

  };


}]);

nyc_controllers.controller("TestScoreGradeddCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    var tipoEscuela = $rootScope.tipoDeEscuela;        
    // console.log(tipoEscuela.indexOf("High School"));


    var vGrade3rdEla,vGrade4thEla,vGrade5thEla,vGrade6thEla,vGrade7thEla,vGrade8thEla;
    var availableGrades3rd = [];
    var availableGrades4th = [];
    var availableGrades5th = [];
    var availableGrades6th = [];
    var availableGrades7th = [];
    var availableGrades8th = [];

    var arrayAvailableGrades = [];
    var arrayAvailableAllGrades = [];
    var jsonArrayAvailableAllGrades = "";

    for (i = 0; i < 3; i++) { 
    vGrade3rdEla = DatosSchool.SearchTestScoreGrade3rdEla(i);
      if ( vGrade3rdEla ){
        availableGrades3rd.push(i);
      }
    };
    for (i = 0; i < 3; i++) { 
    vGrade4thEla = DatosSchool.SearchTestScoreGrade4thEla(i);
      if ( vGrade4thEla ){
        availableGrades4th.push(i);
      }
    };
    for (i = 0; i < 3; i++) { 
    vGrade5thEla = DatosSchool.SearchTestScoreGrade5thEla(i);
      if ( vGrade5thEla ){
        availableGrades5th.push(i);
      }
    };
    for (i = 0; i < 3; i++) { 
    vGrade6thEla = DatosSchool.SearchTestScoreGrade6thEla(i);
      if ( vGrade6thEla ){
        availableGrades6th.push(i);
      }
    };
    for (i = 0; i < 3; i++) { 
    vGrade7thEla = DatosSchool.SearchTestScoreGrade7thEla(i);
      if ( vGrade7thEla ){
        availableGrades7th.push(i);
      }
    };
    for (i = 0; i < 3; i++) { 
    vGrade8thEla = DatosSchool.SearchTestScoreGrade8thEla(i);
      if ( vGrade8thEla ){
        availableGrades8th.push(i);
      }
    };

    if (availableGrades3rd.length > 0) {
      arrayAvailableGrades.push('3rd');
    };
    if (availableGrades4th.length > 0) {
      arrayAvailableGrades.push('4th');
    };
    if (availableGrades5th.length > 0) {
      arrayAvailableGrades.push('5th');
    };
    if (availableGrades6th.length > 0) {
      arrayAvailableGrades.push('6th');
    };
    if (availableGrades7th.length > 0) {
      arrayAvailableGrades.push('7th');
    };
    if (availableGrades8th.length > 0) {
      arrayAvailableGrades.push('8th');
    };


    for (i = 0; i < arrayAvailableGrades.length; i++) {
      var item = {
        texto: arrayAvailableGrades[i],    
        filtroGrade: arrayAvailableGrades[i].substring(0,1) ,
        indice: i
      };
    arrayAvailableAllGrades.push(item);
    };


    jsonArrayAvailableAllGrades = JSON.stringify(arrayAvailableAllGrades);
    $rootScope.itemsGrades = JSON.parse(jsonArrayAvailableAllGrades);

      console.log(arrayAvailableAllGrades);
    if (($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && (arrayAvailableAllGrades.length > 0)) {
        $rootScope.testScore_grade = $rootScope.itemsGrades[0].filtroGrade;
        $scope.selectedgrade = $rootScope.itemsGrades[0].texto;
        $rootScope.GradesAvailable = true;
    };

   
    $scope.changegrade = function(indice_grade) {

    var filterGrade;
    $.each($rootScope.itemsGrades, function(i, v) {
      if (v.indice == indice_grade) {
        filterGrade = v.filtroGrade;
      };
    });


      $rootScope.testScore_grade=parseInt(filterGrade);
      // $rootScope.testScore_grade=parseInt(indice_grade)+3;
      $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
    };           


}]);




// CONTROLADORES ADMISSIONS
nyc_controllers.controller("SelectAdmission" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  elementary = DatosSchool.datos.es_admission.length;
  middle = DatosSchool.datos.ms_admission.length;
  high = DatosSchool.datos.hs_admission.length;

  if (((elementary !== 0) && (middle !== 0)) && (high == 0)) {
    $('#selectShoolEM').removeClass('borrar');
    $('#selectShoolEM').addClass('mostrar');
  }else if (((high !== 0) && (middle !== 0)) && (elementary == 0)) {
    $('#selectShoolMH').removeClass('borrar');
    $('#selectShoolMH').addClass('mostrar');
  }else if ((high !== 0) && (middle !== 0) && (elementary !== 0)) {
    $('#selectShoolEMH').removeClass('borrar');
    $('#selectShoolEMH').addClass('mostrar');
    // console.log("here");
  }else if (((elementary == 0) && (middle == 0)) && (high !== 0)) {
    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsHigh').removeClass('borrar');
    $('#admissionsHigh').addClass('mostrar');  
  }else if (((high == 0) && (middle == 0)) && (elementary !== 0)) {
    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsElementary').removeClass('borrar');
    $('#admissionsElementary').addClass('mostrar');    
  }else if (((high == 0) && (elementary == 0)) && (middle !== 0)) {
    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsMiddle').removeClass('borrar');
    $('#admissionsMiddle').addClass('mostrar');    
  }else{
    $('#admissionsNd').removeClass('borrar');
    $('#admissionsNd').addClass('mostrar');
  };


  $scope.SelectAdmission_si="Select";
  $scope.itemsAdmission = [{texto:"Elementary",indice:"0"},{texto:"Middle",indice:"1"}];
  $scope.changeadmission = function(indice) {

    if (indice==0){

    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsElementary').removeClass('borrar');
    $('#admissionsElementary').addClass('mostrar'); 

    $('#admissionsMiddle').removeClass('mostrar');
    $('#admissionsMiddle').addClass('borrar'); 
    }

    if (indice==1){
    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsMiddle').removeClass('borrar');
    $('#admissionsMiddle').addClass('mostrar');   

    $('#admissionsElementary').removeClass('mostrar');
    $('#admissionsElementary').addClass('borrar'); 
    }    

 $scope.SelectAdmission_si = $scope.itemsAdmission[indice].texto;

  };


}]);


nyc_controllers.controller("SelectAdmission_mh" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectAdmission_mh_si = "Select"
  $scope.itemsAdmission_mh = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];
  $scope.changeadmission_mh = function(indice) {

    if (indice==0){

    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsMiddle').removeClass('borrar');
    $('#admissionsMiddle').addClass('mostrar');   

    $('#admissionsHigh').removeClass('mostrar');
    $('#admissionsHigh').addClass('borrar'); 
    }

    if (indice==1){

    $('#admissionsAll').removeClass('borrar');
    $('#admissionsAll').addClass('mostrar');
    $('#admissionsHigh').removeClass('borrar');
    $('#admissionsHigh').addClass('mostrar');  

    $('#admissionsMiddle').removeClass('mostrar');
    $('#admissionsMiddle').addClass('borrar');      
    }    

    $scope.SelectAdmission_mh_si = $scope.itemsAdmission_mh[indice].texto;

  };


}]);


nyc_controllers.controller("SelectAdmission_emh" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectAdmission_emh_si = "Select"
  $scope.itemsAdmission_emh = [{texto:"Elementary",indice:"0"},{texto:"Middle",indice:"1"},{texto:"High",indice:"2"}];
  $scope.changeadmission_emh = function(indice) {

    if (indice==0){

      $('#admissionsAll').removeClass('borrar');
      $('#admissionsAll').addClass('mostrar');
      $('#admissionsElementary').removeClass('borrar');
      $('#admissionsElementary').addClass('mostrar'); 

      $('#admissionsMiddle').removeClass('mostrar');
      $('#admissionsMiddle').addClass('borrar'); 
      $('#admissionsHigh').removeClass('mostrar');
      $('#admissionsHigh').addClass('borrar'); 
    }
    if (indice==1){

      $('#admissionsAll').removeClass('borrar');
      $('#admissionsAll').addClass('mostrar');
      $('#admissionsMiddle').removeClass('borrar');
      $('#admissionsMiddle').addClass('mostrar'); 

      $('#admissionsElementary').removeClass('mostrar');
      $('#admissionsElementary').addClass('borrar'); 
      $('#admissionsHigh').removeClass('mostrar');
      $('#admissionsHigh').addClass('borrar'); 
    }
    if (indice==2){

      $('#admissionsAll').removeClass('borrar');
      $('#admissionsAll').addClass('mostrar');
      $('#admissionsHigh').removeClass('borrar');
      $('#admissionsHigh').addClass('mostrar'); 

      $('#admissionsMiddle').removeClass('mostrar');
      $('#admissionsMiddle').addClass('borrar'); 
      $('#admissionsElementary').removeClass('mostrar');
      $('#admissionsElementary').addClass('borrar'); 
    }    

    $scope.SelectAdmission_emh_si = $scope.itemsAdmission_emh[indice].texto;

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
   
    if ($rootScope.itemsaddMS.length>1) {
      $scope.showDropdownProgramsMs = true;
    };   

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

    // console.log($rootScope.itemsaddHS);
    // console.log($rootScope.itemsaddHS.length);

    if ($rootScope.itemsaddHS.length>1) {
      $scope.showDropdownProgramsHs = true;
    };   

    $scope.progSelected_hs= "Program";
    }


  $scope.changeprog_hs = function(indice_hs) {
      $rootScope.hs_admissions=DatosSchool.datos.hs_admission[indice_hs];
  };


}]);


// CONTROLADORES SURVEY SCHOOL


nyc_controllers.controller("SurveyYearCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    
    var indice = 2;

    $rootScope.survey_results=DatosSchool.datos.survey_result[indice];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];


    var vTotalResponseRate,vSafetyandRespect,vEngagement,vCommunication,vAcademicExpectations;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vTotalResponseRate = DatosSchool.SearchValuesTotalResponseRate(i);
    vSafetyandRespect = DatosSchool.SearchValuesSafetyandRespect(i);
    vEngagement = DatosSchool.SearchValuesEngagement(i);
    vCommunication = DatosSchool.SearchValuesCommunication(i);
    vAcademicExpectations = DatosSchool.SearchValuesAcademicExpectations(i);
      if ( vTotalResponseRate || vSafetyandRespect || vEngagement || vCommunication || vAcademicExpectations ){
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

    if(arrayAvailableYears.length == 0){
      $('#survey_nd').removeClass("borrar");
      $('#survey_nd').addClass("mostrar");
    }else{
      $('#survey_all').removeClass("borrar");
      $('#survey_all').addClass("mostrar");
    };



    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYears = JSON.parse(jsonAvaylableYears);


    $rootScope.valuesTotalResponseRate = DatosSchool.SearchValuesTotalResponseRate(indice);
    $rootScope.valuesSafetyandRespect = DatosSchool.SearchValuesSafetyandRespect(indice);
    $rootScope.valuesEngagement = DatosSchool.SearchValuesEngagement(indice);
    $rootScope.valuesCommunication = DatosSchool.SearchValuesCommunication(indice);
    $rootScope.valuesAcademicExpectations = DatosSchool.SearchValuesAcademicExpectations(indice);

    $rootScope.valuesSurveyQuestionQ1F = DatosSchool.SearchSurveyQuestionQ1F(indice);
    $rootScope.valuesSurveyQuestionQ2B = DatosSchool.SearchSurveyQuestionQ2B(indice);
    $rootScope.valuesSurveyQuestionQ4E = DatosSchool.SearchSurveyQuestionQ4E(indice);
    $rootScope.valuesSurveyQuestionQ4G = DatosSchool.SearchSurveyQuestionQ4G(indice);
    $rootScope.valuesSurveyQuestionQ6C = DatosSchool.SearchSurveyQuestionQ6C(indice);
    $rootScope.valuesSurveyQuestionQ3D = DatosSchool.SearchSurveyQuestionQ3D(indice);
    $rootScope.valuesSurveyQuestionQ8C = DatosSchool.SearchSurveyQuestionQ8C(indice);
    $rootScope.valuesSurveyQuestionQ10C = DatosSchool.SearchSurveyQuestionQ10C(indice);
    $rootScope.valuesSurveyQuestionQ11E = DatosSchool.SearchSurveyQuestionQ11E(indice);
    $rootScope.valuesSurveyQuestionQ11F = DatosSchool.SearchSurveyQuestionQ11F(indice);
    $rootScope.valuesSurveyQuestionQ1A = DatosSchool.SearchSurveyQuestionQ1A(indice);
    $rootScope.valuesSurveyQuestionQ1G = DatosSchool.SearchSurveyQuestionQ1G(indice);
    $rootScope.valuesSurveyQuestionQ2A = DatosSchool.SearchSurveyQuestionQ2A(indice);
    $rootScope.valuesSurveyQuestionQ3A = DatosSchool.SearchSurveyQuestionQ3A(indice);
    $rootScope.valuesSurveyQuestionQ5B = DatosSchool.SearchSurveyQuestionQ5B(indice);


    $rootScope.selectedyear_survey= "2013";
    // $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {
    
    var ind;
    $.each($scope.itemsYears, function(i, v) {
      if (v.indice == indice_year) {
        ind = i;
      };
    });

    $rootScope.selectedyear_survey = $scope.itemsYears[ind].texto;
    // $rootScope.selectedyear_sd = $scope.itemsYears[indice_year].texto; 
    $rootScope.survey_results=DatosSchool.datos.survey_result[indice_year];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

    $rootScope.valuesTotalResponseRate = DatosSchool.SearchValuesTotalResponseRate(indice_year);
    $rootScope.valuesSafetyandRespect = DatosSchool.SearchValuesSafetyandRespect(indice_year);
    $rootScope.valuesEngagement = DatosSchool.SearchValuesEngagement(indice_year);
    $rootScope.valuesCommunication = DatosSchool.SearchValuesCommunication(indice_year);
    $rootScope.valuesAcademicExpectations = DatosSchool.SearchValuesAcademicExpectations(indice_year);    


    $rootScope.valuesSurveyQuestionQ1F = DatosSchool.SearchSurveyQuestionQ1F(indice_year);
    $rootScope.valuesSurveyQuestionQ2B = DatosSchool.SearchSurveyQuestionQ2B(indice_year);
    $rootScope.valuesSurveyQuestionQ4E = DatosSchool.SearchSurveyQuestionQ4E(indice_year);
    $rootScope.valuesSurveyQuestionQ4G = DatosSchool.SearchSurveyQuestionQ4G(indice_year);
    $rootScope.valuesSurveyQuestionQ6C = DatosSchool.SearchSurveyQuestionQ6C(indice_year);
    $rootScope.valuesSurveyQuestionQ3D = DatosSchool.SearchSurveyQuestionQ3D(indice_year);
    $rootScope.valuesSurveyQuestionQ8C = DatosSchool.SearchSurveyQuestionQ8C(indice_year);
    $rootScope.valuesSurveyQuestionQ10C = DatosSchool.SearchSurveyQuestionQ10C(indice_year);
    $rootScope.valuesSurveyQuestionQ11E = DatosSchool.SearchSurveyQuestionQ11E(indice_year);
    $rootScope.valuesSurveyQuestionQ11F = DatosSchool.SearchSurveyQuestionQ11F(indice_year);
    $rootScope.valuesSurveyQuestionQ1A = DatosSchool.SearchSurveyQuestionQ1A(indice_year);
    $rootScope.valuesSurveyQuestionQ1G = DatosSchool.SearchSurveyQuestionQ1G(indice_year);
    $rootScope.valuesSurveyQuestionQ2A = DatosSchool.SearchSurveyQuestionQ2A(indice_year);
    $rootScope.valuesSurveyQuestionQ3A = DatosSchool.SearchSurveyQuestionQ3A(indice_year);
    $rootScope.valuesSurveyQuestionQ5B = DatosSchool.SearchSurveyQuestionQ5B(indice_year);

    };
    


}]);

nyc_controllers.controller("SurveyRespCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {


    $rootScope.survey_var=parseInt(0);
    var vStudentsResp;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vStudentsResp = DatosSchool.SearchValuesStudentsResp(i);
      if ( vStudentsResp ){
        availableYears.push(i);
      }
    };

    if (availableYears.length == 0){
      $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"}];
    }else{
      $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"},{texto:"Students",indice:"2"}];
      };


    $rootScope.selectedgrade= "Parents";
    
    $scope.changegrade = function(indice_grade) {
      $rootScope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
      $rootScope.survey_var=parseInt(indice_grade);
    };


}]);

nyc_controllers.controller("SurveyRespCtrlQuestion" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

    var vStudentsResp;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 3; i++) { 
    vStudentsResp = DatosSchool.SearchValuesStudentsResp(i);
      if ( vStudentsResp ){
        availableYears.push(i);
      }
    };

    if (availableYears.length == 0){
      $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"}];
    }else{
      $scope.itemsGrades = [{texto:"Parents",indice:"0"},{texto:"Teachers",indice:"1"},{texto:"Students",indice:"2"}];
      };


    // $rootScope.selectedgrade= "Parents";
    
    $scope.changegrade = function(indice_grade) {
      $rootScope.selectedgrade = $scope.itemsGrades[indice_grade].texto;  
      $rootScope.survey_var=parseInt(indice_grade);};


}]);