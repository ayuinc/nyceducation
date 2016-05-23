/* global angular */

var nyc_controllers = angular.module('controllers_nyce', ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","filters_nyce", "controllers_nyce.testscores"]);


nyc_controllers.controller("MainController", ['$scope', '$rootScope', '$window', '$location', '$http', '$translate', '$config', 'SchoolRetriever', function($scope, $rootScope, $window, $location, $http, $translate, $config, SchoolRetriever) {
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
    $translate.use('ngl');
    $scope.schools = SchoolRetriever.getSchools();
    $scope.schools.then(function(data){
        $scope.schools = data.profiles;
        // $scope.schools = data;
    });

    $scope.getSchools = function() {
        return $scope.schools;
    };

    $scope.updateSchools = function(typed) {
        $scope.newSchools = SchoolRetriever.getSchools(typed);
        $scope.newSchools.then(function(data) {
            $scope.schools = data.profiles;
            // $scope.schools = data;
        });
    };
}]);

nyc_controllers.controller('BoroughController', ['$scope', function($scope) {
  $scope.boroughs = [
    { name: 'Manhattan' },
    { name: 'Brooklyn' },
    { name: 'Queens' },
    { name: 'Bronx' },
    { name: 'Staten Island' }
  ];

  $scope.myBorough = $scope.boroughs[0];
}]);

nyc_controllers.controller("SchoolListController", ['$scope', '$http', '$routeParams', '$config', function($scope, $http ,$routeParams, $config) {

    $http.get($config.API_V1_URL + 'schools/findByDistrict/' + encodeURI($routeParams.query))
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



nyc_controllers.controller('SelectSchoolController', ['$scope', '$rootScope', '$routeParams', '$http',  '$filter', '$config', 'DatosSchool', function ($scope, $rootScope, $routeParams, $http, $filter, $config, DatosSchool) {

    $scope.classGT = "switch2";
    $http.get( $config.API_V1_URL + 'school/' + $routeParams.schoolId)
        .success(function(data){
            
            /*
             * Due to a REST response, We're now using the data param called 
             * schools instead school, and it's also an array. 
             */
             // DatosSchool.datos.school = data.schools[0];
             // $scope.school=DatosSchool.datos.school;

            $scope.school = data.school;
            $rootScope.school = data.school;

            // $rootScope.school=DatosSchool.datos.school;
            // if (data.profile[data.profile.length-1].grades_served === "6, 7, 8") ;

            DatosSchool.datos.profiles = data.profile;

            $rootScope.profile = angular.copy(DatosSchool.datos.profiles).pop();

            $rootScope.schoolType = DatosSchool.getSchoolType(DatosSchool.datos.profiles.length-1);

            DatosSchool.datos.demographics = data.demographic.slice(-3); // Showing only the latest 3 years instead listing all
            $rootScope.demographic = DatosSchool.datos.demographics[DatosSchool.datos.demographics.length-1];

            DatosSchool.datos.enrollments = data.enrollment;
            $rootScope.enrollment=DatosSchool.datos.enrollments[0];

            DatosSchool.datos.evaluations = data.evaluation;
            $rootScope.evaluation = angular.copy(DatosSchool.datos.evaluations).pop();

            DatosSchool.datos.evaluations_ela = data.evaluation_ela;
            $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[0];

            DatosSchool.datos.evaluations_math = data.evaluation_math;
            $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[0];

            DatosSchool.datos.evaluations_average_score = data.evaluation_average_score;
            $rootScope.evaluation_average_score = angular.copy(DatosSchool.datos.evaluations_average_score).pop();

            DatosSchool.datos.evaluations_regents = data.evaluation_regents;
            $rootScope.evaluation_regents = angular.copy(DatosSchool.datos.evaluations_regents).pop();

            DatosSchool.datos.college_careers = data.college_career;
            $rootScope.college_career = angular.copy(DatosSchool.datos.college_careers).pop();

            DatosSchool.datos.survey_result = data.survey_results;
            $rootScope.survey_results = angular.copy(DatosSchool.datos.survey_result).pop();

            DatosSchool.datos.evaluation_rating = data.evaluation_ratings;
            $rootScope.evaluation_ratings = angular.copy(DatosSchool.datos.evaluation_rating).pop();

            DatosSchool.datos.proficiency_rating = data.proficiency_ratings;
            $rootScope.proficiency_ratings = angular.copy(DatosSchool.datos.proficiency_rating).pop();

            DatosSchool.datos.es_admission = data.es_admissions;
            $rootScope.es_admissions=DatosSchool.datos.es_admission[0];

            DatosSchool.datos.ms_admission = data.ms_admissions;
            $rootScope.ms_admissions=DatosSchool.datos.ms_admission[0];

            DatosSchool.datos.hs_admission = data.hs_admissions;
            $rootScope.hs_admissions=DatosSchool.datos.hs_admission[0];

            DatosSchool.datos.city_averages = data.city_average;
            $rootScope.city_average = angular.copy(DatosSchool.datos.city_averages).pop();

            DatosSchool.datos.class_size = data.class_size;
            $rootScope.class_size = [];
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

            $rootScope.tipoDeEscuela = GetUniqueElementsArray(tipoEscuela);
            var arrayts = GetUniqueElementsArray(tipoEscuela);
            $rootScope.filtroCCmenu = true;

            if (((arrayts.indexOf("Elementary") != -1) || (arrayts.indexOf("Middle") != -1) || (arrayts.indexOf("K-8") != -1)|| (arrayts.indexOf("K-3") != -1)|| (arrayts.indexOf("K-2") != -1)) && (arrayts.length == 1) ){
              $scope.filtroCCmenu = true;
              $scope.classGT = "switch1";
            }else if ( (arrayts.indexOf("K-2") !== -1) && (arrayts.indexOf("Elementary") !== -1) ){
              $scope.filtroCCmenu = true;
              $scope.classGT = "switch1";
            }else if ( (arrayts.indexOf("K-3") !== -1) && (arrayts.indexOf("Elementary") !== -1) ){
              $scope.filtroCCmenu = true;
              $scope.classGT = "switch1";
            }else if ( (arrayts.indexOf("K-8") !== -1) && (arrayts.indexOf("Elementary") !== -1) ){
              $scope.filtroCCmenu = true;
              $scope.classGT = "switch1";
            }else if (arrayts.length == 0) {
              $scope.filtroCCmenu = true;
              $scope.classGT = "switch1";
            }else{
              $scope.filtroCCmenu = false;
              $rootScope.filtroCCmenu = false;
              $scope.classGT = "switch2";
            };
        });
    }]);


nyc_controllers.controller('SchoolController', ['$scope', '$rootScope', '$routeParams', '$http', 'DatosSchool', function ($scope, $rootScope ,$routeParams, $http, DatosSchool) {
// console.log($routeParams);
}]);


nyc_controllers.controller("EnrollmentCtrlYear" ,[ '$scope', '$filter', 'DatosSchool', '$rootScope',function ($scope, $filter, DatosSchool, $rootScope) {
  var indice = 3,
      vStudentsEnrolledGrade,
      vAttendance,
      availableYears = [],
      arrayAvailableYears = [],
      jsonAvaylableYears = "",
      i;


  for (i = 0; i < 5; i++) {
    vStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(i);
    vAttendance = DatosSchool.SearchValuesAttendance(i);
    if ( vStudentsEnrolledGrade || vAttendance ){
      availableYears.push(i);
    }
  }

  for (i = 0; i < availableYears.length; i++) {
    var item = {
      texto: ((2010+availableYears[i]).toString() +' - ').concat((2011+availableYears[i]).toString()),
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

  $scope.selectedyearEnrollment = arrayAvailableYears[arrayAvailableYears.length-1].texto;

  $rootScope.enrollment = DatosSchool.datos.enrollments[indice];
  $rootScope.proficiency_ratings = DatosSchool.datos.proficiency_rating[indice];
  $rootScope.city_average = DatosSchool.datos.city_averages[indice];
  $rootScope.class_size = $filter('filter')(DatosSchool.datos.class_size, {'year': $scope.selectedyearEnrollment.substr(-4)}, true);

  var tmpKinderClassSizesList = [],
      lastGradeBefore0KFound = 0;

  $rootScope.class_size.map(function (i, index) {
    if(i.grade.indexOf('0K-') !== -1){
      if(lastGradeBefore0KFound == 0){ lastGradeBefore0KFound = index; }
      tmpKinderClassSizesList.push(i);
    }
  });
  if(lastGradeBefore0KFound > 0){
    $rootScope.class_size = tmpKinderClassSizesList.concat($rootScope.class_size.slice(0, lastGradeBefore0KFound));
  }

  $rootScope.hasClassSizeItems = $rootScope.class_size.length > 0 ? true : false;

  $scope.changeyear = function(indice) {
    var ind;
    angular.forEach($scope.itemsYearEnrollment, function(v, i){
      if (v.indice == indice) {
        ind = i;
      };
    });

    $scope.selectedyearEnrollment = $scope.itemsYearEnrollment[ind].texto;
    $rootScope.enrollment=DatosSchool.datos.enrollments[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.class_size = $filter('filter')(DatosSchool.datos.class_size, {'year': $scope.selectedyearEnrollment.substr(-4)}, true);
    $rootScope.hasClassSizeItems = $rootScope.class_size.length > 0 ? true : false;

    // $rootScope.valuesAttendance = DatosSchool.SearchValuesAttendance(indice);
    $rootScope.NAStudentsEnrolledGrade = DatosSchool.SearchValuesStudentsEnrolledGrade(indice);
    var dataAttendanceAvailable = DatosSchool.SearchValuesAttendance(indice);

    if (!dataAttendanceAvailable) {
      $rootScope.valuesAttendanceND = true;
    }else{
      $rootScope.valuesAttendanceND = false;
    }
  };

  $rootScope.isHighSchool = $rootScope.schoolType.highschool;
  $rootScope.isElemSchool = $rootScope.schoolType.elementary || $rootScope.schoolType.middle;
  $rootScope.isMultiSchool = $rootScope.schoolType.elementary && $rootScope.schoolType.highschool;


  // Sorting the class size by it course, the the subject (only for HS)
  if($rootScope.isHighSchool || $rootScope.isMultiSchool){
    $rootScope.class_size.sort(function(a, b){
      if(a.course < b.course) return -1;
      if(a.course > b.course) return 1;
      return 0;
    });

    $rootScope.class_size.sort(function(a, b){
      if(a.grade < b.grade) return -1;
      if(a.grade > b.grade) return 1;
      return 0;
    });
  }

  $rootScope.hasClassSize = false;

  $rootScope.$watch('tipoDeEscuela', function(oldV, newV){
    $rootScope.isHighSchool = $rootScope.schoolType.highschool;
    $rootScope.isElemSchool = $rootScope.schoolType.k8;
    $rootScope.isMultiSchool = $rootScope.schoolType.k8 && $rootScope.schoolType.highschool;
  });

}]);

nyc_controllers.controller("DemographicsCtrlYear" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  var demographicsYearsCount = DatosSchool.datos.demographics.length,
      indice = demographicsYearsCount-1,
      startingYear = parseInt(DatosSchool.datos.demographics[0].year, 10);

  $rootScope.demographic=DatosSchool.datos.demographics[indice];

    var vGender,vEthnicity,vStatus;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < demographicsYearsCount; i++) {
      vGender = DatosSchool.SearchValuesGender(i);
      vEthnicity = DatosSchool.SearchValuesEthnicity(i);
      vStatus = DatosSchool.SearchValuesStatus(i);
      if ( vGender || vEthnicity || vStatus ){
        availableYears.push(i);
      };
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: ((startingYear+availableYears[i]).toString() +' - ').concat(((startingYear+1)+availableYears[i]).toString()),
        // texto: (2011+availableYears[i]).toString(),
        indice: availableYears[i],
        index: i
      };
    arrayAvailableYears.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYearsDemographic = JSON.parse(jsonAvaylableYears);

  $rootScope.selectedyearDemographics= arrayAvailableYears[arrayAvailableYears.length-1].texto;
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

  function setUpAddtionalData(){
    for (var i = 0; i < DatosSchool.datos.proficiency_rating.length; i++) {
      if(DatosSchool.datos.proficiency_rating[i].year == selectedYear){
        profiencyDataIndex = i;
        break;
      }
    }

    for (i = 0; i < DatosSchool.datos.city_averages.length; i++) {
      if(DatosSchool.datos.city_averages[i].year == selectedYear){
        cityAvarageDataIndex = i;
        break;
      }
    }

    for (i = 0; i < DatosSchool.datos.college_careers.length; i++) {
      if(DatosSchool.datos.college_careers[i].year == selectedYear){
        collageCareerDataIndex = i;
        break;
      }
    }

    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[profiencyDataIndex];
    $rootScope.college_career=DatosSchool.datos.college_careers[cityAvarageDataIndex];
    $rootScope.city_average=DatosSchool.datos.city_averages[collageCareerDataIndex];
  }

  var indice = DatosSchool.datos.college_careers.length - 1;
  var profiencyDataIndex = 0,
      cityAvarageDataIndex = 0,
      collageCareerDataIndex = 0,
      collegeCarreersByYearTotal = DatosSchool.datos.college_careers.length,
      collegeCarreersFirstYear = parseInt(DatosSchool.datos.college_careers[0].year,10),
      selectedYear = collegeCarreersFirstYear;

  setUpAddtionalData();

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
    for (var i = 0; i < collegeCarreersByYearTotal; i++) {
        vGraduation = DatosSchool.SearchValuesGraduation(i);
        vCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(i);
        availableYears.push(i);
    };

    for (i = 0; i < availableYears.length; i++) {
        var item = {
            texto: ((collegeCarreersFirstYear - 1 + i).toString() +' - ').concat(((collegeCarreersFirstYear) + i).toString()),
            // texto: (2011+availableYears[i]).toString(),
            indice: availableYears[i],
            year: collegeCarreersFirstYear + i,
            index: i
        };
        arrayAvailableYears.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $scope.itemsYearsCollegeCarrer = JSON.parse(jsonAvaylableYears);
    
  $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);
  $rootScope.valuesCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(indice);

  $scope.selectedyearCollegeCarrer= arrayAvailableYears[arrayAvailableYears.length-1].texto;
  // $scope.itemsddCollegeCarrer = [{texto:"2011",indice:"0"},{texto:"2012",indice:"1"},{texto:"2013",indice:"2"}];

  $scope.changeyear = function(indice) {
    var ind;
    $.each($scope.itemsYearsCollegeCarrer, function(i, v) {
      if (v.indice == indice) {
        ind = i;
        selectedYear = v.year;
      };
    });

    $scope.selectedyearCollegeCarrer = $scope.itemsYearsCollegeCarrer[ind].texto;

    setUpAddtionalData();

    $rootScope.valuesGraduation = DatosSchool.SearchValuesGraduation(indice);
    $rootScope.valuesCollegeCareerReadiness = DatosSchool.SearchValuesCollegeCareerReadiness(indice);

  };
}]);

nyc_controllers.controller("SelectEvaluations" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  $scope.SelectEvaluations_is = "Select";
  $scope.itemsEvaluations = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];

  $rootScope.showElementary = false;
  $rootScope.showHigh = false;

  $scope.changeEvaluations = function(indice) {
    // $scope.SelectEvaluations_is = $scope.itemsEvaluations[indice].texto;
    if (indice==="0"){
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

      $('#elementary_eva').removeClass('borrar').addClass('mostrar');
      $('#all_eva').removeClass('borrar').addClass('mostrar');
      $('#high_eva').removeClass('mostrar').addClass('borrar');

      $rootScope.showElementary = true;
      $rootScope.showHigh = false;

    }else if (indice>=1){

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

      $rootScope.showElementary = false;
      $rootScope.showHigh = true;
    }

  };


}]);


nyc_controllers.controller("EvaluationsCtrlYearElem" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    var vProgressReportElem_calc;
    var eraseYears = 1;
    var availableYears_calc = [];

    for (var i = 0; i < DatosSchool.datos.evaluations.length; i++) {
        if(i < 2){
            vProgressReportElem_calc = DatosSchool.SearchValuesProgressReportElem(i);   
        }else{
            vProgressReportElem_calc = DatosSchool.SearchValuesProgressReportUpdatedElem(i);
        }
        if ( vProgressReportElem_calc ){
            availableYears_calc.push(i);
        }
    };

    $rootScope.arrayAvailableYearsEvaluationsEs = availableYears_calc;

    var vProgressReportElem,vQualityReviewElem;
    var availableYears = [];
    var arrayAvailableYearsEs = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < DatosSchool.datos.evaluations.length; i++) {
        if(i < 2){
            vProgressReportElem = DatosSchool.SearchValuesProgressReportElem(i);   
        }else{
            vProgressReportElem = DatosSchool.SearchValuesProgressReportUpdatedElem(i);
        }
        vQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(i);
        if ( vProgressReportElem || vQualityReviewElem ){
            availableYears.push(parseInt(DatosSchool.datos.evaluations[i].year, 10));
        }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: ((availableYears[i] - 1).toString() +' - ').concat((availableYears[i]).toString()),
        // texto: (2011+availableYears[i]).toString(),
        indice: availableYears[i],
        index: i
      };
      arrayAvailableYearsEs.push(item);

      $rootScope.EvaluationsYearSelected = i;
    };

    jsonAvaylableYears = JSON.stringify(arrayAvailableYearsEs);

    $scope.itemsYearsEvaluationsElem = JSON.parse(jsonAvaylableYears);

    // I'm using the shift function to remove the first year.
    arrayAvailableYearsEs.shift();
    $scope.itemsYearsEvaluationsElem.shift();

    if ($rootScope.arrayAvailableYearsEvaluationsEs.length > 0) {
      var indiceYear = $scope.itemsYearsEvaluationsElem[arrayAvailableYearsEs.length-1].indice,
          indice = 0;

      for (var i = 0; i < DatosSchool.datos.evaluations.length; i++) {
         if(DatosSchool.datos.evaluations[i].indice == indiceYear){
          indice = $scope.itemsYearsEvaluationsElem[i].index;
         }
       };

      $rootScope.selectedyearEvaluationsElem= $scope.itemsYearsEvaluationsElem[indice].texto;

      $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      $rootScope.evaluation=DatosSchool.datos.evaluations[indice];

      if(typeof $rootScope.evaluation.es_ms_k8_ec_s_pr_grade !== 'undefined'){
          switch($rootScope.evaluation.es_ms_k8_ec_s_pr_grade) {
            case 'A':
                $rootScope.evaluation.esblock = 100
                break;
            case 'B':
                $rootScope.evaluation.esblock = 75
                break;
            case 'C':
                $rootScope.evaluation.esblock = 50
                break;
            case 'D':
                $rootScope.evaluation.esblock = 25
                break;
            case 'E':
                $rootScope.evaluation.esblock = 10
                break;
            case 'F':
                $rootScope.evaluation.esblock = 5
                break;
        }
      }else{
          $rootScope.evaluation.esblock = '';
      }
      
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
      if (v.index == indice) {
        ind = v.index;
      };
    });

    $rootScope.selectedyearEvaluationsElem = $scope.itemsYearsEvaluationsElem[indice].texto;
    $rootScope.EvaluationsYearSelected = indice;

    var indiceYear = $scope.itemsYearsEvaluationsElem[indice].indice;
    for (var i = 0; i < DatosSchool.datos.evaluations.length; i++) {
       if(DatosSchool.datos.evaluations[i].year == indiceYear){
        ind = i;
       }
     };

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[ind];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[ind];
    $rootScope.evaluation=DatosSchool.datos.evaluations[ind]

    if(typeof $rootScope.evaluation.es_ms_k8_ec_s_pr_grade !== 'undefined'){
        switch($rootScope.evaluation.es_ms_k8_ec_s_pr_grade) {
            case 'A':
                $rootScope.evaluation.esblock = 100;
                break;
            case 'B':
                $rootScope.evaluation.esblock = 75;
                break;
            case 'C':
                $rootScope.evaluation.esblock = 50;
                break;
            case 'D':
                $rootScope.evaluation.esblock = 25;
                break;
            case 'E':
                $rootScope.evaluation.esblock = 10;
                break;
            case 'F':
                $rootScope.evaluation.esblock = 5;
                break;
        }
    }else{
        $rootScope.evaluation.esblock = '';
    }

    $rootScope.valuesProgressReportElem = DatosSchool.SearchValuesProgressReportElem(ind);
    // $rootScope.valuesQualityReviewElem = DatosSchool.SearchValuesQualityReviewElem(ind);

      if (DatosSchool.SearchValuesQualityReviewElem(ind)) {
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
    for (i = 0; i < 4; i++) {
    vProgressReportHigh_calc = DatosSchool.SearchValuesProgressReportHigh(i);
      if ( vProgressReportHigh_calc ){
        availableYears_calc.push(i);
      }
    };
    $rootScope.arrayAvailableYearsEvaluationsHs = availableYears_calc;

    var vQualityReview_calc;
    var availableYearsQR_calc = [];
    for (i = 0; i < 4; i++) {
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
    for (i = 0; i < 4; i++) {
    vProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(i);
    vQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(i);
      if ( vProgressReportHigh || vQualityReviewHigh ){
        availableYears.push(parseInt(DatosSchool.datos.evaluations[i].year, 10));
      }
    };

    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: ((availableYears[i] - 1).toString() +' - ').concat((availableYears[i]).toString()),
        indice: availableYears[i],
        index: i
      };
      arrayAvailableYearsHs.push(item);
    };
    jsonAvaylableYears = JSON.stringify(arrayAvailableYearsHs);
    $scope.itemsYearsEvaluationsHigh = JSON.parse(jsonAvaylableYears);

    // I'm using the shift function to remove the first year.
    if(arrayAvailableYearsHs.length > 0){
      arrayAvailableYearsHs.shift();
      $scope.itemsYearsEvaluationsHigh.shift();
    }


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
      var indice = $scope.itemsYearsEvaluationsHigh[arrayAvailableYearsHs.length-1].index;
      $rootScope.selectedyearEvaluationsHigh= $scope.itemsYearsEvaluationsHigh[arrayAvailableYearsHs.length-1].texto;

      $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
      $rootScope.evaluation=DatosSchool.datos.evaluations[indice];
      switch($rootScope.evaluation.hs_t_hs_o_pr_grade) {
        case 'A':
            $rootScope.evaluation.block = 100
            break;
        case 'B':
            $rootScope.evaluation.block = 75
            break;
        case 'C':
            $rootScope.evaluation.block = 50
            break;
        case 'D':
            $rootScope.evaluation.block = 25
            break;
        case 'E':
            $rootScope.evaluation.block = 10
            break;
        case 'F':
            $rootScope.evaluation.block = 5
            break;
    }
      // validación de secciones acordion
      $rootScope.valuesProgressReportHigh = DatosSchool.SearchValuesProgressReportHigh(indice);
      $rootScope.valuesQualityReviewHigh = DatosSchool.SearchValuesQualityReviewHigh(indice);
    };

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

    $rootScope.selectedyearEvaluationsHigh = $scope.itemsYearsEvaluationsHigh[indice].texto;

    indice = $scope.itemsYearsEvaluationsHigh[indice].index;

    $rootScope.evaluation_ratings=DatosSchool.datos.evaluation_rating[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.evaluation=DatosSchool.datos.evaluations[indice];

    switch($rootScope.evaluation.hs_t_hs_o_pr_grade) {
        case 'A':
            $rootScope.evaluation.block = 100
            break;
        case 'B':
            $rootScope.evaluation.block = 75
            break;
        case 'C':
            $rootScope.evaluation.block = 50
            break;
        case 'D':
            $rootScope.evaluation.block = 25
            break;
        case 'E':
            $rootScope.evaluation.block = 10
            break;
        case 'F':
            $rootScope.evaluation.block = 5
            break;
    }

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
nyc_controllers.controller("SurveyYearCtrl" ,[ '$scope', 'DatosSchool', '$rootScope', '$filter',function ($scope, DatosSchool, $rootScope, $filter) {

    var indice = 0;
    var vTotalResponseRate,vSafetyandRespect,vEngagement,vCommunication,vAcademicExpectations,
        surveyByYearTotal = DatosSchool.datos.survey_result.length,
        surveyFirstYear = parseInt(DatosSchool.datos.survey_result[0].year,10),
        selectedYear = surveyFirstYear;

    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";

    for (i = 0; i < surveyByYearTotal; i++) {
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
        texto: ((surveyFirstYear + i).toString() +' - ').concat(((surveyFirstYear+1)+availableYears[i]).toString()),
        // texto: (2011+availableYears[i]).toString(),
        indice: availableYears[i],
        index: i,
        year: surveyFirstYear + i
      };
      arrayAvailableYears.push(item);
      indice = i;
    };

    $rootScope.SurveyResultsYearSelected = indice;

    var surveyResultDataIndex = 0,
        cityAvarageDataIndex = 0,
        proficiencyDataIndex = 0;

    for (var i = 0; i < DatosSchool.datos.survey_result.length; i++) {
      if(DatosSchool.datos.survey_result[i].year == selectedYear){
        surveyResultDataIndex = i;
        break;
      }
    }

    for (i = 0; i < DatosSchool.datos.city_averages.length; i++) {
      if(DatosSchool.datos.city_averages[i].year == selectedYear){
        cityAvarageDataIndex = i;
        break;
      }
    }

    for (i = 0; i < DatosSchool.datos.proficiency_rating.length; i++) {
      if(DatosSchool.datos.proficiency_rating[i].year == selectedYear){
        proficiencyDataIndex = i;
        break;
      }
    }

    // console.log(surveyResultDataIndex);
    $rootScope.survey_results = DatosSchool.datos.survey_result[indice];
    $rootScope.city_average= DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings = DatosSchool.datos.proficiency_rating[indice];

    // console.log(indice);
    // $rootScope.survey_results = DatosSchool.datos.survey_result[indice];
    // $rootScope.city_average= DatosSchool.datos.city_averages[indice];
    // $rootScope.proficiency_ratings = DatosSchool.datos.proficiency_rating[indice];

    $rootScope.hasZeroStudentsQuestions = true;
    $rootScope.hasZeroTeachersQuestions = true;
    $rootScope.hasZeroParentsQuestions = true;

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

    $rootScope.valuesSurveyQuestionCheck = function(type, questionNum){
      return DatosSchool.SearchSurveyQuestionPosNeg(indice, type, questionNum);
    };

    $rootScope.selectedyear_survey= arrayAvailableYears[arrayAvailableYears.length-1].texto;
    // $scope.itemsYears = [{texto:"2011",indice:0},{texto:"2012",indice:1},{texto:"2013",indice:2}];
    $scope.changeyear = function(indice_year) {
      var ind;
      $.each($scope.itemsYears, function(i, v) {
        if (v.indice == indice_year) {
          ind = i;
          indice = i;
          selectedYear = v.year;
        };
      });

      $rootScope.SurveyResultsYearSelected = indice;
      $rootScope.selectedyear_survey = $scope.itemsYears[ind].texto;
      // $rootScope.selectedyear_sd = $scope.itemsYears[indice_year].texto;
      // $rootScope.survey_results = $filter('filter')(DatosSchool.datos.survey_result, {'year': selectedYear}, true);
      // $rootScope.city_average= $filter('filter')(DatosSchool.datos.city_averages, {'year': selectedYear}, true);
      // $rootScope.proficiency_ratings = $filter('filter')(DatosSchool.datos.proficiency_rating, {'year': selectedYear}, true);

      $rootScope.survey_results = DatosSchool.datos.survey_result[ind];
      $rootScope.city_average= DatosSchool.datos.city_averages[ind];
      $rootScope.proficiency_ratings = DatosSchool.datos.proficiency_rating[ind];

      var surveyResultDataIndex = 0,
        cityAvarageDataIndex = 0,
        proficiencyDataIndex = 0;

      for (var i = 0; i < DatosSchool.datos.survey_result.length; i++) {
        if(DatosSchool.datos.survey_result[i].year == selectedYear){
          surveyResultDataIndex = i;
          break;
        }
      }

      for (i = 0; i < DatosSchool.datos.city_averages.length; i++) {
        if(DatosSchool.datos.city_averages[i].year == selectedYear){
          cityAvarageDataIndex = i;
          break;
        }
      }

      for (i = 0; i < DatosSchool.datos.proficiency_rating.length; i++) {
        if(DatosSchool.datos.proficiency_rating[i].year == selectedYear){
          proficiencyDataIndex = i;
          break;
        }
      }

      $rootScope.valuesTotalResponseRate = DatosSchool.SearchValuesTotalResponseRate(surveyResultDataIndex);
      $rootScope.valuesSafetyandRespect = DatosSchool.SearchValuesSafetyandRespect(surveyResultDataIndex);
      $rootScope.valuesEngagement = DatosSchool.SearchValuesEngagement(surveyResultDataIndex);
      $rootScope.valuesCommunication = DatosSchool.SearchValuesCommunication(surveyResultDataIndex);
      $rootScope.valuesAcademicExpectations = DatosSchool.SearchValuesAcademicExpectations(surveyResultDataIndex);


      $rootScope.valuesSurveyQuestionQ1F = DatosSchool.SearchSurveyQuestionQ1F(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ2B = DatosSchool.SearchSurveyQuestionQ2B(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ4E = DatosSchool.SearchSurveyQuestionQ4E(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ4G = DatosSchool.SearchSurveyQuestionQ4G(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ6C = DatosSchool.SearchSurveyQuestionQ6C(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ3D = DatosSchool.SearchSurveyQuestionQ3D(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ8C = DatosSchool.SearchSurveyQuestionQ8C(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ10C = DatosSchool.SearchSurveyQuestionQ10C(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ11E = DatosSchool.SearchSurveyQuestionQ11E(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ11F = DatosSchool.SearchSurveyQuestionQ11F(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ1A = DatosSchool.SearchSurveyQuestionQ1A(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ1G = DatosSchool.SearchSurveyQuestionQ1G(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ2A = DatosSchool.SearchSurveyQuestionQ2A(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ3A = DatosSchool.SearchSurveyQuestionQ3A(surveyResultDataIndex);
      $rootScope.valuesSurveyQuestionQ5B = DatosSchool.SearchSurveyQuestionQ5B(surveyResultDataIndex);

      checkEmptyQuestionList();
    };

    function checkEmptyQuestionList(){
      var studentsQuestionsCodes = ["s_q1f_agree", "s_q2b_agree", "s_q4e_agree", "s_q4g_agree", "s_q6c_agree", "s_q1d_positive", "s_q2a_positive", "s_q5a_positive", "s_q7d_positive", "s_q9a_positive", "s_q10f_positive", "s_q10j_positive", "s_q11a_positive", "s_q11d_positive"],
        teachersQuestionsCodes = ["t_q3d_agree", "t_q8c_agree", "t_q10c_agree", "t_q11e_disagree", "t_q11f_agree", "t_q9d_positive", "t_q10d_positive", "t_q14e_positive", "t_q15a_positive", "t_q15d_positive", "t_q17b_positive"],
        parentsQuestionsCodes = ["p_qq1a_agree", "p_q1g_agree", "p_q2a_agree", "p_q3a_agree", "p_q5b_satisfied", "p_q4h_positive", "p_q5g_positive", "p_q8a_positive", "p_q8b_positive", "p_q8c_positive", "p_q10b_positive"];

      $rootScope.hasZeroStudentsQuestions = true;
      $rootScope.hasZeroTeachersQuestions = true;
      $rootScope.hasZeroParentsQuestions = true;

      studentsQuestionsCodes = studentsQuestionsCodes.map(function(questionNum){
        return DatosSchool.datos.survey_result[indice][questionNum];
      });
      $rootScope.hasZeroStudentsQuestions = GetUniqueElementsArray(studentsQuestionsCodes).length === 0;

      teachersQuestionsCodes = teachersQuestionsCodes.map(function(questionNum){
        return DatosSchool.datos.survey_result[indice][questionNum];
      });
      $rootScope.hasZeroTeachersQuestions = GetUniqueElementsArray(teachersQuestionsCodes).length === 0;

      parentsQuestionsCodes = parentsQuestionsCodes.map(function(questionNum){
        return DatosSchool.datos.survey_result[indice][questionNum];
      });
      $rootScope.hasZeroParentsQuestions = GetUniqueElementsArray(parentsQuestionsCodes).length === 0;
    }

    checkEmptyQuestionList();

}]);

nyc_controllers.controller("SurveyRespCtrl" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {


    $rootScope.survey_var=parseInt(0);
    var vStudentsResp;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    for (i = 0; i < 4; i++) {
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
    for (i = 0; i < 4; i++) {
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


nyc_controllers.controller("LenguageCtrl" ,[ '$translate', '$scope', 'DatosSchool', '$rootScope', function ($translate, $scope, DatosSchool, $rootScope) {
  $scope.languages = [
      {label:'English', id:'ngl'},
      {label:'Español', id:'esp'}
  ];
  $scope.mylanguage = $scope.languages[0];
  if ($rootScope.lenguage == "esp") {
      $rootScope.lenguage = "esp";
  } else {
    $rootScope.lenguage = "ngl";
  }

  $scope.lenguageChange = function (langKey) {
    $rootScope.lenguage = langKey;
    $translate.use(langKey);
  };
}]);
