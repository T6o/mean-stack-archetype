// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' controller
angular.module('map').controller('MapController', ['$rootScope', '$http','$scope','$location', '$routeParams', 'Authentication', 'MapService', 'geolocation',
  function($rootScope, $http, $scope, $location, $routeParams, Authentication, MapService, geolocation) {
    // Expose the Authentication service
    $scope.authentication = Authentication;
    if($scope.authentication.user == null){
      $location.path("/#!/home");
    }else{
    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.longitude = -98.350;
    $scope.formData.latitude = 39.500;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data) {
      if($scope.authentication.user == null){
        $location.path("/#!/home");
      }
      $(".loader").show();
      // Set the latitude and longitude equal to the HTML5 coordinates
      coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };

      // Display coordinates in location textboxes rounded to three decimal points
      $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
      $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

      // Display message confirming that the coordinates verified.
      $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

      MapService.refresh($scope.formData.latitude, $scope.formData.longitude);
      $(".loader").hide();
    });

    // Functions
    // ----------------------------------------------------------------------------

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function() {

      // Run the gservice functions associated with identifying coordinates
      $scope.$apply(function() {
        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
      });
    });

    // Function for refreshing the HTML5 verified location (used by refresh button)
    $scope.refreshLoc = function() {
      geolocation.getLocation().then(function(data) {
        coords = {
          lat: data.coords.latitude,
          long: data.coords.longitude
        };

        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
        gservice.refresh(coords.lat, coords.long);
      });
    };

    // Take query parameters and incorporate into a JSON queryBody
    $scope.queryArticles = function(){
      var queryBody = {};

        // Assemble Query Body
        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            distance: parseFloat($scope.formData.distance),
        };

        // Post the queryBody to the /query POST route to retrieve the filtered results
        $http.post('/api/mgeoartlist', queryBody).then(function successCallback(response) {
          // Pass the filtered results to the Google Map Service and refresh the map
          MapService.refresh(queryBody.latitude, queryBody.longitude, response);
          // Count the number of records retrieved for the panel-footer
          $scope.queryCount = response.length;
        }, function errorCallback(response) {
          console.log('Error ' + response);
        });
    };
  }
}
]);
