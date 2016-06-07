/* global angular */

var nyc_controllers = angular.module('controllers_nyce.testscores', ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete", "filters_nyce"]);

nyc_controllers.controller("TestScoreCtrlYearEl", ['$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {

    var vElaScores,vMathScores,vAverageProficiencyScoreELA,vAverageProficiencyScoreMath;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    var lengthAvailableYears = 0, 
      testScoresByYearTotal = DatosSchool.datos.evaluations.length,
      testScoresFirstYear = parseInt(DatosSchool.datos.evaluations[0].year,10),
      selectedYear = testScoresFirstYear;

    for (i = 0; i < 5; i++) {
  		vElaScores = DatosSchool.SearchValuesElaScores(i);
  		vMathScores = DatosSchool.SearchValuesMathScores(i);
  		vAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(i);
  		vAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(i);
  		if ( vElaScores || vMathScores || vAverageProficiencyScoreELA || vAverageProficiencyScoreMath ){
  			availableYears.push(i);
  		}
    }

    lengthAvailableYears = availableYears.length;
    if (lengthAvailableYears == 5) {
      availableYears.shift(); 
    }
    
    for (i = 0; i < availableYears.length; i++) {
      var item = {
        texto: ((testScoresFirstYear + availableYears[i] - 1).toString() +' - ').concat(((testScoresFirstYear + availableYears[i])).toString()),
        // texto: ((2010+availableYears[i]).toString() +' - ').concat((2011+availableYears[i]).toString()),
        indice: availableYears[i],
        index: i
      };
      arrayAvailableYears.push(item);
      // $rootScope.TestScoreSelectedYear = (2011+availableYears[i]).toString();
      $rootScope.TestScoreSelectedYear= arrayAvailableYears[arrayAvailableYears.length-1].texto;
    }
    // $rootScope.TestScoreSelectedYear= arrayAvailableYears[arrayAvailableYears.length-1].texto;

    function setYear(e){
    	if(typeof e !== 'undefined'){
    		e.stopPropagation();
    	}
    	var evaluationsELA = DatosSchool.getTestScoreEvaluationData('ela', $scope.TestScoreSelectedYear),
    		evaluationsMath = DatosSchool.getTestScoreEvaluationData('math', $scope.TestScoreSelectedYear);

	    $rootScope.TestScoreCategories = angular.extend(DatosSchool.getTestScoreCategoriesList(evaluationsELA), DatosSchool.getTestScoreCategoriesList(evaluationsMath));
	    var categIndiceIndex = 0;
	    $rootScope.TestScoreCategories.map(function(item, index){
			if(item.indice == $rootScope.TestScoreSelectedCategoryIndex){
				categIndiceIndex = index;
			}
		});
	    $rootScope.TestScoreSelectedCategory = $rootScope.TestScoreCategories[categIndiceIndex].texto;

	    // Establecemos por defecto que la categoría es All Students
	    evaluationsELA = DatosSchool.getTestScoreEvaluationData('ela', $scope.TestScoreSelectedYear, $rootScope.TestScoreSelectedCategoryIndex);
	    evaluationsMath = DatosSchool.getTestScoreEvaluationData('math', $scope.TestScoreSelectedYear, $rootScope.TestScoreSelectedCategoryIndex);

	    var indice = $rootScope.itemsYearsTestScoreEl[arrayAvailableYears.length-1].indice;

	    if ($rootScope.arrayAvailableYearsTestScoreEs.length > 0) {

			if(evaluationsELA.length > 0){
				DatosSchool.datos.evaluations_ela.map(function(item, index){
					if(item.id == evaluationsELA[0].id){
						indice = index;
					}
				});
			}

			$rootScope.evaluation_ela = DatosSchool.datos.evaluations_ela[indice];
			$rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);

			if(evaluationsMath.length > 0){
				DatosSchool.datos.evaluations_ela.map(function(item, index){
					if(item.id == evaluationsMath[0].id){
						indice = index;
					}
				});
			}

			$rootScope.evaluation_math = DatosSchool.datos.evaluations_math[indice];
			$rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);

			// fixing Average Proficiency Score for default year (2013-2014)
			if ((DatosSchool.SearchValuesAverageProficiencyScoreELA(indice)) && (DatosSchool.SearchValuesAverageProficiencyScoreMath(indice))) {
				$rootScope.valuesAverageProficiencyScore = true;
			}else{
				$rootScope.valuesAverageProficiencyScore = false;
			};
			// fixing

			indice = $rootScope.itemsYearsTestScoreEl[arrayAvailableYears.length-1].indice;

			$rootScope.city_average = DatosSchool.datos.city_averages[indice];
			$rootScope.proficiency_ratings = DatosSchool.datos.proficiency_rating[indice];
	    }
    }

    $scope.changeyear = function(indice_year) {

      var ind;
      $.each($rootScope.itemsYearsTestScoreEl, function(i, v) {
        if (v.indice == indice_year) {
          ind = i;
          selectedYear = v.year;
        };
      });

      $rootScope.selectedyear_testScore_year_el = $rootScope.itemsYearsTestScoreEl[ind].texto;
      $rootScope.TestScoreSelectedYear = $rootScope.selectedyear_testScore_year_el.substr(-4);
      $rootScope.TestScoreSelectedCategoryIndex = 0;

      setYear();

      // $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice_year];
      // $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice_year];
      // $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
      // $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];

      // $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice_year);
      // $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice_year);

      // if ((DatosSchool.SearchValuesAverageProficiencyScoreELA(indice_year)) && (DatosSchool.SearchValuesAverageProficiencyScoreMath(indice_year))) {
      //   $rootScope.valuesAverageProficiencyScore = true;
      //   // console.log(indice_year,"indice_year");
      // }else{
      //   $rootScope.valuesAverageProficiencyScore = false;
      //   // console.log(indice_year,"indice_year");
      // };
    };



    $rootScope.arrayAvailableYearsTestScoreEs = arrayAvailableYears;
    jsonAvaylableYears = JSON.stringify(arrayAvailableYears);
    $rootScope.itemsYearsTestScoreEl = JSON.parse(jsonAvaylableYears);

    if(arrayAvailableYears.length){
    	$rootScope.TestScoreSelectedCategoryIndex = 0;
	    $rootScope.selectedyear_testScore_year_el = $rootScope.itemsYearsTestScoreEl[arrayAvailableYears.length-1].texto;

	    $rootScope.$on('TestScoreCategoryChange', setYear);
	    setYear(); // Init the content
    }

}]);

