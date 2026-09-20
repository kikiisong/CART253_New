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
    fill("#C0C0C0");
    rect(100,50,500,300);
    pop();
}

function drawWalker()
{


}

function drawButtons()
{

}

function drawHeadphones()
{

}

