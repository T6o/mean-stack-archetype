// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'example' controller
angular.module('mail').controller('MailController', ['$scope', '$location', '$http','Authentication',
  function($scope, $location, $http, Authentication) {
    // Expose the authentication service
    $scope.authentication = Authentication;
    if($scope.authentication.user == null){
      $location.path("/#!/home");
    }

    $scope.sendMail = function() {

      var data = ({
        mail: $scope.mail,
        subject: $scope.subject,
        message: $scope.message
      });

      // Simple POST request example (passing data) :
      $http.post('/api/mail', data).then(function successCallback(response) {

      }, function errorCallback(response) {

      });

    };
  }
]);
