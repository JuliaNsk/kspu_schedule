(function() {

    angular
        .module('kspuApp')
        .controller('addScheduleCtrl', addScheduleCtrl);

    addScheduleCtrl.$inject = ['$location', 'kspuData'];
    function addScheduleCtrl($location, kspuData) {
        var vm = this;

        vm.user = {};

        kspuData.getProfile()
            .success(function(data) {
                vm.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }

})();