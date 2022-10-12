(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  
  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.messageStyling = '';

    $scope.checkLunchMenu = function () {
      $scope.message = getMessage($scope.lunchMenu);
      $scope.messageStyling = getMessageStyling($scope.message);
    }
  }

  function getMessage(lunchMenu) {
    if (!lunchMenu || lunchMenu.length === 0) {
      return 'Please enter data first';
    }

    // seperate the comma seperated string of items into an array
    // and remove empty items, i.e., , , from the lunch menu item count
    var lunchMenuItems = lunchMenu.split(',')
      .map(rawItem => rawItem.trim())
      .filter(item => item.length > 0);

    if (lunchMenuItems.length === 0) {
      return 'Please enter data first';
    } else if (lunchMenuItems.length > 3) {
      return 'Too much!';
    } else {
      return 'Enjoy!';
    }
  }

  function getMessageStyling(message) {
    if (message === 'Please enter data first') {
      return 'danger-message';
    } else {
      return 'success-message';
    }
  }

})();