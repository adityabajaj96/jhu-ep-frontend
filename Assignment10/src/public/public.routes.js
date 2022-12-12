(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/signup/signup.html',
      controller: 'SignUpController',
      controllerAs: 'signupCtrl',
      resolve: {
          user: ['UserService', function (UserService) {
            return UserService.getUserDetails();
          }],
          saveUser: ['UserService', function (UserService) {
            return UserService.setUserDetails;
          }]
      }
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'MyInfoController',
      controllerAs: 'myinfoCtrl',
      resolve: {
        user: ['UserService', function (UserService) {
          return UserService.getUserDetails();
        }],
        menuItem: ['MenuService', 'user', function(MenuService, user){
          if(!user){
            return null;
          }
          return MenuService.getMenuItemPromise(user.favoriteDish).then(function(response){
            return response.data;
          });
        }]
      }
    });
}
})();
