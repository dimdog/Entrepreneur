(function(){
  var app = angular.module("data", ["firebase"]);

  app.service('dataService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){

      var stateRef = new Firebase('https://boiling-heat-634.firebaseio.com/state');
      this.state = $firebaseObject(stateRef);

      var userRef = new Firebase('https://boiling-heat-634.firebaseio.com/users');
      this.users = $firebaseArray(userRef);

      var tileRef = new Firebase('https://boiling-heat-634.firebaseio.com/tiles');
      this.availableTiles = $firebaseArray(tileRef);

      var marketRef = new Firebase('https://boiling-heat-634.firebaseio.com/market');
      this.market = $firebaseArray(marketRef);

      var inventoryRef = new Firebase('https://boiling-heat-634.firebaseio.com/inventory');
      this.inventory = $firebaseObject(inventoryRef);
      var local = this;

      this.addUser = function(name){
        userRef.push({
          name: name,
          money: 18,
          seasonals: 0,
          slots: 0,
        });
      };
      this.deleteUser = function(user){
        userRef.child(user.$id).remove()
      }

      this.syncUsers = function(){
        var localUsers = [];
        for (var i = 0; i < this.users.length; i++){
          localUsers.push(this.users[i]);
        }
        return localUsers;
      };
      this.syncedUsers = []
      this.setState = function(state) {
        stateRef.set({ state: state });
      };
      this.updateUser = function(user, updateObj){
        userRef.child(user.$id).update(updateObj);

      };
      this.giveUserTileNum = function(user, tile){
        this.updateUser(user, { 'tile' : tile} );
      };
      this.takeUserTile = function(user, tileObj){
        this.updateUser(user, { 'tile' : tileObj.value} );
        tileRef.child(tileObj.$id).remove();

      }
      this.firstTimeTiles = function(){
        this.setState("order");
        var options = startingTiles[this.users.length];
        tileRef.remove();
        for (var t = 0; t< options.deck.length; t++){
          tileRef.push({
            value: options.deck[t]
          });
        }
        this.syncedUsers = this.syncUsers();
        this.setUpFirstUsers();
        setUpFirstMarket()

        for (var p = 0; p< this.users.length; p++){
          var choice = getRandomInt(options.hand.length-1);
          this.giveUserTileNum(this.users[p], options.hand[choice]);
          options.hand.splice(choice,1);
        }
      }
      this.setUpFirstUsers = function() {
        for (var j=0; j<this.users.length; j++){
          this.updateUser(this.users[j], {'items' : defaultItems});
        }
      }
      function setUpFirstMarket() {
        marketRef.remove();
        for (var i =0;i<3;i++){
          marketRef.push(marketInitialItems.splice(getRandomInt(marketInitialItems.length-1),1)[0]);
        }
        local.inventory.inventory = inventory;
        local.inventory.$save();
        
      }


  }]);
  this.tiles = {
    1: {'discount' : 0},
    2: {'discount' : 0},
    3: {'discount' : 0},
    4: {'discount' : 1},
    5: {'discount' : 1},
    6: {'discount' : 2},
    7: {'discount' : 2},
    8: {'discount' : 3},
    9: {'discount' : 3},
    10: {'discount' : 4},
    11: {'discount' : 4},
    12: {'discount' : 4},
  };
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
  };

  var defaultItems = [
    { "workers" : 2, "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "machine"},
    { "workers" : 2, "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "machine"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "storage"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "storage"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "storage"}
  ];
  var marketInitialItems = [
    { "workers" : 2, "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 1},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 6},
    { "workers" : -1, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "yellow", "cost": 6},
    { "production" : 1, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 4},
    { "production" : 1, "energy" : -1, "minPlayers": 2, "imageUrl": "blah", "type" : "efficiency", "cost": 17},
    { "workers" : -1, "energy" : -1, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 12},

  ];
  var machines = [
    { "workers" : 2, "production" : 1, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 3},
    { "workers" : 3, "production" : 2, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 6},
    { "workers" : 1, "production" : 1, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 8},
    { "workers" : 3, "production" : 3, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 9},
    { "workers" : 2, "production" : 2, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 11},
    { "workers" : 2, "production" : 3, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 14},
    { "workers" : 2, "production" : 3, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "machine", "cost": 19}

  ];
  var storages = [
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 6},
    { "storage" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 10},
    { "storage" : 3, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 14},
    { "storage" : 4, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 18},
    { "storage" : 5, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 22},
    { "storage" : 5, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 22},
    { "storage" : 6, "minPlayers": 2, "imageUrl": "blah", "type" : "storage", "cost": 26},
  ];
  var yellows = [
    { "workers" : -2, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "yellow", "cost": 10},
    { "workers" : -3, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "yellow", "cost": 13},
    { "workers" : -4, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "yellow", "cost": 17},
    { "workers" : -5, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "yellow", "cost": 22},
  ]; 
  var reds = [
    { "production" : 1, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 7},
    { "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 9},
    { "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 9},
    { "production" : 3, "energy" : 3, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 10},
    { "production" : 2, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 13},
    { "production" : 3, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 15},
    { "production" : 3, "energy" : 1, "minPlayers": 2, "imageUrl": "blah", "type" : "red", "cost": 20},
  ];
  var efficiencys = [
    { "workers" : 0, "production" : 1, "energy" : -1, "minPlayers": 2, "imageUrl": "blah", "type" : "efficiency", "cost": 17},
    { "workers" : 0, "production" : 1, "energy" : -2, "minPlayers": 2, "imageUrl": "blah", "type" : "efficiency", "cost": 22},
    { "workers" : 0, "production" : 2, "energy" : -2, "minPlayers": 2, "imageUrl": "blah", "type" : "efficiency", "cost": 30},
    { "workers" : -1, "production" : 2, "energy" : -3, "minPlayers": 2, "imageUrl": "blah", "type" : "efficiency", "cost": 39},
  ];
  var electricalEfficiencys = [
    { "workers" : -1, "energy" : -2, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 17},
    { "workers" : -1, "energy" : -3, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 22},
    { "workers" : -1, "energy" : -4, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 25},
    { "workers" : -1, "energy" : -5, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 29},
    { "workers" : -1, "energy" : -6, "minPlayers": 2, "imageUrl": "blah", "type" : "electrical-efficiency", "cost": 33},
  ];
  var inventory = {
    "machines" : machines,
    "storages" : storages,
    "yellows" : yellows,
    "reds" : reds,
    "efficiencys" : efficiencys,
    "electricalEfficiencys" : electricalEfficiencys
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }
})();
