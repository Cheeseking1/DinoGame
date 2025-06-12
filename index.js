let obstacles = [];
let gameElements = document.getElementsByClassName("main");
let game = gameElements[0];
let cheeseElements = document.getElementsByClassName("character");
let cheese = cheeseElements[0];
let buttons = document.getElementsByClassName("button");
let easybutton = document.getElementsByClassName("easy");
let hardbutton = document.getElementsByClassName("hard");
let scoreElements = document.getElementsByClassName("score");
let score = scoreElements[0];
let points = 0; //Game starts with score of 0
let obstacleSpeed = 10;
let spawnRate = 2000; 
let spawnTimer;
let GameOverElements = document.getElementsByClassName("gameover")
let GameOver = GameOverElements[0];
let stopper = 0;
function startGame(){
    startSpawningObstacles();
    startMovingObstacles();
}
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space'){
      jump(); // Call our jump function
    }
  });
function jump() {
    if (cheese.classList.contains('jump')) {
        return; // If it's already jumping, do nothing
      }
      cheese.classList.add('jump');       // Start jump animation
      setTimeout(function() {
        cheese.classList.remove('jump');  // End jump after 0.5 seconds
      }, 1000);
}
function obstacle(){
    let obstacle1 = document.createElement("div");
    obstacle1.classList.add('obstacle');
    obstacle1.style.left = game.offsetWidth + 'px'; // Position at right edge
    game.appendChild(obstacle1);                 // Show it in the game area
    obstacles.push(obstacle1);
}
function moveObstacles(){
  for (var i = 0; i < obstacles.length; i++) {
    var obs       = obstacles[i];                 // pick one obstacle
    var currentX  = parseInt(obs.style.left, 10); // where is obstacle at the moment
    obs.style.left = (currentX - obstacleSpeed) + 'px'; // shift obstacle to the left
    }
}
function startMovingObstacles() {
    gameTimer = setInterval(function () {
      moveObstacles();
      collision(); 
      removeOffscreenObstacles(); 
    }, 20);
}
// Begin the loop that spawns new obstacles at spawnRate (declared above)
function startSpawningObstacles() {
  spawnTimer = setInterval(function() {
    obstacle();
  }, spawnRate);
}
function collision(){
  var cheeseRect = cheese.getBoundingClientRect();   // invisible box around dino
  // Loop through each obstacle we’ve spawned so far
  for (var i = 0; i < obstacles.length; i++) {
    var obsRect = obstacles[i].getBoundingClientRect(); // box around obstacle
    if (cheeseRect.left <  obsRect.left + obsRect.width &&
        cheeseRect.left + cheeseRect.width > obsRect.left &&
        cheeseRect.top  <  obsRect.top  + obsRect.height &&
        cheeseRect.top  + cheeseRect.height > obsRect.top) {
      endGame(); 
      break;
    }
  }
}
function endGame(){
  stopper = 1;
  obstacleSpeed = 0;
  clearInterval(spawnRate);
  points = 0;
  GameOver.textContent = 'Game Over';

}
function increaseScore(){
  obstacleSpeed = obstacleSpeed+points*0.02;
  spawnRate = spawnRate+points*1000;
  points++;
  score.textContent = 'Score: ' + points;
}
/* Whenever an obstacle scrolls off the left edge, we remove it and reward the player with a point. */
function removeOffscreenObstacles() {
  for (var i = obstacles.length - 1; i >= 0; i--) {
    var obs = obstacles[i];
    var x   = parseInt(obs.style.left, 36);

    if (x + obs.offsetWidth < 0) {       // obstacle is totally off-screen
      game.removeChild(obs);         
      obstacles.splice(i, 1); 
      increaseScore()
    }
  }
}
function easy(){
  obstacleSpeed = 7;
}
function hard(){
  if(obstacleSpeed<15){
    obstacleSpeed = 15;
  }
}
startGame();

