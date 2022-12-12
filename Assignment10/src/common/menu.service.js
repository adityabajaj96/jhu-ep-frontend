(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', '$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items/' + category + '.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItemPromise = function (shortname) {
    var config = {
      method: "GET",
      url: (`${ApiPath}/menu_items/${shortname}.json`)
    };

    return $http(config);
  };

  service.doesMenuItemExist = function (shortname) {
    return service.getMenuItemPromise(shortname).then(function(response) {
      return $q.resolve(true);
    }).catch(function(error){
      return $q.resolve(false);
    });
  };
}

})();
