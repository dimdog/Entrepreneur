(function(){
  var app = angular.module("createUsers", ["data"]);
  app.directive("createUsers", ['$location', 'dataService', function($location, dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/create-users.html",
      controller: function() {
        this.state = dataService.state;
        this.addUserButtonText = "Add Player";
        this.deleteUserButtonText = "Delete player";
        this.selectedUser = null;
        this.newUser="";
        this.users = dataService.users;
        this.addUser = function() {
          dataService.addUser(this.newUser);
          this.newUser ="";
          this.updateText(1);
        };
        this.updateText = function() {

          if (dataService.users.length<5){
            this.addUserButtonText = "Add " + (this.newUser || "Player");
          }
          else{
            this.addUserButtonText = "Can't add more players";
          }
          if(dataService.users.length == 1){
            this.startButtonText = "Add one more player!";
          }
          else if(dataService.users.length== 0){
            this.startButtonText = "Add some players!";
          }
          else{
            this.startButtonText = "Start the Game!";
          }
        };
        this.nextStage = function () {
          $location.path('/initialOrder');
          dataService.setUpFirstUsers();
        };
        this.numPlayersOK = function(){
          return this.players > 1 && this.players < 5;
        };
        function init(){
          // login with Facebook
          dataService.auth.$authWithOAuthPopup("facebook").then(function(authData) {
            dataService.addUser(authData.facebook.displayName);
          }).catch(function(error) {
            console.log("Authentication failed:", error);
          });
          $location.path('/players');
          dataService.setState("players");
        };
        var local = this;
        this.users.$watch(
          function(data) {
            local.updateText();
          }
        );
        this.users.$loaded(
          function(data) {
            local.updateText();
            init();
          },
          function(error) {
            console.error("Error:", error);
          }
        );
      },
      controllerAs: "userCtrl"
    };
  }]);

})();
