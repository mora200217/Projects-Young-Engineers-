// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

var ship;
var asteroids = [];
var lasers = [];

var MAX_LIFES = 10; // Max lifes for the ship
var LIFE_RADIUS = 10;
var LIFE_SEPARATION = 10;
var SCORE_SEPARATION = 30;
var MAX_SCORE = 500;
// MAIN SETUP FUNCTION
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(MAX_LIFES);
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

// MAIN DRAW FUNCTION
function draw() {
  background(0);

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      ship.lifes.splice(ship.lifes.length - 1, 1);
      ship.pos = createVector(width/2, height/2);
      ship.vel.mult(0);
      ship.heading = PI * 3 / 2;
      console.log("Hit!");
      if(ship.lifes.length == 0){
        console.log("Game Over!");
        ship.alreadyDied = true;
        gameOver();
      }
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  // Pass for each laser object within the environment
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render(); // Invoke render function
    lasers[i].update(); // Update Laser - Pos
    // IDEA: Conserve laser after offsecreen - replace with lifespan (Lifetime) id:138
    if (lasers[i].offscreen()) { // Invoke offsreen function - boolean return
      lasers.splice(i, 1); // Deletes Laser from laser array
    } else {
      // Oass through the asteroids array objects
      for (var j = asteroids.length - 1; j >= 0; j--) {
        // Prove collision with lasers
        if (lasers[i].hits(asteroids[j])) {
          // Proves the size of asteroids for later division
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup(); // Invokes breakup funcrion
            asteroids = asteroids.concat(newAsteroids); // Cocatenates new asteroid
          }
          // TODO:  Improve Score Adder system by adding a MAX_SIZE constant
          ship.score += int(map(asteroids[j].r, 0, 10, 0, MAX_SCORE/100)) * 100;
          asteroids.splice(j, 1); // Deletes first asteroid from array
          lasers.splice(i, 1); // Deletes first laser from array
          break;
        }
      }
    }
  }

  // console.log(lasers.length);

  // Invokes respective functions for ship
  if(ship.alreadyDied == false){
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }
}

// KEY RELEASED EVENT FUNCTION
function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

// KEY PRESSED EVENT FUNCTION
function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}

// GAME OVER FUNCITON
function gameOver(ship){

}
