/**
 * CAT
 * Kiki
 * 
 * CAT
 */

"use strict";

// canvas measurements
const canvasW = 500;
const canvasH = 700;
const bgColor = '#000000';

// global control boolean
let mouseInside = false;

// directions cat could be facing
const direction = {
    left: 'left',
    right: 'right'
};

// states of the cat
const state = {
    sitting: 'sitting',
    standing: 'standing',
    walking: 'walking'
}

// cat metadata
const cat = {
    x: 300,
    y: 300,
    size: 140,
    facing: direction.right,
    color: '#FFFFFF',
    currentState: state.sitting,
    stateStart: null,
    step: 1,
    speed: 200,
    dist: 20,
    walk1: true // if cat is in walk 1 pose or walk 2, for animation
}


/**
 * create canvas
*/
function setup() {
    const c = createCanvas(canvasW, canvasH);
    c.mouseOver(() => { mouseInside = true; });
    c.mouseOut(() => { mouseInside = false; });
}


/**
 * draw cat
*/
function draw() {
    background(bgColor);

    // check & update state first
    updateState();
    // draw accordingly
    if (cat.currentState === state.sitting) {
        drawCatSit();
    } else if (cat.currentState === state.standing) {
        drawCatStand();
    } else {
        // walking animation
        if (cat.walk1)
            drawCatWalk1();
        else
            drawCatWalk2();
    }
}

/**
 * draw cat sitting
 */
function drawCatSit() {

    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    // body
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

/**
 * draw cat sitting
 */
function drawCatStand() {

    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
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

/**
 * draw cat walking pose 1
 */
function drawCatWalk1() {

    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    // body
    rect(-36, -28, 64, 30, 15);
    // head
    ellipse(30, -38, 28, 24);
    // ears
    triangle(20, -44, 22, -62, 32, -48);
    triangle(30, -48, 40, -62, 42, -42);

    noFill();
    stroke(cat.color);
    strokeWeight(8);
    strokeCap(ROUND);
    // legs, front crossed
    line(-28, -4, -38, 20);
    line(-16, -4, -6, 20);
    line(8, -4, 18, 20);
    line(20, -4, 10, 20);
    // tail
    bezier(-34, -18, -56, -18, -60, -40, -50, -54);
    pop();
}

/**
 * draw cat walking pose 2
 */
function drawCatWalk2() {

    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    // body
    rect(-36, -28, 64, 30, 15);
    // head
    ellipse(30, -38, 28, 24);
    // ears
    triangle(20, -44, 22, -62, 32, -48);
    triangle(30, -48, 40, -62, 42, -42);

    noFill();
    stroke(cat.color);
    strokeWeight(8);
    strokeCap(ROUND);
    // legs, back crossed
    line(-28, -4, -18, 20);
    line(-16, -4, -26, 20);
    line(8, -4, -2, 20);
    line(20, -4, 30, 20);
    // tail
    bezier(-34, -18, -56, -18, -60, -36, -52, -50);
    pop();
}

// set state
function setState(newState) {
    cat.currentState = newState;
    cat.stateStart = millis();
}

// update state
function updateState() {
    const dx = mouseX - cat.x;
    const dy = mouseY - cat.y;
    const distance = dist(mouseX, mouseY, cat.x, cat.y);
    // cat walks if mouse is inside the canvas and far enough from the cat
    const wantsToWalk = mouseInside && distance > cat.dist;

    // update the direction if needed
    if (wantsToWalk && Math.abs(dx) > 5) {
        cat.facing = dx < 0 ? direction.left : direction.right;
    }

    // if cat wants to walk, they go from (sitting -> )standing -> walking
    if (wantsToWalk) {
        if (cat.currentState === state.sitting)
            setState(state.standing);
        else if (cat.currentState === state.standing)
            setState(state.walking);
        else {
            // gets the direction/velocity the cat wants to walk towards
            const stepX = dx / distance * cat.step;
            const stepY = dy / distance * cat.step;
            // move
            cat.x += stepX;
            cat.y += stepY;
            // alternating between walking poses
            if (millis() - cat.stateStart >= cat.speed) {
                cat.walk1 = !cat.walk1;
                cat.stateStart = millis();
            }
        }
    }
    else {
        // if cat does not want to talk, they go from (walking ->)standing -(2s later and still does not want to)-> sitting
        if (cat.currentState === state.walking)
            setState(state.standing);
        else if (cat.currentState === state.standing) {
            const elapsed = millis() - cat.stateStart;
            if(elapsed > 2000)
                setState(state.sitting);
        }
    }
}