nyc_controllers.controller("TestScoreCtrlYearHs" ,[ '$scope', 'DatosSchool', '$rootScope','$location', '$routeParams', '$route',function ($scope, DatosSchool, $rootScope, $location, $routeParams, $route) {
    var vSat,vRegentsPassRate,vRegentsAverageScore,vRegentsRegentsCollegeReady;
    var availableYears = [];
    var arrayAvailableYears = [];
    var jsonAvaylableYears = "";
    var testScoresByYearTotal = DatosSchool.datos.evaluations.length,
      testScoresFirstYear = parseInt(DatosSchool.datos.evaluations[0].year,10),
      selectedYear = testScoresFirstYear;

    for (i = 0; i < 5; i++) {
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
        texto: ((testScoresFirstYear - 1 + i).toString() +' - ').concat(((testScoresFirstYear) + i).toString()),
        // texto: ((2010+availableYears[i]).toString() +' - ').concat((2011+availableYears[i]).toString()),
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
      $('#onlyHS').remove();
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-elementary').removeClass('borrar');
      $('#testScore-elementary').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsTestScoreEs.length == 0) && ($rootScope.arrayAvailableYearsTestScoreHs.length > 0)){
      $('#allSchools').remove();
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-high').removeClass('borrar');
      $('#testScore-high').addClass('mostrar');
    }else if (($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && ($rootScope.arrayAvailableYearsTestScoreHs.length > 0)) {
      $('#onlyHS').remove();
      $('#selectTestScore').removeClass('borrar');
      $('#selectTestScore').addClass('mostrar');
    }else{
      $('#onlyHS').remove();
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

      if (DatosSchool.SearchValuesRegentsPassRate(indice)) {
        $rootScope.valuesRegentsPassRate = true;
        $rootScope.valuesRegentsPassRateND = false;
      }else{
        $rootScope.valuesRegentsPassRateND = true;
        $rootScope.valuesRegentsPassRate = false;
      }

      if (DatosSchool.SearchValuesRegentsAverageScore(indice)) {
        $rootScope.valuesRegentsAverageScore = true;
        $rootScope.valuesRegentsAverageScoreND = false;
      }else{
        $rootScope.valuesRegentsAverageScoreND = true;
        $rootScope.valuesRegentsAverageScore = false;
      }

      if (DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice)) {
        $rootScope.valuesRegentsRegentsCollegeReady = true;
        $rootScope.valuesRegentsRegentsCollegeReadyND = false;
      }else{
        $rootScope.valuesRegentsRegentsCollegeReadyND = true;
        $rootScope.valuesRegentsRegentsCollegeReady = false;
      }
    };


    $scope.changeyear = function(indice_year) {
      var ind;
      $.each($scope.itemsYears, function(i, v) {
        if (v.indice == indice_year) {
          ind = i;
          selectedYear = v.year;
        };
      });

      $rootScope.selectedyear_testScore_year_hs = $scope.itemsYears[ind].texto;
      $rootScope.city_average=DatosSchool.datos.city_averages[indice_year];
      $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice_year];
      $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice_year];
      $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice_year];
      $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice_year);

      if (DatosSchool.SearchValuesRegentsPassRate(indice_year)) {
        $rootScope.valuesRegentsPassRate = true;
        $rootScope.valuesRegentsPassRateND = false;
      }else{
        $rootScope.valuesRegentsPassRateND = true;
        $rootScope.valuesRegentsPassRate = false;
      };

      if (DatosSchool.SearchValuesRegentsAverageScore(indice_year)) {
        $rootScope.valuesRegentsAverageScore = true;
        $rootScope.valuesRegentsAverageScoreND = false;
      }else{
        $rootScope.valuesRegentsAverageScoreND = true;
        $rootScope.valuesRegentsAverageScore = false;
      }

      if (DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice_year)) {
        $rootScope.valuesRegentsRegentsCollegeReady = true;
        $rootScope.valuesRegentsRegentsCollegeReadyND = false;
      }else{
        $rootScope.valuesRegentsRegentsCollegeReadyND = true;
        $rootScope.valuesRegentsRegentsCollegeReady = false;
      }
    };
}]);

