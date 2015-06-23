(function(){
  var app = angular.module("pickOrder", ["data"]);
  app.directive("pickOrder", ["$location", "dataService", function($location, dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/pick-order.html",
      controller: function() {
        this.selected = null;
        var turn = 0;
        this.state = dataService.state;
        this.tiles = dataService.availableTiles;
        this.users = [];
        this.localUser = dataService.localUser;

        this.userPickButton = function(){
          this.users = dataService.syncedUsers;
          if (this.users.length > 1 && turn < this.users.length){
            this.users.sort(function(a,b) { return a.tile > b.tile } );
            this.selectedUser = this.users[turn];
            return this.selectedUser.name + "::" +this.selectedUser.tile;
          }
        };
        this.getImgSRC = function(tile){
          return "order"+tile.value+".png";

        };
        this.tileClicked = function(tile){
          this.selected = tile;
        };
        this.pick = function(){
          if (turn < this.users.length){
            turn++;
            dataService.takeUserTile(this.selectedUser, this.selected);
          }
          if (turn == this.users.length){
            nextStage();
          }
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
