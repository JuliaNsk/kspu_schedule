(function () {

    angular
        .module('kspuApp')
        .controller('organizationsCtrl', organizationsCtrl);

    organizationsCtrl.$inject = ['organizations', '$window', '$scope'];
    function organizationsCtrl(organizations, $window) {
        var vm = this;
        // md.initMinimizeSidebar();
        vm.newOrganization = {};
        getOrganizationsList();

        function getOrganizationsList() {
            organizations.getOrganizations()
                .error(function (err) {
                    alert(err);
                })
                .then(function (organizations) {
                    vm.organizations = organizations.data
                });
        }

        vm.removeOrganization = function (subj) {
            if ($window.confirm('Ви дійсно бажаєте видалити організацію?')) {
                organizations.removeOrganizations(subj)
                    .then(function () {
                        vm.newOrganization = {};
                        getOrganizationsList()
                    })
            }
        };

        vm.editModal = function (subj) {
            vm.organizationData = angular.copy(subj)
        };

        vm.editOrganization = function () {
            organizations.editOrganizations(vm.organizationData)
                .then(function () {
                    vm.organizationData = {};
                    getOrganizationsList()
                });
        };

        vm.addOrganization = function () {
            organizations.addOrganizations(vm.newOrganization)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newOrganization = {};
                    getOrganizationsList()
                });
        }
    }

})();
