const MovingObject = require("./moving_object");

class EnergyBall extends MovingObject{
    constructor(variables){
        super(variables)
        this.eng1 = new Image();
        this.eng1.src = "../img/energy1.png"
        this.eng2 = new Image();
        this.eng2.src = "../img/energy2.png"
        this.eng3 = new Image();
        this.eng3.src = "../img/energy3.png"
        this.eng4 = new Image();
        this.eng4.src = "../img/energy4.png"
        this.currentImg = this.eng1;
        setInterval(() => {
            if(this.currentImg === this.eng1){
                this.currentImg = this.eng2;
            }else if(this.currentImg === this.eng2){
                this.currentImg = this.eng3;
            }else if(this.currentImg === this.eng3){
                this.currentImg = this.eng4;
            }else{
                this.currentImg = this.eng1
            }
        },150)
        this.trackNum = variables.track;
        if(this.trackNum !== undefined){
            this.track()
        }
    }

    track(){
        setInterval(() => {
            this.vel[0] = this.vel[0] * -1;
            this.vel[1] = this.vel[1] * -1;
        }, this.trackNum);
    }

    draw(ctx) {
        ctx.drawImage(this.currentImg, this.pos[0], this.pos[1], this.width, this.height);
    }
}

module.exports = EnergyBall;