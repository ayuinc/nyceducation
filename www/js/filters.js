
angular.module('filters_nyce', ["mm.foundation","ngRoute", "ngAnimate", "ngTouch", "autocomplete","controllers_nyce"])

.filter("iconPosition", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
          switch(text) {
          case 1:
              return '250px';
              break;
          case 2:
              return '128px';
              break;
          case 3:
              return '187px';
              break;
          case 4:
              return '228px';
              break;
          case 5:
              return '262px';
              break;
          case 6:
              return '262px';
              break;
          case 7:
              return '262px';
              break;
          case 8:
              return '163px';
              break;
          case 9:
              return '151px';
              break;
          case 10:
              return '193px';
              break;
          }

        }else{

          switch(text) {
          case 1:
              return '211px';
              break;
          case 2:
              return '97px';
              break;
          case 3:
              return '105px';
              break;
          case 4:
              return '203px';
              break;
          case 5:
              return '152px';
              break;
          case 6:
              return '183px';
              break;
          case 7:
              return '183px';
              break;
          case 8:
              return '134px';
              break;
          case 9:
              return '126px';
              break;
          case 10:
              return '139px';
              break;
          }

        };
    }
})

.filter("middleschool", function($rootScope) {

})

.filter("translateGlobal", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'City Average'){ return "Promedio de la ciudad";}
            else if (text == 'Select'){ return "Seleccionar";}
            else if (text == 'Rank'){ return "Rango";}
            else if (text == 'Avg.'){ return "Promedio";}
            else if (text == "Unavailable for the selected year"){ return "No disponible para el año seleccionado";}
            // else if (text == 'N/A'){ return "No disponible para el año seleccionado";}
            else if (text == 'Program'){ return "Programa";}
            else if (text == 'Middle'){ return "Intermedia";}
            else if (text == 'High'){ return "Secundaria";}
            else if (text == 'Elementary'){ return "Primaria";}
            else if (text == 'Rank'){ return "Rango";}
            else if (text == 'Avg.'){ return "Promedio";}
            else if (text == 'Pre - K'){ return "Pre - Kínder";}
            else if (text == 'K'){ return "Kínder";}
            else if (text == 'All Grades'){ return "Todos los grados";}
            else if (text == '1st'){ return "1.º";}
            else if (text == '2nd'){ return "2.º";}
            else if (text == '3rd'){ return "3.º";}
            else if (text == '4th'){ return "4.º";}
            else if (text == '5th'){ return "5.º";}
            else if (text == '6th'){ return "6.º";}
            else if (text == '7th'){ return "7.º";}
            else if (text == '8th'){ return "8.º";}
            else if (text == '9th'){ return "9.º";}
            else if (text == '10th'){ return "10.º";}
            else if (text == '11th'){ return "11.º";}
            else if (text == '12th'){ return "12.º";}

        }else{ return text; };
    }
})

.filter("translateMain", function($rootScope){
    return function(text) {

        if ($rootScope.lenguage == "esp") {
            if (text == 'School'){ return "Escuela";}
            else if (text == 'Welcome'){ return "Bienvenidos";}
            else if (text == 'Address'){ return "Dirección";}
            else if (text == 'Your address'){ return "Tu dirección";}
            else if (text == 'School Name'){ return "Nombre de la escuela";}
            else if (text == 'Disclaimer'){ return "Cláusula de exención de responsabilidad";}
            else if (text == 'Search'){ return "Buscar";}
            else if (text == 'This application is not a product of the NYC Department of Education and is not endorsed by the NYCDOE. NYCDOE is not responsible for the accuracy of the content of the application. Use of this application is not a requirement of NYCDOE admissions.'){ return "Esta aplicación no es un producto del Departamento de Educación de la Ciudad de Nueva York y dicha entidad no la avala. El NYCDOE no se hace responsable por la exactitud del contenido de la aplicación. El uso de esta aplicación no es un requisito de admisión del NYCDOE.";}
        }else{ return text; };
    }
})

.filter("translateMenu", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Menu'){ return "Menú";}
            else if (text == 'Search'){ return "Buscar";}
            else if (text == 'Profile'){ return "Perfil";}
            else if (text == 'Demographics'){ return "Demografía";}
            else if (text == 'Enrollment'){ return "Inscripción";}
            else if (text == 'Admissions'){ return "Admisiones";}
            else if (text == 'Test Scores'){ return "Puntajes en los exámenes";}
            else if (text == 'Evaluations'){ return "Evaluaciones";}
            else if (text == 'Survey Results'){ return "Resultados de la encuesta";}
            else if (text == 'College & Career'){ return "Universidad y Carrera";}
            else if (text == 'Glossary of Terms'){ return "Glosario de términos";}
            else if (text == 'Glossary'){ return "Glosario";}
            else if (text == 'Results by distance'){ return "Resultados por distancia";}
        }else{ return text; };
    }
})

.filter("translateProfile", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Principal'){ return "Director";}
            else if (text == 'District'){ return "Distrito";}
            else if (text == 'Grade Served'){ return "Grados ofrecidos";}
            else if (text == 'Total Enrollment'){ return "Total de estudiantes inscritos";}
            else if (text == 'Year Opened'){ return "Año de apertura";}
            else if (text == 'Shared Site'){ return "Sede compartida";}
            else if (text == 'Phone'){ return "Teléfono";}
            else if (text == 'Website'){ return "Sitio web";}
            else if (text == 'Address'){ return "Dirección";}
            else if (text == 'Yes'){ return "Sí";}
            else if (text == 'No'){ return "No";}
        }else{ return text; };
    }
})

.filter("translateDemographics", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Demographics'){ return "Demografía";}
            else if (text == 'Gender'){ return "Género";}
            else if (text == 'Female'){ return "Mujeres";}
            else if (text == 'Male'){ return "Hombres";}
            else if (text == 'Ethnicity'){ return "Grupos étnicos";}
            else if (text == 'Asian'){ return "Asiáticos";}
            else if (text == 'Black'){ return "Negros";}
            else if (text == 'Hispanic'){ return "Latinos";}
            else if (text == 'Latino'){ return "Latinos";}
            else if (text == 'White'){ return "Blancos";}
            else if (text == 'Other'){ return "Otros";}
            else if (text == 'Status'){ return "Estado";}
            else if (text == 'Free / Reduced Lunch'){ return "Almuerzo gratuito o a precio reducido";}
            else if (text == 'Students with Disabilities'){ return "Estudiantes con discapacidades";}
            else if (text == 'English Language Learners'){ return "Estudiantes que aprenden inglés";}
            else if (text == 'All Students'){ return "Todos los estudiantes";}
            else if (text == "SWD") { return "SWD"; }
            else if (text == "No SWD") { return "No SWD"; }
        }else{ return text; };
    }
})

