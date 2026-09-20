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
    drawLighterBlueBg();
    drawDarkerBlueBg();
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
    noFill();
    stroke("#79d7fd");
    strokeWeight(4);  
    rect(0, 0, 960, 540);
}