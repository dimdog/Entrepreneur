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
        this.selectUser = function (user) {
          this.selectedUser = user;
          this.deleteUserButtonText = "Delete " + user.name;
        };
        this.deleteUser = function() {
          if (this.selectedUser){
            dataService.deleteUser(this.selectedUser)
            this.selectedUser = null;
          }
          this.updateText(-1);
          this.deleteUserButtonText = "Delete player";
        };
        this.updateText = function(incr) {

          if (dataService.users.length  + (incr || 0)  <5){
            this.addUserButtonText = "Add " + (this.newUser || "Player");
          }
          else{
            this.addUserButtonText = "Can't add more players";
          }
          if(dataService.users.length +(incr || 0) == 1){
            this.startButtonText = "Add one more player!";
          }
          else if(dataService.users.length +(incr || 0) == 0){
            this.startButtonText = "Add some players!";
          }
          else{
            this.startButtonText = "Start the Game!";
          }
        };
        this.submitUserOK = function() {
          return this.newUser.length > 0 && dataService.users.length < 5;
        };
        this.nextStage = function () {
          $location.path('/initialOrder');
          dataService.firstTimeTiles();
        };
        function numPlayersOK(players){
          return players > 1 && players < 5;
        };
        function init(){
          $location.path('/players');
          dataService.setState("players");
        };
        var local = this;
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
