/**
 * CAT
 * Kiki
 * 
 * CAT
 */

"use strict";

const canvasW = 500;
const canvasH = 700;
const bgColor = '#000000';

const direction = {
    left: 'left',
    right: 'right'
};

const cat = {
    x: 300,
    y: 300,
    size: 140,
    facing: direction.right,
    color: '#FFFFFF'
}

/**
 * create canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * draw cat
*/
function draw() {
    background(bgColor);
    drawCatSit();
}

function drawCatSit() {

    push();
    translate(cat.x, cat.y);
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    //nody
    rect(-15, -36, 30, 60, 30, 30, 10, 10);
    // head
    ellipse(6, -50, 30, 26);
    // ears
    triangle(-6, -56, -3, -76, 8, -62);
    triangle(6, -62, 16, -76, 19, -54);
    //tail
    noFill();
    stroke(cat.color);
    strokeWeight(8);
    strokeCap(ROUND);
    bezier(-13, 18, -34, 26, -42, 8, -34, -12);
    pop();
}