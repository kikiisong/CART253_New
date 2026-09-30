/**
 * Fireworks
 * Kiki
 * 
 * Loop of a fireworks animation
 */

"use strict";

const canvasH = 900;
const canvasW = 600; 

const stem = {
        length: 100,
        deltaLength: 10,
        gap: 10,
        yBottom: canvasH,
        yTop: canvasH - 100,
        speedControl: 30,
        speedCounter: 0,
    };

    const flower = {
        centerY: 200,
    sizeMax: 20,
    sizeMin: 3,
    innerRadius: 10,
    outerRadius: 20,
    deltaSize: 10,
    numPetals: 10,
    innerPoints: [],
    outerPoints: [],
    scatterControl: 30,
    scatterCounter: 0
};


/**
 * Set up the canvas & initialize array
*/
function setup() {
    createCanvas(canvasW,canvasH);
    flower.innerPoints = Array.from({ length:flower.numPetals }, () => ({ x: 0, y: 0 }));
    flower.outerPoints = Array.from({ length:flower.numPetals }, () => ({ x: 0, y: 0 }));
    updatePoints();
}


/**
 * Draw the animation
*/ 
function draw() {
    background("#1b1d21");

    //only draw stem before it reaches the flower
    if(stem.yTop>=flower.centerY)
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
    line(canvasW/2, stem.yBottom, canvasW/2, stem.yTop);
    //control the speed by using remainder calculation
    if(++stem.speedCounter % stem.speedControl === 0)
    {
        stem.length -= stem.deltaLength;
        stem.length = constrain(stem.length, 3, stem.length);
        stem.yBottom = stem.yTop-stem.gap;
        stem.yTop = stem.yTop-stem.gap-stem.length;
        stem.speedCounter = 0;
    }
    pop();   
}

/**
 * Draw the flower (the scattering part)
 */
function flowerAnimation()
{
    if(++flower.scatterCounter % flower.scatterControl === 0)
    {
        //update the variables
         flower.innerRadius += flower.deltaSize;
        flower.sizeMax += flower.deltaSize;
        flower.sizeMin += flower.deltaSize;

        updatePoints();
    }

    for (let i = 0; i < flower.numPetals; i++) {
        drawAPetal(i);
    }
}

function updatePoints()
{
    for (let i = 0; i < flower.numPetals; i++) {
        // Calculate current angle
        let angle = TWO_PI * i / flower.numPetals;

        // Starting point (inner circle)
        let x_start = canvasW/2 + cos(angle) * flower.innerRadius;
        let y_start = flower.centerY + sin(angle) * flower.innerRadius;
        flower.innerPoints[i].x=x_start;
        flower.innerPoints[i].y=y_start;

        //randomized the length of each petal
        flower.outerRadius = flower.innerRadius + random(flower.sizeMin, flower.sizeMax);
        // End point (larger circle)
        let x_end = canvasW/2 + cos(angle) * flower.outerRadius;
        let y_end = flower.centerY + sin(angle) * flower.outerRadius;
        //Save the points so it draws the same lines before the next expand
        flower.outerPoints[i].x = x_end;
        flower.outerPoints[i].y = y_end;
    }
}

function drawAPetal(nth)
{  
    push(); 
    
    //draw the line
    stroke("#FFFFFF");
    strokeWeight(6);
    line(flower.innerPoints[nth].x, flower.innerPoints[nth].y, flower.outerPoints[nth].x, flower.outerPoints[nth].y);
    pop();
}

function flash()
{

}