(function () {

  angular
    .module('kspuApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['kspu-token'] = token;
    };

  var setUserData = function (data) {
      $window.localStorage['kspu-userData'] = data;
    };
  var getUserData = function () {
     return $window.localStorage['kspu-userData'];
    };

    var getToken = function () {
      return $window.localStorage['kspu-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
        setUserData(data)
      });
    };

    logout = function() {
      $window.localStorage.removeItem('kspu-token');
    };

      return {
          currentUser: currentUser,
          saveToken: saveToken,
          getUserData: getUserData,
          setUserData: setUserData,
          getToken: getToken,
          isLoggedIn: isLoggedIn,
          register: register,
          login: login,
          logout: logout
      };
  }


})();