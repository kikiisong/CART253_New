/**
 * Choose Your Fighter
 * Kiki
 * 
 * Pick Your Fav!
 */

"use strict";

let frontImg;

const cartonMeasures = {
    boxWidth: 160,
    boxHeight: 180,
    boxDepth: 160,
    roofHeight: 90,
    extraHeight: 10
};

/**
 * Set up the canvas
*/
async function setup() {
    createCanvas(500, 600, WEBGL);
    angleMode(DEGREES);

    //load image
    frontImg = await loadImage("assets/images/melon_front.png");
}


/**
 * Draw components
*/
function draw() {
    background("#5fbcfa");
    //buttons to go to next/previous character
    drawArrows();
    orbitControl();
    //current character
    drawCharacter();
}

// draw left & right arrow
// on click, update the current character index
function drawArrows() {

}

// draw character based on current index
// one of the character is 3d and can be dragged 
function drawCharacter() {
    drawFront();
    drawBox();
    //drawRoof();
}

function drawFront(){
      let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;
        // Front
    push();
    textureMode(NORMAL);
    texture(frontImg);
    beginShape();
    vertex(-w / 2, -h / 2, d / 2, 0, 0);
    vertex(w / 2, -h / 2, d / 2, 1, 0);
    vertex(w / 2, h / 2, d / 2, 1, 1);
    vertex(-w / 2, h / 2, d / 2, 0, 1);
    endShape(CLOSE);
    pop();
}
function drawBox() {

    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;


    push();
    // Back
    fill("#ffffff");
    beginShape();
    vertex(w / 2, -h / 2, -d / 2);
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    vertex(w / 2, h / 2, -d / 2);
    endShape(CLOSE);

    // Left
    beginShape();
   fill("#98f17e");
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(-w / 2, -h / 2, d / 2);
    vertex(-w / 2, h / 2, d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    endShape(CLOSE);

    // Right
    beginShape();
    vertex(w / 2, -h / 2, d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    vertex(w / 2, h / 2, -d / 2);
    vertex(w / 2, h / 2, d / 2);
    endShape(CLOSE);

    // Bottom
    fill("#ffffff");
    beginShape();
    vertex(-w / 2, h / 2, d / 2);
    vertex(w / 2, h / 2, d / 2);
    vertex(w / 2, h / 2, -d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    endShape(CLOSE);
    pop();

}

function drawRoof() {
    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;
    let roofH = cartonMeasures.roofHeight;
    let extraH = cartonMeasures.extraHeight;

    push();
    // Front
    beginShape();
    vertex(-w / 2, -h / 2, d / 2);
    vertex(w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    endShape(CLOSE);

    // Back
    beginShape();
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    endShape(CLOSE);

    // Left
    beginShape();
    vertex(-w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    vertex(-w / 2, -h / 2, -d / 2);
    endShape(CLOSE);

    // Right
    beginShape();
    vertex(w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    endShape(CLOSE);

    // Little extra piece
    beginShape();
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH + extraH), d / 2);
    vertex(0, -(h / 2 + roofH + extraH), -d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    endShape(CLOSE);
    pop();
}

