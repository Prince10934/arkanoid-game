//types
import { Brick } from "./sprities/Brick";
import { Paddle } from "./sprities/Paddle";
import { Ball } from "./sprities/Ball";
import { CanvasView } from "./view/CanvasView";


export class Collision{

    isCollisionBrick(ball,brick){
        if(
            ball.pos.x<brick.pos.x+brick.width&&
            ball.pos.x+ball.width>brick.pos.x&&
            ball.pos.y<brick.pos.y+brick.height &&
            ball.pos.y+ball.height > brick.pos.y
        ){
            return true;
        }
        return false;
    }

    //check ball collision with bricks
    isCollisionBricks(ball,bricks){
         let colliding =false;
         bricks.forEach((brick,i)=>{
             if(this.isCollisionBrick(ball,brick)){
                ball.changeYDirection();
                if(brick.energy===1){
                    bricks.splice(i,1);
                }
                else{
                    brick.energy-=1;
                }
                colliding=true;
             }
         });
         return colliding;
    }

    checkBallCollision(ball,paddle,view){
        //1.check ball collision with paddle
        if(ball.width+ball.pos.x > paddle.pos.x&&ball.pos.x<paddle.pos.x+paddle.width&&
        ball.pos.y+ball.height=== paddle.pos.y
        ){
            ball.changeYDirection();
        }
        //2.check ball collision with walls
        //ball movement X constraints
        if(ball.pos.x>view.canvas.width-ball.width||ball.pos.x<0){
            ball.changeXDirection();
        }
        //Ball movement Y constraints
        if(ball.pos.y<0){
            ball.changeYDirection();
        }
    }
    
}