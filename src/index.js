const MovingObject = require("./moving_object.js")
const Game = require("./game.js")
const GameView = require("./game_view.js")

window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas")
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    const ctx = canvas.getContext("2d")

    const game = new Game();

    const scoreCanvas = document.getElementById("score")
    const scoreCtx = scoreCanvas.getContext("2d")
    scoreCanvas.width = 200;
    scoreCanvas.height = 100;

    const gv = new GameView(ctx, game, scoreCtx);
    gv.drawTitle();

    const inputList = document.getElementById("inputs");

    let input = "";
    let inputArr = [];

    const up = document.getElementById("up")
    up.addEventListener("click", () => handleClick(up, "up"));
    const down = document.getElementById("down")
    down.addEventListener("click", () => handleClick(down, "down"));
    const left = document.getElementById("left")
    left.addEventListener("click", () => handleClick(left, "left"));
    const right = document.getElementById("right")
    right.addEventListener("click", () => handleClick(right, "right"));

    document.getElementById("user-input-button").addEventListener("click", () => addLi(input));

    document.getElementById("clear-all").addEventListener("click", () => clearAll());

    document.getElementById("remove-last").addEventListener("click", () => removeLast());

    document.getElementById("start").addEventListener("click", () => getUserInput());

    getUserInput = () => {
        gv.getUserInput(inputArr);
    }

    addLi = (ele) => {
        if(ele !== ""){
            let time = document.getElementById("time");
            let li = document.createElement("li");
            let subArr = [ele, time.value]
            inputArr.push(subArr);
            li.appendChild(document.createTextNode(`${ele}, ${time.value}`))
            inputList.appendChild(li)
        }
    }

    handleClick = (dir, str) => {
        up.style.borderColor = "black"
        down.style.borderColor = "black"
        left.style.borderColor = "black"
        right.style.borderColor = "black"
        dir.style.borderColor = "blue";
        input = str;
    }

    clearAll = () => {
        while(inputList.firstChild){
            inputList.removeChild(inputList.firstChild);
        }
    }

    removeLast = () => {
        if(inputArr.length !== 0){
            inputList.removeChild(inputList.lastChild);
            inputArr.pop();
        }else{
            clearAll();
        }
    }

});
