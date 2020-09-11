export default class Text {
    constructor(_x,_y,_text) {
        this.x = _x;
        this.y = _y;
        this.text = _text;
    }
  
    draw(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    }
  
    update() {
      
    }
  }
  