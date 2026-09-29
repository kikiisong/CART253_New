/**
 * Juicyyy
 * Kiki
 * 
 * Pour yourself some juice
 */

"use strict";

const canvasW = 600;
const canvasH = 800;

const juiceTypes =["#e9752e", "#78de75"];
let juiceTypeIdx = 0;

const juice = {
    fill: "#e9752e",
};

const glass = {

};

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * Draw the components
*/
function draw() {
    background("#4db0e2");
    //drawGlass();
    drawJuiceType();
    drawJuice();
}

function drawJuice()
{
    push();
    noStroke();
    fill(juice.fill);
    rect(0, mouseY+30, canvasW, canvasH-mouseY);
    pop();
}

function drawJuiceType()
{
    push();
    noStroke();
    fill(juice.fill);
    circle(mouseX, mouseY, 10);
    pop();
}

function drawPouring()
{
    
}