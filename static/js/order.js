var order = (function() {
  var myDataRef = new Firebase('https://boiling-heat-634.firebaseio.com/order');
  var tiles = {
    1 : { 'discount' : 0},
    2 : { 'discount' : 0},
    3 : { 'discount' : 0},
    4 : { 'discount' : 1},
    5 : { 'discount' : 1},
    6 : { 'discount' : 2},
    7 : { 'discount' : 2},
    8 : { 'discount' : 3},
    9 : { 'discount' : 3},
    10 : { 'discount' : 4},
    11 : { 'discount' : 4},
    12 : { 'discount' : 4},

  }
  var selected = null;
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
  var curUser = null;
  var curTiles = {};

  function onEnter(e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      $('#nameInput').val('');
    }
  }
  
  
  function displayUsers(message) {
    var tag =  $('<li/>').text(message.val()).addClass("list-group-item ").attr('id',message.key()).appendTo($('#tilesDiv'));
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



  function setUp(){
    curUserKey =  users.tileSelectionTurn(true);
    $("#game").html("<div id='tilesDiv' class='list-group'></div>" +
       "<button id='pick-tile' type='button' class='btn btn-lg btn-success'>Pick A Tile " + users.users[curUserKey].name+ "</button>"
      );
    $('.active').keypress(order.onEnter);

    order.ref.on('child_added', function(snapshot) {
        curTiles[snapshot.key()] = snapshot.val();
        order.displayUsers(snapshot);
      });

    order.ref.on('child_removed', function(snapshot) {
       var tag = $("#"+snapshot.key());
       tag.remove();
       delete curTiles[snapshot.key()];
    });

    $('#pick-tile').click(function(){
      console.log(curTiles);
      console.log(selected);
      console.log(curTiles[selected]);
      users.setTile(curUserKey, curTiles[selected]);
      myDataRef.child(selected).remove();
      curUserKey =  users.tileSelectionTurn(true);
      if (curUserKey == null){
        return tearDown();
      } 
      $('#pick-tile').text("Pick A Tile " + users.users[curUserKey].name);
    });
  
  };

  function tearDown(){
    $("#game").html("");
  }
  return {
    setUp: setUp,
    tearDown : tearDown,
    ref : myDataRef,
    onEnter: onEnter,
    displayUsers: displayUsers,
    tiles : tiles,
    startingTiles : startingTiles
  };
})();
;

