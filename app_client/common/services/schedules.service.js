(function() {

    angular
        .module('kspuApp')
        .service('schedules', schedules);

    schedules.$inject = ['$http', 'authentication'];
    function schedules ($http, authentication) {

        var addSchedules = function (data) {
            return $http.post('/api/schedule', data);
        };

        var getSchedules = function () {
            return $http.get('/api/schedule', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var removeSchedules = function (data) {
            return $http.delete('/api/schedule/' + data);
        };

        var editSchedules = function (data) {
            return $http.put('/api/schedule/' + data._id, data);
        };

        return {
            addSchedules : addSchedules,
            getSchedules : getSchedules,
            removeSchedules: removeSchedules,
            editSchedules: editSchedules
        };
    }

})();
