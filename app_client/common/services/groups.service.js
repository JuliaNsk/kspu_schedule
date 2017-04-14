(function() {

    angular
        .module('kspuApp')
        .service('groups', groups);

    groups.$inject = ['$http', 'authentication'];
    function groups ($http, authentication) {

        var addGroups = function (data) {
            return $http.post('/api/groups', data);
        };

        var getGroups = function () {
            return $http.get('/api/groups', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var removeGroups = function (data) {
            return $http.delete('/api/groups/' + data);
        };

        var editGroups = function (data) {
            return $http.put('/api/groups/' + data._id, data);
        };

        return {
            addGroups : addGroups,
            getGroups : getGroups,
            removeGroups: removeGroups,
            editGroups: editGroups
        };
    }

})();
