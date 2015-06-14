(function(){ 
  var app = angular.module("game", ["firebase"]);
  
  app.directive("createUsers", function() {
    return {
      restrict: "E",
      templateUrl: "static/html/create-users.html",
      controller: function() {
        this.users = [];

        this.addUser = function() {
          this.users.push(this.curUser);
          this.curUser ="";
          
        };

      },
      controllerAs: "userCtrl"
    };
  });

})();
