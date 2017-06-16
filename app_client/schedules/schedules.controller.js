(function() {

    angular
        .module('kspuApp')
        .controller('schedulesCtrl', schedulesCtrl);

    schedulesCtrl.$inject = ['$location', 'schedules', 'organizations', '$window'];
    function schedulesCtrl($location, schedules, organizations, $window) {
        var vm = this;
        md.initMinimizeSidebar();
        getSchedulesList();
        getOrganizationsList();

        vm.schedules = [];
        function getSchedulesList() {
            schedules.getSchedules()
                .error(function (err) {
                    alert(err);
                })
                .then(function (schedules) {
                    vm.schedules = schedules.data
                });
        }

        function getOrganizationsList() {
            organizations.getOrganizations()
                .error(function (err) {
                    alert(err);
                })
                .then(function (organizations) {
                    vm.organizations = organizations.data
                })
        }

        vm.removeSchedule = function (id) {
            if ($window.confirm('Ви дійсно бажаєте видалити розклад?')) {
                schedules.removeSchedules(id)
                    .then(function () {
                        vm.schedules = [];
                        getSchedulesList()
                    })
            }
        }
    }

})();
