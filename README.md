# andrewc2695.github.io

## Overview
Hit the target is a game where you try to guide a robot to a rocketship by givining it movements and how long it should do that movement for then watching as it acts out all your movements.

## Technologies Used
#### vanilla JavaScript for the game logic.
#### HTML% canvas to render the game an title screens.
#### Webpack to bundle the JavaScript Files.

## Code Snippet

### Hit Boxes and Hit Detection
    The hit detection is this game was a bit challenging to do as all of the objects were of varrying sizes and the objects picture did nto fill up their hit box completely. In order to make the hit detection work and feel properly each object had to have its own variables for determing if it had a collision with the robot. The wall hit detection was especially challenging since touching the wall didnt cause an instant game over or game won. The Robot still had to be able to move after hitting a wall and not get stuck in it. My solution to this was to check to see what direction the robot was coming from and if it did colide with a wall to move it back to the minimum position it would be at before ti hit the wall.

    ```js
    checkCollisions(){
       if(this.userObject.length ===0) return
       const objects = this.allObjects().slice(1)
       let userPos = this.userObject[0].pos
       for(let i = 0; i < objects.length; i++){
           let obj = objects[i];
           let objWidth = obj.width;
           let objHeight = obj.height;
            if(objects[i] instanceof Wall){
                if(this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) && 
                this.betweenHeight(userPos[1], obj.pos[1] + 5,obj.pos[1] + objHeight)){
                    let vel = this.userObject[0].vel
                    if(vel[0] > 0){
                        this.userObject[0].pos[0] = userPos[0] - 5;
                    }else if(vel[0] < 0){
                        this.userObject[0].pos[0] = userPos[0] + 5;
                    }else if(vel[1] > 0){
                        this.userObject[0].pos[1] = userPos[1] - 5;
                    }else if(vel[1] < 0){
                        this.userObject[0].pos[1] = userPos[1] + 5;
                    }
                    this.userObject[0].vel = [0, 0];
                }
            }else if(objects[i] instanceof Goal){
                if (this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) &&
                    this.betweenHeight(userPos[1], obj.pos[1], obj.pos[1] + objHeight)) {
                        return[true, "won"];
                    }
            }else if(objects[i] instanceof EnergyBall){
                if (this.betweenWidth(userPos[0], obj.pos[0] + 25, obj.pos[0] -25 + objWidth) &&
                    this.betweenHeight(userPos[1], obj.pos[1] + 25, obj.pos[1] -25 + objHeight)) {
                    return([true, "lost"]);
                }
            }else if(objects[i] instanceof Coin){
                if (this.betweenWidth(userPos[0], obj.pos[0], obj.pos[0] + objWidth) &&
                    this.betweenHeight(userPos[1], obj.pos[1], obj.pos[1] + objHeight)) {
                    objects[i].pos = [2000, 2000];
                    objects[i].vel = [0, 0];
                    return [true, "coin"];
                }
            }
       };
       return false;
    }

    betweenWidth(userPos, objectMin, objectMax){
        return(userPos >= (objectMin - 45) && userPos <= (objectMax - 10))
    }

    betweenHeight(userPos, objectMin, objectMax) {
        return (userPos >= (objectMin - 70) && userPos <= (objectMax - 10))
    }
    ```