.filter("translateAdmissions", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Admissions'){ return "Admisiones";}
            else if (text == 'Description'){ return "Descripción";}
            else if (text == 'Program'){ return "Programa";}
            else if (text == 'Interest Area'){ return "Área de interés";}
            else if (text == 'Method'){ return "Método";}
            else if (text == 'Priority'){ return "Prioridad";}
            else if (text == 'Seats'){ return "Cupos";}
            else if (text == 'Applicants'){ return "Aspirantes";}
            else if (text == 'Additional Programs'){ return "Programas adicionales";}
        }else{ return text; };
    }
})

.filter("translateEnrollment", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Enrollment'){ return "Inscripción";}
            else if (text == 'Students Enrolled by Grade'){ return "Alumnos inscritos según el grado";}
            else if (text == 'Grade'){ return "Grado";}
            else if (text == 'No. Students'){ return "No. de estudiantes";}
            else if (text == 'Attendance Rate'){ return "Tasa de asistencia";}
            else if (text == 'Attendance'){ return "Asistencia a clases";}
        }else{ return text; };
    }
})

.filter("translateTestScore", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Test Scores'){ return "Puntajes en los exámenes";}
            else if (text == 'ELA Scores'){ return "Puntajes en ELA";}
            else if (text == 'Math Scores'){ return "Puntajes en matemática";}
            else if (text == 'Average Proficiency Score'){ return "Puntaje promedio de dominio";}
            else if (text == 'Average Proficiency Rating - ELA'){ return "Puntaje promedio de dominio- ELA";}
            else if (text == 'Average Proficiency Rating - Math'){ return "Puntaje promedio de dominio- Matemática";}
            // ORIGINAL
            else if (text == 'Average Proficiency Score- ELA'){ return "Puntaje promedio de dominio- ELA";}
            else if (text == 'Average Proficiency Score- Math'){ return "Puntaje promedio de dominio- Matemática";}
            // --
            else if (text == 'Level 1'){ return "Nivel 1";}
            else if (text == 'Level 2'){ return "Nivel 2";}
            else if (text == 'Level 3'){ return "Nivel 3";}
            else if (text == 'Level 4'){ return "Nivel 4";}
            else if (text == 'Average Proficiency Rating'){ return "Índice promedio de dominio";}
            else if (text == 'SAT'){ return "Examen SAT";}
            else if (text == 'No. Students'){ return "No. de estudiantes";}
            else if (text == 'Overall'){ return "General";}
            else if (text == 'Critical Reasoning'){ return "Razonamiento crítico";}
            else if (text == 'Math'){ return "Matemática";}
            else if (text == 'ELA'){ return "ELA";}
            else if (text == 'Writing'){ return "Escritura";}
            else if (text == 'Regents Pass Rate'){ return "Índice de aprobación de los exámenes Regents";}
            else if (text == 'English'){ return "Inglés";}
            else if (text == 'U.S. History'){ return "Historia de Estados Unidos";}
            else if (text == 'Global History'){ return "Historia universal";}
            else if (text == 'Earth Science'){ return "Ciencias de la Tierra";}
            else if (text == 'Living Environment'){ return "Medio ambiente y vida";}
            else if (text == 'Chemistry'){ return "Química";}
            else if (text == 'Physics'){ return "Física";}
            else if (text == 'Integrated Algebra'){ return "Álgebra integrada";}
            else if (text == 'Geometry'){ return "Geometría";}
            else if (text == 'Algebra II'){ return "Álgebra II";}
            else if (text == 'SAT'){ return "Examen SAT";}
            else if (text == 'Regents Average Score'){ return "Puntaje promedio en los exámenes Regents";}
            else if (text == 'Regents College Ready'){ return "Preparación universitaria Regents";}
        }else{ return text; };
    }
})

.filter("translateEvaluations", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Evaluations'){ return "Evaluaciones";}
            else if (text == 'Progress Report'){ return "Informe de progreso";}
            else if (text == 'Overall'){ return "General";}
            else if (text == 'Performance'){ return "Rendimiento";}
            else if (text == 'Progress'){ return "Progreso";}
            else if (text == 'Environment'){ return "Entorno";}
            else if (text == 'College and Career'){ return "Universidad y carreras profesionales";}
            else if (text == 'Quality Review'){ return "Revisión de calidad";}
            else if (text == 'Curriculum'){ return "Plan de estudios";}
            else if (text == 'Pedagogy'){ return "Pedagogía";}
            else if (text == 'Positive Learning Env.'){ return "Entorno de aprendizaje positivo";}
            else if (text == 'High expectations'){ return "Altas expectativas";}
            else if (text == 'Proficient'){ return "Competente";}
            else if (text == 'Well Developed'){ return "Bien desarrollada";}
            else if (text == 'Developing'){ return "En desarrollo";}
            else if (text == 'Underdeveloped'){ return "Poco desarrollada";}
            // else if (text == "'Proficient"){ return "Competente";}
            // else if (text == "'Well Developed"){ return "'Bien desarrollada";}
            // else if (text == "'Developing"){ return "En desarrollo";}
            // else if (text == "'Underdeveloped"){ return "Poco desarrollada";}

        }else{ return text; };
    }
})