nyc_controllers.controller("SelectTestScores" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {

  var availableGrades3rd = [];
  var availableGrades4th = [];
  var availableGrades5th = [];

  for (i = 0; i < 4; i++) {
    var vGrade3rdEla = DatosSchool.SearchTestScoreGrade3rdEla(i);
    var vGrade4thEla = DatosSchool.SearchTestScoreGrade4thEla(i);
    var vGrade5thEla = DatosSchool.SearchTestScoreGrade5thEla(i);
      if ( vGrade3rdEla ){
        availableGrades3rd.push(i);
      }
      if ( vGrade4thEla ){
        availableGrades4th.push(i);
      }
      if ( vGrade5thEla ){
        availableGrades5th.push(i);
      }
  };

  $scope.SelectTestScores_si= "Select";
  var selectTestScore = [{texto:"Middle",indice:"0"},{texto:"High",indice:"1"}];
  var sum = availableGrades3rd.length + availableGrades4th.length + availableGrades5th.length ;
  if ( sum > 0) {
    var itemSelect = {
      texto: "Elementary",
      indice: 2
    }
    selectTestScore.push(itemSelect);
  }
  $scope.items_selec_testScore = selectTestScore;
  
  // updategrades
  $scope.updategrades = function() {
    var vGrade3rdEla,vGrade4thEla,vGrade5thEla,vGrade6thEla,vGrade7thEla,vGrade8thEla;
    // var availableGrades3rd = [];
    // var availableGrades4th = [];
    // var availableGrades5th = [];
    var availableGrades6th = [];
    var availableGrades7th = [];
    var availableGrades8th = [];

    var arrayAvailableGrades = [];
    var arrayAvailableAllGrades = [];
    var jsonArrayAvailableAllGrades = "";


    // for (i = 0; i < 4; i++) {
    // vGrade3rdEla = DatosSchool.SearchTestScoreGrade3rdEla(i);
    //   if ( vGrade3rdEla ){
    //     availableGrades3rd.push(i);
    //   }
    // };
    // for (i = 0; i < 4; i++) {
    // vGrade4thEla = DatosSchool.SearchTestScoreGrade4thEla(i);
    //   if ( vGrade4thEla ){
    //     availableGrades4th.push(i);
    //   }
    // };
    // for (i = 0; i < 4; i++) {
    // vGrade5thEla = DatosSchool.SearchTestScoreGrade5thEla(i);
    //   if ( vGrade5thEla ){
    //     availableGrades5th.push(i);
    //   }
    // };
    for (i = 0; i < 4; i++) {
    vGrade6thEla = DatosSchool.SearchTestScoreGrade6thEla(i);
      if ( vGrade6thEla ){
        availableGrades6th.push(i);
      }
    };
    for (i = 0; i < 4; i++) {
    vGrade7thEla = DatosSchool.SearchTestScoreGrade7thEla(i);
      if ( vGrade7thEla ){
        availableGrades7th.push(i);
      }
    };
    for (i = 0; i < 4; i++) {
    vGrade8thEla = DatosSchool.SearchTestScoreGrade8thEla(i);
      if ( vGrade8thEla ){
        availableGrades8th.push(i);
      }
    };
    if ($rootScope.levelSelected === "Elementary") {
      if (availableGrades3rd.length > 0) {
        arrayAvailableGrades.push('3rd');
      };
    }
    if ($rootScope.levelSelected === "Elementary") {
      if (availableGrades4th.length > 0) {
        arrayAvailableGrades.push('4th');
      };
    }
    if ($rootScope.levelSelected === "Elementary") {
      if (availableGrades5th.length > 0) {
        arrayAvailableGrades.push('5th');
      };
    }
    if ($rootScope.levelSelected === "Middle") {
      if (availableGrades6th.length > 0) {
        arrayAvailableGrades.push('6th');
      };
    }
    if ($rootScope.levelSelected === "Middle") {
      if (availableGrades7th.length > 0) {
        arrayAvailableGrades.push('7th');
      };
    }
    if ($rootScope.levelSelected === "Middle") {
      if (availableGrades8th.length > 0) {
        arrayAvailableGrades.push('8th');
      };
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

    if (($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && (arrayAvailableAllGrades.length > 0)) {
        $rootScope.testScore_grade = $rootScope.itemsGrades[0].filtroGrade;
        // $scope.selectedgrade = $rootScope.itemsGrades[0].texto;
        $rootScope.GradesAvailable = true;
    };

    // if ($rootScope.levelSelected === "Middle") {
    //   $scope.selectedgrade = "6th";
    // } else if ($rootScope.levelSelected === "Elementary") {
    //   $scope.selectedgrade = "3rd";
    // }
  };
  // updategrade ends
  $scope.change_selec_testScore = function(indice) {
  if (indice=="0"){

    var indice = 2;
    // probando con número 3 por 2013 (default year)
    // $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[3];
    // $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[3];
    // fin de actualización con número 3
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];

    $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);
    $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);
    $rootScope.valuesAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(indice);
    $rootScope.valuesAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(indice);
    $rootScope.selectedyear_testScore_year_el= "2013";
    $rootScope.levelSelected = "Middle";
    $scope.selectedgrade = "6th";

	$('#testScore-elementary').removeClass('borrar');
	$('#testScore-elementary').addClass('mostrar');
	$('#testScore-all').removeClass('borrar');
	$('#testScore-all').addClass('mostrar');
	$('#testScore-high').removeClass('mostrar');
	$('#testScore-high').addClass('borrar');

    // $scope.SelectTestScores_si = $scope.items_selec_testScore[0].texto;
  }else if (indice=="1"){
    $('#allSchools').show();

    var indice = 2;
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.evaluation_average_score=DatosSchool.datos.evaluations_average_score[indice];
    $rootScope.evaluation_regents=DatosSchool.datos.evaluations_regents[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];

    $rootScope.valuesSat = DatosSchool.SearchValuesSat(indice);
    // probando con número 3 por 2013 (default year)
    // $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(indice);
    $rootScope.valuesRegentsPassRate = DatosSchool.SearchValuesRegentsPassRate(3);
    // $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(indice);
    $rootScope.valuesRegentsAverageScore = DatosSchool.SearchValuesRegentsAverageScore(3);
    // $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(indice);
    $rootScope.valuesRegentsRegentsCollegeReady = DatosSchool.SearchValuesRegentsRegentsCollegeReady(3);
    // fin - probando con número 3 por 2013 (default year)
    $rootScope.selectedyear_testScore_year_hs= "2013";
    $rootScope.levelSelected = "High";

      $('#testScore-high').removeClass('borrar');
      $('#testScore-high').addClass('mostrar');
      $('#testScore-all').removeClass('borrar');
      $('#testScore-all').addClass('mostrar');
      $('#testScore-elementary').removeClass('mostrar');
      $('#testScore-elementary').addClass('borrar');

    // $scope.SelectTestScores_si = $scope.items_selec_testScore[1].texto;
  }
  // implementing Elementary
  else if (indice=="2"){
    var indice = 2;
    // probando con 3 por 2013 (default year)
    // antes: $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[indice];
    $rootScope.evaluation_ela=DatosSchool.datos.evaluations_ela[3];
    // antes: $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[indice];
    $rootScope.evaluation_math=DatosSchool.datos.evaluations_math[3];
    // fin de actualización con número 3
    $rootScope.city_average=DatosSchool.datos.city_averages[indice];
    $rootScope.proficiency_ratings=DatosSchool.datos.proficiency_rating[indice];
    $rootScope.valuesElaScores = DatosSchool.SearchValuesElaScores(indice);
    $rootScope.valuesMathScores = DatosSchool.SearchValuesMathScores(indice);
    $rootScope.valuesAverageProficiencyScoreELA = DatosSchool.SearchValuesAverageProficiencyScoreELA(indice);
    $rootScope.valuesAverageProficiencyScoreMath = DatosSchool.SearchValuesAverageProficiencyScoreMath(indice);
    $rootScope.selectedyear_testScore_year_el= "2013";
    $rootScope.levelSelected = "Elementary";
    $scope.selectedgrade = "3rd";

    $('#testScore-elementary').removeClass('borrar');
    $('#testScore-elementary').addClass('mostrar');
    $('#testScore-all').removeClass('borrar');
    $('#testScore-all').addClass('mostrar');
    $('#testScore-high').removeClass('mostrar');
    $('#testScore-high').addClass('borrar');

    // $scope.SelectTestScores_si = $scope.items_selec_testScore[1].texto;
  }
  // implementing Elementary
  };
}]);

