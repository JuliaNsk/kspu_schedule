(function () {

    angular
        .module('kspuApp')
        .controller('subjectsCtrl', subjectsCtrl);

    subjectsCtrl.$inject = ['subjects', '$window', '$scope'];
    function subjectsCtrl(subjects, $window) {
        var vm = this;
        vm.newSubject = {};
        getSubjectsList();

        function getSubjectsList() {
            subjects.getSubjects()
                .error(function (err) {
                    alert(err);
                })
                .then(function (subjects) {
                    vm.subjects = subjects.data
                });
        }

        vm.removeSubject = function (subj) {
            if ($window.confirm('Ви дійсно бажаєте видалити  дисципліну?')) {
                subjects.removeSubjects(subj)
                    .then(function () {
                        vm.newSubject = {};
                        getSubjectsList()
                    })
            }
        };

        vm.editModal = function (subj) {
            vm.subjectData = angular.copy(subj)
        };

        vm.editSubject = function () {
            subjects.editSubjects(vm.subjectData)
                .then(function () {
                    vm.subjectData = {};
                    getSubjectsList()
                });
        };

        vm.addSubject = function () {
            subjects.addSubjects(vm.newSubject)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newSubject = {};
                    getSubjectsList()
                });
        }
    }

})();
