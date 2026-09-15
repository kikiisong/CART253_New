/**
 * Instruction Challenge
 * Kiki
 * 
 * A Landscape drawing made with p5 library
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    background("#5399f4");

    drawPointySparkle(50,170,6,30,"#fce3fc");
    drawPointySparkle(130,130,8,40,"#fce3fc");
    drawPointySparkle(240,100,10,50,"#fce3fc");
    drawPointySparkle(350,130,8,40,"#fce3fc");
    drawPointySparkle(430,170,6,30,"#fce3fc");

    drawLand();
    drawScrubDaddy();
   
}

function drawLand()
{
    push();
    noStroke();
    fill("#35270d");
    rect(0, 420, 480, 220);
    pop();
}

function drawPointySparkle(xPos, yPos, innerRad, outerRad, spColor)
{
    push();
    stroke("#f9f3cd", 0.5);
    strokeWeight(4);
    fill(spColor);
    //oOOH so translation can also be pushed and popped
    translate(xPos, yPos);
    beginShape();
    //Took me some mind gymnastics to understand this part from the p5 tutorial
    //It's so intuitive if I just drew it by hand once but it looked so foreign when everything is in code
    //innerRad(ius) are the inward points, and they are like the 4 points of a square
    // outerRad(ius) are the pointy points
    // I'm drawing it differently (counter-clockwise) to make sure I did understand (produced some weird shapes along the way haha)
    vertex(-innerRad, innerRad);
    vertex(-outerRad, 0);
    vertex(-innerRad, -innerRad);
    vertex(0, -outerRad);
    vertex(innerRad, -innerRad);
    vertex(outerRad, 0);
    vertex(innerRad, innerRad);
    vertex(0, outerRad);
    endShape(CLOSE);
    pop();
}

function drawScrubDaddy()
{
    
}
