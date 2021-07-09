//Create variables here
var dog, happyDog;
var dogImage, dogImage1;
var database;
var foodS, foodStock;
var feed, addFood;

function preload()
{
	//load images here
  dogImage=loadImage('images/dogImg.png');
  dogImage1=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(1000, 500);

  foodObject=new Food();

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  dog=createSprite(250,300,150,150);
  dog.scale=0.3;
  dog.addImage(dogImage);

  feed=createButton('Feed the dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton('Add food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(255,255,255);

  for(var i=1;i<=foodS;i++){
    //foodObject.position.x=foodObject.position.x+50*i;
    foodObject.display(400+(50*i),220);
  }

  drawSprites();
  //add styles here
  textSize(15);
  stroke('black');
  text('Food remaining: '+foodS,170,200);
}

function readStock(data){
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({Food:x});
}

function feedDog(){
  writeStock(foodS);
  dog.addImage(dogImage1);
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}