(function () {

    angular
        .module('kspuApp')
        .controller('groupsCtrl', groupsCtrl);

    groupsCtrl.$inject = ['groups', '$window', 'organizations'];
    function groupsCtrl(groups, $window, organizations) {
        var vm = this;
        vm.select = '';

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
            $(".selectpicker")
                .selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });
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
            $(".selectpicker").selectpicker('refresh')
                .change(function(e) {
                    vm.select = $(this).find('option:selected').text()
                });
            vm.groupData = angular.copy(group);
            vm.groupData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
        };

        vm.editGroup = function () {
            vm.groupData.organization = vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            groups.editGroups(vm.groupData)
                .then(function () {
                    vm.groupData = {};
                    getGroupsList();
                });
        };

        vm.addGroup = function () {
            vm.newGroup.organization =  vm.organizations.filter(function( org ) {
                return org.name == vm.select;
            })[0];
            groups.addGroups(vm.newGroup)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newGroup = {};
                    getGroupsList()
                });
        };

    }

})();
