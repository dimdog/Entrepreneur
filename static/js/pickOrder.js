(function(){ 
  var app = angular.module("pickOrder", ["data"]);
  app.directive("pickOrder", ["dataService", function(dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/pick-order.html",
      controller: function() {
        var tiles = [
          { "val" : 1, 'discount' : 0},
          { "val" : 2, 'discount' : 0},
          { "val" : 3, 'discount' : 0},
          { "val" : 4, 'discount' : 1},
          { "val" : 5, 'discount' : 1},
          { "val" : 6, 'discount' : 2},
          { "val" : 7, 'discount' : 2},
          { "val" : 8, 'discount' : 3},
          { "val" : 9, 'discount' : 3},
          { "val" : 10, 'discount' : 4},
          { "val" : 11, 'discount' : 4},
          { "val" : 12, 'discount' : 4},
        ]
        var startingTiles = {
          2 : { deck: [1,4,6,8],
                hand: [2,10]
              },
          3 : { deck: [1,2,3,4,6],
                hand: [5,7,8]
              },
          4 : { deck: [1,2,3,4,5,6],
                hand: [7,8,9,10]
              },
          5 : { deck: [1,2,3,4,5,6,7],
                hand: [8,9,10,11,12]
              },
        }
        this.state = dataService.state;
        this.init = function(){
          console.log("here");
        };
      },
      controllerAs: "orderCtrl"
    };
  }]);

})();


