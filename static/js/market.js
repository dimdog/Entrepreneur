(function(){
  var app = angular.module("market", ["data"]);
  app.directive("market", [ "dataService", function( dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/market.html",
      controller: function() {
        this.selected = null;
        this.state = dataService.state;
        this.users = dataService.syncedUsers;
        this.market = dataService.market; 
        this.inventory = dataService.inventory;
        this.itemClicked = function(item){
          this.selected = item;
          console.log(item);
        };
        

      },
      controllerAs: "marketCtrl",
    };
  }]);

})();
