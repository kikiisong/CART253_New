/**
 * Choose Your Fighter
 * Kiki
 * 
 * Pick Your Fav!
 */

"use strict";

const cartonMeasures = {
    boxWidth: 160,
    boxHeight: 180,
    boxDepth: 160,
    roofHeight:90,
    extraHeight: 10
};

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(500, 600, WEBGL);
    angleMode(DEGREES);
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
function drawArrows()
{

}

// draw character based on current index
// one of the character is 3d and can be dragged 
function drawCharacter()
{
    drawPyramid();
}

function drawPyramid()
{
    /*beginShape();
    vertex(pyramid.centerX - pyramid.baseSizeHalf, pyramid.centerY, pyramid.centerZ-pyramid.baseSizeHalf);
    vertex(pyramid.centerX, pyramid. centerY - pyramid.height, pyramid.centerZ);
    vertex(pyramid.centerX + pyramid.baseSizeHalf, pyramid. centerY, pyramid.centerZ-pyramid.baseSizeHalf);
    endShape();*/

        let carton = buildGeometry(() => {
        //Body
        box(cartonMeasures.boxWidth, cartonMeasures.boxHeight, cartonMeasures.boxDepth);

        //Roofs
        //front
    beginShape();
    vertex(-cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2);
    vertex(cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), cartonMeasures.boxDepth/2);
    endShape(CLOSE);

    //back
    beginShape();
    vertex(-cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, -cartonMeasures.boxDepth/2);
    vertex(cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, -cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), -cartonMeasures.boxDepth/2);
    endShape(CLOSE);

    //left
    beginShape();
    vertex(-cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), -cartonMeasures.boxDepth/2);
    vertex(-cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, -cartonMeasures.boxDepth/2);
    endShape(CLOSE);

    //right
    beginShape();
    vertex(cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), -cartonMeasures.boxDepth/2);
    vertex(cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, -cartonMeasures.boxDepth/2);
    endShape(CLOSE);

    //little extra piece
    beginShape();
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight+cartonMeasures.extraHeight), cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight+cartonMeasures.extraHeight), -cartonMeasures.boxDepth/2);
    vertex(0, -(cartonMeasures.boxHeight/2+cartonMeasures.roofHeight), -cartonMeasures.boxDepth/2);
    endShape(CLOSE);

    });

    model(carton);
}

