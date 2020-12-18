//Create variables here

var dog,dogimg1,dogimg2;
var db;
var foods,foodstock;
var milk;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()
{
  //load images here
  dogimg1=loadImage("images/dogImg.png");
  dogimg2=loadImage("images/dogImg1.png");

  milk=loadImage("images/Milk.png");

}

function setup() {
  db=firebase.database();
  createCanvas(1000, 600);

  foodObj=new Food();

  
  dog=createSprite(800,200,150,150);
  dog.addImage(dogimg1);
  dog.scale=0.15;

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  foodstock=db.ref('Food');
  foodstock.on("value",reads);
  textSize(20);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime=db.ref("FeedTime");
fedTime.on("value",function (data){
  lastFed=data.val();
});
fill(255,255,254);
textSize(15);
if (lastFed>=12){
  text("Last Feed : "+lastFed%12+" PM",350,30);

}
else if(lastFed==0){
  text("Last Feed : 12AM",350,30);
}
else{
  text("Last Feed : "+lastFed+" AM",350,30);
}

  drawSprites();
 

}

function reads(data){
foods=data.val();
foodObj.updateFoodStock(foods);
}
function feedDog(){
  dog.addImage(dogimg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foods++;
  db.ref("/").update({
    food:foods
  })

  
}



