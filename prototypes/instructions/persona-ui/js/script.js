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
    drawDarkerBlueBg();
    drawLighterBlueBg();
    drawBGOverlays();
    drawDay();
    drawMenu();
    drawRedDebris();
    drawTitle();
    drawProtagonist();
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

function drawLighterBlueBg()
{
    push();
    noStroke();
    fill("#2738aa");
    ellipse(800, 0, 850, 920);
    pop();
}

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
    quad(600, 90, 650, 100, 650, 340, 600, 300);
    quad(670, 105, 750, 120, 750, 390, 670, 345);
    quad(770, 125, 920, 105, 920, 420, 770, 400);
    quad(945, 105, 960, 100, 960, 425, 945, 420);
    pop();
}

function drawDay()
{

}

function drawMenu()
{

}

function drawRedDebris()
{

}

function drawTitle()
{

}

function drawProtagonist()
{

}