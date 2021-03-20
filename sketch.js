var monkey , monkey_running , ground;
var food ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("seagreen");
  
     
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  var survivalTime = 0;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime, 100,50);
  
  if (keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-7);
    FoodGroup.setLifetimeEach(-7);
    survivalTime = 0;
  }
  
  Banana();
  obstacles();
  
  drawSprites();
}


function Banana(){
  if (frameCount % 80 === 0){
   food = createSprite(600,250,40,10);
    food.y = random(120,200);    
    food.velocityX = -3;
    
    food.lifetime = 300;
   
    food.addImage(bananaImage);
    food.scale=0.08;
     
    FoodGroup.add(food);
  }
}


function obstacles (){
  if (frameCount % 300 === 0){
  obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
     
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
         
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

