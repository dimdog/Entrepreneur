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
        this.inventoryTypes = [];
        var local = this;
        this.state.$loaded(function(){
          local.state.$watch(function(){
            if (local.state.state == "market"){
            
              local.init();
              console.log(local.inventoryTypes);
            }
          });
        });
        this.itemClicked = function(item){
          console.log(item);
          if (this.inventoryTypes[item.type].indexOf(item) == this.inventoryTypes[item.type].length-1){
            this.selected = item;
          }
          else {
            console.log("nope");
            
          }
        };
        this.pick = function(){

        };
        this.userPickButton = function() {
          //TODO already have the users sorted. 
          // TODO list the number of workers available to pull tiles down.
          // change users 
        };
        this.init = function(){
          this.inventoryTypes = {
             "machine": this.inventory.inventory.machines ,
             "red": this.inventory.inventory.reds ,
             "yellow": this.inventory.inventory.yellows ,
             "electricalEfficiency": this.inventory.inventory.electricalEfficiencies ,
             "efficiency": this.inventory.inventory.efficiencies ,
          }; 

        };
        

      },
      controllerAs: "marketCtrl",
    };
  }]);

})();
