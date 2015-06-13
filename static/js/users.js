var users = (function() {
  var myDataRef = new Firebase('https://boiling-heat-634.firebaseio.com/users');

  var curUsers = {}; 
  var selected = null;
  var userTileOrder = null;
  function onEnter(e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      myDataRef.push({
        name: name,
        money: 18,
        seasonals: 0,
        slots: 0,
      });
      $('#nameInput').val('');
    }
  }
  
  
  function displayUsers(message) {
    var tag =  $('<li/>').text(message.val().name).addClass("list-group-item ").attr('id',message.key() ).appendTo($('#usersDiv'));
    tag.click(function(){
      $('.active').removeClass('active');
      selected = message.key();
      tag.addClass('active');
    });
  };

  function removeUser(message) {
      var tag = $("#"+message.key())
      tag.remove();
  }
  function orderForTiles(){
    
    userTileOrder = [];
    for (key in curUsers){
      userTileOrder.push(key);
    }
    userTileOrder.sort(function(a,b){
      if (a.tile < b.tile) 
        return 1;
      return -1;
    })
    return userTileOrder;
  }
  function tileSelectionTurn(remove){
    if (userTileOrder == null){
      orderForTiles();
    }
    if (remove){
      return userTileOrder.shift();
    }
    return userTileOrder[0];
  }
  function setTile(userKey, tile){
    myDataRef.child(userKey).update({tile : tile});
  }
  function setUp(){
    $("#game").html("<input type='text' id='nameInput' placeholder='Name'> " +
      "<div id='usersDiv' class='list-group'></div>" +
      "<button id='users' type='button' class='btn btn-lg btn-success'>Done Adding Users</button>" +
       "<button id='delete-users' type='button' class='btn btn-lg btn-danger'>Delete Selected User</button>"

      );
    $('#nameInput').keypress(users.onEnter);

    users.ref.on('child_added', function(snapshot) {
        curUsers[snapshot.key()] = snapshot.val();
        users.displayUsers(snapshot);
      });

    users.ref.on('child_removed', function(snapshot) {
        users.removeUser(snapshot);
        delete curUsers[snapshot.key()];
    });
    users.ref.on('child_changed',function(snapshot) {
        curUsers[snapshot.key()] = snapshot.val();
    });
    $('#users').click(function(){
      if (Object.keys(curUsers).length in order.startingTiles){
      users.tearDown();
      order.setUp();
      }
    });
    $('#delete-users').click(function(){
      myDataRef.child(selected).remove()
    });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  function tearDown(){
    $("#game").html("");
    var options = order.startingTiles[Object.keys(curUsers).length];

    for (key in curUsers){
        var choice = getRandomInt(options.hand.length-1);
        myDataRef.child(key).update({
          'tile': options.hand[choice]
        });
        delete options.hand.splice(choice,1);
    }
    order.ref.set(options.deck)
    

  }
  return {
    setUp: setUp,
    users : curUsers,
    tearDown : tearDown,
    ref : myDataRef,
    onEnter: onEnter,
    displayUsers: displayUsers,
    removeUser : removeUser,
    tileSelectionTurn : tileSelectionTurn,
    setTile : setTile
  };
})();

users.setUp();

