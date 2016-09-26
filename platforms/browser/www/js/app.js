function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}
if(iOS()){
  angular.element('body').addClass('mt-21');
}
/* global $ */
/* global GetUniqueElementsArray */
var app = angular.module("nyce", ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","filters_nyce","controllers_nyce", "pascalprecht.translate"]);

app.constant('$config', {
  'API_V1_URL': 'http://nyce-v103-api.laboratoria.la/api/v1/'
//   'API_V1_URL': 'http://162.243.110.154/api/v1/'
});

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: './i18n/locale-',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('ngl');
  $translateProvider.fallbackLanguage('ngl');
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);

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

    $routeProvider.when("/Disclaimer", {
        templateUrl: "templates/SchoolDisclaimer.html",
        // controller: "SchoolListController"
    });

    $routeProvider.otherwise({ redirect_to: "/" });
});

app.factory('DatosSchool',function($rootScope, $filter){

  // La referencia es el numero de indice en la DB para los categories de evaluation_math y evaluation_ela, además conserva este orden
  var categoryKeywords = [
    'All Students',
    'White',
    'Black',
    'Hispanic',
    'Asian',
    'Male',
    'Female',
    'SWD',
    'Not SWD'
  ];

    return {
        datos: {},
        getSchoolType : function(yearIndex){
            var gradesServed = this.datos.profiles[yearIndex].grades_served || false,
                schoolType = { k8: false, elementary: false, middle: false, highschool: false};
                
            if(!gradesServed) { return schoolType; }
            
            gradesServed = gradesServed.split(',').map(function(v){
               return $.trim(v); 
            });
            angular.forEach(gradesServed, function(grade){
                if(grade === 'K' || grade === '1' || grade === '2' || grade === '3' || grade === '4' || grade === '5' || grade === '6' || grade === '7' || grade === '8'){
                    schoolType.k8 = true;
                }
                if(grade === 'K' || grade === '1' || grade === '2' || grade === '3' || grade === '4' || grade === '5'){
                    schoolType.elementary = true;
                }
                if(grade === '6' || grade === '7' || grade === '8'){
                    schoolType.middle = true;
                }
                if(grade === '9' || grade === '10' || grade === '11' || grade === '12'){
                    schoolType.highschool = true;
                }
            });
            
            return schoolType;
        },
        SearchValuesStudentsEnrolledGrade: function(indice){
          var ValuesStudentsEnrolledGrade = [];
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["pre_kinder"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["kinder"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade1"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade2"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade3"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade4"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade5"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade6"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade7"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade8"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade9"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade10"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade11"]);
          ValuesStudentsEnrolledGrade.push(this.datos.enrollments[indice]["grade12"]);
          if(GetUniqueElementsArray(ValuesStudentsEnrolledGrade).length > 0){
              return true;
          }else{
              return false;
          }
        },
        SearchValuesAttendance: function(indice){
          var ValuesAttendance = [];
          ValuesAttendance.push(this.datos.enrollments[indice]['attendance_es_ms_k8_ec']);
          ValuesAttendance.push(this.datos.enrollments[indice]['attendance_hs_transfer_hs']);
          if(GetUniqueElementsArray(ValuesAttendance).length > 0)
            { return true}
          else{ return false }
        },
        SearchValuesGraduation: function(indice){
          var ValuesGraduation = [];
          ValuesGraduation.push(this.datos.college_careers[indice]['6y_g_r']);
          ValuesGraduation.push(this.datos.college_careers[indice]['4y_g_r']);
          ValuesGraduation.push(this.datos.college_careers[indice]['p_s_earning10_credits_in1year']);
          ValuesGraduation.push(this.datos.college_careers[indice]['transfer_s_graduation_r']);
          if(GetUniqueElementsArray(ValuesGraduation).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesCollegeCareerReadiness: function(indice){
          var ValuesCollegeCareerReadiness = [];
          ValuesCollegeCareerReadiness.push(this.datos.college_careers[indice]['postsecondary_enrollment_rate_6months']);
          ValuesCollegeCareerReadiness.push(this.datos.college_careers[indice]['4year_non_remediation_rate']);
          ValuesCollegeCareerReadiness.push(this.datos.college_careers[indice]['cc_preparatory_course_index']);
          ValuesCollegeCareerReadiness.push(this.datos.college_careers[indice]['c_readiness_r_including_p']);
          if(GetUniqueElementsArray(ValuesCollegeCareerReadiness).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesSat: function(indice){
          var ValuesSat = [];
          if(typeof this.datos.evaluations_average_score[indice] === 'undefined'){ return false; }

          ValuesSat.push(this.datos.evaluations_average_score[indice]['sat_a_total_s']);
          ValuesSat.push(this.datos.evaluations_average_score[indice]['sat_a_cr_s']);
          ValuesSat.push(this.datos.evaluations_average_score[indice]['sat_a_math_s']);
          ValuesSat.push(this.datos.evaluations_average_score[indice]['sat_a_writing_s']);
          if(GetUniqueElementsArray(ValuesSat).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesRegentsPassRate: function(indice){
          var ValuesRegentsPassRate = [];
          if(typeof this.datos.evaluations_regents[indice] === 'undefined'){ return false; }

          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_global_history']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_english']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_living_environment']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_earth_science']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_us_history']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_chemistry']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_physics']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_integrated_algebra']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_geometry']);
          ValuesRegentsPassRate.push(this.datos.evaluations_regents[indice]['pp_r_algebraii']);
          if(GetUniqueElementsArray(ValuesRegentsPassRate).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesRegentsAverageScore: function(indice){
          var ValuesRegentsAverageScore = [];
          if(typeof this.datos.evaluations_regents[indice] === 'undefined'){ return false; }

          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_english']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_us_history']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_global_history']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_living_environment']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_earth_science']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_chemistry']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_physics']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_integrated_algebra']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_geometry']);
          ValuesRegentsAverageScore.push(this.datos.evaluations_regents[indice]['as_r_algebraii']);
          if(GetUniqueElementsArray(ValuesRegentsAverageScore).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesRegentsRegentsCollegeReady: function(indice){
          var ValuesRegentsRegentsCollegeReady = [];
          if(typeof this.datos.evaluations_regents[indice] === 'undefined'){ return false; }

          ValuesRegentsRegentsCollegeReady.push(this.datos.evaluations_regents[indice]['pcr_r_comprehensive_english']);
          ValuesRegentsRegentsCollegeReady.push(this.datos.evaluations_regents[indice]['pcr_r_integrated_algebra']);
          ValuesRegentsRegentsCollegeReady.push(this.datos.evaluations_regents[indice]['pcr_r_algebraii']);
          ValuesRegentsRegentsCollegeReady.push(this.datos.evaluations_regents[indice]['pcr_r_geometry']);
          if(GetUniqueElementsArray(ValuesRegentsRegentsCollegeReady).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesElaScores: function(indice){
          var ValuesElaScores = [];
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }

          ValuesElaScores.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level4_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level4_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level4_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level4_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level4_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level1_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level2_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level3_ela']);
          ValuesElaScores.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesElaScores).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesMathScores: function(indice){
          var ValuesMathScores = [];
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }

          ValuesMathScores.push(this.datos.evaluations_math[indice]['3rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['3rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['3rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['3rd_pr_s_level4_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['4rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['4rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['4rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['4rd_pr_s_level4_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['5rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['5rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['5rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['5rd_pr_s_level4_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['6rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['6rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['6rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['6rd_pr_s_level4_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['7rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['7rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['7rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['7rd_pr_s_level4_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['8rd_pr_s_level1_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['8rd_pr_s_level2_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['8rd_pr_s_level3_math']);
          ValuesMathScores.push(this.datos.evaluations_math[indice]['8rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesMathScores).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesAverageProficiencyScoreELA: function(indice){
          var ValuesAverageProficiencyScoreELA = [];
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }

          // ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['av_proficiency_rating_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['3rd_a_p_r_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['4rd_a_p_r_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['5rd_a_p_r_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['6rd_a_p_r_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['7rd_a_p_r_ela']);
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['8rd_a_p_r_ela']);
          if(GetUniqueElementsArray(ValuesAverageProficiencyScoreELA).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesAverageProficiencyScoreMath: function(indice){
          var ValuesAverageProficiencyScoreMath = [];
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }

          // ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['av_proficiency_rating_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['3rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['4rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['5rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['6rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['7rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['8rd_a_p_r_math']);
          if(GetUniqueElementsArray(ValuesAverageProficiencyScoreMath).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesGender: function(indice){
          var ValuesGender = [];
          ValuesGender.push(this.datos.demographics[indice]['female']);
          ValuesGender.push(this.datos.demographics[indice]['male']);
          if(GetUniqueElementsArray(ValuesGender).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesEthnicity: function(indice){
          var ValuesEthnicity = [];
          ValuesEthnicity.push(this.datos.demographics[indice]['asian']);
          ValuesEthnicity.push(this.datos.demographics[indice]['black']);
          ValuesEthnicity.push(this.datos.demographics[indice]['latino']);
          ValuesEthnicity.push(this.datos.demographics[indice]['white']);
          ValuesEthnicity.push(this.datos.demographics[indice]['other']);
          if(GetUniqueElementsArray(ValuesEthnicity).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesStatus: function(indice){
          var ValuesStatus = [];
          ValuesStatus.push(this.datos.demographics[indice]['free_reduced_price_lunch']);
          ValuesStatus.push(this.datos.demographics[indice]['whith_disabilities']);
          ValuesStatus.push(this.datos.demographics[indice]['english_language_learners']);
          if(GetUniqueElementsArray(ValuesStatus).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesProgressReportUpdatedElem: function(indice){
          var ValuesProgressReport = [];
          if(typeof this.datos.evaluations[indice] === 'undefined'){
              return false;
          }
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_o_pr_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_perf_pr_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_prog_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_enviro_pr_score']);
            
          if(GetUniqueElementsArray(ValuesProgressReport).length > 0){ return true }
          else{ return false }
        },
        SearchValuesProgressReportElem: function(indice){
          var ValuesProgressReport = [];
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_pr_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_perf_pr_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_prog_score']);
            ValuesProgressReport.push(this.datos.evaluations[indice]['es_ms_k8_ec_s_enviro_pr_score']);
            
          if(GetUniqueElementsArray(ValuesProgressReport).length > 0){ return true }
          else{ return false }
        },
        SearchValuesQualityReviewElem: function(indice){
          var ValuesQualityReview = [];
          if(typeof this.datos.evaluation_rating[indice] === 'undefined'){
              return false;
          }
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_11']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_12']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_14']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_34']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_22']);
          if(GetUniqueElementsArray(ValuesQualityReview).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesProgressReportHigh: function(indice){
          var ValuesProgressReport = [];
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_o_pr_grade']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_sper_pr_grade']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_spro_pr_grade']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_se_pr_grade']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_o_cac_grade']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_o_pr_score']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_sper_pr_score']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_spro_pr_score']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_se_pr_score']);
          ValuesProgressReport.push(this.datos.evaluations[indice]['hs_t_hs_o_cac_score']);
          if(GetUniqueElementsArray(ValuesProgressReport).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesQualityReviewHigh: function(indice){
          var ValuesQualityReview = [];
          if(typeof this.datos.evaluation_rating[indice] === 'undefined') return false; 
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['quality_review_rating']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_11']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_12']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_14']);
          ValuesQualityReview.push(this.datos.evaluation_rating[indice]['ri_34']);
          if(GetUniqueElementsArray(ValuesQualityReview).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesTotalResponseRate: function(indice){
          var ValuesTotalResponseRate = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesTotalResponseRate.push(this.datos.survey_result[indice]['p_total_response_rate']);
          ValuesTotalResponseRate.push(this.datos.survey_result[indice]['t_total_response_rate']);
          ValuesTotalResponseRate.push(this.datos.survey_result[indice]['s_total_response_rate']);
          if(GetUniqueElementsArray(ValuesTotalResponseRate).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesSafetyandRespect: function(indice){
          var ValuesSafetyandRespect = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesSafetyandRespect.push(this.datos.survey_result[indice]['p_safety_respect_rs']);
          ValuesSafetyandRespect.push(this.datos.survey_result[indice]['t_safety_respect_rs']);
          ValuesSafetyandRespect.push(this.datos.survey_result[indice]['s_safety_respect_rs']);
          if(GetUniqueElementsArray(ValuesSafetyandRespect).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesEngagement: function(indice){
          var ValuesEngagement = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesEngagement.push(this.datos.survey_result[indice]['p_engagement_rs']);
          ValuesEngagement.push(this.datos.survey_result[indice]['t_engagement_rs']);
          ValuesEngagement.push(this.datos.survey_result[indice]['s_engagement_rs']);
          if(GetUniqueElementsArray(ValuesEngagement).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesCommunication: function(indice){
          var ValuesCommunication = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesCommunication.push(this.datos.survey_result[indice]['p_communication_rs']);
          ValuesCommunication.push(this.datos.survey_result[indice]['t_communication_rs']);
          ValuesCommunication.push(this.datos.survey_result[indice]['s_communication_rs']);
          if(GetUniqueElementsArray(ValuesCommunication).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesAcademicExpectations: function(indice){
          var ValuesAcademicExpectations = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesAcademicExpectations.push(this.datos.survey_result[indice]['p_academic_expectations_rs']);
          ValuesAcademicExpectations.push(this.datos.survey_result[indice]['t_academic_expectations_rs']);
          ValuesAcademicExpectations.push(this.datos.survey_result[indice]['s_academic_expectations_rs']);
          if(GetUniqueElementsArray(ValuesAcademicExpectations).length > 0)
            { return true }
          else{ return false }
        },
        SearchValuesStudentsResp: function(indice){
          var ValuesStudentsResp = [];
          if(typeof this.datos.survey_result[indice] === 'undefined') return false; 
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_academic_expectations_rs']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_communication_rs']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_engagement_rs']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_safety_respect_rs']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_total_response_rate']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
// FILTROS SURVEY QUESTIONS
        /*
          #type: s, p, t
        */
        SearchSurveyQuestionPosNeg: function(indice, type, questionNum){
          if(typeof this.datos.survey_result[indice] === 'undefined' || typeof type === 'undefined' || typeof questionNum === 'undefined'){
            return false;
          }
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice][type+'_q'+questionNum+'_positive']);
          ValuesStudentsResp.push(this.datos.survey_result[indice][type+'_q'+questionNum+'_negative']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
        SearchSurveyQuestionQ1F: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q1f_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q1f_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
        SearchSurveyQuestionQ2B: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q2b_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q2b_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
        SearchSurveyQuestionQ4E: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q4e_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q4e_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
        SearchSurveyQuestionQ4G: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q4g_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q4g_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },
        SearchSurveyQuestionQ6C: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q6c_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['s_q6c_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ3D: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q3d_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q3d_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ8C: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q8c_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q8c_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ10C: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q10c_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q10c_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ11E: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q11e_disagree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q11e_strongly_disagree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },


        SearchSurveyQuestionQ11F: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q11f_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['t_q11f_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },


        SearchSurveyQuestionQ1A: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q1a_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q1a_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },


        SearchSurveyQuestionQ1G: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q1g_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q1g_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ2A: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q2a_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q2a_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ3A: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q3a_agree']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q3a_strongly_agree']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

        SearchSurveyQuestionQ5B: function(indice){
          var ValuesStudentsResp = [];
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q5b_satisfied']);
          ValuesStudentsResp.push(this.datos.survey_result[indice]['p_q5b_very_satisfied']);
          if(GetUniqueElementsArray(ValuesStudentsResp).length > 0)
            { return true }
          else{ return false }
        },

// SEARCH DATA BY GRADE ELA- TEST SCORE

        SearchTestScoreGrade3rdEla:function(indice){
          var ValuesTestScoreGrade3rd = [];
          // ValuesTestScoreGrade3rd.push(this.datos.evaluations_ela[indice]['3rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }

          ValuesTestScoreGrade3rd.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level1_ela']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level2_ela']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level3_ela']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_ela[indice]['3rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade3rd).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade4thEla:function(indice){
          var ValuesTestScoreGrade4th = [];
          // ValuesTestScoreGrade4th.push(this.datos.evaluations_ela[indice]['4rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade4th.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level1_ela']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level2_ela']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level3_ela']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_ela[indice]['4rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade4th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade5thEla:function(indice){
          var ValuesTestScoreGrade5th = [];
          // ValuesTestScoreGrade5th.push(this.datos.evaluations_ela[indice]['5rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade5th.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level1_ela']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level2_ela']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level3_ela']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_ela[indice]['5rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade5th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade6thEla:function(indice){
          var ValuesTestScoreGrade6th = [];
          // ValuesTestScoreGrade6th.push(this.datos.evaluations_ela[indice]['6rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade6th.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level1_ela']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level2_ela']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level3_ela']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_ela[indice]['6rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade6th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade7thEla:function(indice){
          var ValuesTestScoreGrade7th = [];
          // ValuesTestScoreGrade7th.push(this.datos.evaluations_ela[indice]['7rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade7th.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level1_ela']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level2_ela']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level3_ela']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_ela[indice]['7rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade7th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade8thEla:function(indice){
          var ValuesTestScoreGrade8th = [];
          // ValuesTestScoreGrade8th.push(this.datos.evaluations_ela[indice]['8rd_a_p_r_ela']);
          if(typeof this.datos.evaluations_ela[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade8th.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level1_ela']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level2_ela']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level3_ela']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_ela[indice]['8rd_pr_s_level4_ela']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade8th).length > 0)
            { return true }
          else{ return false }
        },

// SEARCH DATA BY GRADE MATH- TEST SCORE

        SearchTestScoreGrade3rdMath:function(indice){
          var ValuesTestScoreGrade3rd = [];
          // ValuesTestScoreGrade3rd.push(this.datos.evaluations_math[indice]['3rd_a_p_r_math']);
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_math[indice]['3rd_pr_s_level1_math']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_math[indice]['3rd_pr_s_level2_math']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_math[indice]['3rd_pr_s_level3_math']);
          ValuesTestScoreGrade3rd.push(this.datos.evaluations_math[indice]['3rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade3rd).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade4thMath:function(indice){
          var ValuesTestScoreGrade4th = [];
          // ValuesTestScoreGrade4th.push(this.datos.evaluations_math[indice]['4rd_a_p_r_math']);
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade4th.push(this.datos.evaluations_math[indice]['4rd_pr_s_level1_math']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_math[indice]['4rd_pr_s_level2_math']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_math[indice]['4rd_pr_s_level3_math']);
          ValuesTestScoreGrade4th.push(this.datos.evaluations_math[indice]['4rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade4th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade5thMath:function(indice){
          var ValuesTestScoreGrade5th = [];
          // ValuesTestScoreGrade5th.push(this.datos.evaluations_math[indice]['5rd_a_p_r_math']);
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade5th.push(this.datos.evaluations_math[indice]['5rd_pr_s_level1_math']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_math[indice]['5rd_pr_s_level2_math']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_math[indice]['5rd_pr_s_level3_math']);
          ValuesTestScoreGrade5th.push(this.datos.evaluations_math[indice]['5rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade5th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade6thMath:function(indice){
          var ValuesTestScoreGrade6th = [];
          // ValuesTestScoreGrade6th.push(this.datos.evaluations_math[indice]['6rd_a_p_r_math']);
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade6th.push(this.datos.evaluations_math[indice]['6rd_pr_s_level1_math']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_math[indice]['6rd_pr_s_level2_math']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_math[indice]['6rd_pr_s_level3_math']);
          ValuesTestScoreGrade6th.push(this.datos.evaluations_math[indice]['6rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade6th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade7thMath:function(indice){
          var ValuesTestScoreGrade7th = [];
          // ValuesTestScoreGrade7th.push(this.datos.evaluations_math[indice]['7rd_a_p_r_math']);
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          ValuesTestScoreGrade7th.push(this.datos.evaluations_math[indice]['7rd_pr_s_level1_math']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_math[indice]['7rd_pr_s_level2_math']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_math[indice]['7rd_pr_s_level3_math']);
          ValuesTestScoreGrade7th.push(this.datos.evaluations_math[indice]['7rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade7th).length > 0)
            { return true }
          else{ return false }
        },
        SearchTestScoreGrade8thMath:function(indice){
          var ValuesTestScoreGrade8th = [];
          if(typeof this.datos.evaluations_math[indice] === 'undefined'){ return false; }
          // ValuesTestScoreGrade8th.push(this.datos.evaluations_math[indice]['8rd_a_p_r_math']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_math[indice]['8rd_pr_s_level1_math']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_math[indice]['8rd_pr_s_level2_math']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_math[indice]['8rd_pr_s_level3_math']);
          ValuesTestScoreGrade8th.push(this.datos.evaluations_math[indice]['8rd_pr_s_level4_math']);
          if(GetUniqueElementsArray(ValuesTestScoreGrade8th).length > 0)
            { return true }
          else{ return false }
        },
        /*
          @description: "devuelve un array con los datos filtrados, según sus parametros: field, year, grade, category".

          @field: "math"|"ela" / required
          @year: 4 digits year > 2011 / required
          @category: index number for categories: 0-all studes (check the categories static variable template) / default = 0
        */
        getTestScoreEvaluationData: function(field, year, category){
          if(typeof field == 'undefined' || typeof year == 'undefined'){
            return false;
          }

          if(category === false || typeof category === 'undefined'){
            return $filter('filter')(this.datos['evaluations_' + field], {'year': year.substr(-4)}, true);
          }else if(category > -1){
            return $filter('filter')(this.datos['evaluations_' + field], {'year': year.substr(-4), 'category': categoryKeywords[category]}, true)
          }
        },

        getTestScoreCategoriesList: function(records){
          var result = [];
          records.map(function(item){
            var index = categoryKeywords.indexOf(item.category);
            if(index !== -1){
              result.push({'texto': item.category, 'indice': index });
            }
          });

          if(result.length === 0){
            result.push({'texto': categoryKeywords[0], 'indice': 0 });
          }

          result.sort(function (a, b) {
            if (a.indice > b.indice) {
              return 1;
            }
            if (a.indice < b.indice) {
              return -1;
            }
            return 0;
          });

          return result;
        }
    };
});



// FIN CONTROLADORES SURVEY


function AccordionDemoCtrl($scope , $rootScope) {
  $rootScope.oneAtATime = false;
}

// retrieves schools after query
app.factory('SchoolRetriever', function($http, $q, $timeout, $config) {
    var getSchools = function(query) {
        var deferred = $q.defer();

        $http.get($config.API_V1_URL + 'schools/' + query)
        // $http.get('http://nyc-education-data-service.herokuapp.com/api/v1/schools/search_by_name_or_dbn?name_or_dbn=' + query)
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    }
    return {
        getSchools: getSchools
    };
})
