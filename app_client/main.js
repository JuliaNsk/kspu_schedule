(function () {

  angular.module('kspuApp', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/schedules', {
        templateUrl: '/schedules/schedules.view.html',
        controller: 'schedulesCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/schedule/add-schedule', {
        templateUrl: '/schedules/add-schedule.view.html',
        controller: 'addScheduleCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/subjects', {
        templateUrl: '/subjects/subjects.view.html',
        controller: 'subjectsCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/groups', {
        templateUrl: '/groups/groups.view.html',
        controller: 'groupsCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/organizations', {
        templateUrl: '/organizations/organizations.view.html',
        controller: 'organizationsCtrl',
        controllerAs: 'vm'
      })
        .when('/admin/teachers', {
        templateUrl: '/teachers/teachers.view.html',
        controller: 'teachersCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() !== '/login' && !$location.path() !== '/register' && !authentication.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }

  angular
    .module('kspuApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
