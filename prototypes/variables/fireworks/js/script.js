/**
 * Fireworks
 * Kiki
 * 
 * Loop of a fireworks animation
 */

"use strict";

const canvasH = 900;
const canvasW = 600; 
let stemLength = 100;
let deltaStemLength = 10;
let stemGap = 10;
let stemYBottom = canvasH;
let stemYTop = stemYBottom-stemLength;
let speedControl = 30;
let speedCounter = 0;

let flowerCenterY = 200;
let flowerSizeMax = 20;
let flowerSizeMin = 3
let flowerInnerRadius = 10;
let flowerOuterRadius = 20;
const numPetals = 10; 

let stemYStop = flowerCenterY;


/**
 * Set up the canvas
*/
function setup() {
    createCanvas(canvasW,canvasH);
}


/**
 * Draw the animation
*/ 
function draw() {
    background("#1b1d21");

    //only draw stem before it reaches the flower
    if(stemYTop>=flowerCenterY)
    {
        stemAnimation();
    }
    flowerAnimation();
    flash();
}

/**
 * Draw the stem (the rising part)
 */
function stemAnimation()
{
    push();
    strokeWeight(6);
    stroke("#FFFFFF");
    line(canvasW/2, stemYBottom, canvasW/2, stemYTop);
    //control the speed by using remainder calculation
    if(++speedCounter % speedControl === 0)
    {
        stemLength -= deltaStemLength;
        stemLength = constrain(stemLength, 3, stemLength);
        stemYBottom = stemYTop-stemGap;
        stemYTop = stemYTop-stemGap-stemLength;
        speedCounter = 0;
    }
    pop();   
}

/**
 * Draw the flower (the scattering part)
 */
function flowerAnimation()
{
    for (let i = 0; i < numPetals; i++) {
        drawAPetal(i, numPetals);
    }
}

function drawAPetal(nth, numPoints)
{  
    push(); 
    // Calculate current angle
    let angle = TWO_PI * nth / numPoints;

    // Starting point (inner circle)
    let x_start = canvasW/2 + cos(angle) * flowerInnerRadius;
    let y_start = flowerCenterY + sin(angle) * flowerInnerRadius;

    // End point (larger circle)
    let x_end = canvasW/2 + cos(angle) * flowerOuterRadius;
    let y_end = flowerCenterY + sin(angle) * flowerOuterRadius;

    //draw the line
    stroke("#FFFFFF");
    strokeWeight(6);
    line(x_start, y_start, x_end, y_end);
    pop();
}

function flash()
{

}