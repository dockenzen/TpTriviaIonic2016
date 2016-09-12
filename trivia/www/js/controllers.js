angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicModal,$ionicPopup, $timeout,$state,Chats) {

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
        Chats.user = usuario;
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

.controller('ChatsCtrl', function($scope, Chats,$timeout) {

var messagesRef = new Firebase('https://primerfirebase-a52b4.firebaseio.com/');

  $scope.chats = [];
  

   messagesRef.on('child_added', function (snapshot) 
  {
    $timeout(function(){
    message = snapshot.val();
    if(message.fechaIngreso != null){

      var fecha = new Date(message.fechaIngreso);
      var hora = fecha.getHours();
      var minutos = fecha.getMinutes();
     
      var horario = hora+":"+minutos;
      message.fechaIngreso = horario;
     

        $scope.chats.push(message);
        //console.log($scope.chats);
                                  }
              });
    //$scope.chats = 
    //console.log(fecha);
    //$('<div/>').text(message.mensaje+" -> Enviado a las "+hora+":"+minutos+":"+segundos).prepend($('<em/>').text(message.usuario+': ')).appendTo($('#messagesDiv'));
    
    /*$('<div/>').text(message.mensaje+" -> Enviado a las "+message.fechaIngreso).prepend($('<em/>').text(message.usuario+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    */
  });
  

  //  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
  Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
 // $scope.chat = Chats.get($stateParams.chatId);


  $scope.enviarMensaje = function (){
/*  
  var text = $scope.message;
  var name = Chats.user;
  var fecha = Firebase.ServerValue.TIMESTAMP;

  var messagesRef = new Firebase('https://primerfirebase-a52b4.firebaseio.com/');
  messagesRef.push({usuario:name, mensaje:text, fechaIngreso:fecha});
*/
  console.log(Chats.user);
  $scope.message ='';
  };



})

.controller('TriviaCtrl', function($scope, $stateParams) {
  //$scope.chat = Chats.get($stateParams.name);
 //llega el nombre de usuario actual
 $scope.usuario = $stateParams.name;
 // console.log($stateParams.name);
})

.controller('AccountCtrl', function($scope) {
 $scope.miFoto = 'img/miFoto.png';

});
