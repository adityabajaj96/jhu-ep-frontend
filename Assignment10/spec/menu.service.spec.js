describe('menu service', function () {

  var menuService;
  var $httpBackend;
  var ApiBasePath;
  var validShortname = 'A1';
  var validResponse = { "id": 1, "short_name": "A1", "name": "Won Ton Soup with Chicken", "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart", "created_at": "2020-05-06T19:09:34.146Z", "updated_at": "2020-05-06T19:09:34.146Z", "category_short_name": "A", "image_present": true };
  var invalidShortname = 'ZZ55';
  var invalidResponse = 'Internal Server Error';

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return a promise that resolves to true if the menu item exists', function () {
    $httpBackend.whenGET(`${ApiBasePath}/menu_items/${validShortname}.json`).respond(200, validResponse);
    menuService.doesMenuItemExist(validShortname).then(function (response) {
      expect(response).toEqual(true);
    });
    $httpBackend.flush();
  });

  it('should return a promise that resolves to false if the menu item does not exist', function () {
    $httpBackend.whenGET(`${ApiBasePath}/menu_items/${invalidShortname}.json`).respond(500, invalidResponse);
    menuService.doesMenuItemExist(invalidShortname).then(function (response) {
      expect(response).toEqual(false);
    });
    $httpBackend.flush();
  });

});