(function(){ 
  var app = angular.module("game", ["firebase"]);
  
  app.directive("createUsers", ['$firebaseArray', function($firebaseArray) {
    return {
      restrict: "E",
      templateUrl: "static/html/create-users.html",
      controller: function() {
        var myDataRef = new Firebase('https://boiling-heat-634.firebaseio.com/users');
        this.users = $firebaseArray(myDataRef);
        this.addUser = function() {
          myDataRef.push({
            name: this.newUser,
            money: 18,
            seasonals: 0,
            slots: 0,
          });
          console.log(this.users);
          this.newUser ="";
          
        };

      },
      controllerAs: "userCtrl"
    };
  }]);

})();
