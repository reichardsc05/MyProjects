import Text from "./text";

export default class Button {
    constructor(_x,_y,_width,_height,_text,_backgroundColor,_borderColor,_borderSize) {
        this.width = _width;
        this.height = _height;
        this.x = _x;
        this.y = _y;
        this.text = new Text(this.width/2, this.height/2,_text);
        this.backgroundColor = _backgroundColor;
        this.borderColor = _borderColor;
        this.borderSize = _borderSize;
    }
  
    draw(ctx) {
        ctx.fillStyle = this.borderColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x + this.borderSize, this.y + this.borderSize, this.width - (2*this.borderSize), this.height - (2*this.borderSize));
        this.text.draw(ctx);
    }
  
    update() {
      
    }
  }
  