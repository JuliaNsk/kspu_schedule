(function() {

    angular
        .module('kspuApp')
        .service('teachers', teachers);

    teachers.$inject = ['$http', 'authentication'];
    function teachers ($http, authentication) {

        var addTeachers = function (data) {
            return $http.post('/api/teachers', data);
        };

        var getTeachers = function () {
            return $http.get('/api/teachers', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var removeTeachers = function (data) {
            return $http.delete('/api/teachers/' + data);
        };

        var editTeachers = function (data) {
            return $http.put('/api/teachers/' + data._id, data);
        };

        return {
            addTeachers : addTeachers,
            getTeachers : getTeachers,
            removeTeachers: removeTeachers,
            editTeachers: editTeachers
        };
    }

})();
