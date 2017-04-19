(function () {

    angular
        .module('kspuApp')
        .controller('teachersCtrl', teachersCtrl);

    teachersCtrl.$inject = ['teachers', '$window', 'organizations'];
    function teachersCtrl(teachers, $window, organizations) {
        var vm = this;
        vm.select = '';
        md.initMinimizeSidebar();

        vm.newTeacher = {};
        getTeachersList();
        getOrganizationsList();


        function getTeachersList() {
            teachers.getTeachers()
                .error(function (err) {
                    alert(err);
                })
                .then(function (teachers) {
                    vm.teachers = teachers.data
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

        vm.removeTeacher = function (subj) {
            if ($window.confirm('Ви дійсно бажаєте видалити  дисципліну?')) {
                teachers.removeTeachers(subj)
                    .then(function () {
                        vm.newTeacher = {};
                        getTeachersList()
                    })
            }
        };

        vm.addModal = function () {
            $(".selectpicker")
                .selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });
        };

        vm.editModal = function (subj) {
            $(".selectpicker").selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });

            vm.teacherData = angular.copy(subj);
            vm.teacherData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];

        };

        vm.editTeacher = function () {

            vm.teacherData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            teachers.editTeachers(vm.teacherData)
                .then(function () {
                    vm.teacherData = {};
                    getTeachersList()
                });
        };

        vm.addTeacher = function () {
            vm.newTeacher.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            teachers.addTeachers(vm.newTeacher)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newTeacher = {};
                    getTeachersList()
                });
        };

    }
})();