.filter("translateSurvey", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Survey'){ return "Encuesta";}
            else if (text == 'Parents'){ return "Padres";}
            else if (text == 'Teachers'){ return "Maestros";}
            else if (text == 'Students'){ return "Estudiantes";}
            else if (text == 'Response Rate'){ return "Tasa de respuesta";}
            else if (text == 'Survey Questions'){ return "Preguntas de la encuesta";}
            else if (text == 'Strongly agree'){ return "Totalmente de acuerdo";}
            else if (text == 'Agree'){ return "De acuerdo";}
            else if (text == 'Strongly disagree'){ return "Totalmente en desacuerdo";}
            else if (text == 'Disagree'){ return "En desacuerdo";}
            else if (text == 'Very satisfied'){ return "Muy satisfecho";}
            else if (text == 'Satisfied'){ return "Satisfecho";}
            else if (text == 'Categories'){ return "Categorías";}
            else if (text == 'Safety and Respect'){ return "Seguridad y respeto";}
            else if (text == 'Engagement'){ return "Participación";}
            else if (text == 'Communication'){ return "Comunicación";}
            else if (text == 'Academic Expectations'){ return "Expectativas académicas";}
        }else{ return text; };
    }
})

.filter("translateCollegeCareer", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'College & Career'){ return "Universidad y carreras profesionales";}
            else if (text == 'College & Career Readiness'){ return "Preparación universitaria y vocacional";}
            else if (text == 'Credit Accumulation'){ return "Acumulación de créditos";}
            else if (text == 'Four-Year Non-Remediation Rate'){ return "índice de no recuperación de cuatro años";}
            else if (text == 'College & Career Preparatory Course Index'){ return "Índice de alumnos que aprueban cursos preparatorios para la universidad y la vida profesional";}
            else if (text == 'College Readiness Rate Including Persistence'){ return "Índice de preparación para la universidad, incluyendo el concepto de permanencia";}
            else if (text == 'Graduation'){ return "Graduación";}
            else if (text == 'Post-Secondary Enrollment Rate'){ return "Tasa de inscripción pos-secundaria";}
            else if (text == 'Four-Year Graduation Rate'){ return "Índice de graduación en cuatro años";}
            else if (text == '6 year Graduation Rate'){ return "Índice de graduación en seis años";}
            else if (text == 'Transfer School Graduation Rate'){ return "Tasa de graduación de escuela de transferencia";}
        }else{ return text; };
    }
})

