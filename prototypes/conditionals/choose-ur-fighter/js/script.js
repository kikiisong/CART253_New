/**
 * Choose Your Fighter
 * Kiki
 * 
 * Pick Your Fav!
 */

"use strict";

let frontImg = undefined;

const cartonMeasures = {
    boxWidth: 160,
    boxHeight: 180,
    boxDepth: 160,
    roofHeight:90,
    extraHeight: 10
};

//load images
async function preload() {
    console.log("preloaded");
    frontImg = await loadImage(
    "assets/images/melon_front.png",
    () => console.log("LOADED"),
    () => console.log("FAILED")
  );
}

/**
 * Set up the canvas
*/
async function setup() {
    createCanvas(500, 600, WEBGL);
    angleMode(DEGREES);
    await preload();
}


/**
 * Draw components
*/
function draw() {
    console.log(frontImg);
    console.log(frontImg.width, frontImg.height);
    background("#5fbcfa");
    image(frontImg, 0, 0);
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

        let carton = buildGeometry(() => {
        //Body
        box(cartonMeasures.boxWidth, cartonMeasures.boxHeight, cartonMeasures.boxDepth);

        texture(frontImg);
        beginShape();
        vertex(-cartonMeasures.boxWidth/2, cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2,0,1);
        vertex(cartonMeasures.boxWidth/2, cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2,1,1);
        vertex(cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2,1,0);
        vertex(-cartonMeasures.boxWidth/2, -cartonMeasures.boxHeight/2, cartonMeasures.boxDepth/2,0,0);
        endShape(CLOSE);


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

