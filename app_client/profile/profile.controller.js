(function() {
  
  angular
    .module('kspuApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'kspuData', '$scope'];
  function profileCtrl($location, kspuData, $scope) {
    var vm = this;

    vm.user = {};

    kspuData.getProfile()
      .success(function(data) {
        vm.user = data;
          $scope.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();