'use strict';

(function () {
    var schools = 
        [
            {
                "id": 1,
                "dbn": "03M485",
                "name": "Fiorello H. LaGuardia High School of Music & Art and Performing Arts",
                "website": "http://www.laguardiahs.org",
                "type": "High school",
                "grades_served": "09,10,11,12",
                "opening_date": "Jul 1 1984",
                "building_usage": "not co-located",
                "street_address": "100 AMSTERDAM AVENUE",
                "city": "MANHATTAN",
                "state_code": "NY",
                "zip": "10023",
                "principal_name": "Dr. Lisa Mars",
                "principal_email": "lmars@schools.nyc.gov",
                "phone_number": "212-496-0700",
                "district": "3"
            },
            {
                "id": 2,
                "dbn": "03M4s5",
                "name": "Hogwarts",
                "website": "http://www.hogwarts.org",
                "type": "High school",
                "grades_served": "09,10,11,12",
                "opening_date": "Jul 1 1984",
                "building_usage": "not co-located",
                "street_address": "100 AMSTERDAM AVENUE",
                "city": "MANHATTAN",
                "state_code": "NY",
                "zip": "10023",
                "principal_name": "Dr. Lisa Mars",
                "principal_email": "lmars@schools.nyc.gov",
                "phone_number": "212-496-0700",
                "district": "3"
            }
        ],

        findById = function(id) {
            var school = null,
            school = schools[0];
            return school;
        };

    angular.module('nyce.memoryServices', [])
        .factory('School', [
            function() {
                return {
                    query: function() {
                        return schools;
                    },
                    get: function(school) {
                        return findById(parseInt(school.schoolId));
                    }
                }
            }])
}());