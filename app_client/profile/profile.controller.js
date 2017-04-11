(function() {
  
  angular
    .module('kspuApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'kspuData'];
  function profileCtrl($location, kspuData) {
    var vm = this;

    vm.user = {};

    kspuData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();