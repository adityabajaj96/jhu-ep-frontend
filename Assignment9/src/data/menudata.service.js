(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var menuService = this;

        menuService.getAllCategories = function () {
            var config = {
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };

        menuService.getItemsForCategory = function (categoryShortName) {
            var config = {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };
    }

})();
