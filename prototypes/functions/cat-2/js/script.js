/**
 * CAT
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// canvas measurements
const canvasW = 900;
const canvasH = 300;
const bgColor = '#000000';

// directions cat could be facing
const direction = {
    left: 'left',
    right: 'right'
};

// states of the cat
const catState = {
    sitting: 'sitting',
    standing: 'standing',
    walking: 'walking'
}

const catStates = [catState.sitting, catState.standing, catState.walking];

// cat metadata
const cat = {
    x: 300,
    y: 250,
    size: 140,
    facing: direction.right,
    color: '#FFFFFF',
    currentState: catState.sitting,
    stateStart: null,
    stateDuration: null,
    step: 1,
    speed: 200,
    dist: 20,
    walk1: true // if cat is in walk 1 pose or walk 2, for animation
}

const yourState = {
    down: 'down',
    up: 'up'
}

const you = {
    x: 800,
    y: 300,
    hp: 80,
    color:'#FFFFFF',
    currentState: yourState.down
}

const UI ={
    hpBar: {
        x: 500,
        y: 20,
        color: '#FFFFFF',
        length: 200,
        height: 20
    }
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(canvasW, canvasH);
    cat.stateDuration = random(1000, 3000);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(bgColor);

    // check & update state first
    updateState();
    // draw accordingly
    drawCat(cat.currentState);
    drawUI();
}

function drawCat(currentState) {
    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    if (cat.currentState === catState.sitting) {
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
    } else {
        // body
        rect(-36, -28, 64, 30, 15);
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
        if (cat.currentState === catState.standing) {
            // legs
            line(-30, -4, -30, 20);
            line(-22, -4, -22, 20);
            line(6, -4, 6, 20);
            line(18, -4, 18, 20);      
        } else if (cat.currentState === catState.walking) {
            // legs, front crossed
            line(-28, -4, -38, 20);
            line(-16, -4, -6, 20);
            line(8, -4, 18, 20);
            line(20, -4, 10, 20);
        }
    }
    pop();
}

function updateState(){
    const elapsed = millis() - cat.stateStart;
    if(elapsed > cat.stateDuration)
    {
        setState(random(catStates));
    }
}

// set state
function setState(newState) {
    cat.currentState = newState;
    cat.stateStart = millis();
    cat.stateDuration = random(1000, 3000);
}

function drawUI(){
    push();
    noFill();
    strokeWeight(2);
    stroke(UI.hpBar.color);
    rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length, UI.hpBar.height);
    
    noStroke();
    fill(UI.hpBar.color);
    rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length * (you.hp/ 100), UI.hpBar.height);
    pop();
}