/**
 * Instruction Challenge
 * Kiki
 * 
 * A Landscape drawing made with p5 library
 */

"use strict";

/**
 * Set up Canvas
*/
function setup() {
    createCanvas(480, 640);
}


/**
 * Draw a romantic scenenary for a Scrub-Date
*/
function draw() {

    background("#5399f4");

    drawClouds();

    drawPointySparkle(50,170,6,30,"#fce3fc");
    drawPointySparkle(130,130,8,40,"#fce3fc");
    drawPointySparkle(240,100,10,50,"#fce3fc");
    drawPointySparkle(350,130,8,40,"#fce3fc");
    drawPointySparkle(430,170,6,30,"#fce3fc");

    drawLand();
    drawScrubDaddy();
    drawScrubMommy();
   
}

/**
 * A gradient-ish land
 */
function drawLand()
{
    push();
    noStroke();
    fill("#35270d");
    rect(0, 420, 480, 100);
    fill("#251c0c");
    rect(0, 520, 480, 80);
    fill("#14100a");
    rect(0, 600, 480, 100);
    pop();
}

/**
 * Pink Clouds made by ellipse
 */
function drawClouds()
{
    push();
    fill("#ffa4f6");
    noStroke();
    ellipse(50, 200, 150, 150);
    ellipse(120, 190, 150, 150);
    ellipse(190, 192, 155, 155);
    ellipse(280, 200, 142, 142);
    ellipse(350, 210, 159, 159);
    ellipse(440, 200, 150, 150);

    fill("#fc6fee");
    ellipse(30, 110, 90, 90);
    ellipse(100, 130, 90, 90);
    ellipse(160, 110, 70, 70);
    ellipse(280, 135, 80, 80);
    ellipse(335, 150, 70, 70);
    ellipse(460, 130, 90, 90);
    

    pop();
}

/**
 * An arch made with Sparkles
 */
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
    drawBody("#fdf931", 350, 430);
    drawEyes();
    drawMouth();

    
}

function drawScrubMommy()
{
    drawBody("#f64a9a", 130, 400);
    drawMommyEyes();
    drawMommyMouth();

    
}

function drawBody(scrubColor, posX, posY)
{
    push();
    noStroke();
    fill(scrubColor);
    ellipse(posX, posY, 150, 150);
    pop();
}

function drawEyes()
{
    push();
    fill("#5399f4");
    noStroke();
    ellipse(380, 410, 30, 30);
    ellipse(320, 410, 30, 30);
    pop();
}

function drawMommyEyes()
{
    push();
    fill("#5399f4");
    noStroke();
    ellipse(165, 380, 30, 30);
    ellipse(105, 380, 30, 30);
    pop();
}

function drawMouth()
{
    push();
    noFill();
    stroke("#35270d");
    strokeWeight(10);
    arc(350, 400, 120, 150, 0.3*PI, 0.7*PI);
    pop();
}

function drawMommyMouth()
{
    push();
    noFill();
    stroke("#35270d");
    strokeWeight(10);
    arc(130, 370, 120, 150, 0.3*PI, 0.7*PI);
    pop();
}
