/**
 * CAT
 * Kiki
 * 
 * CAT Always Wins
 */

"use strict";

// canvas measurements
const canvasW = 900;
const canvasH = 300;
const bgColor = '#000000';
let gameEnd = false;

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
// some properties are from previous prototype & for walking animation, which is yet to implement in this version
const cat = {
    x: 300,
    y: 250,
    size: 140,
    facing: direction.right,
    color: '#FFFFFF',
    currentState: catState.sitting,
    stateStart: null,
    stateDuration: null,
    stateDurationMax: 1100,
    stateDurationMin: 800,
    step: 1,
    speed: 200,
    dist: 20,
    walk1: true // if cat is in walk 1 pose or walk 2, for animation
}

// player states
const yourState = {
    down: 'down',
    up: 'up'
}

// player metadata
const you = {
    x: 800,
    y: 300,
    hp: 80,
    color: '#FFFFFF',
    currentState: yourState.down,
    stateStart: null,
    safeInterval: 200, // the speed of hp loss
    hpLossDown: 2, // hp loss while staying down
    hpLossCat: 5, // hp loss if cat saw you
    cursed: false // you were up and faced the cat once, you need to lie down again to clear the status & able to gain back hp while up again
}

// bed metadata
const bed = {
    x: 560,
    y: 274,
    color: '#ffffff'
};

// UI metadata
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
 * Set up the canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
    //also sets up the initial values of states
    cat.stateDuration = random(cat.stateDurationMin, cat.stateDurationMax);
    setCatState(catState.sitting);
    setYourState(yourState.down);
}


/**
 * Draw the components
*/
function draw() {
    background(bgColor);

    // if not game over, check states and draw everything
    if (!gameEnd) {
        // check & update state first
        updateState();
        // draw accordingly
        drawCat();
        drawBedPerson();
    }
    drawUI();
}

/**
 * Draw Cat (refactored)
 */
function drawCat() {
    push();
    // make everything relative to the cat's position
    translate(cat.x, cat.y);
    // flip if facing left
    scale(cat.facing === direction.left ? -1 : 1, 1);

    noStroke();
    fill(cat.color);

    
    if (cat.currentState === catState.sitting) {// sitting
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
    } else { //standing or walking
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
        if (cat.currentState === catState.standing) {// standing
            // legs
            line(-30, -4, -30, 20);
            line(-17, -4, -17, 20);
            line(6, -4, 6, 20);
            line(18, -4, 18, 20);
        } else if (cat.currentState === catState.walking) { // walking
            // legs, front crossed
            line(-28, -4, -38, 20);
            line(-16, -4, -6, 20);
            line(8, -4, 18, 20);
            line(20, -4, 10, 20);
        }
    }
    pop();
}

/**
 * Update cat and player status
 */
function updateState() {
    // check elapsed time
    const elapsedCat = millis() - cat.stateStart;
    // randomly change cat status
    if (elapsedCat > cat.stateDuration) {
        setCatState(random(catStates));
    }

    // if cat facing player (facing right), player gets cursed, more hp lost
    // can remove curse debuff by going back down
    if (cat.facing === direction.right && you.currentState === yourState.up)
    {
        you.cursed = true;
    }
    // check elapsed time
    const elapsedYou = millis() - you.stateStart;
    // hp loss/gain if one interval
    if (elapsedYou > you.safeInterval) {
        if (you.currentState === yourState.down) {// down = constantly lose small hp
            you.hp -= you.hpLossDown;
            you.hp = constrain(you.hp, 0, 100);
            setYourState(yourState.down);
        } else {
            if (you.cursed) { // cursed = constantly lose more hp
                you.hp -= you.hpLossCat;
            } else { // up & not cursed = constantly gain small hp
                you.hp += you.hpLossDown;
            }
            // hp stays in 0-100
            you.hp = constrain(you.hp, 0, 100);
            setYourState(yourState.up);
        }
    }
    // game end if 0 hp
    if (you.hp === 0) {
        gameEnd = true;
    }
}

// set cat's state
function setCatState(newState) {
    cat.currentState = newState;
    // refresh state start time
    cat.stateStart = millis();
    // refresh state duration
    cat.stateDuration = random(cat.stateDurationMin, cat.stateDurationMax);
    // refresh cat's facing direction
    cat.facing = random([direction.left, direction.right]);
}

// set your state
function setYourState(newState) {
    you.currentState = newState;
    // refresh state start time
    you.stateStart = millis();
    // recover cursed debuff
    if (newState === yourState.down)
    {
        you.cursed = false;
    }
}

/**
 * Draw UI
 */
function drawUI() {
    push();

    if (!gameEnd) { // show hp bar
        noFill();
        strokeWeight(2);
        stroke(UI.hpBar.color);
        rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length, UI.hpBar.height);

        noStroke();
        fill(UI.hpBar.color);
        rect(UI.hpBar.x, UI.hpBar.y, UI.hpBar.length * (you.hp / 100), UI.hpBar.height);
    } else { // game over screen
        fill('#ffffff');
        textAlign(CENTER, CENTER);

        textSize(48);
        text('Oops...You Lost...', width / 2, height / 2 - 10);

        textSize(16);
        text('CAT Always Wins', width / 2, height / 2 + 35);
    }

    pop();
}

/**
 * Draw player on the bed
 */
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

    if (you.currentState === yourState.up) { // player up
        // torso
        rect(180, -120, 42, 70, 16);
        // head
        ellipse(191, -136, 36, 34);
        // comforter
        rect(14, -72, 168, 36, 16);
    } else { // player down
        // head
        ellipse(215, -80, 36, 34);
        // comforter
        rect(14, -72, 193, 36, 16);
    }
    pop();
}

/**
 * mouse clicked = change player state
 */
function mousePressed() {
    if (you.currentState === yourState.down) {
        setYourState(yourState.up);
    } else {
        setYourState(yourState.down);
    }
}