nyc_controllers.controller("TestScoreGradedCtrl", ['$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {
    var tipoEscuela = $rootScope.tipoDeEscuela;
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
    var levelSel = $rootScope.levelSelected;

    // Presenta 'All Grades' como opción inicial
    arrayAvailableAllGrades.push({
      texto: "All Grades",
      filtroGrade: "0",
      indice: 0
    });

    $scope.selectedgrade = arrayAvailableAllGrades[0].texto;

    for (i = 0; i < 5; i++) {
    	vGrade3rdEla = DatosSchool.SearchTestScoreGrade3rdEla(i);
		if ( vGrade3rdEla ){
			availableGrades3rd.push(i);
		}
    };
    for (i = 0; i < DatosSchool.datos.evaluations_ela.length; i++) {
    vGrade4thEla = DatosSchool.SearchTestScoreGrade4thEla(i);
      if ( vGrade4thEla ){
        availableGrades4th.push(i);
      }
    };
    for (i = 0; i < 5; i++) {
    vGrade5thEla = DatosSchool.SearchTestScoreGrade5thEla(i);
      if ( vGrade5thEla ){
        availableGrades5th.push(i);
      }
    };
    for (i = 0; i < 5; i++) {
    vGrade6thEla = DatosSchool.SearchTestScoreGrade6thEla(i);
      if ( vGrade6thEla ){
        availableGrades6th.push(i);
      }
    };
    for (i = 0; i < 5; i++) {
    vGrade7thEla = DatosSchool.SearchTestScoreGrade7thEla(i);
      if ( vGrade7thEla ){
        availableGrades7th.push(i);
      }
    };
    for (i = 0; i < 5; i++) {
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
        indice: i+1
      };
      arrayAvailableAllGrades.push(item);
    };

    jsonArrayAvailableAllGrades = JSON.stringify(arrayAvailableAllGrades);
    $rootScope.itemsGrades = JSON.parse(jsonArrayAvailableAllGrades);

    if (parseInt(arrayAvailableAllGrades[0].texto.charAt(0)) >= 3 && parseInt(arrayAvailableAllGrades[0].texto.charAt(0)) < 6) {
      $rootScope.elementaryOnly = "okE";
      $scope.selectedgrade = arrayAvailableAllGrades[0].texto;
    } else if (parseInt(arrayAvailableAllGrades[0].texto.charAt(0)) >= 6 && parseInt(arrayAvailableAllGrades[0].texto.charAt(0)) < 9) {
      $rootScope.middleOnly = "okM";
      $scope.selectedgrade = arrayAvailableAllGrades[0].texto;
    }

    if (($rootScope.arrayAvailableYearsTestScoreEs.length > 0) && (arrayAvailableAllGrades.length > 0)) {
        $rootScope.testScore_grade = $rootScope.itemsGrades[0].filtroGrade;
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
      $scope.selectedgrade = $scope.itemsGrades[indice_grade].texto;

    };
}]);

nyc_controllers.controller("TestScoreCtrlCategory" ,[ '$scope', 'DatosSchool', '$rootScope',function ($scope, DatosSchool, $rootScope) {


  $scope.changegenere = function(indice) {
    $rootScope.TestScoreSelectedCategoryIndex = indice;
    $rootScope.$emit('TestScoreCategoryChange');
  };

}]);
