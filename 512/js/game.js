var Game = function(board) {
  this.board = board;
  this.new = 0;
};

Game.prototype.toString = function(array) {
  var container = []
  array.forEach(function(row){
    container.push(row.join(''));
  });
  return container.join('');
};

Game.prototype.invertArray = function invertArray(array){
    var newArray = [];
    for(var i = 0; i < array.length; i++){
        newArray.push([]);
    };
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length; j++){
            newArray[j].push(array[i][j]);
        };
    };
    return(newArray);
};

Game.prototype.createRows = function(){
//Iterate through board string
//For each slice of 4 indices, create a new array
//Push the new array into container
  var container = [];
  var i = 0;
  while (i < 16) {
    row = this.board.slice(i,(i+4)).split('')
    for(var j = 0; j < row.length; j++) {
      row[j] = parseInt(row[j]);
    };
    container.push(row);
    i = i + 4;
  };

  return container;
};

Game.prototype.createColumns = function(){
//Iterate through board string
//For each slice of 4 indices, create a new array
//Push the new array into container
  var boardArray = this.board.split('')

  var container = [[],[],[],[]];
  var i = 0;
  while (i < 16) {
    if (i % 4 === 0) {
      container[0].push(parseInt(boardArray[i]));
    } else if (i % 4 === 1) {
      container[1].push(parseInt(boardArray[i]));
    } else if (i % 4 === 2) {
      container[2].push(parseInt(boardArray[i]));
    } else {
      container[3].push(parseInt(boardArray[i]));
    }
    i++;
  };
  return container;
};

Game.prototype.controller = function(direction) {
  var container = [];
  if ((direction === 'left') || (direction === 'right')) {
    var boardRows = this.createRows();
  } else {
    var boardRows = this.createColumns();
  }

  boardRows.forEach((function(row){
    if ((direction === 'right') || (direction === 'down')) {
      row = row.reverse();
    }
    row = this.slide(direction,row);
    row = this.combine(0,row);
    row = this.slide(direction,row);
    row = this.combine(1,row);
    row = this.slide(direction,row);
    row = this.combine(2,row);
    if ((direction === 'right') || (direction === 'down')) {
      row = row.reverse();
    }
    container.push(row);
  }).bind(this));

  if ((direction === 'up') || (direction === 'down')) {
    container = this.invertArray(container);
  };
  
  if ((this.board) === this.toString(container)) {

  } else {

    this.board = this.toString(container);
    this.populate();

  }

}

Game.prototype.slide = function(direction,row) {
  var nonZero = function(value){
      return value > 0;
    };

  var filteredRow = row.filter(nonZero);
  var counter = (4 - filteredRow.length);
  for (var i = 0; i < counter; i++){
    filteredRow.push(0);
  };
  return filteredRow;
}

Game.prototype.combine = function(index,row) {
  if (row[index] != 0) {
    if (row[index] === row[(index+1)]) {
      row[index] = row[index] + 1;
      row[(index + 1)] = 0;
    }
  }
  return row;
}

Game.prototype.populate = function() {
  var indices = [];
  var num_array = this.board.split('')
  for (var i = 0; i < num_array.length; i++) {
    if (num_array[i] == 0) {
      indices.push(i);
    }
  };
  var place_into = Math.floor((Math.random()*(indices.length+1)));
  this.new = indices[place_into]; 
  num_array[indices[place_into]] = _.sample([1, 1, 1, 2]);
  this.board = num_array.join('');
};

Game.prototype.finished = function(){
  var initialState = this.board
  var test = function(){
    this.controller("up");
    this.controller("down");
    this.controller("left");
    this.controller("right");
    var finalState = this.board;
    return finalState;
  }.bind(this)
  if (((initialState === test()) && (initialState.search(0) === -1)) || (initialState.search(9) >= 0)) {
    return true;
  } else {
    this.board = initialState;
  };
};
