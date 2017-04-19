(function() {

    angular
        .module('kspuApp')
        .controller('addScheduleCtrl', addScheduleCtrl);

    addScheduleCtrl.$inject = ['$location', 'subjects'];
    function addScheduleCtrl($location, subjects) {
        var vm = this;
        md.initMinimizeSidebar();
        vm.addSubject = function () {
            subjects.addSubjects()
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('profile');
                });
        }
    }

})();
