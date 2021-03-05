
class MovingObject {
    constructor(variables){
        this.pos = [];
        this.pos.push(variables.pos[0]);
        this.pos.push(variables.pos[1]);
        this.vel = [];
        this.vel.push(variables.vel[0])
        this.vel.push(variables.vel[1])
        this.height = variables.height;
        this.width = variables.width;
    }


    move(){
        this.pos[0] = this.pos[0] + this.vel[0]
        this.pos[1] = this.pos[1] + this.vel[1]
    }
}

module.exports = MovingObject;
