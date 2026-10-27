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
    color: '#FFFFFF',
    currentState: yourState.down,
    stateStart: null,
    safeInterval: 200,
    hpLoss: 2
}

const bed = {
    x: 560,
    y: 274,
    color: '#ffffff'
};

const UI = {
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
    setCatState(catState.sitting);
    setYourState(yourState.up);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(bgColor);

    // check & update state first
    updateState();
    // draw accordingly
    drawCat();
    drawBedPerson();
    drawUI();
}

function drawCat() {
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

function updateState() {
    const elapsedCat = millis() - cat.stateStart;
    if (elapsedCat > cat.stateDuration) {
        setCatState(random(catStates));
    }

    const elapsedYou = millis() - you.stateStart;
    if (elapsedYou > you.safeInterval) {
        if (you.currentState === yourState.down) {
            you.hp -= you.hpLoss;
            you.hp = constrain(you.hp, 0, 100);
            setYourState(yourState.down);
        } else {
            you.hp += you.hpLoss;
            you.hp = constrain(you.hp, 0, 100);
            setYourState(yourState.up);
        }
    }
}

// set cat's state
function setCatState(newState) {
    cat.currentState = newState;
    cat.stateStart = millis();
    cat.stateDuration = random(1000, 3000);
}

// set your state
function setYourState(newState) {
    you.currentState = newState;
    you.stateStart = millis();
}

function drawUI() {
    push();
    noFill();
    strokeWeight(2);
    stroke(UI.hpBar.color);
    rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length, UI.hpBar.height);

    noStroke();
    fill(UI.hpBar.color);
    rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length * (you.hp / 100), UI.hpBar.height);
    pop();
}

function drawBedPerson() {

    push();
    translate(bed.x, bed.y);
    noStroke();
    fill(bed.color);

    // frame: base, footboard, headboard
    rect(0, -34, 260, 22, 4);
    rect(0, -64, 12, 64, 4);
    rect(256, -124, 14, 124, 4);

    // mattress
    rect(10, -56, 256, 22, 6);

    // pillow
    rect(186, -64, 66, 10, 10);

    if (you.currentState === yourState.up) {
        // torso
        rect(180, -120, 42, 70, 16);
        // head
        ellipse(191, -136, 36, 34);
        // comforter
        rect(14, -72, 168, 36, 16);
    } else {
        // head
        ellipse(215, -80, 36, 34);
        // comforter
        rect(14, -72, 193, 36, 16);
    }
    pop();
}

function mousePressed() {
    if (you.currentState === yourState.down) {
        setYourState(yourState.up);
    } else {
        setYourState(yourState.down);
    }
}