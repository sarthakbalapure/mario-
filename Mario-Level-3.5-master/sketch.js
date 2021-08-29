var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore = 0;


function preload() {
  mario_running = loadAnimation("images/mar1.png", "images/mar2.png", "images/mar3.png",
    "images/mar4.png", "images/mar5.png", "images/mar6.png", "images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  brickImage = loadImage("images/brick.png");
  coinSound = loadSound("sounds/coinSound.mp3");
  coinImage = loadAnimation("images/con1.png", "images/con2.png", "images/con3.png", "images/con4.png", "images/con5.png", "images/con6.png");
  mushobsImage = loadAnimation("images/mush1.png", "images/mush2.png", "images/mush3.png", "images/mush4.png", "images/mush5.png", "images/mush6.png");
  turtleobsImage = loadAnimation("images/tur1.png", "images/tur2.png", "images/tur3.png", "images/tur4.png", "images/tur5.png");
  keyobsImages = loadAnimation("images/keyObs1.png", "images/keyObs2.png", "images/keyObs3.png", "images/keyObs4.png", "images/keyObs5.png");

  jumpsound = loadSound('sounds/jump.mp3');
  diesound = loadSound("sounds/dieSound.mp3")
}

function setup() {
  createCanvas(1000, 600);

  // creating background
  bg = createSprite(580, 300);
  bg.addImage(bgImage);
  bg.scale = 0.5;
  bg.velocityX = -16;

  // creat mario
  mario = createSprite(200, 505, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.3;

  // creat ground
  ground = createSprite(200, 585, 400, 10);
  ground.visible = false;

  //  creating groups
  bricksGroup = new Group();
  coinsGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  // scroll background
  if (bg.x < 100) {
    bg.x = bg.width / 4;
  }

  // to avoid mario going out with bricks
  if (mario.x < 200) {
    mario.x = 200;
  }

  // to avoid mario going out form top
  if (mario.y < 50) {
    mario.y = 50;
  }

  // to jump mario
  if (keyDown("space")) {
    mario.velocityY = -16;
  }

  // for gravity
  mario.velocityY = mario.velocityY + 0.5;

  // for generate bricks
  generateBricks();

  //  collide with the bricks
  for (var i = 0; i < (bricksGroup).length; i++) {
    var temp = (bricksGroup).get(i);
    if (temp.isTouching(mario)) {
      mario.collide(temp);
    }
  }

  // to generate coins
  generateCoins();
  for (var i = 0; i < (coinsGroup).length; i++) {
    var temp = (coinsGroup).get(i);
    // to collact coins
    if (temp.isTouching(mario)) {
      coinSound.play();
      coinScore++;
      temp.destroy();
      temp = null;
    }

  }
  // call function to generte obstacles
  generateObstacles();
  // to collide mario with the ground
  mario.collide(ground);

  drawSprites();

  // to display score
  textSize(20);
  fill("brown")
  text("Coins Collected: " + coinScore, 500, 50);

}

// to generate infinate bricks
function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200, 120, 40, 10);
    brick.y = random(50, 450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    brick.lifetime = 250;
    bricksGroup.add(brick);
  }
}

// to generate infinate coins
function generateCoins() {
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200, 120, 40, 10);
    coin.addAnimation("coin", coinImage);
    coin.y = Math.round(random(80, 350));
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

// to generate infinate obstacles
function generateObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1200, 545, 10, 40);
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addAnimation("mush", mushobsImage);
        obstacle.scale = 0.2;
        break;
      case 2:
        obstacle.addAnimation("turtle", turtleobsImage);
        obstacle.scale = 0.2;
        break;
      case 3:
        obstacle.addAnimation("key", keyobsImages);
        obstacle.scale = 0.7;
        break;
    }
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}