/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/coin.js":
/*!*********************!*\
  !*** ./src/coin.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Coin extends MovingObject{\n    constructor(variables){\n        super(variables)\n        this.img = new Image();\n        this.img.src = \"../img/coin.png\"\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);\n    }\n}\n\nmodule.exports = Coin;\n\n//# sourceURL=webpack:///./src/coin.js?");

/***/ }),

/***/ "./src/energy_ball.js":
/*!****************************!*\
  !*** ./src/energy_ball.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass EnergyBall extends MovingObject{\n    constructor(variables){\n        super(variables)\n        this.eng1 = new Image();\n        this.eng1.src = \"../img/energy1.png\"\n        this.eng2 = new Image();\n        this.eng2.src = \"../img/energy2.png\"\n        this.eng3 = new Image();\n        this.eng3.src = \"../img/energy3.png\"\n        this.eng4 = new Image();\n        this.eng4.src = \"../img/energy4.png\"\n        this.currentImg = this.eng1;\n        setInterval(() => {\n            if(this.currentImg === this.eng1){\n                this.currentImg = this.eng2;\n            }else if(this.currentImg === this.eng2){\n                this.currentImg = this.eng3;\n            }else if(this.currentImg === this.eng3){\n                this.currentImg = this.eng4;\n            }else{\n                this.currentImg = this.eng1\n            }\n        },150)\n        this.trackNum = variables.track;\n        if(this.trackNum !== undefined){\n            this.track()\n        }\n    }\n\n    track(){\n        setInterval(() => {\n            this.vel[0] = this.vel[0] * -1;\n            this.vel[1] = this.vel[1] * -1;\n        }, this.trackNum);\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.currentImg, this.pos[0], this.pos[1], this.width, this.height);\n    }\n}\n\nmodule.exports = EnergyBall;\n\n//# sourceURL=webpack:///./src/energy_ball.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\")\nconst UserObject = __webpack_require__(/*! ./user_object */ \"./src/user_object.js\")\nconst Wall = __webpack_require__(/*! ./wall */ \"./src/wall.js\")\nconst levels = __webpack_require__(/*! ./level */ \"./src/level.js\")\nconst Goal = __webpack_require__(/*! ./goal */ \"./src/goal.js\")\nconst EnergyBall = __webpack_require__(/*! ./energy_ball */ \"./src/energy_ball.js\")\nconst Coin = __webpack_require__(/*! ./coin */ \"./src/coin.js\")\n\nclass Game {\n    constructor(){\n        this.walls = [];\n        this.userObject = [];\n        this.energyBalls = [];\n        this.goal = [];\n        this.coins = [];\n        this.currentLevel = 1;\n        this.level = levels;\n        this.bgImage = new Image();\n        this.bgImage.src = \"../img/floor.png\";\n    }\n    \n    reset(){\n        this.walls = [];\n        this.userObject = [];\n        this.energyBalls = [];\n        this.goal = [];\n        this.coins = [];\n    }\n\n    addObject(){\n        this.userObject.push(new UserObject(this.level[this.currentLevel].userObject));\n        this.level[this.currentLevel].walls.forEach(wall => {\n            this.walls.push(new Wall(wall));\n        });\n        this.level[this.currentLevel].energyBalls.forEach(eb => {\n            this.energyBalls.push(new EnergyBall(eb));\n        });\n        this.level[this.currentLevel].coins.forEach(coin => {\n            this.coins.push(new Coin(coin));\n        });\n        this.goal.push(new Goal(this.level[this.currentLevel].goal));\n    }\n\n    readPrompts(prompts){\n        this.userObject[0].readPrompts(0, prompts);\n    }\n\n    allObjects(){\n        return [].concat(this.userObject, this.walls, this.goal, this.energyBalls, this.coins);\n    }\n\n    moveObject(){\n        this.allObjects().forEach(object => {\n            object.move();\n        })\n    }\n\n    previewMove(){\n        this.allObjects().slice(1).forEach(object => {\n            object.move();\n        })\n    }\n\n    checkCollisions(){\n       if(this.userObject.length ===0) return\n       const objects = this.allObjects().slice(1)\n       let userPos = this.userObject[0].pos\n       for(let i = 0; i < objects.length; i++){\n           let obj = objects[i];\n           let objWidth = obj.width;\n           let objHeight = obj.height;\n            if(objects[i] instanceof Wall){\n                if(this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) && \n                this.betweenHeight(userPos[1], obj.pos[1] + 5,obj.pos[1] + objHeight)){\n                    let vel = this.userObject[0].vel\n                    if(vel[0] > 0){\n                        this.userObject[0].pos[0] = userPos[0] - 5;\n                    }else if(vel[0] < 0){\n                        this.userObject[0].pos[0] = userPos[0] + 5;\n                    }else if(vel[1] > 0){\n                        this.userObject[0].pos[1] = userPos[1] - 5;\n                    }else if(vel[1] < 0){\n                        this.userObject[0].pos[1] = userPos[1] + 5;\n                    }\n                    this.userObject[0].vel = [0, 0];\n                }\n            }else if(objects[i] instanceof Goal){\n                if (this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) &&\n                    this.betweenHeight(userPos[1], obj.pos[1], obj.pos[1] + objHeight)) {\n                        return[true, \"won\"];\n                    }\n            }else if(objects[i] instanceof EnergyBall){\n                if (this.betweenWidth(userPos[0], obj.pos[0] + 25, obj.pos[0] -25 + objWidth) &&\n                    this.betweenHeight(userPos[1], obj.pos[1] + 25, obj.pos[1] -25 + objHeight)) {\n                    return([true, \"lost\"]);\n                }\n            }else if(objects[i] instanceof Coin){\n                if (this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) &&\n                    this.betweenHeight(userPos[1], obj.pos[1], obj.pos[1] + objHeight)) {\n                    objects[i].pos = [2000, 2000];\n                    objects[i].vel = [0, 0];\n                    return [true, \"coin\"];\n                }\n            }\n       };\n       return false;\n    }\n\n    betweenWidth(userPos, objectMin, objectMax){\n        return(userPos >= (objectMin - 45) && userPos <= (objectMax - 10))\n    }\n\n    betweenHeight(userPos, objectMin, objectMax) {\n        return (userPos >= (objectMin - 70) && userPos <= (objectMax - 10))\n    }\n\n    outOfBounds(){\n        let position = this.userObject[0].pos;\n        if(position[0] >= Game.DIM_X || position[1] >= Game.DIM_Y - 60){\n            return true;\n        }\n        if (position[0] <= 0 || position[1] <= (0 - 15)){\n            return true;\n        }\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.bgImage, 0, 0, Game.DIM_X, Game.DIM_Y)\n        this.allObjects().forEach((object) => {\n            object.draw(ctx);\n        });\n    };\n\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.FPS = 32;\n\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Goal = __webpack_require__(/*! ./goal.js */ \"./src/goal.js\");\nconst Wall = __webpack_require__(/*! ./wall.js */ \"./src/wall.js\");\n\nlet that = \"\"\n\nfunction callPreview(e) {\n    if(e.key ===\"s\"){\n        that.previewLevel = false;\n        that.preview();\n    }else if(e.key === \"p\"){\n        let ctx = that.ctx;\n        that.previewLevel = true;\n        ctx.clearRect(0, 0, 600, 1000);\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0, 0, 1000, 600);\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(\"Enter 1-6 To Play That Level\", 500, 275);\n    }else if(!isNaN(e.key) && that.previewLevel === true){\n        if(e.key > 0  && e.key < 7){\n            that.currentLevel = e.key;\n            that.preview();\n        }\n    }\n}\n\nfunction callFail(e){\n    if(e.key === \"r\"){\n        document.removeEventListener(\"keydown\", callFail);\n        that.preview();\n    }else if(e.key === \"q\"){\n        document.removeEventListener(\"keydown\", callFail);\n        that.currentLevel = 1;\n        that.drawTitle();\n    }\n\n}\n\nclass GameView{\n    constructor(ctx, game, scoreCtx){\n        this.ctx = ctx;\n        this.game = game;\n        this.scoreCtx = scoreCtx;\n        this.gameState = false;\n        this.interval = undefined;\n        this.previewInterval = undefined;\n        this.scoreInterval = undefined;\n        this.score = 0;\n        this.prompts = [];\n        this.currentLevel = 1;\n        this.previousLevel = 0;\n        this.previewLevel = false;\n        this.canStart = false;\n        document.getElementById(\"instructions\").addEventListener(\"click\", () => this.changeId());\n        document.getElementById(\"modal-show\").addEventListener(\"click\", () => this.changeId());\n    }\n\n    changeId(){\n        const modal = document.getElementById(\"modal-show\");\n        if(modal.classList.value === \"modal\"){\n            modal.classList.add(\"appear\");\n        }else{\n            modal.classList.remove(\"appear\");\n        }\n    }\n\n    preview(){\n        this.game.currentLevel = this.currentLevel;\n        document.removeEventListener(\"keydown\", callPreview);\n        this.drawLevel();\n        this.game.addObject();\n        setTimeout(() => {\n            this.ctx.clearRect(0, 0, 600, 1000);\n            this.previewInterval = setInterval(() => {\n                this.drawScore();\n                this.game.draw(this.ctx);\n                this.game.previewMove();\n            }, 25)\n            this.canStart = true;\n        }, 1500);\n    }\n\n    start(){\n        if(this.gameState){\n            this.game.reset();\n            this.game.addObject();\n        }\n        this.gameState = true;\n        if(this.scoreInterval) clearInterval(this.scoreInterval);\n        if(this.previewInterval) clearInterval(this.previewInterval);\n        if(this.previousLevel < this.currentLevel){\n            this.previousLevel += 1;\n        }else{\n            this.score = 0;\n        }\n        this.gameState = true;\n        this.scoreInterval = setInterval(() => {\n            if (this.game.userObject[0].vel[0] !== 0 || this.game.userObject[0].vel[1] !== 0)\n                this.score += 5\n                this.drawScore();\n        }, 100)\n        this.game.readPrompts(this.prompts);\n        this.interval = setInterval(() => {\n            this.game.draw(this.ctx);\n            this.game.moveObject();\n            if(this.game.outOfBounds()){\n                clearInterval(this.interval);\n                this.gameWon(\"lost\");\n            };\n            const collision = this.game.checkCollisions()\n            if (collision){\n                    if(collision[1] === \"coin\"){\n                        this.score += 1000\n                    }else{\n                        clearInterval(this.interval);\n                        this.gameWon(collision[1]);\n                    }\n                }\n        }, 25);\n    };\n\n    gameWon(state){\n        this.canStart = false;\n        let inputs = document.getElementById(\"inputs\");\n        while (inputs.firstChild) {\n                inputs.removeChild(inputs.firstChild);\n            }\n        while(this.prompts.length > 0){\n            this.prompts.pop();\n        }\n        this.game.reset();\n        this.gameState = false;\n        clearInterval(this.scoreInterval);\n        let ctx = this.ctx;\n        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        ctx.fillStyle = Game.BG_COLOR;\n        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.textAlign = \"center\";\n        if(state === \"won\"){\n            this.currentLevel++;\n            ctx.fillText(\"Level Completed!\", Game.DIM_X / 2, Game.DIM_Y / 2);\n            if(this.previewLevel === true){\n                setTimeout(() => {\n                    this.previewLevel = false;\n                    this.drawTitle();\n                }, 1500);\n            }else{\n                setTimeout(() => {\n                    this.ctx.clearRect(0, 0, 600, 1000);\n                    this.preview();\n                }, 1500);\n            }\n        }else{\n            this.score = 0;\n            if (this.previewLevel === true) {\n                ctx.fillText(\"Level Failed!\", Game.DIM_X / 2, Game.DIM_Y / 2);\n                setTimeout(() => {\n                    this.previewLevel = false;\n                    this.drawTitle();\n                }, 1500)\n            }else{\n                this.ctx.clearRect(0, 0, 600, 1000);\n                this.drawFail();\n            }\n        }\n    }\n\n    getUserInput(prompts){\n        if(prompts.length !== 0){\n            this.prompts = prompts;\n            if(this.interval !== undefined){\n                clearInterval(this.interval);\n            }\n            if (this.interval !== undefined || this.previewInterval !== undefined){\n                if(this.canStart){\n                    this.start();\n                }\n            }\n        }\n    }\n\n    drawFail(){\n        let ctx = this.ctx;\n        that = this;\n        document.addEventListener(\"keydown\", callFail)\n        ctx.clearRect(0, 0, 600, 1000);\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0, 0, 1000, 600);\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(\"Level Failed\", 500, 275);\n        ctx.fillText(\"Press r to retry the level, Press q to quit\", 500, 325);\n    }\n\n    drawTitle(){\n        let ctx = this.ctx;\n        that = this;\n        document.addEventListener(\"keydown\", callPreview)\n        ctx.clearRect(0, 0, 600, 1000);\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0, 0, 1000, 600);\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(\"Hit The Target\", 500, 275);\n        ctx.fillText(\"Press S to start the Game, Press P to practice a level\", 500, 325);\n        this.drawScore()\n    }\n\n    drawScore(){\n        let ctx = this.scoreCtx;\n        ctx.clearRect(0, 0, 200, 50);\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0, 0, 200, 50);\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(this.score, 100, 33)\n    }\n\n    drawLevel(){\n        let ctx = this.ctx;\n        ctx.clearRect(0, 0, 600, 1000);\n        ctx.fillStyle = \"#000000\";\n        ctx.fillRect(0, 0, 1000, 600);\n        ctx.font = \"30px Comic Sans MS\";\n        ctx.font = \"30px Copperplate\";\n        ctx.fillStyle = \"#54FADB\";\n        ctx.fillText(`Level ${this.currentLevel}`, 500, 275);\n        ctx.fillText(`${this.game.level[this.currentLevel].title}`, 500, 325);\n    }\n}\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/goal.js":