.filter("translateGlosary", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'Percentage of students who graduated with a Regents or Local Diploma within four years of beginning high school, including August graduates.  Citywide graduation rates are as reported by New York State Department of Education while individual school graduation rates are as reported by NYC DOE.'){ return "Porcentaje de estudiantes que se graduaron con un diploma Regents o diploma local, dentro de los cuatro años siguientes de haber empezado la escuela secundaria, incluyendo a los graduandos de agosto.  Las tasa de graduación a nivel de la ciudad son reportadas por el Departamento de Educación del Estado de Nueva York, mientras que las tasas de graduación de cada escuela en particular, son reportadas por el NYC DOE.";}
            else if (text == 'Percentage of students who graduated with a Regents or Local Diploma within six years of beginning high school, including August graduates. Citywide graduation rates are as reported by New York State Department of Education while individual school graduation rates are as reported by NYC DOE.'){ return "Porcentaje de estudiantes que se graduaron con un diploma Regents o diploma local, dentro de los seis años siguientes de haber empezado la escuela secundaria, incluyendo a los graduandos de agosto. Las tasa de graduación a nivel de la ciudad son reportadas por el Departamento de Educación del Estado de Nueva York, mientras que las tasas de graduación de cada escuela en particular, son reportadas por el NYC DOE.";}
            else if (text == 'Measures whether respondents feel that the school encourages students to do their best by developing rigorous and meaningful academic goals.'){ return "Mide el grado en el que el encuestado siente que la escuela alienta a los estudiantes a dar lo mejor de sí, mediante la elaboración de objetivos académicos rigurosos y significativos.";}
            else if (text == 'Total number of students who applied for admission to a program in the September of the selected year.'){ return "Número total de estudiantes que solicitaron un cupo a un programa en septiembre del año seleccionado.";}
            else if (text == 'Includes the attendance days for all students on a school’s register at any point during the regular school year (September through June). Calculated by adding the total number of days attended by all students and dividing it by the total number of days on register for all students.'){ return "Incluye los días de asistencia para todos los estudiantes en la matrícula de una escuela, en cualquier punto del año lectivo regular (de septiembre a junio). Se calcula sumando el número total de días en que asistieron todos los estudiantes y dividiéndolo por el número total de días matriculados para todos los alumnos.";}
            else if (text == 'Provides the average performance level by grade level  on New York State ELA test of students who took the test.'){ return "Proporciona el nivel promedio de dominio por grado, en el examen ELA del Estado de Nueva York, de los estudiantes que lo presentaron.";}
            else if (text == 'Provides the average performance level by grade level on New York State Math test of students who took the test.'){ return "Proporciona el nivel promedio de dominio por grado, en el examen de Matemáticas del Estado de Nueva York, de los estudiantes que lo presentaron.";}
            else if (text == 'Provides the average performance level on New York State ELA and Math test of students who took the test at the school.'){ return "Proporciona el nivel promedio de rendimiento en el Estado de Nueva York de las pruebas de ELA y Matemáticas de los estudiantes que tomaron el examen en la escuela.";}
            else if (text == 'Average SAT score of students at the school taking the exam, a globally recognized college admission test that tests knowledge of critical  reading, writing and math.'){ return "Puntaje promedio obtenido en el SAT por los estudiantes de la escuela que lo presentaron, el cual es un examen de admisión a la universidad, mundialmente reconocido y que mide conocimientos críticos de lectura, redacción y matemáticas.";}
            else if (text == 'The percentage of students in the school’s four-year cohort who have successfully completed approved rigorous courses and assessments after four years of high school.'){ return "El porcentaje de estudiantes dentro del cohorte de cuatro años de la escuela, que han completado satisfactoriamente los rigurosos cursos y evaluaciones aprobadas, luego de cuatro años de escuela secundaria.";}
            else if (text == 'Percentage of students in the six-year cohort who 1) graduated with a Regents diploma and have met City University of New York\'s (CUNY) standards for English and mathematics, or 2) graduated, enrolled and persisted through 3 consecutive semesters of college within six years of graduating.'){ return "Porcentaje de estudiantes en el cohorte de seis años que 1) se graduaron con un diploma Regents y cumplieron con los estándares que la Universidad de la Ciudad de Nueva York (CUNY) establece para inglés y matemáticas o 2) se graduaron, se inscribieron y permanecieron por tres semestres consecutivos de universidad, dentro de los seis años subsiguientes a la graduación.";}
            else if (text == 'Measures whether respondents feel that the school provides them with information about the school’s educational goals and offers appropriate feedback on each student’s learning outcomes.'){ return "Mide el grado en el que el encuestado siente que la escuela les da información sobre los objetivos académicos y ofrece sugerencias adecuadas en lo concerniente a los resultados de aprendizaje de cada estudiante.";}
            else if (text == 'Percentage of students who accumulate 10 or more academic credits in their first year of high school, with a particular focus on credits earned in English, math, science and social studies.  Credit accumulation is a strong indicator that a student is on track to graduation.'){ return "Porcentaje de estudiantes que acumulan 10 o más créditos académicos en el primer año de escuela secundaria, con un énfasis particular en créditos obtenidos en las áreas de inglés, matemáticas, ciencias y estudios sociales.  La acumulación de créditos es un sólido indicador de que el estudiante se encuentra encaminado hacia la graduación.";}
            else if (text == 'Measures the rigor and coherence of school curricula in all subjects with a close examination of consistency and access for all students across grades and subject areas.'){ return "Mide el rigor y la coherencia del plan de estudios de las escuelas en todas las asignaturas, con un análisis particular de la uniformidad y el acceso para todos los estudiantes, en todos los grados y asignaturas.";}
            else if (text == 'A Developing rating may indicate inconsistent teaching and learning practices and is working towards effective school management and a more positive learning environment.'){ return "La clasificación \"En desarrollo\" podría indicar prácticas de enseñanza y aprendizaje no uniformes, y que está trabajando hacia un manejo más eficaz de la escuela con un ambiente de aprendizaje más positivo.";}
            else if (text == 'The geographic district in which the school is located.  Note that all charter schools are assigned to District 84 regardless of geographic location.'){ return "El distrito geográfico en el que se ubica la escuela.  Tenga en cuenta que todas las escuelas autónomas están asignadas al Distrito 84, independientemente de la ubicación geográfica de las mismas.";}
            else if (text == 'Measures whether respondents feel engaged in an active and vibrant partnership to promote student learning.'){ return "Mide el grado en el que el encuestado se siente partícipe de una alianza activa y vibrante que fomente el aprendizaje estudiantil.";}
            else if (text == 'Percent of students that have been identified based on an initial language assessment and who have not passed the New York State English as a Second Language Achievement Test (NYSESLAT).'){ return "Porcentaje de estudiantes que han sido clasificados según una evaluación de idioma inicial y que no han aprobado el examen de rendimiento en inglés como segundo idioma dispuesto por el Estado de Nueva York (NYSESLAT).";}
            else if (text == 'The total number of students who are enrolled in each grade of the school as of October 31 of the selected school year.'){ return "El número total de estudiantes inscritos en cada grado de la escuela al 31 de octubre del año lectivo en curso.";}
            else if (text == 'Percentage  of students in the school’s four-year cohort who, by the August after their fourth year in high school, have graduated with a Regents Diploma and have met the City University of New York\'s (CUNY) standards for college readiness in English and Math.'){ return "Porcentaje de estudiantes en el cohorte de cuatro años de la escuela, quienes para el agosto después de su cuarto año en la escuela secundaria, se han graduado con un diploma Regents y han cumplido con los estándares de preparación universitaria en inglés y matemáticas, que estipula la Universidad de la Ciudad de Nueva York (CUNY).";}
            else if (text == 'Percentage of students with families who have qualified for the Free or Reduced-Price Lunch program or if the student is enrolled in a Universal Meal School (where all students automatically qualify).'){ return "Porcentaje de estudiantes con familias que han cumplido los requisitos del programa de almuerzo gratuito o a precio reducido o si el estudiante está inscrito en una Escuela de comidas universal (en la cual todos os estudiantes tienen derecho automáticamente).";}
            else if (text == 'Measures how effectively the school establishes a culture for learning that communicates high expectations to students, families, and staff and provides support towards students’ next steps.'){ return "Mide qué tan eficazmente la escuela establece una cultura del aprendizaje, que comunica grandes expectativas a los estudiantes, las familias y el personal y ofrece apoyo hacia el siguiente paso de los los estudiantes.";}
            else if (text == 'A program’s interest area may indicate a general, comprehensive academic program (Humanities & Interdisciplinary or Zoned, for example), while other interest areas emphasize a particular industry (like Architecture or Engineering). Although every high school program is associated with a particular interest area, all New York City students are required to take a variety of courses in order to graduate.'){ return "El área de interés de un programa podría indicar un programa académico integral, general (humanidades e interdisciplinario o de zona, por ejemplo), mientras que otras áreas de interés enfatizan una industria en particular (como arquitectura o ingeniería). A pesar de que todos los programas de escuela secundaria están asociados con un área de interés particular, se requiere a todos los estudiantes de la Ciudad de Nueva York, que cursen una serie de cursos para graduarse.";}
            else if (text == 'The way schools consider and admit applicants into a program.'){ return "La manera en la que las escuelas toman en consideración y admiten a los aspirantes a los programas.";}
            else if (text == 'Measures the effectiveness of instruction across classrooms by looking at the quality of student work products and student discussion.'){ return "Mide la eficacia de la enseñanza en las aulas de clase, mediante el análisis de los productos del trabajo de los estudiantes y de los debates que ellos realizan.";}

            else if (text == 'New York State assigns 4 Performance Levels  to scale scores on the test:'){ return "El Estado de Nueva York asigna 4 niveles de rendimiento para clasificar los puntajes en los exámenes:";}
            else if (text == 'Level 4: Students performing at this level excel in standards for their grade.'){ return "Nivel 4: Los estudiantes que alcanzan este nivel, superan los estándares de su grado.";}
            else if (text == 'Level 3: Students performing at this level are proficient in standards for their grade.'){ return "Nivel 3: Los estudiantes que alcanzan este nivel, dominan los estándares de su grado.";}
            else if (text == 'Level 2: Students performing at this level are below proficient in standards for their grade.'){ return "Nivel 2: Los estudiantes que alcanzan este nivel, están por debajo del nivel de dominio de los estándares de su grado.";}
            else if (text == 'Level 1: Students performing at this level are well below proficient in standards for their grade.'){ return "Nivel 1: Los estudiantes que alcanzan este nivel, están muy por debajo del nivel de dominio de los estándares de su grado.";}

            else if (text == 'Measures the quality of school culture and environment including safety, inclusiveness and other student success supports.'){ return "Mide la calidad de la cultura y el entorno escolar, incluyendo seguridad, inclusión y otras herramientas de apoyo para el éxito estudiantil.";}
            else if (text == 'Percentage of students who have graduated and enrolled in a two- or four-year college, vocational program, or public service within six months of their scheduled graduation date.'){ return "Porcentaje de estudiantes que se han graduado y se han inscrito en una institución universitaria de dos o cuatro años, un programa vocacional, o servicio público, durante los seis meses siguientes a la fecha programada para su graduación.";}
            else if (text == 'The order in which applicants are considered for placement.'){ return "El orden en el se toman en cuenta los solicitantes para un cupo.";}
            else if (text == 'A Proficient rating typically indicates solid teaching and learning practices, effective school management, and a high quality learning environment.'){ return "La calificación competente generalmente indica prácticas de enseñanza y aprendizaje sólidas, manejo eficaz de la escuela y un entorno de aprendizaje de gran calidad.";}
            else if (text == 'When applying to middle and high schools, students apply to programs within schools. Programs may have different interest or focus areas as well as admissions methods.'){ return "Cuando los estudiantes solicitan un cupo en la escuela intermedia o secundaria, se postulan a los programas que ofrecen las escuelas.   Los programas pueden tener distintas áreas de interés o de enfoque, así como diversos métodos de admisión.";}
            else if (text == 'A program’s focus area may indicate a general, comprehensive academic program (Humanities & Interdisciplinary or Zoned, for example), while other interest areas emphasize a particular industry (like Architecture or Engineering).'){ return "El área de enfoque de un programa podría indicar un programa académico integral, general (humanidades e interdisciplinario o de zona, por ejemplo), mientras que otras áreas de interés enfatizan una industria en particular (como arquitectura o ingeniería).";}
            else if (text == 'Measures the ability of a school to prepare its students for success in college and career on the basis of passing advanced courses, meeting proficiency standards and enrolling in a post-secondary institution.'){ return "Mide la capacidad de una escuela para preparar a sus estudiantes para el éxito en la universidad y la vida profesional, sobre la base de aprobar cursos avanzados a nivel universitario, cumplir con los estándares de dominio y matricularse en una institución de enseñanza superior.";}
            else if (text == 'Based on student attendance and the results of the school\'s NYC School Survey.'){ return "Basado en la asistencia a clases por parte de los estudiantes y los resultados de la encuesta del plantel en la encuesta de escuelas de la Ciudad de Nueva York.";}
            else if (text == 'The Progress Report measures students’ year-to-year progress, compares the school to other schools with similar students, and rewards success in moving all children forward, especially those with the highest needs (i.e., students with disabilities, English language learners, students with the lowest third incoming proficiency citywide, and black and Hispanic males). Overall Progress Report grades, which range from A to F, are based on the scores of multiple sections.  In each section, a school\'s results are compared to the results of “peer” schools serving similar students and to all schools citywide.'){ return "El informe de progreso mide el progreso de los estudiantes años tras año, compara una escuela con otra con alumnado similar y premia lo exitosa que es una institución educativa para lograr el avance de los niños, especialmente aquellos con mayores necesidades (por ejemplo, estudiantes con discapacidades, estudiantes que aprenden inglés, estudiantes con el tercer dominio académico más bajo de la ciudad y estudiantes hombres afro-descendientes e hispanos. Las calificaciones generales del informe de progreso, las cuales van de la A a la F, se basan en el puntaje de múltiples secciones.    En cada sección, los resultados de una escuela se comparan con los resultados de otras escuelas que prestan servicios a estudiantes de perfiles similares y con todas las escuelas de la ciudad.";}
            else if (text == 'Based on student results on the State tests in English Language Arts and Math. Middle school scores also take students passing core courses into account.'){ return "Basado en los resultados de los estudiantes en los exámenes estatales de artes del idioma inglés y matemáticas. Los puntajes de escuela intermedia también toman en cuenta los cursos básicos que aprueban los estudiantes.";}
            else if (text == 'Based on how many students graduated within 4 and 6 years of starting high school  and the types of diplomas they earned.'){ return "Está basado en cuántos estudiantes se graduaron dentro de los cuatro y seis años de haber empezado la escuela secundaria y en los tipos de diplomas que obtuvieron.";}
            else if (text == 'Based on how much individual students improved on State tests in English Language Arts and Math compared to other students in the City.'){ return "Está basad en cuánto mejoraron individualmente los estudiantes en los exámenes estatales de artes del idioma inglés y matemáticas, en comparación con otros estudiantes de la ciudad.";}
            else if (text == 'Based on the annual progress students make toward meeting the State\'s graduation requirements by earning course credits and passing Regents exams.'){ return "Se basa en el progreso anual que hacen los estudiantes para cumplir con los requisitos de graduación del estado, a través de la acumulación de créditos del curso y aprobando los exámenes Regents del estado.";}
            else if (text == 'A two- or three-day school visit by an experienced educator to evaluate how well the school is organized to support student achievement. The overall rating is based on three major categories: instruction that prepares students for college and careers, school organization and management, and quality of the learning environment.'){ return "Una visita de dos o tres días que un educador experimentado realiza a las escuelas, a fin de evaluar qué tan bien estructurada se encuentro se encuentra el plantel para lograr el éxito de los estudiantes. La calificación general está basada en tres categorías principales: enseñanza que prepara a los estudiantes para la vida universitaria y profesional, organización y manejo de la escuela y calidad del ambiente de aprendizaje.";}
            else if (text == 'Average score of all students who took the Regents Exam in the selected year.'){ return "Puntaje promedio de todos los alumnos que presentaron el examen Regents el año que se indica.";}
            else if (text == 'Percentage of students who scored at the college ready threshold for the Regents Exam in the selected year.'){ return "Porcentaje de estudiantes que lograron alcanzar el límite de preparación universitaria en el examen Regents del año que se indica.";}
            else if (text == 'Percentage of students passing the Regents Exam in the selected year.'){ return "Porcentaje de estudiantes en aprobar el examen Regents en el año que se indica.";}
            else if (text == 'Percentage of eligible parents, teachers and students in grades 6-12 who responded to the NYC School Survey.'){ return "Porcentaje de padres, maestros y estudiantes en grados de 6.° a 12.°, que cumpliendo con los requisitos para participar, llenaron la encuesta de escuelas de la Ciudad de Nueva York.";}
            else if (text == 'Measures whether respondents feel that the school creates a physically and emotionally secure environment in which everyone can focus on student learning.'){ return "Mide el grado en el que los encuestados consideran que la escuela crea un entorno física y emocionalmente seguro, en el cual todos pueden concentrarse en el aprendizaje estudiantil.";}
            else if (text == 'The number of students at the school who took the SAT at the school, a globally recognized college admission test that tests knowledge of critical  reading, writing and math.'){ return "Número de alumnos que presentaron el SAT en la escuela, el cual es un examen de admisión a la universidad, mundialmente reconocido y que mide conocimientos críticos de lectura, redacción y matemáticas.";}
            else if (text == 'Number of seats in a program that were available to students applying for September of the selected year.'){ return "Número de cupos disponibles para los estudiantes que solicitaron ingreso a un programa en septiembre del año que se indica.";}
            else if (text == 'Whether the school is co-located with at least one other school in a shared building.'){ return "Si la escuela comparte las instalaciones físicas por lo menos con otra escuela.";}
            else if (text == 'Percentage of students receiving an Individualized Education Plan (IEP) as of the end of the school year.'){ return "Porcentaje de estudiantes que reciben un Plan de educación individualizado (IEP), para finales del año lectivo.";}
            else if (text == 'The NYC School Survey is administered annually to all parents, all teachers, and students in grades 6 - 12.  Survey results provide insight into a school\'s learning environment and assess the community\'s opinions on academic expectations, communication, engagement, and safety and respect.'){ return "La encuesta de escuelas de la Ciudad de Nueva York, se entrega anualmente a todos los padres, maestros y estudiantes en grados de 6.° a 12.°.  Los resultados de la encuesta proporcionan una perspectiva del entorno de aprendizaje de una escuela y evalúan la opinión de la comunidad con respecto a las expectativas académicas, la comunicación, la participación y la seguridad y el respeto.";}
            else if (text == 'In Spring 2013, New York State administered the first set of tests designed to assess student performance in English Language Arts (Grades 3-8) in accordance with the instructional shifts required by the Common Core Learning Standards. New York State assigns performance levels 1 ,2, 3, and 4 to scale scores from the exams.'){ return "En la primavera de 2013, el Estado de Nueva York impartió por primera vez los exámenes diseñados para evaluar el rendimiento estudiantil en artes del idioma inglés (grados de 3° a 8.°), de conformidad con los giros pedagógicos que exigían los estándares básicos comunes. El Estado de Nueva York asigna niveles de desempeño 1, 2, 3 y 4, para clasificar los puntajes de los exámenes.";}
            else if (text == 'In Spring 2013, New York State administered the first set of tests designed to assess student performance in Math (Grades 3-8) in accordance with the instructional shifts required by the Common Core Learning Standards. New York State assigns performance levels 1, 2, 3, and 4 to scale scores from the exams.'){ return "En la primavera de 2013, el Estado de Nueva York impartió por primera vez los exámenes diseñados para evaluar el rendimiento estudiantil en matemáticas (grados de 3° a 8.°), de conformidad con los giros pedagógicos que exigían los estándares básicos comunes. El Estado de Nueva York asigna niveles de desempeño 1, 2, 3 y 4, para clasificar los puntajes de los exámenes.";}
            else if (text == 'The total number of students who are enrolled in the school as of October 31 of the selected school year.'){ return "El número total de estudiantes inscritos en la escuela, al 31 de octubre del año lectivo seleccionado.";}
            else if (text == 'Percentage of students in the transfer school\'s graduation cohort that graduated with a Regents or Local Diploma within six years of beginning high school, including August graduates. Citywide graduation rates are as reported by New York State Department of Education while individual school graduation rates are as reported by NYC DOE.'){ return "Porcentaje de estudiantes, pertenecientes al cohorte de graduación por concepto de escuela de transferencia, que se graduaron con un diploma Regents o diploma local, dentro de los seis años siguientes de haber empezado la escuela secundaria, incluyendo a los graduandos de agosto. Las tasa de graduación a nivel de la ciudad son reportadas por el Departamento de Educación del Estado de Nueva York, mientras que las tasas de graduación de cada escuela en particular, son reportadas por el NYC DOE.";}
            else if (text == 'An Underdeveloped rating may indicate a failure to deliver effective teaching and learning practices, demonstrate effective school management and provide a high quality learning environment.'){ return "Una calificación de \"Poco desarrollada\" podría indicar incompetencia para ofrecer prácticas de enseñanza y aprendizaje sólidas, manejo eficaz de la escuela y un entorno de aprendizaje de gran calidad.";}
            else if (text == 'This is the highest rating a school can earn on the Quality Review.  It indicates highly effective teaching and learning practice, strategic school management, and an excellent quality learning environment.'){ return "Es la calificación más alta que puede obtener una escuela en la Revisión de calidad.  Indica prácticas de enseñanza y aprendizaje sólidas altamente eficaces, manejo estratégico de la escuela y un entorno de aprendizaje de excelente calidad.";}
            else if (text == 'The first school year that the school was open.'){ return "El primer año de funcionamiento de la escuela.";}

        }else{ return text; };
    }
})

