(function() {

    angular
        .module('kspuApp')
        .service('organizations', organizations);

    organizations.$inject = ['$http', 'authentication'];
    function organizations ($http, authentication) {

        var addOrganizations = function (data) {
            return $http.post('/api/organizations', data);
        };

        var getOrganizations = function () {
            return $http.get('/api/organizations', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var removeOrganizations = function (data) {
            return $http.delete('/api/organizations/' + data);
        };

        var editOrganizations = function (data) {
            return $http.put('/api/organizations/' + data._id, data);
        };

        return {
            addOrganizations : addOrganizations,
            getOrganizations : getOrganizations,
            removeOrganizations: removeOrganizations,
            editOrganizations: editOrganizations
        };
    }

})();
