(function(){ 
  var app = angular.module("pickOrder", ["data"]);
  app.directive("pickOrder", ["dataService", function(dataService) {
    return {
      restrict: "E",
      templateUrl: "static/html/pick-order.html",
      controller: function() {
        this.state = dataService.state;
        this.init = function(){
          console.log("here");
        };
      },
      controllerAs: "orderCtrl"
    };
  }]);

})();


