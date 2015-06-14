(function(){ 
  var app = angular.module("game", ["firebase"]);
  
  app.directive("createUsers", function() {
    return {
      restrict: "E",
      templateUrl: "static/html/create-users.html",
      controller: function() {
        this.users = ['ben','gigi'];

        this.addUser = function() {
          this.users.push(this.newUser);
          this.curUser ="";
          
        };

      },
      controllerAs: "userCtrl"
    };
  });

})();
