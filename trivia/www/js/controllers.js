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

.controller('WhatToDoController', function ($scope, $state) {
  //console.log("llego");

/**
 * Sends an email using Email composer with attachments plugin and using
 * parameter email.
 *
 * @param email
 */
$scope.sendEmail = function (email) {
  if (window.plugins && window.plugins.emailComposer) { //check if plugin exists

    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
        console.log("Email sent successfully");
      },    

      "Ionic Proyect",        // Subject
      " Buenas",        // Body
      [email],     // To (Email to send)
      "pepito@adas.com",        // CC
      null,        // BCC
      true,       // isHTML
      null,        // Attachments
      null);       // Attachment Data


  }
  else
  {
    console.log("no tan los plugins");
  }

}
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
/*XMLHttpRequest cannot load http://www.mocky.io/v2/5185415ba171ea3a00704eed. 
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin
 'http://localhost:8100' is therefore not allowed access. 

PREGUNTAR A OCTAVIO QUE ONDA CON ESTO, PORQUE EN FIREBASE TMB LO TIRABA
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related


 */


.controller('TriviaCtrl', function($ionicPopup,$scope, $stateParams,$http) {
  //$scope.chat = Chats.get($stateParams.name);
 //llega el nombre de usuario actual
 $scope.usuario = $stateParams.name;
 var puntaje = 0;
  var i = 0;
 // console.log($stateParams.name);

  // json con preguntas y respuestas
  // http://www.mocky.io/v2/57d8b1c60f00005c11831471

  $http.get('http://www.mocky.io/v2/57d8b1c60f00005c11831471')
  .then(function(respuesta) {       

         $scope.preguntasYrespuestas = respuesta.data;
         $scope.preg = $scope.preguntasYrespuestas[0];

         //console.log(respuesta.data);

    },function (error) {
         $scope.preguntasYrespuestas = [];
        console.log( error);
        $scope.index = 0;
        
   });

  $scope.esCorrecta = function(opcion)
  {
    
      if($scope.preguntasYrespuestas[i].correcta == opcion)
        {
          alert("eaaaa");
          puntaje += 100;
        }
      else 
        {
          alert("mal");          
        }
      //proxima pregunta
      i++;
      $scope.preg = $scope.preguntasYrespuestas[i];
      if(i==4)
      {
      //ESCRIBIR USUARIO + PUNTAJE EN FIREBASE        
          $scope.showAlert(puntaje +" puntos para el usuario " + $scope.usuario);        
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

.controller('AccountCtrl', function($scope) {
 $scope.miFoto = 'img/miFoto.png';

});
