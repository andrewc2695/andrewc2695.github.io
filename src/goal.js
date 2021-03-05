const MovingObject = require("./moving_object");

class Goal extends MovingObject{
    constructor(variables){
        super(variables)
        this.height = variables.height;
        this.width = variables.width;
        this.img = new Image();
        this.img.src ="../img/rocket.png"
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.pos[0], this.pos[1])
    }
}

module.exports = Goal;
