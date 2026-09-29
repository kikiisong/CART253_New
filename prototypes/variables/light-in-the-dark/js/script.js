/**
 * Light In The Dark
 * Kiki
 * 
 * Move the torchlight around and illuminate ur surrondings
 */

"use strict";

const torch = {
    size: 50
};

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(700, 700);
}


/**
 * Set up the torchlight
*/
function draw() {
    background("#000000");
    torchlight();
}

function torchlight()
{
    push();
    fill(255,255,255);
    circle(mouseX, mouseY, 50, 50)
    pop();
}