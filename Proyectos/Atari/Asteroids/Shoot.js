// CLASS SHOOT
function Shoot(size){
  this.offset = size;
  this.heading = ship.heading;
  this.lifeTime = SHOOT_LIFETIME;
  this.shootVel = p5.Vector.fromAngle(this.heading);
  this.shootVel.mult(MAX_VEL^5);
  var x = ship.pos.x + (cos(this.heading) * this.offset);
  var y = ship.pos.y + (sin(this.heading) * this.offset);
  this.shootPos = createVector(x,y);

  // UPDATE SHOOT FUNCTION
  this.update = function(){
    ellipse(this.shootPos.x, this.shootPos.y, 2, 2);
    this.shootPos.add(this.shootVel); // Translate pos by velocity vector
    this.collisionInfo = this.isColliding();
    if(this.collisionInfo[0]){
      console.log("Shooted!");
      this.collisionInfo[1].collide();
      this.destroy();
    }
  }
  // DESTROY SHOOT FUNCTION
  this.destroy = function(){
    for(var i = 0; i < shoots.length; i++){
      shoots.splice(i, 1);
    }
  }
  // GETTER SHOOT POSITION FUNCTION
  this.getPosition = function(){
    return this.pos;
  }
  // COLLISION DETECTION FUNCTION
  this.isColliding = function(){
    for(i in asteroids){
      var d = dist(asteroids[i].pos.x, asteroids[i].pos.y, this.shootPos.x, this.shootPos.y);
      if(d < asteroids[i].size){
          return [true,asteroids[i]];
      }
    }
    return [false,NaN];

  }
}
