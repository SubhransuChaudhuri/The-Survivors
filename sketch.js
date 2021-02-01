var canvas ;

var gameState = 0;
var playerCount;

var trophie, trophie_part1, trophie_part2, trophie_part3;
var life = 3;
var parts = 0;

var allPlayers;
var distance = 0;
var database;

var form, player, game;

var hero, hero1, hero2, zombie, zombieKing, bomb, arrow;
var hero1img, hero2img, zombieimg, zombieKingimg, bombimg, arrowimg;

var wall1, wall2;

function preload(){
  hero1img = loadImage("1.PNG");
  hero2img = loadImage("1.PNG");
  zombieimg = loadImage("2.PNG");
  zombieKingimg = loadImage("5.PNG");
  bombimg = loadImage("3.PNG");
  arrowimg = loadImage("4.PNG")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}