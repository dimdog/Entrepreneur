(function(){ 
  var app = angular.module("game", ["firebase"]);
  app.directive("createUsers", ['$firebaseArray', function($firebaseArray) {
    return {
      restrict: "E",
      templateUrl: "static/html/create-users.html",
      controller: function() {
        this.ref = new Firebase('https://boiling-heat-634.firebaseio.com/users');
        this.addUserButtonText = "Add User";
        this.selectedUser = null; 
        this.newUser="";
        this.users = $firebaseArray(this.ref);
        this.addUser = function() {
          this.ref.push({
            name: this.newUser,
            money: 18,
            seasonals: 0,
            slots: 0,
          });
          this.newUser ="";
          console.log("calling");
          this.updateText(1);
        };
        this.selectUser = function (user) { 
          this.selectedUser = user; 
        };
        this.deleteUser = function() {
          if (this.selectedUser){
            this.ref.child(this.selectedUser.$id).remove()
            this.selectedUser = null;
          }
          this.updateText(-1);
        };
        this.updateText = function(incr) {
          if (this.users.length  + (incr || 0)  <5){
            this.addUserButtonText = "Add " + (this.newUser || "User");
          }
          else{
            this.addUserButtonText = "Can't add more users";
          }
          
        };
        this.submitUserOK = function() {
          return this.newUser.length > 0 && this.users.length < 5;
        };
        function numPlayersOK(){
          return this.users.length > 1 && this.users.length < 5;
        };
      },
      controllerAs: "userCtrl"
    };
  }]);

})();
