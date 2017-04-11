(function() {

  angular
    .module('kspuApp')
    .service('kspuData', kspuData);

  kspuData.$inject = ['$http', 'authentication'];
  function kspuData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();