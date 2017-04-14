(function() {

    angular
        .module('kspuApp')
        .service('subjects', subjects);

    subjects.$inject = ['$http', 'authentication'];
    function subjects ($http, authentication) {

        var addSubjects = function (data) {
            return $http.post('/api/subjects', data);
        };

        var getSubjects = function () {
            return $http.get('/api/subjects', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var removeSubjects = function (data) {
            return $http.delete('/api/subjects/' + data);
        };

        var editSubjects = function (data) {
            return $http.put('/api/subjects/' + data._id, data);
        };

        return {
            addSubjects : addSubjects,
            getSubjects : getSubjects,
            removeSubjects: removeSubjects,
            editSubjects: editSubjects
        };
    }

})();
