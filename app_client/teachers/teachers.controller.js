(function () {

    angular
        .module('kspuApp')
        .controller('teachersCtrl', teachersCtrl);

    teachersCtrl.$inject = ['teachers', '$window', 'organizations'];
    function teachersCtrl(teachers, $window, organizations) {
        var vm = this;
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
            $(".selectpicker").selectpicker('refresh');

        };

        vm.editModal = function (subj) {
            $(".selectpicker").selectpicker('refresh');

            vm.teacherData = angular.copy(subj);
            vm.teacherData.organization = vm.organizations.find(findOrganization);

        };

        vm.editTeacher = function () {

            vm.teacherData.organization = vm.organizations.find(findOrganization);
            teachers.editTeachers(vm.teacherData)
                .then(function () {
                    vm.teacherData = {};
                    getTeachersList()
                });
        };

        vm.addTeacher = function () {
            vm.newTeacher.organization = vm.organizations.find(findOrganization);
            teachers.addTeachers(vm.newTeacher)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newTeacher = {};
                    getTeachersList()
                });
        };

        function findOrganization(org) {
            return org.name == vm.newTeacher.organization || org.name == vm.teacherData.organization || org._id == vm.teacherData.organization;
        }

        // function selectPickerActivate() {
        //     if($(".selectpicker").length != 0){
        //         $(".selectpicker").selectpicker();
        //     }
        //     $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });
        //
        //     $('.form-control').on("focus", function(){
        //         $(this).parent('.input-group').addClass("input-group-focus");
        //     }).on("blur", function(){
        //         $(this).parent(".input-group").removeClass("input-group-focus");
        //     });
        // }

    }
})();
