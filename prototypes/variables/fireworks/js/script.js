/**
 * Fireworks
 * Kiki
 * 
 * Loop of a fireworks animation
 */

"use strict";

const canvasH = 900;
const canvasW = 600; 
let stemLength = 50;
let stemGap = 10
let stemYBottom = canvasH;
let stemYTop = stemYBottom-stemLength;
let speedControl = 30;
let speedCounter = 0;

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(canvasW,canvasH);
}


/**
 * Drawing the animation
*/ 
function draw() {
    background("#1b1d21");
    stemAnimation();
    flowerAnimation();
    flash();
}

function stemAnimation()
{
    push();
    strokeWeight(6);
    stroke("#FFFFFF");
    line(canvasW/2, stemYBottom, canvasW/2, stemYTop);
    if(++speedCounter % speedControl === 0)
    {
        stemYBottom = stemYTop-stemGap;
        stemYTop = stemYTop-stemGap-stemLength;
        speedCounter = 0;
    }
    pop();   
}

function flowerAnimation()
{

}

function flash()
{

}