.filter("translateHeaderGlosary", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == '4 Year Graduation Rate'){ return "Índice de graduación en cuatro años";}
            else if (text == '6 Year Graduation Rate'){ return "Índice de graduación en seis años";}
            else if (text == 'Academic Expectations (Survey)'){ return "Expectativas académicas (Encuesta)";}
            else if (text == 'Applicants'){ return "Aspirantes";}
            else if (text == 'Attendance Rate'){ return "Tasa de asistencia";}
            else if (text == 'Average Proficiency Score by Grade (ELA)'){ return "Puntaje promedio de dominio por grado (ELA)";}
            else if (text == 'Average Proficiency Score by Grade (Math)'){ return "Puntaje promedio de dominio por grado (Matemáticas)";}
            else if (text == 'Average SAT Score'){ return "Puntaje promedio SAT";}
            else if (text == 'College and Career Preparatory Course Index'){ return "Índice de alumnos que aprueban cursos preparatorios para la universidad y la vida profesional";}
            else if (text == 'College Readiness Rate Including Persistence'){ return "Índice de preparación para la universidad, incluyendo el concepto de permanencia";}
            else if (text == 'Communication (Survey)'){ return "Comunicación (Encuesta)";}
            else if (text == 'Credit Accumulation'){ return "Acumulación de créditos";}
            else if (text == 'Curriculum (Quality Review Indicator)'){ return "Plan de estudio (Indicador de la revisión de calidad)";}
            else if (text == 'Developing (Quality Review)'){ return "En desarrollo (Revisión de calidad)";}
            else if (text == 'District'){ return "Distrito";}
            else if (text == 'Engagement'){ return "Participación";}
            else if (text == 'English Language Learners'){ return "Estudiantes que aprenden inglés";}
            else if (text == 'Enrollment'){ return "Alumnado";}
            else if (text == 'Four-Year Non-Remediation Rate'){ return "índice de no recuperación de cuatro años";}
            else if (text == 'Free/Reduced Lunch'){ return "Almuerzo gratuito o a precio reducido";}
            else if (text == 'High expectations (Quality Review Indicator)'){ return "Altas expectativas (Indicador de la revisión de calidad)";}
            else if (text == 'Interest Area'){ return "Área de interés";}
            else if (text == 'Method'){ return "Método";}
            else if (text == 'Pedagogy (Quality Review Indicator)'){ return "Pedagogía (Indicador de la revisión de calidad)";}
            else if (text == 'Percent of students scoring at levels 1-4 by grade (ELA)'){ return "Porcentaje de estudiantes en obtener del nivel 1 al 4 según el grado (ELA)";}
            else if (text == 'Percent of students scoring at levels 1-4 by grade (Math)'){ return "Porcentaje de estudiantes en obtener del nivel 1 al 4 según el grado (Matemáticas)";}
            else if (text == 'Positive Learning Environment (Quality Review Indicator)'){ return "Entorno de aprendizaje positivo (Indicador de la revisión de calidad)";}
            else if (text == 'Post-Secondary Enrollment Rate'){ return "Tasa de inscripción pos-secundaria";}
            else if (text == 'Priority'){ return "Prioridad";}
            else if (text == 'Proficient (Quality Review)'){ return "Competente (Revisión de calidad)";}
            else if (text == 'Program'){ return "Programa";}
            else if (text == 'Progress Report- College and Career Subgrade'){ return "Informe de progreso - subnivel universitario y vocacional";}
            else if (text == 'Progress Report- Environment Subgrade'){ return "Informe de progreso - subnivel entorno";}
            else if (text == 'Program Focus'){ return "Enfoque del programa";}
            else if (text == 'Progress Report- Overall Grade'){ return "Informe de Progreso - Calificación general";}
            else if (text == 'Progress Report- Performance Subgrade (ES/MS)'){ return "Informe de progreso - subnivel rendimiento (Escuela primaria e intermedia)";}
            else if (text == 'Progress Report- Performance Subgrade (HS)'){ return "Informe de progreso - subvivel rendimiento (Escuela secundaria)";}
            else if (text == 'Progress Report- Progress Subgrade (ES/MS)'){ return "Informe de progreso - subnivel progreso (Escuela primaria e intermedia)";}
            else if (text == 'Progress Report- Progress Subgrade (HS)'){ return "Informe de progreso - subvivel progreso (Escuela secundaria)";}
            else if (text == 'Quality Review'){ return "Revisión de calidad";}
            else if (text == 'Regents Average Score'){ return "Puntaje promedio en los exámenes Regents";}
            else if (text == 'Regents College Ready'){ return "Preparación universitaria Regents";}
            else if (text == 'Regents Pass Rate'){ return "Índice de aprobación del examen Regents";}
            else if (text == 'Response Rates'){ return "Porcentajes de respuestas";}
            else if (text == 'Safety and Respect (Survey)'){ return "Seguridad y respeto (Encuesta)";}
            else if (text == 'SAT Takers'){ return "Alumnos que presentan el SAT";}
            else if (text == 'Seats'){ return "Cupos";}
            else if (text == 'Shared Site'){ return "Sede compartida";}
            else if (text == 'Students with Disabilities'){ return "Estudiantes con discapacidades";}
            else if (text == 'Survey'){ return "Encuesta";}
            else if (text == 'Test Scores (ELA)'){ return "Resultados de los exámenes (ELA)";}
            else if (text == 'Test Scores (Math)'){ return "Resultados de los exámenes (Matemáticas)";}
            else if (text == 'Total Enrollment'){ return "Total de estudiantes inscritos";}
            else if (text == 'Transfer High School Graduation Rate'){ return "Tasa de graduación de escuela secundaria por concepto de transferencia";}
            else if (text == 'Underdeveloped (Quality Review Rating)'){ return "Poco desarrollada (Calificación en la Revisión de Calidad)";}
            else if (text == 'Well Developed (Quality Review Rating)'){ return "Bien desarrollada (Calificación en la Revisión de Calidad)";}
            else if (text == 'Year Opened'){ return "Año de apertura";}
        }else{ return text; };
    }
})

