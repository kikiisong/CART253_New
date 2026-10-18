/**
 * Gacha Machine 2
 * Kiki
 * 
 * Gacha machine with physics and animation
 */

"use strict";
const canvasW = 400, canvasH = 600;
const machine = {
    topX: 70,
    topY: 320,
    width: 260,
    height: 240,
};

const capsule = {
    size: 20,
}

/**
 * Set up canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * Draw machine body
*/
function draw() {
    background('#403643');

    drawMachine();
}

function drawMachine() {
    push();
    noStroke();
    // body
    fill('#1f1759');
    rect(machine.topX,machine.topY, machine.width, machine.height, 24);
    // globe holder
    fill('#ffffa0');
    ellipse(canvasW/2, machine.topY+10, machine.width, 30);
    pop();
}