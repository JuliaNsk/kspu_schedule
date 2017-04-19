(function() {

    angular
        .module('kspuApp')
        .controller('addScheduleCtrl', addScheduleCtrl);

    addScheduleCtrl.$inject = ['$location', 'schedules', 'organizations', 'subjects', 'teachers', '$q', 'groups'];
    function addScheduleCtrl($location, schedules, organizations, subjects, teachers, $q, groups) {
        var vm = this;
        vm.years = ['2015-2016', '2016-2017', '2017-2018'];

        md.initMinimizeSidebar();
        getInfo();
        function getInfo() {
            $q.all([getSchedulesList(), getOrganizationsList(), getTeachersList(), getSubjectsList(), getGroupsList(), refresh()])
        }
        vm.schedules = [];

        function getSchedulesList() {
            schedules.getSchedules()
                .error(function (err) {
                    alert(err);
                })
                .then(function (schedules) {
                    vm.schedules = schedules.data
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

        function getSubjectsList() {
            subjects.getSubjects()
                .error(function (err) {
                    alert(err);
                })
                .then(function (subjects) {
                    vm.subjects = subjects.data;
                    $(".selectpicker").selectpicker('refresh');
                });
        }

        function getGroupsList() {
            groups.getGroups()
                .error(function (err) {
                    alert(err);
                })
                .then(function (groups) {
                    vm.groups = groups.data;
                    $(".selectpicker").selectpicker('refresh');
                });
        }

        function getTeachersList() {
            teachers.getTeachers()
                .error(function (err) {
                    alert(err);
                })
                .then(function (teachers) {
                    vm.teachers = teachers.data;
                    $(".selectpicker").selectpicker('refresh');
                });
        }

        function refresh() {
           setTimeout(function () {
               vm.teachers = teachers.data;
               $(".selectpicker").selectpicker('refresh');
           }, 2000)

        }

    }

})();
