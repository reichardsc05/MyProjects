export default class Character {
  constructor(_game, _name) {
    this.gameWidth = _game.gameWidth;
    this.gameHeight = _game.gameHeight;
    this.width = 20;
    this.height = 20;
    this.name = _name;
    this.maxSpeedX = 3;
    this.maxSpeedY = 3;
    this.speedX = 0;
    this.speedY = 0;

    this.position = {
      x: _game.gameWidth / 2 - this.width / 2,
      y: _game.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speedX = -this.maxSpeedX;
  }

  moveRight() {
    this.speedX = this.maxSpeedX;
  }

  moveUp() {
    this.speedY = -this.maxSpeedY;
  }

  moveDown() {
    this.speedY = this.maxSpeedY;
  }

  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.position.x - (this.width/2), this.position.y + (this.height/2));
    ctx.lineTo(this.position.x + (this.width/2), this.position.y + (this.height/2));
    ctx.fill();
  }

  update(deltaTime) {
    this.position.x += this.speedX;
    this.position.y += this.speedY;
    
    if (this.position.x - (this.width/2) < 0) this.position.x = this.width/2;
    if (this.position.y < 0) this.position.y = 0;

    if (this.position.x + (this.width/2) > this.gameWidth)
      this.position.x = this.gameWidth - (this.width/2);
      
    if (this.position.y > this.gameHeight - (this.height/2))
      this.position.y = this.gameHeight - (this.height/2); 
  }
}
