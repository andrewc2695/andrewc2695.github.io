const Game = require('./game.js');
const Goal = require('./goal.js');
const Wall = require('./wall.js');
const sounds = require("../sounds/sounds.js");

let that = ""

function callPreview(e) {
    if(e.key ==="s"){
        that.previewLevel = false;
        that.preview();
    }else if(e.key === "p"){
        let ctx = that.ctx;
        that.previewLevel = true;
        ctx.clearRect(0, 0, 600, 1000);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 600);
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.textAlign = "center";
        ctx.fillText("Enter 1-6 To Play That Level", 500, 275);
    }else if(!isNaN(e.key) && that.previewLevel === true){
        if(e.key > 0  && e.key < 7){
            that.currentLevel = e.key;
            that.preview();
        }
    }
}

function callFail(e){
    if(e.key === "r"){
        document.removeEventListener("keydown", callFail);
        that.preview();
    }else if(e.key === "q"){
        document.removeEventListener("keydown", callFail);
        that.currentLevel = 1;
        that.drawTitle();
    }

}

class GameView{
    constructor(ctx, game, scoreCtx){
        this.ctx = ctx;
        this.game = game;
        this.scoreCtx = scoreCtx;
        this.gameState = false;
        this.interval = undefined;
        this.previewInterval = undefined;
        this.scoreInterval = undefined;
        this.score = 0;
        this.prompts = [];
        this.currentLevel = 1;
        this.previousLevel = 0;
        this.previewLevel = false;
        this.canStart = false;
        document.getElementById("instructions").addEventListener("click", () => this.changeId());
        document.getElementById("modal-show").addEventListener("click", () => this.changeId());
    }

    changeId(){
        const modal = document.getElementById("modal-show");
        if(modal.classList.value === "modal"){
            modal.classList.add("appear");
        }else{
            modal.classList.remove("appear");
        }
    }

    preview(){
        this.game.currentLevel = this.currentLevel;
        document.removeEventListener("keydown", callPreview);
        this.drawLevel();
        this.game.addObject();
        setTimeout(() => {
            this.ctx.clearRect(0, 0, 600, 1000);
            this.previewInterval = setInterval(() => {
                this.drawScore();
                this.game.draw(this.ctx);
                this.game.previewMove();
            }, 25)
            this.canStart = true;
        }, 1500);
    }

    start(){
        if(this.gameState){
            this.game.reset();
            this.game.addObject();
        }
        this.gameState = true;
        if(this.scoreInterval) clearInterval(this.scoreInterval);
        if(this.previewInterval) clearInterval(this.previewInterval);
        if(this.previousLevel < this.currentLevel){
            this.previousLevel += 1;
        }else{
            this.score = 0;
        }
        this.gameState = true;
        this.scoreInterval = setInterval(() => {
            if (this.game.userObject[0].vel[0] !== 0 || this.game.userObject[0].vel[1] !== 0)
                this.score += 5
                this.drawScore();
        }, 100)
        this.game.readPrompts(this.prompts);
        this.interval = setInterval(() => {
            this.game.draw(this.ctx);
            this.game.moveObject();
            if(this.game.outOfBounds()){
                clearInterval(this.interval);
                this.gameWon("lost");
            };
            const collision = this.game.checkCollisions()
            if (collision){
                    if(collision[1] === "coin"){
                        this.score += 1000
                    }else{
                        clearInterval(this.interval);
                        this.gameWon(collision[1]);
                    }
                }
        }, 25);
    };

    gameWon(state){
        this.canStart = false;
        let inputs = document.getElementById("inputs");
        while (inputs.firstChild) {
                inputs.removeChild(inputs.firstChild);
            }
        while(this.prompts.length > 0){
            this.prompts.pop();
        }
        this.game.reset();
        this.gameState = false;
        clearInterval(this.scoreInterval);
        let ctx = this.ctx;
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.textAlign = "center";
        if(state === "won"){
            sounds.rocketSound.play();
            this.currentLevel++;
            ctx.fillText("Level Completed!", Game.DIM_X / 2, Game.DIM_Y / 2);
            if(this.previewLevel === true){
                setTimeout(() => {
                    this.previewLevel = false;
                    this.drawTitle();
                }, 1500);
            }else{
                setTimeout(() => {
                    this.ctx.clearRect(0, 0, 600, 1000);
                    this.preview();
                }, 1500);
            }
        }else{
            sounds.robotCrash.play();
            this.score = 0;
            if (this.previewLevel === true) {
                ctx.fillText("Level Failed!", Game.DIM_X / 2, Game.DIM_Y / 2);
                setTimeout(() => {
                    this.previewLevel = false;
                    this.drawTitle();
                }, 1500)
            }else{
                this.ctx.clearRect(0, 0, 600, 1000);
                this.drawFail();
            }
        }
    }

    getUserInput(prompts){
        if(prompts.length !== 0){
            this.prompts = prompts;
            if(this.interval !== undefined){
                clearInterval(this.interval);
            }
            if (this.interval !== undefined || this.previewInterval !== undefined){
                if(this.canStart){
                    this.start();
                }
            }
        }
    }

    drawFail(){
        let ctx = this.ctx;
        that = this;
        document.addEventListener("keydown", callFail)
        ctx.clearRect(0, 0, 600, 1000);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 600);
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.textAlign = "center";
        ctx.fillText("Level Failed", 500, 275);
        ctx.fillText("Press r to retry the level, Press q to quit", 500, 325);
    }

    drawTitle(){
        let ctx = this.ctx;
        that = this;
        document.addEventListener("keydown", callPreview)
        ctx.clearRect(0, 0, 600, 1000);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 600);
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.textAlign = "center";
        ctx.fillText("Hit The Target", 500, 275);
        ctx.fillText("Press S to start the Game, Press P to practice a level", 500, 325);
        this.drawScore()
    }

    drawScore(){
        let ctx = this.scoreCtx;
        ctx.clearRect(0, 0, 200, 50);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 200, 50);
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.textAlign = "center";
        ctx.fillText(this.score, 100, 33)
    }

    drawLevel(){
        let ctx = this.ctx;
        ctx.clearRect(0, 0, 600, 1000);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 600);
        ctx.font = "30px Comic Sans MS";
        ctx.font = "30px Copperplate";
        ctx.fillStyle = "#54FADB";
        ctx.fillText(`Level ${this.currentLevel}`, 500, 275);
        ctx.fillText(`${this.game.level[this.currentLevel].title}`, 500, 325);
    }
}


module.exports = GameView;