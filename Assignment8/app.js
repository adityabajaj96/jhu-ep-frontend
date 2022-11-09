(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.getMatchedMenuItems = function (searchValue) {
      // if there is no search term then return an empty array
      if (!searchValue || searchValue === '') {
        narrowItDown.found = [];
      } else {
        MenuSearchService.getMatchedMenuItems(searchValue)
          .then(function (result) {
            narrowItDown.found = result;
          }).catch(function (error) {
            console.log("Something went wrong getting matched menu items");
          });
      }
    };

    narrowItDown.removeItemAtIndex = function (index) {
      narrowItDown.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    // Responsible for reaching out to the server (using the $http service) to retrieve 
    // the list of all the menu items. Once it gets all the menu items, it should loop 
    // through them to pick out the ones whose description matches the searchTerm. Once a 
    // list of found items is compiled, it should return that list (wrapped in a promise).
    service.getMatchedMenuItems = function (searchTerm) {
      var config = {
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      };

      return $http(config).then(function (result) {
        // process result and only keep items that match
        return result.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }
})();