.filter("translateSurveyQuestion", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 'At my school, I am safe in the hallways, bathrooms, locker rooms, and cafeteria.'){ return "En mi escuela, no corro peligro en los pasillos, baños, vestuarios ni en el comedor escolar.";}
            else if (text == 'Most of the teaching staff at my school make me excited about learning.'){ return "La mayor parte del personal docente de mi escuela, me motiva a aprender.";}
            else if (text == 'I feel welcome at my school.'){ return "Me siento bien recibido en mi escuela.";}
            else if (text == 'Most adults at my school care about me.'){ return "Los adultos de mi escuela se preocupan por mí.";}
            else if (text == 'Most students at my school respect students who get good grades.'){ return "La mayoría de los estudiantes de mi escuela, respetan a los alumnos que obtienen buenas calificaciones.";}
            else if (text == 'I would recommend my school to parents seeking a place for their child.'){ return "Yo les recomendaría mi escuela a los padres que estén buscando una para su hijo.";}
            else if (text == 'At my school, adults treat students with respect.'){ return "En mi escuela, los adultos tratan a los estudiantes con respeto.";}
            else if (text == 'School leaders place a high priority on the quality of teaching.'){ return "Para las directivas de las escuelas, la calidad de la enseñanza, tiene gran prioridad.";}
            else if (text == 'Students are often harassed or bullied in school.'){ return "Frecuentemente, los estudiantes son acosados o víctimas de bullying en la escuela.";}
            else if (text == 'My school communicates effectively with parents about their child’s progress.'){ return "Mi escuela tiene una comunicación eficaz con los padres, acerca del progreso de sus hijos.";}
            else if (text == 'My child is safe at school.'){ return "Mi hijo se siente seguro en la escuela.";}
            else if (text == 'My child’s school is responsive to parent feedback.'){ return "La escuela de mi hijo tiene en cuenta la opinión de los padres.";}
            else if (text == 'My child’s school keeps me informed about my child’s academic progress.'){ return "La escuela de mi hijo me mantiene informado con respecto al progreso académico de mi hijo.";}
            else if (text == 'I would recommend this school to other parents.'){ return "Recomendaría esta escuela a otros padres.";}
            else if (text == 'I am satisfied or very satisfied with the education my child has received this year.'){ return "Me encuentro satisfecho o muy satisfecho con la educación que hijo ha recibido este año.";}
        }else{ return text; };
    }
})

