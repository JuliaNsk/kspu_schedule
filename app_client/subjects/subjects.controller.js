(function () {

    angular
        .module('kspuApp')
        .controller('subjectsCtrl', subjectsCtrl);

    subjectsCtrl.$inject = ['subjects', '$window', 'organizations'];
    function subjectsCtrl(subjects, $window, organizations) {
        var vm = this;
        md.initMinimizeSidebar();
        vm.select = '';
        vm.newSubject = {};
        getSubjectsList();
        getOrganizationsList();

        function getSubjectsList() {
            subjects.getSubjects()
                .error(function (err) {
                    alert(err);
                })
                .then(function (subjects) {
                    vm.subjects = subjects.data
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


        vm.addModal = function () {
            $(".selectpicker")
                .selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });
        };
        vm.addSubject = function () {
            vm.newSubject.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            subjects.addSubjects(vm.newSubject)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newSubject = {};
                    getSubjectsList()
                });
        };


        vm.editModal = function (subj) {
            $(".selectpicker").selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });

            vm.subjectData = angular.copy(subj);
            vm.subjectData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
        };

        vm.editSubject = function () {

            vm.subjectData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            subjects.editSubjects(vm.subjectData)
                .then(function () {
                    vm.subjectData = {};
                    getSubjectsList()
                });
        };

        vm.removeSubject = function (subj) {
            if ($window.confirm('Ви дійсно бажаєте видалити  дисципліну?')) {
                subjects.removeSubjects(subj)
                    .then(function () {
                        vm.newSubject = {};
                        getSubjectsList()
                    })
            }
        };


    }
})();
