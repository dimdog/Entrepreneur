(function(){
  var app = angular.module("data", ["firebase"]);
 
  app.service('dataService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){
      var userRef = new Firebase('https://boiling-heat-634.firebaseio.com/users');
      this.users = $firebaseArray(userRef);
      this.addUser = function(name){
        userRef.push({
          name: name,
          money: 18,
          seasonals: 0,
          slots: 0,
        });
      };

      var stateRef = new Firebase('https://boiling-heat-634.firebaseio.com/state');
      this.state = $firebaseObject(stateRef);
      this.setState = function(state) {
        stateRef.set({ state: state });
      }

      var tileRef = new Firebase('https://boiling-heat-634.firebaseio.com/tiles');
      this.availableTiles = $firebaseArray(tileRef);
      
  }]);
})();
