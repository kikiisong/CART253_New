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
    createCanvas(640,480);

}


/**
 * Draw the walkman
*/
function draw() {
    drawBody();
    drawWalker();
    drawButtons();
    drawHeadphones();
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

function drawButtons()
{

}

function drawHeadphones()
{

}

