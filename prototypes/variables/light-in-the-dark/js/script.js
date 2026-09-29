/**
 * Light In The Dark
 * Kiki
 * 
 * Move the torchlight around and illuminate ur surrondings
 */

"use strict";

const torch = {
    size: 100,
    minSize:100,
    maxSize: 600,
    deltaSize: 100,
    innerCircle: 3
};

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(700, 700);
}


/**
 * Set up the torchlight
*/
function draw() {
    background("#000000");
    torchlight();
}

function torchlight()
{
    push();
    noStroke();
    let myGradient = drawingContext.createRadialGradient(mouseX, mouseY, torch.innerCircle, mouseX, mouseY, torch.size);
    //create the torchlight gradient
    myGradient.addColorStop(0, "white");
    myGradient.addColorStop(0.2, "rgba(255,255,255,0.15)");
    myGradient.addColorStop(0.4, "rgba(0,0,0,0.05)");
    myGradient.addColorStop(0.75, "rgba(0,0,0,0.2)");
    myGradient.addColorStop(1, "black");
    drawingContext.fillStyle = myGradient;
    //it follows your mouse
    circle(mouseX, mouseY, torch.size);
    pop();
}

// click = increase to the max and decrease
function mousePressed()
{
    torch.size+=torch.deltaSize;
    console.log(torch.size);
    if(torch.size >= torch.maxSize || torch.size<=torch.minSize)
    {
        torch.deltaSize*=-1;
    }
}