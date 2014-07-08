var app = angular.module("nyce", ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","filters_nyce","controllers_nyce"]);

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
        datos: {},
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
          if(GetUniqueElementsArray(ValuesStudentsEnrolledGrade).length > 0)
              { return true }
          else{ return false }  
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
          ValuesGraduation.push(this.datos.college_careers[indice]['postsecondary_enrollment_rate_6months']);
          ValuesGraduation.push(this.datos.college_careers[indice]['transfer_s_graduation_r']);
          if(GetUniqueElementsArray(ValuesGraduation).length > 0)
            { return true }
          else{ return false }      
        },
        SearchValuesSat: function(indice){
          var ValuesSat = [];
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
          ValuesAverageProficiencyScoreELA.push(this.datos.evaluations_ela[indice]['av_proficiency_rating_ela']);
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
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['av_proficiency_rating_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['3rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['4rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['5rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['6rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['7rd_a_p_r_math']);
          ValuesAverageProficiencyScoreMath.push(this.datos.evaluations_math[indice]['8rd_a_p_r_math']);
          if(GetUniqueElementsArray(ValuesAverageProficiencyScoreMath).length > 0)
            { return true }
          else{ return false }      
        }




    };
});



// FIN CONTROLADORES SURVEY


function AccordionDemoCtrl($scope , $rootScope) {
  $rootScope.oneAtATime = false;
}


app.factory('SchoolRetriever', function($http, $q, $timeout) {
    var getSchools = function(query) {
        var deferred = $q.defer();

        $http.get('http://162.243.110.154/api/v1/schools/' + query)
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




