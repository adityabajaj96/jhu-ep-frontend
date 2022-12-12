(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;

  service.getUserDetails = function () {
    return service.user;
  };

  service.setUserDetails = function (user) {
    service.user = user;
  };

}

})();
