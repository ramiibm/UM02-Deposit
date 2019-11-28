int x = 0;
int y = 100;

int i = 100;
int j = 150;
int k = 50;
int l = 20;

int ballNumber = 10;

int randPosX = 0;
int randPosY = 0;

Ball ballOne;
Ball ballTwo;
Ball balls[] = new Ball[ballNumber];

Table gotTable;

void setup() {
  size(200, 200);
  background(0, 0, 255);
  
  gotTable = loadTable("GOT.csv", "header");
  
  println(gotTable.getRowCount() + " total rows in table");
  
  for(TableRow row : gotTable.rows()) {
    float score = row.getFloat("score");
    String name = row.getString("short_name");
    String category = row.getString("category");

    if(score > 1.1) {
      println(name + " has a score of " + score);
    }
  }
  
  for(int i=0; i < balls.length; i++){
    randPosX = (int)random(15,185);//(int)Math.random() * 169 + 16;
    randPosY = (int)random(15,185);//(int)Math.random() * 169 + 16;
    balls[i] = new Ball(randPosX, randPosY, 10);
  }  
  //ballOne = new Ball(100, 100, 30);
  //ballTwo = new Ball(20, 50, 30);
}

void draw() {
  background(0, 0, 255);
  for(int i=0; i < balls.length; i++){
    balls[i].moveBall();
    balls[i].display();
  }
  //ballOne.moveBall();
  //ballOne.display();
  //ballTwo.moveBall();
  //ballTwo.display();
}

class Ball {
  int posX;
  int posY;
  int d = 30;
  int dirh=1;
  int dirv=1;

  Ball(int tempPosX, int tempPosY, int tempD) {
    posX = tempPosX;
    posY = tempPosY;
    d = tempD;
  }
  
  void moveBall() {
    if (posX >= height - d/2 || posX <= d/2) {
      dirh = -dirh;
    }
    if (posY >= width - d/2 || posY <= d/2) {
      dirv = -dirv;
    }

    if (dirh > 0) {
      posX += 1;
    } else {
      posX -= 1;
    }
    if (dirv > 0) {
      posY += 3;
    } else {
      posY -= 3;
    }
  }
  
  void display() {
    circle(posX, posY, d);
  }
}
