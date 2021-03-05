const MovingObject = require("./moving_object.js")
const Util = require("./util.js");

class Wall extends MovingObject {
    constructor(variables) {
        super(variables)
        this.img = new Image();
        this.img.src = "../img/wall.png"
    }

    draw(ctx) {
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.rect(this.pos[0], this.pos[1], this.width, this.height)
        // ctx.fill();
        ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);
    }

}

module.exports = Wall;