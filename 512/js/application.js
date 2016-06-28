$(document).ready(function() {
  game = new Game('0001000001000000')
  $(".end").hide()

  var render = function(){
    $(".end").hide()

    var i = 0;
    var new_location = "#" + game.new
    $(new_location).addClass("pop")
    !$(".cell").not(new_location).removeClass("pop")
    // $(".cell").css("left", "0px")
    while (i < game.board.length) {
      var j = game.board[i];
      var location = "#" + i
      if (j === "0") {
        $(location).text("")
        $(location).addClass("blank")
        $(location).css("background-color","whitesmoke")
      } else {
        $(location).text(Math.pow(2,j))
        $(location).removeClass("blank")
        if (j === "1") {
          $(location).css("background-color","rgb(255, 155, 123)")
        } else if (j === "2") {
          $(location).css("background-color","rgb(255, 129, 89)")
        } else if (j === "3") {
          $(location).css("background-color","rgb(255, 118, 75)")
        } else if (j === "4") {
          $(location).css("background-color","rgb(255, 100, 52)")
        } else if (j === "5") {
          $(location).css("background-color","rgb(255, 78, 23)")
        } else if (j === "6") {
          $(location).css("background-color","rgb(255, 71, 13)")
        } else if (j === "7") {
          $(location).css("background-color","rgb(255, 17, 0)")
        } else if (j === "8") {
          $(location).css("background-color","rgb(218, 15, 0)")
        } else {
          $(location).css("background-color","#2196F3")
        }
      }
      i++;
    };
  };


  $('body').on('click','button',function(){
    game = new Game('0001000001000000')
    render();
    $("button").hide()
  });

  Mousetrap.bind('left', function(){
    game.controller('left');
    // var allDivs = $(".cell");
    // for (var i = 0; i < allDivs.length; i++) {
    //   if ($(allDivs[i]).hasClass('blank') === false) {
    //     $(allDivs[i]).animate({
    //     left: "-=105"
    //     });
    //   }
    // };
    render();
    if (game.finished() === true) {
      $(".end").show()
      $("button").show()

    }
  })

  Mousetrap.bind('right', function(){
    game.controller('right');
    render();
    if (game.finished() === true) {
      $(".end").show()
      $("button").show()
    }  })

  Mousetrap.bind('up', function(){
    game.controller('up');
    render();
    if (game.finished() === true) {
      $(".end").show()
      $("button").show()
    }  })

  Mousetrap.bind('down', function(){
    game.controller('down');
    render();
    if (game.finished() === true) {
      $(".end").show()
      $("button").show()
    }  })
});
