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
let deltaFlowerSize = 10;
const numPetals = 10; 
let innerPoints;
let outerPoints;
let scatterControl = 30;
let scatterCounter = 0;

let stemYStop = flowerCenterY;


/**
 * Set up the canvas & initialize array
*/
function setup() {
    createCanvas(canvasW,canvasH);
    innerPoints = Array.from({ length:numPetals }, () => ({ x: 0, y: 0 }));
    outerPoints = Array.from({ length:numPetals }, () => ({ x: 0, y: 0 }));
    updatePoints();
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
    }else{
        flowerAnimation();
    }
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
    if(++scatterCounter % scatterControl === 0)
    {
        //update the variables
         flowerInnerRadius += deltaFlowerSize;
        flowerSizeMax += deltaFlowerSize;
        flowerSizeMin += deltaFlowerSize;

        updatePoints();
    }

    for (let i = 0; i < numPetals; i++) {
        drawAPetal(i);
    }
}

function updatePoints()
{
    for (let i = 0; i < numPetals; i++) {
        // Calculate current angle
        let angle = TWO_PI * i / numPetals;

        // Starting point (inner circle)
        let x_start = canvasW/2 + cos(angle) * flowerInnerRadius;
        let y_start = flowerCenterY + sin(angle) * flowerInnerRadius;
        innerPoints[i].x=x_start;
        innerPoints[i].y=y_start;

        flowerOuterRadius = flowerInnerRadius + random(flowerSizeMin, flowerSizeMax);
        // End point (larger circle)
        let x_end = canvasW/2 + cos(angle) * flowerOuterRadius;
        let y_end = flowerCenterY + sin(angle) * flowerOuterRadius;
        //Save the points so it draws the same lines before the next expand
        outerPoints[i].x = x_end;
        outerPoints[i].y = y_end;
    }
}

function drawAPetal(nth)
{  
    push(); 
    
    //draw the line
    stroke("#FFFFFF");
    strokeWeight(6);
    line(innerPoints[nth].x, innerPoints[nth].y, outerPoints[nth].x, outerPoints[nth].y);
    pop();
}

function flash()
{

}