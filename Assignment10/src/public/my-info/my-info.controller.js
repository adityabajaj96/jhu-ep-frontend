(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'menuItem', 'ApiPath'];
function MyInfoController(user, menuItem, ApiPath) {
  var myInfoCtr = this;

  myInfoCtr.user = user;
  myInfoCtr.menuItem = menuItem;
  myInfoCtr.basePath = ApiPath;
}

})();
