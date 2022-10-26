(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('angularDollars', AngularDollarsFilter);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    alreadyBought.getTotalPrice = function (item) {
      // We want to make sure the input value is numeric, otherwise we want to set it to 0
      if (!isNumeric(item.quantity) || !isNumeric(item.pricePerItem)) {
        return 0;
      } else {
        return item.quantity * item.pricePerItem;
      }
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of prepopulated items to buy 
    var toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 1 },
      { name: "milk", quantity: 2, pricePerItem: 1 },
      { name: "brownies", quantity: 8, pricePerItem: 2 },
      { name: "coffee", quantity: 20, pricePerItem: 1.5 },
      { name: "cake", quantity: 1, pricePerItem: 5 },
      { name: "chips", quantity: 5, pricePerItem: .5 }
    ];

    // List of items already bought
    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      // Array.splice returns an array of the removed items, so we need to get the 
      // first index of that array (since we are only removing one item at a time)
      var itemBeingBought = toBuyItems.splice(itemIndex, 1)[0];

      // Since quantity can be changed by the user if it is left blank or not numeric then we want to set it to 0
      if (!itemBeingBought.quantity || !isNumeric(itemBeingBought.quantity)) {
        itemBeingBought.quantity = 0;
      }

      boughtItems.push(itemBeingBought);
    };

    service.getItemsToBuy = function () {
      return toBuyItems;
    };

    service.getItemsAlreadyBought = function () {
      return boughtItems;
    };
  }

  function AngularDollarsFilter() {
    return function (input) {

      // We want to make sure the input value is numeric, otherwise we want to set it to 0
      if (!isNumeric(input)) {
        input = 0;
      }

      // code to properly round to 2 decimal places 
      // modified from https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
      return '$$$' + (Math.round(input * 100) / 100).toFixed(2);
    };
  }

  // Helper function which returns true iff the passed in parameter is a number, 
  // otherwise it returns false
  // code used from https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
})();
