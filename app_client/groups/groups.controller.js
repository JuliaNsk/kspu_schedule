(function () {

    angular
        .module('kspuApp')
        .controller('groupsCtrl', groupsCtrl);

    groupsCtrl.$inject = ['groups', '$window', '$scope'];
    function groupsCtrl(groups, $window) {
        var vm = this;
        vm.newGroup = {};
        getGroupsList();

        function getGroupsList() {
            groups.getGroups()
                .error(function (err) {
                    alert(err);
                })
                .then(function (groups) {
                    vm.groups = groups.data
                });
        }

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
            vm.groupData = angular.copy(group)
        };

        vm.editGroup = function () {
            groups.editGroups(vm.groupData)
                .then(function () {
                    vm.groupData = {};
                    getGroupsList();
                });
        };

        vm.addGroup = function () {
            groups.addGroups(vm.newGroup)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    vm.newGroup = {};
                    getGroupsList()
                });
        }
    }

})();
