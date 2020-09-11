import Button from "./button";

export default class InfoWindow {
    constructor(_game) {
        this.width = _game.gameWidth;
        this.height = 100;
        this.timeText = new Text(this.width/2, this.height/2,"test");
    }
  
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fillRect(3, 3, this.width - 6, this.height-6);
        this.testButton = new Button(0,0,100,100,"Menu","white","black",3);
        this.testButton.draw(ctx);
        this.timeText.draw(ctx);
    }
  
    update(deltaTime) {
      
    }
  }
  