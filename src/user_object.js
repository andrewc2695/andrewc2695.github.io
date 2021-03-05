const MovingObject = require("./moving_object.js")
const Util = require("./util.js");

class UserObject extends MovingObject{
    constructor(variables){
        super(variables);
        this.img1 = new Image();
        this.img1.src = "../img/robot1.png";
        this.img2 = new Image();
        this.img2.src = "../img/robot2.png";
        this.currentImg = this.img1;
        setInterval(() => {
            this.currentImg === this.img1 ? this.currentImg = this.img2 : this.currentImg = this.img1
        }, 200)
    }

    draw(ctx) {
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(
        //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        // );
        // let img = new Image();
        // img.src = "../img/robot1.png";
        // img.onload = function(){
        ctx.drawImage(this.currentImg, this.pos[0], this.pos[1], 55, 70)
        // }
    }

    readPrompts(n, prompts) {
        let promptArr = prompts[n]
        let newVel = [];
        if (promptArr[0] === "left") {
            newVel = [-5, 0];
        } else if (promptArr[0] === "right") {
            newVel = [5, 0];
        } else if (promptArr[0] === "up") {
            newVel = [0, -5];
        } else {
            newVel = [0, 5];
        }
        this.vel = newVel;
        if (n < prompts.length - 1) {
            setTimeout(() => {
                this.readPrompts(n + 1, prompts)
            }, parseInt(promptArr[1]));
        };
    }

}

module.exports = UserObject;