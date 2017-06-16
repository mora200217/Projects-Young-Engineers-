// CLASS SHOOT
function Shoot(size){
  this.offset = size;
  this.heading = ship.heading;
  this.lifeTime = SHOOT_LIFETIME;
  this.shootVel = p5.Vector.fromAngle(this.heading);
  this.shootVel.mult(MAX_VEL^4);
  var x = ship.pos.x + (cos(this.heading) * this.offset);
  var y = ship.pos.y + (sin(this.heading) * this.offset);
  this.shootPos = createVector(x,y);

  // UPDATE SHOOT FUNCTION
  this.update = function(){
    point(this.shootPos.x, this.shootPos.y);
    this.shootPos.add(this.shootVel); // Translate pos by velocity vector

  }
  // DESTROY SHOOT FUNCTION
  this.destroy = function(){
    delete(this);
  }
  // GETTER SHOOT POSITION FUNCTION
  this.getPosition = function(){
    return this.pos;
  }
  // COLLISION DETECTION FUNCTION
  this.isColliding = function(){
    for(var i = 0; i < asteroids.length; i++){
      if(this.pos.x  > asteroids[i].pos.x - asteroids[i].size && this.pos.x  < asteroids[i].pos.x + asteroids[i].size ){
        if(this.pos.y  > asteroids[i].pos.y - asteroids[i].size && this.pos.y  < asteroids[i].pos.y + asteroids[i].size ){
          return [true,asteroids[i]];
        }
      }
    }
    return [false,NaN];

  }
}
