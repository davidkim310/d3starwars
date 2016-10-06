// start slingin' some d3 here.
var screenWidth = $( window ).width();
var screenHeight = $( window ).height();

var gameOptions = {
  width: screenWidth,
  height: screenHeight,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0,
  fighterCount: 0
};

var board = d3.select('.board')
  .append('svg')
  // .append('svg:image')
  // .attr('xlink:href', 'background.png')
  // .attr("x", 0)
  // .attr("y", 0);
  // .attr("width", '100%')
  // .attr('height', '100%')
  .style('background-color', "transparent")
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)

  board.on('mousemove', function () {
    if (gameStats.score > gameStats.bestScore) {
      gameStats.bestScore = gameStats.score;
      $('.currscore').text(gameStats.score++)
      $('.highscorecount').text(gameStats.bestScore++)
    } else {
      $('.currscore').text(gameStats.score++)
    }
  });

var enemy = function () {
  if (gameStats.fighterCount === 20) {
    return;
  }
  var enemies = new Array(1);
  d3.selectAll('svg')
    .selectAll('enemy')
    .data(enemies)
    .enter()
    .append('svg:image')
    .attr('xlink:href', 'tiefighter.png')
    .attr('height', 50)
    .attr('width', 50)
    .attr("x", function () {
      return Math.floor(Math.random() * gameOptions.width)
    })
    .attr("y", function () {
      return Math.floor(Math.random() * gameOptions.height)
    })
    .attr('class', 'enemy')

    gameStats.fighterCount++;
};
enemy();

var enemyMove = function(){
  d3.select('svg')
    .selectAll('.enemy')
    .transition()
    .duration(1500)
    .attr('x', function(){
      return Math.floor(Math.random()* gameOptions.width)
    })
    .attr('y', function(){
      return Math.floor(Math.random()* gameOptions.height)
    })
}

var collisionAdding = function () {

  $('.enemy').on('mouseover', function () {
    $(".board").css("background-image", "none");
    $(".board").css("background-color", "red");
    setTimeout(function(){
      $(".board").css("background-color", "black");
      $(".board").css("background-image", "url('background.png')");
    }, 100)
    gameStats.collisions += 1;
    gameStats.score = 0;
    $('.collisionscore').text(gameStats.collisions);

    if (gameStats.collisions === 10) {
        gameStats.collisions = 0;
        gameStats.fighterCount = 0;
    }
  })
}

collisionAdding();

_.debounce(setInterval(collisionAdding, 3000), 1000)
setInterval(enemy, 3000)
setInterval(enemyMove, 1500)
