(function () {

    angular
        .module('kspuApp')
        .controller('subjectsCtrl', subjectsCtrl);

    subjectsCtrl.$inject = ['subjects', '$window', 'organizations'];
    function subjectsCtrl(subjects, $window, organizations) {
        var vm = this;
        md.initMinimizeSidebar();

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
            selectPickerActivate()
        };
        vm.addSubject = function () {
            vm.newSubject.organization = vm.organizations.find(findOrganization);

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
            vm.subjectData = angular.copy(subj);
            vm.subjectData.organization = vm.organizations.find(findOrganization);
            selectPickerActivate()
        };

        vm.editSubject = function () {
            vm.subjectData.organization = vm.organizations.find(findOrganization);
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

        function findOrganization(org) {
            return org.name == vm.newSubject.organization || org.name == vm.subjectData.organization || org._id == vm.subjectData.organization;
        }

        function selectPickerActivate() {
            if($(".selectpicker").length != 0){
                $(".selectpicker").selectpicker();
            }
            $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

            $('.form-control').on("focus", function(){
                $(this).parent('.input-group').addClass("input-group-focus");
            }).on("blur", function(){
                $(this).parent(".input-group").removeClass("input-group-focus");
            });
        }

    }
})();
