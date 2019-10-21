int x = 0;
int y = 100;

int i = 100;
int j = 150;
int k = 50;
int l = 20;

int ballNumber = 10;
int characterNumber = 0;

int randPosX = 0;
int randPosY = 0;
int randSpeedX = 0;
int randSpeedY = 0;

int colorNb = 0;

Ball ballOne;
Ball ballTwo;
Ball balls[] = new Ball[ballNumber];

Table gotTable;

void setup() {
  size(500, 500);
  background(90, 130, 168);
  
  gotTable = loadTable("GOT.csv", "header");
  
  println(gotTable.getRowCount() + " total rows in table");
  
  for(TableRow row : gotTable.rows()) {
    
    float score = row.getFloat("score");
    String name = row.getString("short_name");
    String category = row.getString("category");

    if(score > 0.6) {
      if(characterNumber < ballNumber) {
        println(name + " has a score of " + score + " and is " + category);
        randPosX = (int)random(40,170);//(int)Math.random() * 169 + 16;
        randPosY = (int)random(40,170);//(int)Math.random() * 169 + 16;
        randSpeedX = (int)random(1,5);//(int)Math.random() * 169 + 16;
        randSpeedY = (int)random(1,5);//(int)Math.random() * 169 + 16;
        println(category);
        if(category.equals("mentioned")) {
          println("character mentioned");
          colorNb = 1;
        } else if(category.equals("appears")) {
          colorNb = 120;
        } else if(category.equals("POV")) {
          colorNb = 255;
        }
        
        balls[characterNumber] = new Ball(randPosX, randPosY, int(score*50), randSpeedX, randSpeedY, name, colorNb);
        println("New ball created number " + characterNumber);
      }
      characterNumber++;
    }
  }
}

void draw() {
  background(90, 130, 168);
  for(int i=0; i < balls.length; i++){
    balls[i].moveBall();
    balls[i].display();
  }
}

class Ball {
  int posX;
  int posY;
  int d = 30;
  int dirh=1;
  int dirv=1;
  int speedX;
  int speedY;
  String name;
  int category;

  Ball(int tempPosX, int tempPosY, int tempD, int tempSpeedX, int tempSpeedY, String tempName, int tempCat) {
    posX = tempPosX;
    posY = tempPosY;
    d = tempD;
    speedX = tempSpeedX;
    speedY = tempSpeedY;
    name = tempName;
    category = tempCat;
  }
  
  void moveBall() {
    if (posX >= height - d/2 || posX <= d/2) {
      dirh = -dirh;
    }
    if (posY >= width - d/2 || posY <= d/2) {
      dirv = -dirv;
    }

    if (dirh > 0) {
      posX += speedX;
    } else {
      posX -= speedX;
    }
    if (dirv > 0) {
      posY += speedY;
    } else {
      posY -= speedY;
    }
  }
  
  void display() {
    circle(posX, posY, d);
    fill(category);
    text(name, posX, posY);
  }
}
