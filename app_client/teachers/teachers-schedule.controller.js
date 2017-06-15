(function() {

    angular
        .module('kspuApp')
        .controller('teachersScheduleCtrl', teachersScheduleCtrl);

    teachersScheduleCtrl.$inject = ['$location', '$routeParams', 'schedules', 'organizations', 'subjects', 'teachers', '$q', 'groups'];
    function teachersScheduleCtrl($location, $routeParams, schedules, organizations, subjects, teachers, $q, groups) {
        var vm = this;
        vm.years = ['2015-2016', '2016-2017', '2017-2018'];
        // vm.currentSchedule = $routeParams.id;
        vm.currentTeacher = $routeParams.id;
        vm.schedule = {};
        vm.subjects = {};
        vm.groups = {};
        vm.teachers = {};


        md.initMinimizeSidebar();
        getInfo();
        function getInfo() {
            $q.all([getSchedulesList(), getOrganizationsList(), getTeachersList(), getSubjectsList(), getGroupsList()])
                .then(refresh)
        }


        function getSchedulesList() {
            return schedules.getSchedules()
                .error(function (err) {
                    alert(err);
                })
                .then(function (schedule) {
                    var date = new Date;

                    vm.schedule = {
                        monday: [],
                        tuesday: [],
                        wednesday: [],
                        thursday: [],
                        friday: []
                    };

                    $.each(schedule.data, function (index, schedule) {
                        if (schedule.year == 2016) {
                            $.each(schedule.monday, function (index, monday) {
                                if (monday && monday.teacher === vm.currentTeacher) {
                                    vm.schedule.monday[index]= monday
                                    vm.schedule.monday[index].group = schedule.group.number
                                }
                            })
                            $.each(schedule.tuesday, function (index, monday) {
                                if (monday && monday.teacher === vm.currentTeacher) {
                                    vm.schedule.monday[index]= monday
                                    vm.schedule.monday[index].group = schedule.group.number
                                }
                            })
                            $.each(schedule.wednesday, function (index, monday) {
                                if (monday && monday.teacher === vm.currentTeacher) {
                                    vm.schedule.monday[index]= monday
                                    vm.schedule.monday[index].group = schedule.group.number
                                }
                            })
                            $.each(schedule.thursday, function (index, monday) {
                                if (monday && monday.teacher === vm.currentTeacher) {
                                    vm.schedule.monday[index]= monday
                                    vm.schedule.monday[index].group = schedule.group.number
                                }
                            })
                            $.each(schedule.friday, function (index, monday) {
                                if (monday && monday.teacher === vm.currentTeacher) {
                                    vm.schedule.monday[index]= monday
                                    vm.schedule.monday[index].group = schedule.group.number
                                }
                            })
                        }
                    });
                    // vm.schedule


                    // vm.schedule = _.map(

                });
        }

        function getOrganizationsList() {
            return organizations.getOrganizations()
                .error(function (err) {
                    alert(err);
                })
                .then(function (organizations) {
                    vm.organizations = organizations.data
                })
        }

        function getSubjectsList() {
            return subjects.getSubjects()
                .error(function (err) {
                    alert(err);
                })
                .then(function (subjects) {
                    vm.subjects = subjects.data;
                });
        }

        function getGroupsList() {
            return groups.getGroups()
                .error(function (err) {
                    alert(err);
                })
                .then(function (groups) {
                    vm.groups = groups.data;
                    $(".selectpicker").selectpicker('refresh');
                });
        }

        function getTeachersList() {
            return teachers.getTeachers()
                .error(function (err) {
                    alert(err);
                })
                .then(function (teachers) {
                    vm.teachers = teachers.data;

                });
        }

        function refresh() {
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
            $.each(days, function (index, day) {
                $.each(vm.schedule[day], function (index, schedule) {
                    if(schedule) {
                        if (schedule.teacher) {
                            schedule.teacher = vm.teachers.filter(function( teacher ) {
                                return teacher._id == schedule.teacher;
                            })[0].name;
                        }
                        if (schedule.subject) {
                            schedule.subject = vm.subjects.filter(function( teacher ) {
                                return teacher._id == schedule.subject;
                            })[0].name;
                        }
                    }

                });

            })


        }


    }

})();
