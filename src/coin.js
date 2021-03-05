const MovingObject = require("./moving_object");

class Coin extends MovingObject{
    constructor(variables){
        super(variables)
        this.img = new Image();
        this.img.src = "../img/coin.png"
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);
    }
}

module.exports = Coin;