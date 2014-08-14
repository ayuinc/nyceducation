
angular.module('filters_nyce', ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","controllers_nyce"])

.filter("filtraCeros", function(){
    return function(text) { 

        if (text == "0.00" || text == "0" || text == ""){ return "borrar";}

    } 
})

.filter("filtraCerosNull", function(){
    return function(text) { 

        if (text == null || text == "0" || text == ""){ return "borrar";}

    } 
})

.filter("filterNull", function(){
    return function(text) { 

        if (text == null){ return "borrar";}

    } 
})

.filter("filtraGrado", function( $rootScope ){

    return function(text) {

        if ( text != $rootScope.testScore_grade){ return "borrar";}

    }
})


.filter("filtraRank", function( $rootScope, DatosSchool ){


    return function(text) {


        if ( (text >= 1) && (text < 25 )){ return '25';}
        else if ( (text >= 25) && (text < 50 )){ return '50';}
        else if ( (text >= 50) && (text < 75 )){ return '75';}
        else if ( (text >= 75) && (text <= 100 )){ return "100";}
        else { return "n";}


    }
})



.filter("filtraSurvey", function( $rootScope, DatosSchool ){


    return function(text) {

    var who = $rootScope.survey_var;


    if ( (text == "parents") && (who != 0) ){ return "borrar";}
    else if ( (text == "teachers") && (who != 1)){ return "borrar";} 
    else if ( (text == "students") && (who != 2)){ return "borrar";}        

    }
})


.filter("filtraOverallEvaluations", function(){
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
})


.filter("filtraqr", function(){
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
})

.filter("filtroDivMil", function(){
    return function(text) {

var num = parseInt(text);
var valval = (1000*num)/100;

return valval;
    }
})


.filter("redondea", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(1)+"%";
}

    }
})

.filter("redondeaSinPorcentaje", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(1);
}

    }
})
.filter("redondea2", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "0.0%";
}
else {
    return parseFloat(text).toFixed(1)+"%";
}

    }
})

.filter("redondea_sp", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return text;
}

    }
})

.filter("redondea_sp_1", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(1);
}

    }
})

.filter("redondea_entero", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "N/A";
}
else {
    return parseFloat(text).toFixed(0);
}

    }
})



.filter("fitrar_srd_11_12", function(){
    return function(text) {

if (text == "2011" || text == "2012"){
    return "borrar";
}

    }
})

.filter("fitrar_srd_11", function(){
    return function(text) {

if (text == "2011"){
    return "borrar";
}

    }
})

.filter("EscalaAverageTestScore", function(){
    return function(text) {

        var num = parseFloat(text);

        var val = (num*100)/(4.5);
        // console.log(val);
        return val;
    }
})

.filter("escala10", function(){
    return function(text) {

        var num = parseFloat(text);

        var val = (num*100)/(10);
        // console.log(val);
        return val;
    }
})

.filter("filtraweb", function(){
    return function(text) {

        var str = text.substring(0,7);
        // console.log(str);

        if (str != "http://") {

            return "http://"+text;
        }
        else{
            return text;
        }
    }
})


.filter("admission_e", function(){
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
})

.filter("filtraEnrollAtenda", function( $rootScope, DatosSchool ){

    return function(text) {

    var asd = $rootScope.enrollment['attendance_es_ms_k8_ec'];
    var asd1 = $rootScope.enrollment['attendance_hs_transfer_hs'];


    if (asd == "0.00" && asd == "0.00"){
        return "mostrar"
    }else{return "borrar"}
   
    }
})


.filter("filtrasat", function(){
    return function(text) {

        var num = parseInt(text);

        var val = (num*100)/(2400);
        // console.log(val);
        return val;
    }
})


.filter("filtrasat800", function(){
    return function(text) {

        var num = parseInt(text);

        var val = (num*100)/(800);
        // console.log(val);
        return val;
    }
})


;