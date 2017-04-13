(function() {

    angular
        .module('kspuApp')
        .service('subjects', subjects);

    subjects.$inject = ['$http', 'authentication'];
    function subjects ($http, authentication) {

        var addSubjects = function (data) {
            return $http.post('/api/subjects', data);
                // {name:'Теория програмирования', hours:24, credits: 3.5, labs: 8, lecture: 12, teacher: "58ee2b93ebfb6a599fc2e90a"});
        };

        var getSubjects = function () {
            return $http.get('/api/subjects', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        return {
            addSubjects : addSubjects,
            getSubjects : getSubjects
        };
    }

})();