.filter("flagHighRow", function($rootScope){
    return function(text) {
        if ($rootScope.lenguage == "esp") {
            if (text == 1){ return "flagHighRow";}
        }else{ return ""; };
    }
})


.filter("filtraCeros", function(){
    return function(text) {

        if (text == null || text == "0.00" || text == "0" || text == ""){ return "borrar";}

    }
})


.filter("filterAdmissNA", function(){
    return function(text) {

        if (text == "N/A"){ return "borrar";}

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

.filter("filternullwidth", function(){
    return function(text) {
        if (text == null || text == '' || text == "N/A"){
          return parseInt(0);
        }else{
          return parseInt(text);
        }

    }
})

.filter("filternulltext", function($rootScope){
    return function(text) {

        // if (text == null || text == ''){
        //   return "0";
        // }else if (text == "N/A"){
        //   return;
        // }
        if (text === null || text === ''){
          if ($rootScope.lenguage == "esp") {
            return "No disponible para el año seleccionado";
          } else {
            return "Unavailable for the selected year";
          }
        } else {
          return;
        }
    }
})

// .filter("filtertest", function(){
//   return function(text) {
//     console.log("something");
//   }
// })

.filter("filterpercent", function(){
    return function(text) {

        if (text == null || text == ''){
          return;
        }else {
          return "%";
        }

    }
})

.filter("filterslashvisibility", function(){
    return function(text) {

        if (text == null || text == ''){
          return;
        }else {
          return "/";
        }

    }
})

.filter("filternumbervisibility", function(){
    return function(text) {

        if (text == null || text == ''){
          return;
        }else {
          return "100";
        }

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
    return "Unavailable for the selected year";
}
else {
    return parseFloat(text).toFixed(1)+"%";
}

    }
})

.filter("redondeaSinPorcentaje", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "Unavailable for the selected year";
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
    return "Unavailable for the selected year";
}
else {
    return text;
}

    }
})

