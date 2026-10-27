/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const canvasW = 500;
const canvasH = 600;

const face = {
    x: 250, 
    y: 250, 
    width: 260, 
    length: 300,
    fill: '#fbdccb'
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#ffb6fa");
    drawPerson();

}

function drawPerson()
{
    drawHead();
}

function drawHead() {
  push();
  noStroke();
  fill(face.fill);
  ellipse(face.x, face.y, face.width, face.length);
  pop();
}