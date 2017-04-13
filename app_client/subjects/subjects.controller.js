(function() {

    angular
        .module('kspuApp')
        .controller('subjectsCtrl', subjectsCtrl);

    subjectsCtrl.$inject = ['$location', 'subjects'];
    function subjectsCtrl($location, subjects) {
        var vm = this;
        vm.newSubject = {};
        getSubjectsList();

        function getSubjectsList() {
            subjects.getSubjects()
                .error(function(err){
                    alert(err);
                })
                .then(function(subjects){
                    vm.subjects = subjects.data
                });
        }


        vm.addSubject = function () {
            subjects.addSubjects(vm.newSubject)
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    vm.newSubject = {};
                    getSubjectsList()
                });
        }
    }

})();