.filter("redondea_sp_1", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "Unavailable for the selected year";
}
else {
    return parseFloat(text).toFixed(1);
}

    }
})

.filter("redondea_entero", function(){
    return function(text) {

if (text == "0.00" || text == "0" || text == ""){
    return "Unavailable for the selected year";
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

.filter("escalaPrPerformElem", function(){
    return function(text) {
        var num = parseFloat(text);
        var val = (num*100)/(25);
        return val;
    }
})

.filter("escalaPrProgressElem", function(){
    return function(text) {
        var num = parseFloat(text);
        var val = (num*100)/(60);
        return val;
    }
})

.filter("escalaPrEnvironmentElem", function(){
    return function(text) {
        var num = parseFloat(text);
        var val = (num*100)/(15);
        return val;
    }
})

// HIGH

.filter("escalaPrPerformHigh", function($rootScope){
    return function(text) {
        var ano = $rootScope.selectedyearEvaluationsHigh;
        // console.log(ano);
        if (ano == '2011') {
        var num = parseFloat(text);
        var val = (num*100)/(25);
        // console.log('sobre 25');
        return val;
        }else{
        var num = parseFloat(text);
        var val = (num*100)/(20);
        // console.log('sobre 20');
        return val;
        };
    }
})

.filter("escalaPrProgressHigh", function($rootScope){
    return function(text) {
        var ano = $rootScope.selectedyearEvaluationsHigh;
        // console.log(ano);
        if (ano == '2011') {
        var num = parseFloat(text);
        var val = (num*100)/(60);
        // console.log('sobre 60');
        return val;
        }else{
        var num = parseFloat(text);
        var val = (num*100)/(55);
        // console.log('sobre 55');
        return val;
        };
    }
})

.filter("escalaPrEnvironmentHigh", function(){
    return function(text) {
        var num = parseFloat(text);
        var val = (num*100)/(15);
        return val;
    }
})

.filter("escalaPrCollegueCareerHigh", function(){
    return function(text) {
        var num = parseFloat(text);
        var val = (num*100)/(10);
        return val;
    }
})

.filter("filtroDenominador", function($rootScope){
    return function(text) {
      var ano = $rootScope.selectedyearEvaluationsHigh;
      if (ano == '2011') {
        var num = parseInt(text);
        var val = num+5;
        return val;
      }else{
        return text;
      };
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
});
