/**
 * Mushrooooom
 * Kiki
 * 
 * Collect the yummy mushrooms!
 */

"use strict";

const canvasW = 400;
const canvasH = 600;

const character = {
    x: canvasW / 2,
    y: canvasH - 15,
    speed: 2,
    r: 30
}

const mushroom = {
    x: canvasW/2,
    y: canvasH/2,
    toUpdate: false,
    r:15
}

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(400, 600);
}


/**
 * Draw components
*/
function draw() {
    background("#31342f");

    drawInstructions();
    moveCharacter();
    drawCharacter();
    drawMushroom();
    checkCollision();
}

function drawInstructions()
{
    push();
    fill("#ffffff")
    text("Use arrow keys to move around", 10, 10);
    pop();
}

// use arrow keys to control the character
function moveCharacter() {
    if (keyIsDown(UP_ARROW)) 
        character.y = constrain(character.y - character.speed, 0, canvasH);
    else if (keyIsDown(DOWN_ARROW)) 
        character.y = constrain(character.y + character.speed, 0, canvasH);
    else if (keyIsDown(LEFT_ARROW)) 
        character.x = constrain(character.x - character.speed, 0, canvasW);
    else if (keyIsDown(RIGHT_ARROW)) 
        character.x = constrain(character.x + character.speed, 0, canvasW);
}

/**
 * Draw the character
 * a purple cirle for now
 */
function drawCharacter() {
    push();
    fill("#8571fb");
    noStroke();
    circle(character.x, character.y, character.r);
    pop();
}

// Draw the mushroom
// a red circle for now
function drawMushroom() {
    if(mushroom.toUpdate)
    {
        mushroom.x = random(10, canvasW);
        mushroom.y = random(10, canvasH);
        mushroom.toUpdate = false;
    }

    push();
    fill("#7d2020");
    noStroke();
    circle(mushroom.x, mushroom.y, mushroom.r);
    pop();
}

function checkCollision()
{
    if(dist(mushroom.x, mushroom.y, character.x, character.y) < mushroom.r)
    {
        mushroom.toUpdate = true;
    }
}