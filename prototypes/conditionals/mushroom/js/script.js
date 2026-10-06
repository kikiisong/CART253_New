/**
 * Walk Walk Walk
 * Kiki
 * 
 * Collect the yummy mushrooms and avoid the poisonous ones!
 */

"use strict";

const canvasW = 400;
const canvasH = 600;

const character = {
    x: canvasW/2,
    y: canvasH - 15
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
    drawCharacter();
    drawMushroom();
}

function drawCharacter()
{
    push();
    fill("#8571fb");
    circle(character.x, character.y, 30);
    pop();
}

function keyPressed() {
    //up
  if (keyCode === 38) {
    character.y-=2;
    console.log("up");
  }

  //down
  if (keyCode === 40) { // Enter key
    // Code to run.
  }

  //left
   if (keyCode === 37) { // Enter key
    // Code to run.
  }

  //right
   if (keyCode ===39) { // Enter key
    // Code to run.
  }
}

function drawMushroom()
{

}