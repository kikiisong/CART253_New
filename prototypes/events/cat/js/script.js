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

const state = {
    sitting: 'sitting',
    standing: 'standing'
}

const cat = {
    x: 300,
    y: 300,
    size: 140,
    facing: direction.right,
    color: '#FFFFFF',
    currentState: state.sitting
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
    if (cat.currentState === state.sitting) {
        drawCatSit();
    } else {
        drawCatStand();
    }
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
    // tail
    noFill();
    stroke(cat.color);
    strokeWeight(8);
    strokeCap(ROUND);
    bezier(-13, 18, -34, 26, -42, 8, -34, -12);
    pop();
}

function drawCatStand() {

    push();
    translate(cat.x, cat.y);
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    // body
    rect(-36, -28, 64, 30, 15);
    // legs
    rect(-32, -4, 8, 28, 4);
    rect(-20, -4, 8, 28, 4);
    rect(4, -4, 8, 28, 4);
    rect(16, -4, 8, 28, 4);
    // head
    ellipse(30, -38, 28, 24);
    // ears
    triangle(20, -44, 22, -62, 32, -48);
    triangle(30, -48, 40, -62, 42, -42);
    // tail
    noFill();
    stroke(cat.color);
    strokeWeight(8);
    strokeCap(ROUND);
    bezier(-34, -18, -56, -18, -60, -40, -50, -54);
    pop();
}

function mousePressed() {
    if (cat.currentState === state.sitting) {
        cat.currentState = state.standing;
    } else {
        cat.currentState = state.sitting;
    }
}