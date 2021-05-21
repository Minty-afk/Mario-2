var PLAY = 1;
var END = 0;
var gameState = PLAY;
var marioimg
var ground
var obstacle
var brick
var mariocollided
var gameOver
function preload(){

marioimg =         loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");

groundimg = loadImage("ground2.png");
  
obstacleimg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  
brickimg = loadImage("brick.png");
  
mariocimg = loadAnimation("collided.png");  

gameOverimg = loadImage("unnamed.png");
}

function setup(){
  createCanvas(600, 200);
  
    ground = createSprite(200,180,400,20)
    ground.addImage("ground",groundimg);
    ground.x = ground.width /2;
    ground.velocityX = -(5);
  
    mario = createSprite(50,180,20,50);
    mario.addAnimation("running", marioimg); 
    mario.addAnimation("collided", mariocimg);
    mario.scale = 1.3;
  
   gameOver = createSprite(300,70);
   gameOver.addImage("gmover",gameOverimg);
   gameOver.visible = false;
  
    obstacleGroup = new Group();
  
    brickGroup = new Group();
}
function draw(){
background("blue");

  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6);
  
    if(keyDown("space") ){
  mario.velocityY = -10;
}
 mario.velocityY = mario.velocityY + 0.8;
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    } 

  
  spawnObstacle();
  spawnBrick();
    
    if(obstacleGroup.isTouching(mario)){
      gameOver.visible = true;
    gameState = END;
  }
  }  
    
  else if(gameState === END){
     ground.velocityX = 0;    
     mario.velocityY = 0;
     obstacleGroup.setVelocityXEach(0);
     brickGroup.setVelocityXEach(0);
          
    mario.changeAnimation("collided",mariocimg);
    
    obstacleGroup.setLifetimeEach(-1);
    brickGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(gameOver))
     reset();
    }
  mario.collide(ground);
  
drawSprites()
 

}

function spawnObstacle() {
  //write code here to spawn the obstacles
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,120,40,10);
    //obstacle.y = Math.round(random(80,120));
    obstacle.addAnimation("running",obstacleimg);
    obstacle.scale = 0.8;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBrick() {
  //write code here to spawn the obstacles
  if (frameCount % 45 === 0) {
    var brick = createSprite(600,120,40,10);
    brick.y = Math.round(random(80,120));
    brick.addImage("running",brickimg);
    brick.scale = 1;
    brick.velocityX = -3;
    
     //assign lifetime to the variable
    brick.lifetime = 200;
    
    //adjust the depth
    brick.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    brickGroup.add(brick);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mario.changeAnimation("running", marioimg);
  obstacleGroup.destroyEach();
  brickGroup.destroyEach();
}