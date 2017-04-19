(function () {

    angular
        .module('kspuApp')
        .controller('groupsCtrl', groupsCtrl);

    groupsCtrl.$inject = ['groups', '$window', 'organizations'];
    function groupsCtrl(groups, $window, organizations) {
        var vm = this;
        md.initMinimizeSidebar();

        vm.newGroup = {};
        getGroupsList();
        getOrganizationsList();


        function getGroupsList() {
            groups.getGroups()
                .error(function (err) {
                    alert(err);
                })
                .then(function (groups) {
                    vm.groups = groups.data
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

        vm.removeGroup = function (group) {
            if ($window.confirm('Ви дійсно бажаєте видалити групу?')) {
                groups.removeGroups(group)
                    .then(function () {
                        vm.newGroup = {};
                        getGroupsList()
                    })
            }
        };

        vm.editModal = function (group) {
            vm.groupData = angular.copy(group);
            vm.groupData.organization = vm.organizations.find(findOrganization);
            selectPickerActivate()
        };

        vm.editGroup = function () {
            vm.groupData.organization = vm.organizations.find(findOrganization);
            groups.editGroups(vm.groupData)
                .then(function () {
                    vm.groupData = {};
                    getGroupsList();
                });
        };

        vm.addGroup = function () {
            // vm.newGroup.organization = vm.organizations.find(findOrganization);

            groups.addGroups(vm.newGroup)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newGroup = {};
                    getGroupsList()
                });
        };

        function findOrganization(org) {
            return org.name == vm.newGroup.organization || org.name == vm.groupData.organization || org._id == vm.groupData.organization;
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
