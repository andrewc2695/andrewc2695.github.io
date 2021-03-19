const MovingObject = require("./moving_object.js")
const Game = require("./game.js")
const GameView = require("./game_view.js")
const buttonSound = new Audio("./sounds/button.mp3")

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
    scoreCanvas.height = 50;

    const gv = new GameView(ctx, game, scoreCtx);
    gv.drawTitle();

    const inputList = document.getElementById("inputs");

    let input = "";
    let inputArr = [];
    let parentClick = false;

    const up = document.getElementById("up")

    const down = document.getElementById("down")

    const left = document.getElementById("left")

    const right = document.getElementById("right")

    document.getElementById("directions").addEventListener("click", (e) => handleClick(e))

    document.getElementById("user-input-button").addEventListener("click", () => addLi(input));

    document.getElementById("clear-all").addEventListener("click", () => clearAll());

    document.getElementById("remove-last").addEventListener("click", () => removeLast());

    document.getElementById("start").addEventListener("click", () => getUserInput());

    const notDir = document.getElementsByClassName("notDir")
    for(let i = 0; i < notDir.length; i++){
        notDir[i].addEventListener("click", buttonDown)
    }

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
            const list = document.getElementById("inputs");
            list.scrollTop = list.scrollHeight;
        }
    }

    handleClick = (e) => {
        if(e.target.id !== "directions"){
            debugger
            buttonSound.play();
            up.style.borderColor = "darkgrey"
            up.style.borderStyle = "outset";
            up.style.boxShadow = "0px 3px 1px black"
            down.style.borderColor = "darkgrey"
            down.style.borderStyle = "outset";
            down.style.boxShadow = "0px 3px 1px black"
            left.style.borderColor = "darkgrey"
            left.style.borderStyle = "outset";
            left.style.boxShadow = "0px 3px 1px black"
            right.style.borderColor = "darkgrey"
            right.style.borderStyle = "outset";
            right.style.boxShadow = "0px 3px 1px black"
            const dir = document.getElementById(e.target.id)
            dir.style.borderColor = "#54FADB";
            dir.style.borderStyle = "inset";
            dir.style.boxShadow = "0px 0px"
            input = e.target.id;
        }
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

    function buttonDown (e) {
        buttonSound.play()
        let button = document.getElementById(e.currentTarget.id);
        e.currentTarget.style.borderColor = "#54FADB";
        e.currentTarget.style.borderStyle = "inset";
        e.currentTarget.style.boxShadow = "0px 0px"
        buttonUp = function(button){
            button.style.borderColor = "darkgrey"
            button.style.borderStyle = "outset"
            button.style.boxShadow = "0px 3px 1px black"
        }
        setTimeout(buttonUp, 180, button)
    }  
});
