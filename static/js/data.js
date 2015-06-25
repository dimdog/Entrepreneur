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




      var stateRef = new Firebase('https://boiling-heat-634.firebaseio.com/state');
      this.state = $firebaseObject(stateRef);
      this.setState = function(state) {
        stateRef.set({ state: state });
      };




      var tileRef = new Firebase('https://boiling-heat-634.firebaseio.com/tiles');
      this.availableTiles = $firebaseArray(tileRef);
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
        this.setState("initialOrder");
        var options = startingTiles[this.users.length];
        tileRef.remove();
        for (var t = 0; t< options.deck.length; t++){
          tileRef.push({
            value: options.deck[t]
          });
        this.syncedUsers = this.syncUsers;
        }

        for (var p = 0; p< this.users.length; p++){
            var choice = getRandomInt(options.hand.length-1);
            this.giveUserTileNum(this.users[p], options.hand[choice]);
            options.hand.splice(choice,1);
        }

      };

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
    { "workers" : 2, "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "itemType" : "machine"},
    { "workers" : 2, "production" : 2, "energy" : 2, "minPlayers": 2, "imageUrl": "blah", "itemType" : "machine"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "itemType" : "storage"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "itemType" : "storage"},
    { "storage" : 1, "minPlayers": 2, "imageUrl": "blah", "itemType" : "storage"}
  ];
  function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }
})();
