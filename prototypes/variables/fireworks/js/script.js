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
let flowerRadius = 10;
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
    let radius1 = flowerSizeMin;
    let radius2 = flowerSizeMax;
    let centerX = canvasW/2;
    let centerY = flowerCenterY;
    push();
    // Draw circles
  noFill();
  stroke(100);
  circle(centerX, centerY, radius1 * 2);
  circle(centerX, centerY, radius2 * 2);

  let points1 = [];
  let points2 = [];

  let numPoints = numPetals;
  for (let i = 0; i < numPoints; i++) {

    // Evenly spaced angle
    let angle = TWO_PI * i / numPoints;

    // Point on smaller circle
    let x1 = centerX + cos(angle) * radius1;
    let y1 = centerY + sin(angle) * radius1;

    // Corresponding point on larger circle
    let x2 = centerX + cos(angle) * radius2;
    let y2 = centerY + sin(angle) * radius2;

    points1.push({ x: x1, y: y1 });
    points2.push({ x: x2, y: y2 });

    // Draw points
    fill(255, 100, 100);
    noStroke();
    circle(x1, y1, 10);

    fill(100, 150, 255);
    circle(x2, y2, 10);

    // Draw line between corresponding points
    stroke(100, 100, 100);
    line(x1, y1, x2, y2);
  }
    pop();
}

function flash()
{

}