
// ASTEROIDS FUNCTION
function Asteroid(){
  this.size = random(15,50);
  this.pos = createVector(Math.random() * width,Math.random() * height);
  this.vel = p5.Vector.fromAngle(Math.random() * 2 * PI, MAX_VEL * 10);
  this.numVertex = floor(random(5,15));
  this.offset = [];
  for(var i = 0; i < this.numVertex; i++){
    this.offset[i] = random(-15,2);
  }

  // RENDER FUNCTION
  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for(var i = 0; i < this.numVertex; i++){
      var angle = map(i, 0, this.numVertex, 0, TWO_PI);
      var r = this.size + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x,y);
    }

    endShape(CLOSE);
    pop();
  }
  // COLLIDE FUNCTION
  this.collide = function(){
    if(this.size <= MAX_ALLOWED_SIZE){
      this.destroy();
    }else{
      this.divide();
    }
  }

  // DIVIDE FUNCTION
  this.divide = function(){
    this.childAsteroids = map(this.size, 0, MAX_ASTEROID_SIZE, 2,4);
    for(var i = 0; i < this.childAsteroids; i++){
      asteroids.append(new Asteroid)
    }
    this.destroy();
  }

  // DESTROY FUNCTION
  this.destroy = function(){
    delete this; 
  }

  // UPDATE FUNCTION
  this.update = function(){
    this.pos.add(this.vel);
    this.edges();
  }
  this.edges = function(){
    if(this.pos.x < 0 + - this.size){
      this.pos.x = width;
    }else if(this.pos.x > width + this.size){
      this.pos.x = 0;
    }
    if(this.pos.y < 0 - this.size){
      this.pos.y = height;
    }else if(this.pos.y > height + this.size){
      this.pos.y = 0;
    }

  }
}
