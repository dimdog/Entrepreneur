(function(){
  var app = angular.module("pickOrder", ["data"]);
  app.directive("pickOrder", ["$location", "dataService", function($location, dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/pick-order.html",
      controller: function() {
        var local = this;
        this.selected = null;
        this.state = dataService.state;
        this.tiles = dataService.availableTiles;
        this.users = [];

        this.state.$watch(function(data){
            if (local.state.state == "order" && local.state.turn == null){
              dataService.syncedUsers = dataService.syncUsers();
              local.users = dataService.syncedUsers;
              local.localUser = dataService.localUser;
            }
            else if (local.state.state == "order" && local.state.turn == 0){
              local.calculateCurrentUserTurn();
          
            }
            else if (local.state.state == "order" && local.state.turn > 0){
              local.currentUserTurn();
            } 
            if (local.state.turn == local.users.length && local.state.turn > 0){
              nextStage();
            }

        });
        this.currentUserTurn = function(){
            this.selectedUser = this.users[this.state.turn];
            return this.selectedUser;
        };

        this.calculateCurrentUserTurn = function(){
          this.users.sort(function(a,b) { return a.tile < b.tile } );
          return this.currentUserTurn();
        };

        this.getImgSRC = function(tile){
          return "order"+tile.value+".png";

        };
        this.tileClicked = function(tile){
          this.selected = tile;
        };
        this.pick = function(){
          dataService.setTurn(this.state.turn+1);
          dataService.takeUserTile(this.selectedUser, this.selected);
        };
        function nextStage(){
          dataService.setState("market");
          $location.path('/market');
          

        };
      },
      controllerAs: "orderCtrl"
    };
  }]);

})();
