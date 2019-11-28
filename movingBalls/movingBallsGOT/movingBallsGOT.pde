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
  size(900, 600);
  background(0);
  
  gotTable = loadTable("GOT.csv", "header");
  
  println(gotTable.getRowCount() + " total rows in table");
  
  for(TableRow row : gotTable.rows()) {
    
    float score = row.getFloat("score");
    String name = row.getString("short_name");
    String category = row.getString("category");

    if(score > 0.6) {
      if(characterNumber < ballNumber) {
        println(name + " has a score of " + score + " and is " + category);
        randPosX = (int)random(50,150);//(int)Math.random() * 169 + 16;
        randPosY = (int)random(50,150);//(int)Math.random() * 169 + 16;
        randSpeedX = (int)random(1,5);//(int)Math.random() * 169 + 16;
        randSpeedY = (int)random(1,5);//(int)Math.random() * 169 + 16;
        
        balls[characterNumber] = new Ball(randPosX, randPosY, int(score*85), randSpeedX, randSpeedY, name, category);
        println("New ball created number " + characterNumber);
      }
      characterNumber++;
    }
  }
}

void draw() {
  background(0);
  
  for(int i=0; i < balls.length; i++){
    balls[i].moveBall();
    balls[i].display();
    for(int j=0; j < balls.length; j++) {
      if(i != j && balls[i].isClose(balls[j])) {
        strokeWeight(4);
        line(balls[i].getPosX(), balls[i].getPosY(), balls[j].getPosX(), balls[j].getPosY());
      }
    }
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
  String category;

  Ball(int tempPosX, int tempPosY, int tempD, int tempSpeedX, int tempSpeedY, String tempName, String tempCat) {
    posX = tempPosX;
    posY = tempPosY;
    d = tempD;
    speedX = tempSpeedX;
    speedY = tempSpeedY;
    name = tempName;
    category = tempCat;
  }
  
  int getPosX() {
    return posX;
  }
  
  int getPosY() {
    return posY;
  }
  
  void moveBall() {
    if (posX >= width - d/2 || posX <= d/2) {
      dirh = -dirh;
    }
    if (posY >= height - d/2 || posY <= d/2) {
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
  
  void colorBall() {
    if(category.equals("mentioned")) {
      stroke(153, 255, 233);
      fill(153, 255, 233);
    } else if(category.equals("appears")) {
      stroke(1, 255, 233);
      fill(1, 255, 233);
    } else if(category.equals("POV")) {
      stroke(60, 204, 197);
      fill(60, 204, 197);
    }
  }
  
  boolean isClose(Ball nextBall) {
    if(this.getPosX() > nextBall.getPosX() - 80 && this.getPosX() < nextBall.getPosX() + 80 && this.getPosY() > nextBall.getPosY() - 80 && this.getPosY() < nextBall.getPosY() + 80) {
      return true;
    } else {
      return false;
    }
  }
  
  void display() {
    circle(posX, posY, d);
    pushMatrix();
    textAlign(CENTER);
    popMatrix();   
    fill(88);
    text(name, posX, posY);
    colorBall();
  }
}
