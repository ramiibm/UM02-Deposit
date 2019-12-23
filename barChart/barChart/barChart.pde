//Dimensions variables
float window_width = 1200;
float window_height = 700;

float margin_x = 100;
float margin_y = 100;

float chart_width = 900;
float chart_height = 400;
float max_bar_height = 350;

float chart_x_origin = margin_x;
float chart_y_origin = margin_y + chart_height;

float chart_x_top = margin_x + chart_width;
float chart_y_top = margin_y;

float bar_space = 7;

//Max character score 
float max_score = 0;
//Scalable height factor
float height_factor = 0;

//Tables
//GoT csv
Table gotTable;
//Bars ArrayList
ArrayList <Bar> bars = new ArrayList<Bar>();

int bars_limit = 33;

PImage mask_img;// Declare a variable of type PImage



void setup() {
  size(1200, 700);

  //Load Game of Thrones csv file
  gotTable = loadTable("data/GOT.csv", "header");
  
  println(gotTable.getRowCount() + " total rows in table");
  
  mask_img = loadImage("pictures/mask.png");  
  
  //Get character with the highest score & create associated bars (< bars_number)
  for(TableRow row : gotTable.rows()) {
    
    float score = row.getFloat("score");
    String name = row.getString("short_name");
    String category = row.getString("category");
    String url = row.getString("url");
        
    if(score > 0.7 && bars.size() < bars_limit) {
        println(name + " has a score of " + score + " and " + category);
        println(url);
        bars.add(new Bar(name, score, url));
        
        if(score > max_score) {
          max_score = score;
        }
    }
  }
  scale_chart_height();
  println("height factor " + height_factor);
}

void draw() {
  background(249, 248, 245);
  
  //Draw the chart space
  initChartSpace();
  
  //Draw characters bars
  drawBars();
  
  //Draw axis values
  drawAxisValues();
}

void drawArrow(float cx, float cy, int len, float angle){
  fill(0);
  beginShape();  
  pushMatrix();
  translate(cx, cy);
  rotate(radians(angle));
  line(len, 0, len - 8, -8);
  line(len, 0, len - 8, 8);
  line(len - 8, -8, len - 8, 8);
  popMatrix();
  endShape();
}

void initChartSpace() {
  line(margin_x, chart_y_origin, chart_x_origin, chart_y_top);
  drawArrow(margin_x,chart_y_top,8,270);
  
  line(margin_x, chart_y_origin, chart_x_top, chart_y_origin);
  drawArrow(chart_x_top,chart_y_origin,8,0);
}

void scale_chart_height() {
  //Linear scale factor
  height_factor = max_bar_height / max_score;
  
  //Set bars height & origins
  for(int i=0; i<bars.size(); i++) {
    Bar my_bar = bars.get(i);
    my_bar.setBarHeight();
    my_bar.setBarOrigins(i);
  }
}

void drawBars() {
  for(int i=0; i<bars.size(); i++) {
    Bar my_bar = bars.get(i);
    if(my_bar.getBarXOrigin() < mouseX && mouseX < my_bar.getBarXOrigin() + my_bar.getBarWidth() && my_bar.getBarYOrigin() < mouseY && mouseY < my_bar.getBarYOrigin() + my_bar.getBarHeight()) {
      my_bar.highlightBar(true);
    } else if(my_bar.getBarName().equals("Jon Snow")) {
      my_bar.highlightBar(false);
    } else {
      my_bar.normalBars();
    }
  }
}

float round2Nb(float value) {
  float round_value = Math.round(value*100);
  return round_value/100;
}

void drawAxisValues() {  
  //Define three axis values
  float round_max = round2Nb(max_score);
  float mid = round2Nb(0.5*max_score);
  float third_quarter = round2Nb(0.75*max_score);
  
  //Write values 
  fill(0, 0, 255);
  text(round_max, 55,bars.get(1).getBarYOrigin() + max_score*height_factor); 
  println(bars.get(7).getBarXOrigin() + max_score*height_factor);

  //Draw associated lines
}

class Bar {
  //Bar dimensions variables
  float bar_width = 20;
  float bar_height;
  
  float initial_origin = chart_x_origin + bar_space;
  float bar_x_origin;
  float bar_y_origin;
  
  //Character variables
  String char_name;
  PImage char_img;  // Declare a variable of type PImage
  float char_score;
  
  String getBarName() {
    return char_name;
  }
  
  float getBarHeight() {
    return bar_height;
  }
  
  float getBarWidth() {
    return bar_width;
  }
  
  float getBarXOrigin() {
    return bar_x_origin;
  }
  
  float getBarYOrigin() {
    return bar_y_origin;
  }
  
  void setBarHeight() {
    //Compute bar height with character score
    bar_height = char_score * height_factor;
  }
  
  void setBarOrigins(int number) {
    bar_x_origin = initial_origin + number*bar_width + number*bar_space;
    bar_y_origin = chart_y_origin - bar_height;
  }
  
  Bar(String tmpName, float tmpScore, String tmpUrl) {
    println("create a bar pls");
    char_name = tmpName;
    char_score = tmpScore;
    char_img = loadImage("pictures/" + tmpUrl + ".jpeg");  
  }

  void drawRect() {
    stroke(173,150,107);
    rect(bar_x_origin, bar_y_origin, bar_width, bar_height);
  }
  
  void normalBars() {
    fill(246,236,223);
    drawRect();     
    //image(char_img, bar_x_origin, bar_y_origin + bar_height + 10, bar_width*1.5, bar_width*1.5);
  }
  
  void highlightBar(boolean drawImg) {
    fill(71,55,35);
    pushMatrix();
    translate(bar_x_origin + bar_space/2, chart_y_origin - bar_height - bar_space*6);
    rotate(-PI/2.5);   
    text(char_name, 0, 0);
    popMatrix();
    drawRect();
    if(drawImg) {
      image(char_img, bar_x_origin - 2 * bar_width, bar_y_origin + bar_height + 20, bar_width*4.5, bar_width*4.5);
    }
  }
}
