angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicModal,$ionicPopup, $timeout,$state) {

$scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/tab-dash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
    if($scope.loginData.usuario == null || $scope.loginData.usuario =="")
    {
          $scope.showAlert("Ingrese su usuario");
    }
      else
      {
        var user = $scope.loginData.usuario;
        $scope.usuario = user.trim();

        $scope.showAlert("A jugar " + $scope.usuario);
        var usuario = { "name": $scope.usuario};
        $state.go("tab.trivia", usuario);
      }
    };
  
     $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('TriviaCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.name);
 
 $scope.usuario = $stateParams.name;
  console.log($stateParams.name);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
