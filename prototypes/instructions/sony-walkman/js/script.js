/**
 * SONY Walkman
 * Kiki
 * 
 * Drawing Of a SONY Walkman
 */

"use strict";

/**
 * Set up canvas
*/
function setup() {
    createCanvas(640,640);

}


/**
 * Draw the walkman
*/
function draw() {
    //resized canvas to increase height, translate the drawing to avoid change individual coordianates
    translate(-20, 250);
    //draw parts
    drawBackground();
    drawHeadphoneHandle();
    drawBody();
    drawWalker();
    drawButtons();
    drawHeadphones();
}

function drawBackground()
{
    background("#4563b6");
    push();
    noStroke();
    fill("#fcd52b")
    ellipse(340, 300, 800, 800);
    pop();
}

/**
 * Silver(Grey top) and blue bottom
 */
function drawBody()
{
    push();
    noStroke();
    //draw top
    fill("#C0C0C0");
    rect(100,50,500,70);
    //draw bottom
    fill("#4563b6");
    rect(100,120,500,230);
    //draw dividing line
    stroke("#141822")
    line(180,120,180,350);
    pop();
}

/**
 * The walker part
 */
function drawWalker()
{
    push();
    noStroke();
    //walker background, round corner yayyy
    fill("#1b1d23");
    rect(260,180,260,120,5);
    //walkers
    stroke("#eabd55")
    strokeWeight(3);
    ellipse(310,240,38,38);
    ellipse(470,240,38,38);
    //walker middle background
    noStroke();
    fill("#ebebed");
    rect(340,215,100,50,10);
    pop();

}

/**
 * Silver button on the top and orange button on the side
 */
function drawButtons()
{
    push();
    stroke("#f7f7f8");
    //top button
    fill("#C0C0C0");
    rect(140,40, 60, 13);
    //side button
    fill("#e47322");
    rect(85, 240, 15, 40);
    pop();
}

/**
 * draw handle seperately so it's the bottom layer
 */
function drawHeadphoneHandle()
{
    push();
    noFill();
    stroke("#2d190d");
    strokeWeight(5);
    arc(350, 50, 590,550, PI-QUARTER_PI, TWO_PI+QUARTER_PI);
    pop();
}

/**
 * Headphones with orange ear cushions and black handle
 */
function drawHeadphones()
{
    push();
    //ear cushions
    noStroke();
    fill("#2d190d");
    arc(85, 175, 40, 70, HALF_PI, 3*HALF_PI);
    arc(610, 175, 40, 70, -HALF_PI, HALF_PI);
    fill("#ce783b");
    rect(80, 110, 26, 130, 120);
    rect(590, 110, 26, 130, 100);
    pop();
}

