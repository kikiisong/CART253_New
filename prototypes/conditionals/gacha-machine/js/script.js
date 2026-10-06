/**
 * Gacha Machine
 * Kiki
 * 
 * Try the gacha machine and see what you can get
 */

"use strict";

const knob = {
    x: 125,
    y: 305
}

/**
 * Set up canvas
*/
function setup() {
    createCanvas(500, 400);
}


/**
 * Draw components
*/
function draw() {
    background("#b3d8fd");
    drawMachine();

}

function drawMachine() {
    drawContainer();
    drawKnob();
}

function drawContainer() {
    push();
    // container
    fill("#d6f2fcc3");
    quad(30, 40, 220, 40, 190, 250, 60, 250);

    pop();

}

function drawKnob() {

    push();
    // base
    fill("#748fba");
    rect(50, 250, 150, 120, 10);

    // circle
    fill("#e2eff0");
    circle(knob.x, knob.y, 70);

    // handle
    fill("#e2eff0");
    rectMode(CENTER);
    rect(knob.x, knob.y, 52, 14, 7);

    pop();
}