/**
 * Juicyyy
 * Kiki
 * 
 * Pour yourself some juice
 */

"use strict";

const canvasW = 600;
const canvasH = 800;

const juice = {
    fill: "#e9752e",
    top: 580,
};

const orange = {
    fill: "#e9752e",
    filling: "#f2c554",
    size: 100,
    numFilling: 12
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
    drawFruit();
    drawJuice();
}

/**
 * Draw the juice
 */
function drawJuice()
{
    push();
    noStroke();
    fill(juice.fill);
    rect(0, juice.top, canvasW, canvasH-juice.top);
    pop();
}

/**
 * Draw an orange
 */
function drawFruit()
{
    push();
    noStroke();
    fill(orange.fill);
    circle(mouseX, mouseY, orange.size);

    //make triangles that are point towards the mouse position
    let r = orange.size / 2 * 0.85;
    let gap = 0.1;
    fill(orange.filling);

    for (let i = 0; i < orange.numFilling; i++) {
        //starting and end angles
        let a1 = TWO_PI * i / orange.numFilling;
        let a2 = TWO_PI * (i + 1) / orange.numFilling-gap;

        let x1 = mouseX + cos(a1) * r;
        let y1 = mouseY + sin(a1) * r;

        let x2 = mouseX + cos(a2) * r;
        let y2 = mouseY + sin(a2) * r;

        triangle(
            x1, y1,
            x2, y2,
            mouseX, mouseY
        );
    }
    pop();
}

//Use mouse to pour or remove your orange juice
function mousePressed()
{
    if(juice.top > mouseY+10)
    {
        pourJuice();
    }else
    {
        //juice getting sucked back into the orange
        removeJuice();
    }
}

function pourJuice()
{
    juice.top -= 10;
    juice.top = constrain(juice.top, 0, canvasH);
}

function removeJuice()
{
    juice.top += 10;
    juice.top = constrain(juice.top, 0, canvasH);
}