/*!*********************!*\
  !*** ./src/goal.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Goal extends MovingObject{\n    constructor(variables){\n        super(variables)\n        this.height = variables.height;\n        this.width = variables.width;\n        this.img = new Image();\n        this.img.src =\"../img/rocket.png\"\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.img, this.pos[0], this.pos[1])\n    }\n}\n\nmodule.exports = Goal;\n\n\n//# sourceURL=webpack:///./src/goal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\")\nconst buttonSound = new Audio(\"./sounds/button.mp3\")\n\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"game-canvas\")\n    canvas.width = Game.DIM_X;\n    canvas.height = Game.DIM_Y;\n    const ctx = canvas.getContext(\"2d\")\n\n    const game = new Game();\n\n    const scoreCanvas = document.getElementById(\"score\")\n    const scoreCtx = scoreCanvas.getContext(\"2d\")\n    scoreCanvas.width = 200;\n    scoreCanvas.height = 50;\n\n    const gv = new GameView(ctx, game, scoreCtx);\n    gv.drawTitle();\n\n    const inputList = document.getElementById(\"inputs\");\n\n    let input = \"\";\n    let inputArr = [];\n    let parentClick = false;\n\n    const up = document.getElementById(\"up\")\n\n    const down = document.getElementById(\"down\")\n\n    const left = document.getElementById(\"left\")\n\n    const right = document.getElementById(\"right\")\n\n    document.getElementById(\"directions\").addEventListener(\"click\", (e) => handleClick(e))\n\n    document.getElementById(\"user-input-button\").addEventListener(\"click\", () => addLi(input));\n\n    document.getElementById(\"clear-all\").addEventListener(\"click\", () => clearAll());\n\n    document.getElementById(\"remove-last\").addEventListener(\"click\", () => removeLast());\n\n    document.getElementById(\"start\").addEventListener(\"click\", () => getUserInput());\n\n    const notDir = document.getElementsByClassName(\"notDir\")\n    for(let i = 0; i < notDir.length; i++){\n        notDir[i].addEventListener(\"click\", buttonDown)\n    }\n\n    getUserInput = () => {\n        gv.getUserInput(inputArr);\n    }\n\n    addLi = (ele) => {\n        if(ele !== \"\"){\n            let time = document.getElementById(\"time\");\n            let li = document.createElement(\"li\");\n            let subArr = [ele, time.value]\n            inputArr.push(subArr);\n            li.appendChild(document.createTextNode(`${ele}, ${time.value}`))\n            inputList.appendChild(li)\n            const list = document.getElementById(\"inputs\");\n            list.scrollTop = list.scrollHeight;\n        }\n    }\n\n    handleClick = (e) => {\n        if(e.target.id !== \"directions\"){\n            debugger\n            buttonSound.play();\n            up.style.borderColor = \"darkgrey\"\n            up.style.borderStyle = \"outset\";\n            up.style.boxShadow = \"0px 3px 1px black\"\n            down.style.borderColor = \"darkgrey\"\n            down.style.borderStyle = \"outset\";\n            down.style.boxShadow = \"0px 3px 1px black\"\n            left.style.borderColor = \"darkgrey\"\n            left.style.borderStyle = \"outset\";\n            left.style.boxShadow = \"0px 3px 1px black\"\n            right.style.borderColor = \"darkgrey\"\n            right.style.borderStyle = \"outset\";\n            right.style.boxShadow = \"0px 3px 1px black\"\n            const dir = document.getElementById(e.target.id)\n            dir.style.borderColor = \"#54FADB\";\n            dir.style.borderStyle = \"inset\";\n            dir.style.boxShadow = \"0px 0px\"\n            input = e.target.id;\n        }\n    }\n\n    clearAll = () => {\n        while(inputList.firstChild){\n            inputList.removeChild(inputList.firstChild);\n        }\n    }\n\n    removeLast = () => {\n        if(inputArr.length !== 0){\n            inputList.removeChild(inputList.lastChild);\n            inputArr.pop();\n        }else{\n            clearAll();\n        }\n    }\n\n    function buttonDown (e) {\n        buttonSound.play()\n        let button = document.getElementById(e.currentTarget.id);\n        e.currentTarget.style.borderColor = \"#54FADB\";\n        e.currentTarget.style.borderStyle = \"inset\";\n        e.currentTarget.style.boxShadow = \"0px 0px\"\n        buttonUp = function(button){\n            button.style.borderColor = \"darkgrey\"\n            button.style.borderStyle = \"outset\"\n            button.style.boxShadow = \"0px 3px 1px black\"\n        }\n        setTimeout(buttonUp, 180, button)\n    }  \n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/***/ ((module) => {

eval("const level = {\n    1: {\n        userObject: {\n            pos: [10, 265],\n            vel: [ 5, 0],\n        },\n        walls: [{ pos: [0, 165], vel: [0, 0], height: 60, width: 60 }, \n        { pos: [60, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [120, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [180, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [240, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [300, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [360, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [420, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [480, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [540, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [600, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [660, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [720, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [780, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [840, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [900, 165], vel: [0, 0], height: 60, width: 60 },\n        { pos: [960, 165], vel: [0, 0], height: 60, width: 60 },\n            { pos: [0, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [60, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [120, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [180, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [240, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [300, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [360, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [420, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [480, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [540, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [600, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [660, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [720, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [780, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [840, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [900, 375], vel: [0, 0], height: 60, width: 60 },\n            { pos: [960, 375], vel: [0, 0], height: 60, width: 60 }],\n        goal: { pos: [920, 265], vel: [0, 0], height: 75, width: 39},\n        coins: [{ pos: [500, 270], vel: [0, 0], height: 60, width: 60}],\n        energyBalls: [],\n        title: \"Pretty Easy\"\n    },\n    2: {\n        userObject: {\n            pos: [10, 520],\n            vel: [5, 0],\n        },\n        walls: [{pos: [940, 540], vel: [0, 0], height: 60, width: 60 },\n                { pos: [940, 480], vel: [0, 0], height: 60, width: 60 }],\n        goal: { pos: [900, 10], vel: [0, 0], height: 75, width: 39 },\n        coins: [{ pos: [150, 155], vel: [0, 0], height: 60, width: 60 }],\n        energyBalls: [],\n        title: \"Dont Touch the Edges\"\n    },\n\n    3: {\n        userObject: {\n            pos: [940, 265],\n            vel: [5, 0],\n        },\n        walls: [{pos: [940, 0], vel: [0, 0], height: 60, width: 60},\n                {pos: [940, 540], vel: [0, 0], height: 60, width: 60 }],\n        goal: { pos: [10, 265], vel: [0, 0], height: 75, width: 39 },\n        coins: [{ pos: [880, 0], vel: [0, 0], height: 60, width: 60 },\n            { pos: [880, 540], vel: [0, 0], height: 60, width: 60 }],\n        energyBalls: [{ pos: [200, 265], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [200, 235], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [200, 295], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [200, 325], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [200, 205], vel: [0, 0], height: 60, width: 60 }],\n        title: \"Avoid the Energy Spheres\"\n    },\n\n    4: {\n        userObject: {\n            pos: [500, 10],\n            vel: [5, 0]\n        },\n        walls: [{ pos: [500, 230], vel: [0, 0], height: 60, width: 60 },\n                { pos: [500, 290], vel: [0, 0], height: 60, width: 60 },\n                { pos: [0, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [0, 540], vel: [0, 0], height: 60, width: 60 }],\n        coins: [{ pos: [850, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 120], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 120], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 180], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 180], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 240], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 240], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 300], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 300], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 360], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 360], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 420], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 420], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 480], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 480], vel: [0, 0], height: 60, width: 60 },\n                { pos: [850, 540], vel: [0, 0], height: 60, width: 60 },\n                { pos: [930, 540], vel: [0, 0], height: 60, width: 60 }],\n        energyBalls: [{ pos: [790, 0], vel: [0, 0], height: 60, width: 60},\n                    { pos: [790, 30], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 60], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 90], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 120], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 150], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 180], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 300], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 330], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 360], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 390], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 420], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 450], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 480], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 520], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 550], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [790, 580], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [100, 170], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [100, 370], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [290, 170], vel: [0, 0], height: 60, width: 60 },\n                    { pos: [290, 370], vel: [0, 0], height: 60, width: 60 }],\n        goal: { pos: [200, 270], vel: [0, 0], height: 75, width: 39},\n        title: \"Risk It For the Biscuit\"\n    },\n    5: {\n        userObject: {\n            pos: [500, 10],\n            vel: [5, 0]\n        },\n        walls: [{ pos: [700, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [700, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [700, 120], vel: [0, 0], height: 60, width: 60 },\n                { pos: [760, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [820, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [880, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [940, 0], vel: [0, 0], height: 60, width: 60 },\n                { pos: [940, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [940, 120], vel: [0, 0], height: 60, width: 60 },\n                { pos: [180, 205], vel: [0, 0], height: 60, width: 60 },\n                { pos: [120, 205], vel: [0, 0], height: 60, width: 60 },\n                { pos: [60, 205], vel: [0, 0], height: 60, width: 60 },\n                { pos: [0, 205], vel: [0, 0], height: 60, width: 60 },\n                { pos: [240, 205], vel: [0, 0], height: 60, width: 60 }],\n        coins: [{ pos: [760, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [820, 60], vel: [0, 0], height: 60, width: 60 },\n                { pos: [880, 60], vel: [0, 0], height: 60, width: 60 }],\n        energyBalls: [{ pos: [500, 350], vel: [0, -3], height: 60, width: 60, track: 1950 },\n                      { pos: [500, 270], vel: [-3, 0], height: 60, width: 60, track: 4500 },\n                    {pos: [870, 165], vel: [2, 0], height: 60, width: 60, track: 2000} ],\n        goal: { pos: [200, 270], vel: [0, 0], height: 75, width: 39 },\n        title: \"They Can Move?\"\n    },\n    6: {\n        userObject: {pos:[10, 265], vel:[5, 0]},\n        goal: { pos: [950, 270], vel: [0, 0], height: 75, width: 39 },\n        walls: [],\n        coins: [],\n        energyBalls: [{ pos: [150, 200], vel: [0, 3], height: 60, width: 60, track: 4200},\n                    { pos: [150, 350], vel: [0, -3], height: 60, width: 60, track: 4200 },\n                    { pos: [330, 350], vel: [0, -3], height: 60, width: 60, track: 4200 },\n                    { pos: [330, 200], vel: [0, 3], height: 60, width: 60, track: 4200 },\n                    { pos: [520, 200], vel: [0, 3], height: 60, width: 60, track: 4200 },\n                    { pos: [520, 350], vel: [0, -3], height: 60, width: 60, track: 4200 },\n                    { pos: [700, 350], vel: [0, -3], height: 60, width: 60, track: 4200 },\n                    { pos: [700, 200], vel: [0, 3], height: 60, width: 60, track: 4200 },\n                    { pos: [880, 350], vel: [0, -3], height: 60, width: 60, track: 4200 },\n                    { pos: [880, 200], vel: [0, 3], height: 60, width: 60, track: 4200 },\n                    { pos: [160, 65], vel: [3, 0], height: 60, width: 60, track: 8100 },\n                    { pos: [810, 475], vel: [-3, 0], height: 60, width: 60, track: 8100 },],\n        title: \"Timing Is Everything\"\n    }\n\n};\n\nconst randonLevel = () => {\n    rLevel = {};\n    let goal = {};\n    let walls = [];\n    let energyBalls = [];\n    let coins = [];\n    let usrObject = {}\n}\n\nconst randPos = () => {\n    return [Math.floor(Math.random() * (940 - 5)) + 5, Math.floor(Math.random() * (540 - 5)) + 5]\n}\n\n\n\nmodule.exports = level;\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("\nclass MovingObject {\n    constructor(variables){\n        this.pos = [];\n        this.pos.push(variables.pos[0]);\n        this.pos.push(variables.pos[1]);\n        this.vel = [];\n        this.vel.push(variables.vel[0])\n        this.vel.push(variables.vel[1])\n        this.height = variables.height;\n        this.width = variables.width;\n    }\n\n\n    move(){\n        this.pos[0] = this.pos[0] + this.vel[0]\n        this.pos[1] = this.pos[1] + this.vel[1]\n    }\n}\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/user_object.js":
/*!****************************!*\
  !*** ./src/user_object.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass UserObject extends MovingObject{\n    constructor(variables){\n        super(variables);\n        this.img1 = new Image();\n        this.img1.src = \"../img/robot1.png\";\n        this.img2 = new Image();\n        this.img2.src = \"../img/robot2.png\";\n        this.currentImg = this.img1;\n        setInterval(() => {\n            this.currentImg === this.img1 ? this.currentImg = this.img2 : this.currentImg = this.img1\n        }, 200)\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.currentImg, this.pos[0], this.pos[1], 55, 70)\n    }\n\n    readPrompts(n, prompts) {\n        let promptArr = prompts[n]\n        let newVel = [];\n        if (promptArr[0] === \"left\") {\n            newVel = [-5, 0];\n        } else if (promptArr[0] === \"right\") {\n            newVel = [5, 0];\n        } else if (promptArr[0] === \"up\") {\n            newVel = [0, -5];\n        } else {\n            newVel = [0, 5];\n        }\n        this.vel = newVel;\n        if (n < prompts.length - 1) {\n            setTimeout(() => {\n                this.readPrompts(n + 1, prompts)\n            }, parseInt(promptArr[1]));\n        };\n    }\n\n}\n\nmodule.exports = UserObject;\n\n//# sourceURL=webpack:///./src/user_object.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n    inherits(ChildClass, ParentClass) {\n        ChildClass.prototype = Object.create(ParentClass.prototype);\n        ChildClass.prototype.constructor = ChildClass;\n    }\n}\n\nmodule.exports = Util\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ }),

/***/ "./src/wall.js":
/*!*********************!*\
  !*** ./src/wall.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Wall extends MovingObject {\n    constructor(variables) {\n        super(variables)\n        this.img = new Image();\n        this.img.src = \"../img/wall.png\"\n    }\n\n    draw(ctx) {\n        ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);\n    }\n\n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack:///./src/wall.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;