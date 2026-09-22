/**
 * Persona 3 UI
 * Kiki
 * 
 * Replicating one of Persona 3's UI Design
 */

"use strict";

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(960, 540);
}


/**
 * Drawing components
*/
function draw() {
    drawOutline();
    drawTitle();
    drawDarkerBlueBg();
    drawLighterBlueBg();
    drawBGOverlays();
    drawDay();
    drawMenu();
}

/**
 * draw an outline to make the canvas area more obvious
 */
function drawOutline()
{
    push();
    noFill();
    stroke("#79d7fd");
    strokeWeight(4);  
    rect(0, 0, 960, 540);
    pop();
}

/**
 * Draw top layer of the background cutout
 */
function drawLighterBlueBg()
{
    push();
    noStroke();
    fill("#2738aa");
    ellipse(800, 0, 850, 920);
    pop();
}

/**
 * Draw bottom layer of the background cutout
 */
function drawDarkerBlueBg()
{
    push();
    noStroke();
    fill("#18215f");
    ellipse(800, 0, 1000, 920);
    pop();
}

/**
 * Some random translucent shapes to add texture
 */
function drawBGOverlays()
{
    push();
    noStroke();
    fill("#18225f82");
    quad(420, 90, 510, 90, 510, 300, 420, 160);
    quad(520, 90, 590, 90, 590, 300, 520, 300);
    quad(600, 90, 650, 100, 650, 340, 600, 300);
    quad(670, 105, 750, 120, 750, 390, 670, 345);
    quad(770, 125, 920, 105, 920, 420, 770, 400);
    quad(945, 105, 960, 100, 960, 425, 945, 420);
    pop();
}

/**
 * Draw the date text
 */
function drawDay()
{
    push();
    noStroke();
    textFont('Verdana');
    fill("#727485");
    textSize(250);
    text("9", 400, 120);
    pop();
}

/**
 * Draw a few menu items
 */
function drawMenu()
{
    push();
    noStroke();
    fill("#a10f0f61");
    triangle(610, 60, 895, 55, 856, 125);
    fill("#ffffff");
    triangle(620, 70, 890, 60, 850, 120);
    rotate(radians(4));
    fill("#92e6ff");
    textSize(36);
    textFont('Verdana');
    text("CONFIG",680, 70);
    //Change the blend mode to have that part red part black effect
    blendMode(MULTIPLY); 
    fill("#f72121");
    textSize(40);
    rotate(radians(-6));
    text("TUTORIAL",650, 120);

    blendMode(BLEND);
    rotate(radians(-1));
    textSize(36);
    fill("#42c8ed");
    text("DICTIONARY", 660, 200);

    rotate(radians(10));
    textSize(35);
    fill("#1f8fe9");
    text("LOAD DATA", 720, 100);

    pop();
}

/** draw the title text along a circle
 * mostly taken from an example code with some parameter tweaking
 * the math is a bit intense for the current me ;;
 */
function drawTitle()
{
    push();
    var message = "SYSTEM";
    textAlign(CENTER);
    textSize(250);
    var msgWidth = textWidth(message);

    translate(780, 0);
    rotate(PI/7);
    var msgWidth2 = 0;
    for (var j = message.length;j>=0; j--)  {
    // Instead of a constant width, we check the width of each character.
    var currentChar2 = message.charAt(j);
    var w2 = textWidth(currentChar2);
      msgWidth2 = msgWidth2+w2;
      
    }
  
  // We must keep track of our position along the curve
  var arclength = 0-msgWidth2/2;

  
  // For every box
    for (var i = message.length;i>=0; i--)  {
    // Instead of a constant width, we check the width of each character.
    var currentChar = message.charAt(i);
    var w = textWidth(currentChar);
    var r = 635;

    // Each box is centered so we move half the width
    arclength += w/2;
    // Angle in radians is the arclength divided by the radius
    // Starting on the left side of the circle by adding PI
    var theta = PI/2 + arclength / r;    

    push();
    // Polar to cartesian coordinate conversion
    translate(r*cos(theta), r*sin(theta));
    // Rotate the box
    rotate(theta+PI*1.5); // rotation is offset by 90 degrees
    // Display the character
      noStroke();

    fill("#000000");
    text(currentChar,0,0);
    pop();
    // Move halfway again
    arclength += w/2;
  }

    pop();
}
